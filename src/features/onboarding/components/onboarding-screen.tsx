"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { LoadingState } from "@/components/ui/loading-state";
import { MobileFrame } from "@/components/app/mobile-frame";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";
import { createId } from "@/lib/id";
import {
  formatVnd,
  getRemainingDaysInMonth,
  isBudgetResetDay,
  parseCurrencyInput,
} from "@/lib/finance/amount";
import type {
  FinancialSetupData,
  OnboardingStep,
  SavingGoalSetupData,
} from "@/features/onboarding/types";
import { OnboardingProgress } from "@/features/onboarding/components/onboarding-progress";
import type { Budget, SavingGoal, User } from "@/types/finance";

type OnboardingScreenProps = {
  onCompleted: () => void;
};

type FinancialErrors = {
  budgetResetDay?: string;
  monthlyIncome?: string;
  fixedExpenses?: string;
  remainingBudget?: string;
};

type SavingGoalErrors = {
  name?: string;
  targetAmount?: string;
  targetDate?: string;
  savingMode?: string;
};

const invalidFieldsMessage =
  "Vui lòng kiểm tra lại các trường dữ liệu trước khi tiếp tục.";

export function OnboardingScreen({ onCompleted }: OnboardingScreenProps) {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [budgetResetDay, setBudgetResetDay] = useState<number | null>(null);
  const [financialInputs, setFinancialInputs] = useState({
    monthlyIncome: "",
    fixedExpenses: "",
    remainingBudget: "",
  });
  const [savingGoalInputs, setSavingGoalInputs] = useState({
    name: "",
    targetAmount: "",
    targetDate: "",
    savingMode: "Flexible" as SavingGoalSetupData["savingMode"],
  });
  const [financialData, setFinancialData] = useState<FinancialSetupData | null>(
    null,
  );
  const [financialErrors, setFinancialErrors] = useState<FinancialErrors>({});
  const [savingGoalErrors, setSavingGoalErrors] = useState<SavingGoalErrors>({});
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const now = useMemo(() => new Date(), []);
  const currentStepNumber =
    step === "welcome" ? 1 : step === "financial" ? 2 : step === "saving-goal" ? 3 : 4;

  const isScenarioA =
    budgetResetDay !== null && isBudgetResetDay(budgetResetDay, now);

  const monthlyIncome = parseCurrencyInput(financialInputs.monthlyIncome);
  const fixedExpenses = parseCurrencyInput(financialInputs.fixedExpenses);
  const remainingBudgetInput = parseCurrencyInput(
    financialInputs.remainingBudget,
  );
  const monthlyBudgetPreview =
    Number.isFinite(monthlyIncome) && Number.isFinite(fixedExpenses)
      ? monthlyIncome - fixedExpenses
      : Number.NaN;

  function validateFinancialSetup() {
    const nextErrors: FinancialErrors = {};

    if (budgetResetDay === null) {
      nextErrors.budgetResetDay = "Vui lòng chọn một ngày.";
      setFinancialErrors(nextErrors);
      return false;
    }

    if (isScenarioA) {
      if (!Number.isFinite(monthlyIncome) || monthlyIncome <= 0) {
        nextErrors.monthlyIncome = "Giá trị phải lớn hơn 0.";
      }

      if (!Number.isFinite(fixedExpenses) || fixedExpenses < 0) {
        nextErrors.fixedExpenses = "Fixed Cost phải lớn hơn hoặc bằng 0.";
      }

      if (
        Number.isFinite(monthlyIncome) &&
        Number.isFinite(fixedExpenses) &&
        fixedExpenses > monthlyIncome
      ) {
        nextErrors.fixedExpenses =
          "Fixed Cost không được lớn hơn Monthly Income.";
      }

      if (
        Number.isFinite(monthlyIncome) &&
        Number.isFinite(fixedExpenses) &&
        monthlyIncome - fixedExpenses <= 0
      ) {
        nextErrors.fixedExpenses = "Budget phải lớn hơn 0.";
      }
    } else {
      if (!Number.isFinite(remainingBudgetInput) || remainingBudgetInput <= 0) {
        nextErrors.remainingBudget = "Giá trị phải lớn hơn 0.";
      }
    }

    setFinancialErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function continueFromFinancialSetup() {
    if (!validateFinancialSetup() || budgetResetDay === null) {
      setDialogMessage(invalidFieldsMessage);
      return;
    }

    const budgetAmount = isScenarioA
      ? monthlyIncome - fixedExpenses
      : remainingBudgetInput;

    setFinancialData({
      budgetResetDay,
      monthlyIncome: isScenarioA ? monthlyIncome : 0,
      fixedExpenses: isScenarioA ? fixedExpenses : 0,
      monthlyBudget: budgetAmount,
      remainingBudget: budgetAmount,
    });
    setStep("saving-goal");
  }

  function validateSavingGoal() {
    const nextErrors: SavingGoalErrors = {};
    const targetAmount = parseCurrencyInput(savingGoalInputs.targetAmount);
    const targetDate = new Date(savingGoalInputs.targetDate);

    if (!savingGoalInputs.name.trim()) {
      nextErrors.name = "Vui lòng nhập tên hũ tiết kiệm.";
    }

    if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
      nextErrors.targetAmount = "Giá trị phải lớn hơn 0.";
    }

    if (!savingGoalInputs.targetDate || targetDate.getTime() <= now.getTime()) {
      nextErrors.targetDate = "Target Date phải lớn hơn thời điểm hiện tại.";
    }

    if (!savingGoalInputs.savingMode) {
      nextErrors.savingMode = "Vui lòng chọn chế độ tiết kiệm.";
    }

    setSavingGoalErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function createBaseRecords() {
    if (!financialData) {
      throw new Error("Financial setup must be completed first.");
    }

    const timestamp = new Date().toISOString();
    const userId = createId();
    const budgetResetDay = financialData.budgetResetDay;
    const remainingDailyBudget =
      financialData.remainingBudget / getRemainingDaysInMonth(new Date());

    const user: User = {
      id: userId,
      displayName: "PACE User",
      onboardingCompleted: true,
      plan: "Free",
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const budget: Budget = {
      id: createId(),
      userId,
      monthlyIncome: financialData.monthlyIncome,
      fixedExpenses: financialData.fixedExpenses,
      monthlyBudget: financialData.monthlyBudget,
      remainingBudget: financialData.remainingBudget,
      remainingDailyBudget,
      budgetResetDay,
      cycle: "Monthly",
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    paceLocalDataSource.users.replaceAll([user]);
    paceLocalDataSource.budgets.replaceAll([budget]);
    paceLocalDataSource.budgetStreaks.replaceAll([
      {
        id: createId(),
        userId,
        currentStreak: 0,
        noExpenseDays: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ]);
    paceLocalDataSource.pigCoinWallets.replaceAll([
      {
        id: createId(),
        userId,
        balance: 500,
        totalEarned: 500,
        totalSpent: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ]);
    paceLocalDataSource.pigPigInsights.replaceAll([
      {
        id: createId(),
        userId,
        title: "Welcome to PACE",
        content:
          "Pig Pig is ready to help you understand your budget, expenses, saving goals and Pig Coins.",
        insightType: "Information",
        source: "Budget",
        createdAt: timestamp,
      },
    ]);
    paceLocalDataSource.notifications.replaceAll([]);
    paceLocalDataSource.chatHistories.replaceAll([]);

    return { user, budget, timestamp };
  }

  function completeWithoutSavingGoal() {
    try {
      setIsLoading(true);
      createBaseRecords();
      paceLocalDataSource.savingGoals.replaceAll([]);
      setStep("completed");
    } catch {
      setDialogMessage("Không thể khởi tạo Dashboard.");
    } finally {
      setIsLoading(false);
    }
  }

  function createSavingGoal() {
    if (!validateSavingGoal()) {
      setDialogMessage(invalidFieldsMessage);
      return;
    }

    try {
      setIsLoading(true);
      const { user, timestamp } = createBaseRecords();
      const targetAmount = parseCurrencyInput(savingGoalInputs.targetAmount);
      const savingGoal: SavingGoal = {
        id: createId(),
        userId: user.id,
        name: savingGoalInputs.name.trim(),
        targetAmount,
        currentAmount: 0,
        targetDate: new Date(savingGoalInputs.targetDate).toISOString(),
        savingMode: savingGoalInputs.savingMode,
        status: "Active",
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      paceLocalDataSource.savingGoals.replaceAll([savingGoal]);
      setStep("completed");
    } catch {
      setDialogMessage("Không thể tạo hũ tiết kiệm.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        {isLoading ? (
          <div className="flex h-full items-center px-md">
            <LoadingState label="Preparing your PACE dashboard" />
          </div>
        ) : (
          <>
            <div className="px-md pt-lg">
              <OnboardingProgress currentStep={currentStepNumber} />
            </div>
            <div className="flex-1 overflow-y-auto px-md py-lg">
              {step === "welcome" ? (
                <WelcomeStep onStart={() => setStep("financial")} />
              ) : null}
              {step === "financial" ? (
                <FinancialSetupStep
                  budgetResetDay={budgetResetDay}
                  errors={financialErrors}
                  inputs={financialInputs}
                  isScenarioA={isScenarioA}
                  monthlyBudgetPreview={monthlyBudgetPreview}
                  onChange={setFinancialInputs}
                  onContinue={continueFromFinancialSetup}
                  onSelectBudgetResetDay={(day) => {
                    setBudgetResetDay(day);
                    setFinancialErrors((current) => ({
                      ...current,
                      budgetResetDay: undefined,
                    }));
                  }}
                />
              ) : null}
              {step === "saving-goal" ? (
                <SavingGoalStep
                  errors={savingGoalErrors}
                  inputs={savingGoalInputs}
                  onChange={setSavingGoalInputs}
                  onCreate={createSavingGoal}
                  onSkip={completeWithoutSavingGoal}
                />
              ) : null}
              {step === "completed" ? (
                <CompletedStep onOpenDashboard={onCompleted} />
              ) : null}
            </div>
          </>
        )}
      </div>
      <ConfirmationDialog
        confirmLabel="Đã hiểu"
        isOpen={Boolean(dialogMessage)}
        message={dialogMessage}
        onCancel={() => setDialogMessage(null)}
        onConfirm={() => setDialogMessage(null)}
        title="Không thể tiếp tục"
      />
    </MobileFrame>
  );
}

function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-full flex-col items-center text-center">
      <Image alt="PACE" height={56} src="/assets/logos/wordmark.png" width={172} />
      <Image
        alt="Pig Pig planning"
        className="my-xl"
        height={220}
        priority
        src="/assets/pig-pig/pig_planning.png"
        width={220}
      />
      <h1 className="text-h1">Welcome to PACE</h1>
      <p className="mt-md text-body text-pace-text-secondary">
        Quản lý dễ dàng - Vững vàng chi tiêu cùng Pig Pig mỗi ngày.
      </p>
      <div className="mt-auto w-full pt-xl">
        <Button onClick={onStart}>Bắt đầu</Button>
      </div>
    </div>
  );
}

function FinancialSetupStep({
  budgetResetDay,
  errors,
  inputs,
  isScenarioA,
  monthlyBudgetPreview,
  onChange,
  onContinue,
  onSelectBudgetResetDay,
}: {
  budgetResetDay: number | null;
  errors: FinancialErrors;
  inputs: { monthlyIncome: string; fixedExpenses: string; remainingBudget: string };
  isScenarioA: boolean;
  monthlyBudgetPreview: number;
  onChange: (value: {
    monthlyIncome: string;
    fixedExpenses: string;
    remainingBudget: string;
  }) => void;
  onContinue: () => void;
  onSelectBudgetResetDay: (day: number) => void;
}) {
  return (
    <div className="space-y-lg">
      <div>
        <h1 className="text-h2">Financial Setup</h1>
        <p className="mt-xs text-body text-pace-text-secondary">
          Bạn nhận Income (lương/trợ cấp...) vào ngày nào hàng tháng?
        </p>
      </div>

      <DayPickerGrid
        error={errors.budgetResetDay}
        onSelect={onSelectBudgetResetDay}
        selectedDay={budgetResetDay}
      />

      {budgetResetDay === null ? null : isScenarioA ? (
        <div className="space-y-md">
          <p className="text-body text-pace-text-secondary">
            Nhập Monthly Income và Fixed Cost để PACE tính budget cho chu kỳ
            này.
          </p>
          <Input
            error={errors.monthlyIncome}
            inputMode="numeric"
            label="Monthly Income"
            leftAddon="VND"
            onChange={(event) =>
              onChange({ ...inputs, monthlyIncome: event.target.value })
            }
            placeholder="5000000"
            value={inputs.monthlyIncome}
          />
          <Input
            error={errors.fixedExpenses}
            inputMode="numeric"
            label="Fixed Cost"
            leftAddon="VND"
            onChange={(event) =>
              onChange({ ...inputs, fixedExpenses: event.target.value })
            }
            placeholder="1500000"
            value={inputs.fixedExpenses}
          />

          <Card>
            <p className="text-caption text-pace-text-secondary">
              Budget = Monthly Income - Fixed Cost
            </p>
            <p className="mt-xs text-title">
              {Number.isFinite(monthlyBudgetPreview) &&
              monthlyBudgetPreview > 0
                ? formatVnd(monthlyBudgetPreview)
                : formatVnd(0)}
            </p>
          </Card>
        </div>
      ) : (
        <div className="space-y-md">
          <p className="text-body text-pace-text-secondary">
            Chu kỳ hiện tại đã bắt đầu từ trước ngày {budgetResetDay}. Số
            tiền bạn còn có thể chi tiêu tới trước lần nhận Income tiếp theo
            là bao nhiêu?
          </p>
          <Input
            error={errors.remainingBudget}
            inputMode="numeric"
            label="Remaining Budget"
            leftAddon="VND"
            onChange={(event) =>
              onChange({ ...inputs, remainingBudget: event.target.value })
            }
            placeholder="3000000"
            value={inputs.remainingBudget}
          />
        </div>
      )}

      <Button onClick={onContinue}>Tiếp tục</Button>
    </div>
  );
}

/** CMP-016 Day Picker Grid — lưới chọn 1 ngày từ 1 đến 31. */
function DayPickerGrid({
  error,
  onSelect,
  selectedDay,
}: {
  error?: string;
  onSelect: (day: number) => void;
  selectedDay: number | null;
}) {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <div>
      <div className="grid grid-cols-7 gap-xs">
        {days.map((day) => (
          <button
            className={
              selectedDay === day
                ? "aspect-square rounded-button border border-pace-primary bg-pace-primary text-caption font-semibold text-white"
                : "aspect-square rounded-button border border-pace-border bg-pace-surface text-caption font-semibold text-pace-text-primary"
            }
            key={day}
            onClick={() => onSelect(day)}
            type="button"
          >
            {day}
          </button>
        ))}
      </div>
      {error ? (
        <p className="mt-xs text-caption text-pace-danger">{error}</p>
      ) : null}
    </div>
  );
}

function SavingGoalStep({
  errors,
  inputs,
  onChange,
  onCreate,
  onSkip,
}: {
  errors: SavingGoalErrors;
  inputs: {
    name: string;
    targetAmount: string;
    targetDate: string;
    savingMode: SavingGoalSetupData["savingMode"];
  };
  onChange: (value: {
    name: string;
    targetAmount: string;
    targetDate: string;
    savingMode: SavingGoalSetupData["savingMode"];
  }) => void;
  onCreate: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="space-y-lg">
      <div>
        <h1 className="text-h2">Create First Saving Goal</h1>
        <p className="mt-xs text-body text-pace-text-secondary">
          Bạn có muốn tạo hũ tiết kiệm đầu tiên không? Bước này có thể để sau.
        </p>
      </div>
      <div className="space-y-md">
        <Input
          error={errors.name}
          label="Goal Name"
          onChange={(event) => onChange({ ...inputs, name: event.target.value })}
          placeholder="New laptop fund"
          value={inputs.name}
        />
        <Input
          error={errors.targetAmount}
          inputMode="numeric"
          label="Target Amount"
          leftAddon="VND"
          onChange={(event) =>
            onChange({ ...inputs, targetAmount: event.target.value })
          }
          placeholder="10000000"
          value={inputs.targetAmount}
        />
        <Input
          error={errors.targetDate}
          label="Target Date"
          onChange={(event) =>
            onChange({ ...inputs, targetDate: event.target.value })
          }
          type="datetime-local"
          value={inputs.targetDate}
        />
        <div>
          <p className="mb-xs text-caption text-pace-text-secondary">
            Saving Mode
          </p>
          <div className="grid grid-cols-2 gap-md">
            {(["Flexible", "Commitment"] as const).map((mode) => (
              <button
                className={
                  inputs.savingMode === mode
                    ? "min-h-14 rounded-button border border-pace-primary bg-pace-primary text-body font-semibold text-white"
                    : "min-h-14 rounded-button border border-pace-border bg-pace-surface text-body font-semibold text-pace-text-primary"
                }
                key={mode}
                onClick={() => onChange({ ...inputs, savingMode: mode })}
                type="button"
              >
                {mode}
              </button>
            ))}
          </div>
          {errors.savingMode ? (
            <p className="mt-xs text-caption text-pace-danger">
              {errors.savingMode}
            </p>
          ) : null}
        </div>
      </div>
      <Button onClick={onCreate}>Tạo Saving Goal</Button>
      <Button onClick={onSkip} variant="secondary">
        Để sau
      </Button>
    </div>
  );
}

function CompletedStep({
  onOpenDashboard,
}: {
  onOpenDashboard: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col items-center text-center">
      <Image
        alt="Pig Pig celebrate"
        className="my-xl"
        height={232}
        priority
        src="/assets/pig-pig/pig_celebrate.png"
        width={232}
      />
      <h1 className="text-h1">Chúc mừng!</h1>
      <p className="mt-md text-body text-pace-text-secondary">
        PACE đã sẵn sàng đồng hành cùng bạn.
      </p>
      <div className="mt-auto w-full pt-xl">
        <Button onClick={onOpenDashboard}>Bắt đầu sử dụng</Button>
      </div>
    </div>
  );
}
