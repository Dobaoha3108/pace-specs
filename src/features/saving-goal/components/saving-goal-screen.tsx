"use client";

import { useState } from "react";
import { Edit, History, Plus } from "lucide-react";
import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";
import { MobileFrame } from "@/components/app/mobile-frame";
import { SavingGoalCard } from "@/components/finance/saving-goal-card";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { formatVnd, parseCurrencyInput } from "@/lib/finance/amount";
import { createId } from "@/lib/id";
import {
  getCurrentBudget,
  getCurrentUser,
  listUserSavingGoals,
  saveGoal,
} from "@/features/finance/lib/finance-service";
import type { DashboardNavigationTarget } from "@/features/dashboard/types";
import type { SavingGoal, SavingMode } from "@/types/finance";

type SavingGoalMode = "list" | "detail" | "create" | "edit" | "history";

type SavingGoalScreenProps = {
  mode: SavingGoalMode;
  selectedGoalId?: string;
  onBack: () => void;
  onNavigate: (target: DashboardNavigationTarget, id?: string) => void;
};

type GoalFormState = {
  name: string;
  targetAmount: string;
  targetDate: string;
  savingMode: SavingMode;
};

type GoalFormErrors = Partial<Record<keyof GoalFormState, string>>;

export function SavingGoalScreen({
  mode,
  onBack,
  onNavigate,
  selectedGoalId,
}: SavingGoalScreenProps) {
  const user = getCurrentUser();
  const budget = user ? getCurrentBudget(user.id) : undefined;
  const [, setRefreshKey] = useState(0);
  const goals = user ? normalizeTimedSavingGoals(listUserSavingGoals(user.id)) : [];
  const selectedGoal =
    goals.find((goal) => goal.id === selectedGoalId) ??
    goals.find((goal) => goal.status === "Active" || goal.status === "Cancelling") ??
    goals[0];
  const title =
    mode === "create"
      ? "Create Saving Goal"
      : mode === "edit"
        ? "Edit Saving Goal"
        : mode === "history"
          ? "Saving Goal History"
          : mode === "detail"
            ? "Saving Goal Detail"
            : "Saving Goal";

  function refresh() {
    setRefreshKey((value) => value + 1);
  }

  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        <AppHeader onBack={onBack} showBackButton title={title} />
        <div className="flex-1 overflow-y-auto px-md pb-[104px] pt-md">
          {!user || !budget ? (
            <EmptyState
              description="Please finish onboarding before using Saving Goal."
              title="No Budget Found"
            />
          ) : mode === "create" ? (
            <GoalForm
              budgetRemaining={budget.remainingBudget}
              existingGoals={goals}
              onCancel={onBack}
              onSubmit={(goal) => {
                saveGoal(goal);
                onNavigate("saving-goal-detail", goal.id);
              }}
              userId={user.id}
              userPlan={user.plan}
            />
          ) : mode === "history" ? (
            <SavingGoalHistory
              goals={goals.filter(
                (goal) => goal.status === "Completed" || goal.status === "Cancelled",
              )}
              onOpen={(goal) => onNavigate("saving-goal-detail", goal.id)}
            />
          ) : selectedGoal ? (
            mode === "edit" ? (
              <GoalForm
                budgetRemaining={budget.remainingBudget}
                existingGoals={goals}
                goal={selectedGoal}
                onCancel={() => onNavigate("saving-goal-detail", selectedGoal.id)}
                onSubmit={(goal) => {
                  saveGoal(goal);
                  onNavigate("saving-goal-detail", goal.id);
                }}
                userId={user.id}
                userPlan={user.plan}
              />
            ) : mode === "detail" ? (
              <SavingGoalDetail
                budgetRemaining={budget.remainingBudget}
                goal={selectedGoal}
                onChanged={refresh}
                onEdit={() => onNavigate("saving-goal-edit", selectedGoal.id)}
              />
            ) : (
              <SavingGoalList
                goals={goals.filter(
                  (goal) => goal.status === "Active" || goal.status === "Cancelling",
                )}
                onCreate={() => onNavigate("saving-goal-create")}
                onHistory={() => onNavigate("saving-goal-history")}
                onOpen={(goal) => onNavigate("saving-goal-detail", goal.id)}
              />
            )
          ) : (
            <SavingGoalList
              goals={[]}
              onCreate={() => onNavigate("saving-goal-create")}
              onHistory={() => onNavigate("saving-goal-history")}
              onOpen={(goal) => onNavigate("saving-goal-detail", goal.id)}
            />
          )}
        </div>
        <BottomNav activeItem="dashboard" onNavigate={onNavigate} />
      </div>
    </MobileFrame>
  );
}

function SavingGoalList({
  goals,
  onCreate,
  onHistory,
  onOpen,
}: {
  goals: SavingGoal[];
  onCreate: () => void;
  onHistory: () => void;
  onOpen: (goal: SavingGoal) => void;
}) {
  return (
    <div className="space-y-lg">
      <div className="grid grid-cols-2 gap-md">
        <Button leadingIcon={<Plus aria-hidden className="size-5" />} onClick={onCreate}>
          Create Goal
        </Button>
        <Button leadingIcon={<History aria-hidden className="size-5" />} onClick={onHistory} variant="secondary">
          History
        </Button>
      </div>
      {goals.length === 0 ? (
        <EmptyState
          actionLabel="Create Saving Goal"
          description="Bạn chưa có hũ tiết kiệm nào."
          illustrationSrc="/assets/illustrations/Empty_saving_goal.png"
          onAction={onCreate}
          title="No Active Saving Goal"
        />
      ) : (
        <div className="space-y-md">
          {goals.map((goal) => (
            <SavingGoalCard
              currentAmount={formatVnd(goal.currentAmount)}
              key={goal.id}
              name={goal.name}
              onClick={() => onOpen(goal)}
              progress={getProgress(goal)}
              savingMode={goal.savingMode}
              status={goal.status}
              targetAmount={formatVnd(goal.targetAmount)}
              targetDate={formatDate(goal.targetDate)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SavingGoalDetail({
  budgetRemaining,
  goal,
  onChanged,
  onEdit,
}: {
  budgetRemaining: number;
  goal: SavingGoal;
  onChanged: () => void;
  onEdit: () => void;
}) {
  const [sheet, setSheet] = useState<"deposit" | "withdraw" | null>(null);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState<string | undefined>();
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const isActive = goal.status === "Active";
  const isCancelling = goal.status === "Cancelling";
  const hasPendingWithdraw =
    Boolean(goal.withdrawRequestedAmount) && Boolean(goal.withdrawAvailableAt);

  function submitMoneyAction(type: "deposit" | "withdraw") {
    const parsedAmount = parseCurrencyInput(amount);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setAmountError("Số tiền phải lớn hơn 0.");
      return;
    }

    if (type === "deposit" && parsedAmount > budgetRemaining) {
      setAmountError("Số tiền vượt quá Remaining Budget.");
      return;
    }

    if (type === "withdraw" && parsedAmount > goal.currentAmount) {
      setAmountError("Số tiền vượt quá Current Amount.");
      return;
    }

    const now = new Date().toISOString();
    if (type === "withdraw" && goal.savingMode === "Commitment") {
      const availableAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

      saveGoal({
        ...goal,
        withdrawRequestedAmount: parsedAmount,
        withdrawRequestedAt: now,
        withdrawAvailableAt: availableAt.toISOString(),
        updatedAt: now,
      });
      setAmount("");
      setAmountError(undefined);
      setSheet(null);
      onChanged();
      return;
    }

    const nextAmount =
      type === "deposit"
        ? goal.currentAmount + parsedAmount
        : goal.currentAmount - parsedAmount;
    const nextGoal = {
      ...goal,
      currentAmount: nextAmount,
      status:
        type === "deposit" && nextAmount >= goal.targetAmount
          ? "Completed"
          : goal.status,
      updatedAt: now,
    };

    saveGoal(nextGoal);
    setAmount("");
    setAmountError(undefined);
    setSheet(null);
    onChanged();
  }

  function requestCancel() {
    const requestedAt = new Date();
    const availableAt = new Date(requestedAt.getTime() + 12 * 60 * 60 * 1000);

    saveGoal({
      ...goal,
      status: "Cancelling",
      cancelRequestedAt: requestedAt.toISOString(),
      cancelAvailableAt: availableAt.toISOString(),
      updatedAt: requestedAt.toISOString(),
    });
    setCancelConfirmOpen(false);
    onChanged();
  }

  function undoCancel() {
    const { cancelAvailableAt, cancelRequestedAt, ...restGoal } = goal;
    void cancelAvailableAt;
    void cancelRequestedAt;
    saveGoal({
      ...restGoal,
      status: "Active",
      updatedAt: new Date().toISOString(),
    });
    onChanged();
  }

  return (
    <div className="space-y-lg">
      <SavingGoalCard
        currentAmount={formatVnd(goal.currentAmount)}
        name={goal.name}
        progress={getProgress(goal)}
        savingMode={goal.savingMode}
        status={goal.status}
        targetAmount={formatVnd(goal.targetAmount)}
        targetDate={formatDate(goal.targetDate)}
      />
      <Card>
        <div className="space-y-sm">
          <DetailRow label="Progress" value={`${getProgress(goal)}%`} />
          <DetailRow label="Saving Mode" value={goal.savingMode} />
          <DetailRow label="Status" value={goal.status} />
          {isCancelling && goal.cancelAvailableAt ? (
            <DetailRow
              label="Cancel Available"
              value={formatDateTime(goal.cancelAvailableAt)}
            />
          ) : null}
          {hasPendingWithdraw && goal.withdrawAvailableAt ? (
            <>
              <DetailRow
                label="Pending Withdraw"
                value={formatVnd(goal.withdrawRequestedAmount ?? 0)}
              />
              <DetailRow
                label="Withdraw Available"
                value={formatDateTime(goal.withdrawAvailableAt)}
              />
            </>
          ) : null}
        </div>
      </Card>
      {isActive && !hasPendingWithdraw ? (
        <div className="space-y-md">
          <Button onClick={() => setSheet("deposit")}>Deposit</Button>
          <Button onClick={() => setSheet("withdraw")} variant="secondary">
            Withdraw
          </Button>
          <Button leadingIcon={<Edit aria-hidden className="size-5" />} onClick={onEdit} variant="secondary">
            Edit
          </Button>
          <Button onClick={() => setCancelConfirmOpen(true)} variant="danger">
            Request Cancel
          </Button>
        </div>
      ) : null}
      {isActive && hasPendingWithdraw ? (
        <Card>
          <p className="text-body font-semibold">Withdraw request is pending</p>
          <p className="mt-xs text-caption text-pace-text-secondary">
            Commitment mode will release this amount after the 2-hour waiting
            period.
          </p>
        </Card>
      ) : null}
      {isCancelling ? (
        <Button onClick={undoCancel} variant="secondary">
          Undo Cancel
        </Button>
      ) : null}
      <BottomSheet
        isOpen={sheet !== null}
        onClose={() => setSheet(null)}
        onPrimary={() => sheet && submitMoneyAction(sheet)}
        primaryLabel={sheet === "deposit" ? "Deposit" : "Withdraw"}
        title={sheet === "deposit" ? "Deposit Saving Goal" : "Withdraw Saving Goal"}
      >
        <Input
          error={amountError}
          inputMode="numeric"
          label="Amount"
          leftAddon="VND"
          onChange={(event) => {
            setAmount(event.target.value);
            setAmountError(undefined);
          }}
          placeholder="100000"
          value={amount}
        />
        {sheet === "withdraw" && goal.savingMode === "Commitment" ? (
          <p className="mt-md text-caption text-pace-warning">
            Commitment mode creates a withdraw request and releases the amount
            after 2 hours.
          </p>
        ) : null}
      </BottomSheet>
      <ConfirmationDialog
        confirmLabel="Request Cancel"
        confirmVariant="danger"
        isOpen={cancelConfirmOpen}
        message="Saving Goal will enter Cancelling state for 12 hours. Deposit, withdraw and edit will be disabled."
        onCancel={() => setCancelConfirmOpen(false)}
        onConfirm={requestCancel}
        title="Cancel Saving Goal?"
      />
    </div>
  );
}

function GoalForm({
  budgetRemaining,
  existingGoals,
  goal,
  onCancel,
  onSubmit,
  userId,
  userPlan,
}: {
  budgetRemaining: number;
  existingGoals: SavingGoal[];
  goal?: SavingGoal;
  onCancel: () => void;
  onSubmit: (goal: SavingGoal) => void;
  userId: string;
  userPlan: "Free" | "Premium";
}) {
  const [form, setForm] = useState<GoalFormState>(() => ({
    name: goal?.name ?? "",
    targetAmount: goal ? String(goal.targetAmount) : "",
    targetDate: toDateTimeInputValue(goal?.targetDate ?? new Date(Date.now() + 86400000).toISOString()),
    savingMode: goal?.savingMode ?? "Flexible",
  }));
  const [errors, setErrors] = useState<GoalFormErrors>({});
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);

  function validate() {
    const nextErrors: GoalFormErrors = {};
    const targetAmount = parseCurrencyInput(form.targetAmount);

    if (!form.name.trim()) {
      nextErrors.name = "Vui lòng nhập Goal Name.";
    }

    if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
      nextErrors.targetAmount = "Target Amount phải lớn hơn 0.";
    }

    if (!form.targetDate || new Date(form.targetDate).getTime() <= Date.now()) {
      nextErrors.targetDate = "Target Date phải lớn hơn thời điểm hiện tại.";
    }

    if (
      !goal &&
      userPlan === "Free" &&
      existingGoals.filter(
        (item) => item.status === "Active" || item.status === "Cancelling",
      ).length >= 2
    ) {
      nextErrors.name = "Free User chỉ được có tối đa hai Saving Goal Active.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function submit() {
    if (!validate()) {
      setDialogMessage("Không thể lưu Saving Goal. Vui lòng kiểm tra lại thông tin.");
      return;
    }

    const now = new Date().toISOString();
    const targetAmount = parseCurrencyInput(form.targetAmount);

    onSubmit({
      id: goal?.id ?? createId(),
      userId,
      name: form.name.trim(),
      targetAmount,
      currentAmount: goal?.currentAmount ?? 0,
      targetDate: new Date(form.targetDate).toISOString(),
      savingMode: goal?.savingMode ?? form.savingMode,
      status: goal?.status ?? "Active",
      cancelRequestedAt: goal?.cancelRequestedAt,
      cancelAvailableAt: goal?.cancelAvailableAt,
      withdrawRequestedAmount: goal?.withdrawRequestedAmount,
      withdrawRequestedAt: goal?.withdrawRequestedAt,
      withdrawAvailableAt: goal?.withdrawAvailableAt,
      createdAt: goal?.createdAt ?? now,
      updatedAt: now,
    });
  }

  return (
    <div className="space-y-lg">
      <Card>
        <p className="text-caption text-pace-text-secondary">Remaining Budget</p>
        <p className="mt-xs text-title">{formatVnd(budgetRemaining)}</p>
      </Card>
      <Input
        error={errors.name}
        label="Goal Name"
        onChange={(event) => setForm({ ...form, name: event.target.value })}
        placeholder="New laptop fund"
        value={form.name}
      />
      <Input
        error={errors.targetAmount}
        inputMode="numeric"
        label="Target Amount"
        leftAddon="VND"
        onChange={(event) =>
          setForm({ ...form, targetAmount: event.target.value })
        }
        placeholder="10000000"
        value={form.targetAmount}
      />
      <Input
        error={errors.targetDate}
        label="Target Date"
        onChange={(event) => setForm({ ...form, targetDate: event.target.value })}
        type="datetime-local"
        value={form.targetDate}
      />
      {!goal ? (
        <FormSelect
          label="Saving Mode"
          onChange={(savingMode) =>
            setForm({ ...form, savingMode: savingMode as SavingMode })
          }
          options={[
            { label: "Flexible", value: "Flexible" },
            { label: "Commitment", value: "Commitment" },
          ]}
          value={form.savingMode}
        />
      ) : (
        <Card>
          <p className="text-caption text-pace-text-secondary">Saving Mode</p>
          <p className="mt-xs text-title">{goal.savingMode}</p>
        </Card>
      )}
      <Button onClick={submit}>{goal ? "Save Saving Goal" : "Create Saving Goal"}</Button>
      <Button onClick={onCancel} variant="secondary">
        Cancel
      </Button>
      <ConfirmationDialog
        confirmLabel="Đã hiểu"
        isOpen={Boolean(dialogMessage)}
        message={dialogMessage}
        onCancel={() => setDialogMessage(null)}
        onConfirm={() => setDialogMessage(null)}
        title="Không thể lưu Saving Goal"
      />
    </div>
  );
}

function SavingGoalHistory({
  goals,
  onOpen,
}: {
  goals: SavingGoal[];
  onOpen: (goal: SavingGoal) => void;
}) {
  if (goals.length === 0) {
    return (
      <EmptyState
        description="Chưa có Saving Goal Completed hoặc Cancelled."
        illustrationSrc="/assets/illustrations/Empty_saving_goal.png"
        title="Saving Goal History Empty"
      />
    );
  }

  return (
    <div className="space-y-md">
      {goals.map((goal) => (
        <SavingGoalCard
          currentAmount={formatVnd(goal.currentAmount)}
          key={goal.id}
          name={goal.name}
          onClick={() => onOpen(goal)}
          progress={getProgress(goal)}
          savingMode={goal.savingMode}
          status={goal.status}
          targetAmount={formatVnd(goal.targetAmount)}
          targetDate={formatDate(goal.updatedAt)}
        />
      ))}
    </div>
  );
}

function FormSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  value: string;
}) {
  return (
    <label className="block w-full">
      <span className="mb-xs block text-caption text-pace-text-secondary">
        {label}
      </span>
      <select
        className="h-14 w-full rounded-input bg-pace-background px-md text-body text-pace-text-primary outline-none ring-1 ring-transparent focus:bg-pace-surface focus:ring-pace-primary"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-md border-b border-pace-border py-sm last:border-b-0">
      <span className="text-pace-text-secondary">{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}

function normalizeTimedSavingGoals(goals: SavingGoal[]) {
  const now = Date.now();

  return goals.map((goal) => {
    if (
      goal.status === "Active" &&
      goal.withdrawRequestedAmount &&
      goal.withdrawAvailableAt &&
      new Date(goal.withdrawAvailableAt).getTime() <= now
    ) {
      const {
        withdrawAvailableAt,
        withdrawRequestedAmount,
        withdrawRequestedAt,
        ...restGoal
      } = goal;
      void withdrawAvailableAt;
      void withdrawRequestedAt;

      const updatedGoal = {
        ...restGoal,
        currentAmount: Math.max(0, goal.currentAmount - withdrawRequestedAmount),
        updatedAt: new Date().toISOString(),
      };

      saveGoal(updatedGoal);
      return updatedGoal;
    }

    if (
      goal.status === "Cancelling" &&
      goal.cancelAvailableAt &&
      new Date(goal.cancelAvailableAt).getTime() <= now
    ) {
      const updatedGoal = {
        ...goal,
        status: "Cancelled" as const,
        updatedAt: new Date().toISOString(),
      };
      saveGoal(updatedGoal);
      return updatedGoal;
    }

    return goal;
  });
}

function getProgress(goal: SavingGoal) {
  if (goal.targetAmount <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
}

function toDateTimeInputValue(dateValue: string) {
  return new Date(dateValue).toISOString().slice(0, 16);
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateValue));
}

function formatDateTime(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(dateValue));
}
