"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";
import { MobileFrame } from "@/components/app/mobile-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { formatVnd, parseCurrencyInput } from "@/lib/finance/amount";
import { createId } from "@/lib/id";
import {
  checkDailyBudgetOverspend,
  countCompletedExpensesCreatedThisWeek,
  deleteExpense,
  ensureDefaultExpenseCategories,
  getCurrentUser,
  listUserExpenses,
  saveExpense,
} from "@/features/finance/lib/finance-service";
import type { DashboardNavigationTarget } from "@/features/dashboard/types";
import type { Expense, ExpenseCategory, ExpenseStatus } from "@/types/finance";

type ExpenseMode = "add" | "history" | "detail" | "edit";

type ExpenseScreenProps = {
  mode: ExpenseMode;
  selectedExpenseId?: string;
  onBack: () => void;
  onNavigate: (target: DashboardNavigationTarget, id?: string) => void;
};

type ExpenseFormState = {
  amount: string;
  categoryId: string;
  note: string;
  plannedDate: string;
  status: ExpenseStatus;
};

type ExpenseFormErrors = Partial<Record<keyof ExpenseFormState, string>>;
const categoryIconMap: Record<string, string> = {
  Food: "/assets/category/food.png",
  Transportation: "/assets/category/transportation.png",
  Shopping: "/assets/category/shopping.png",
  Entertainment: "/assets/category/entertainment.png",
  Education: "/assets/category/education.png",
  Health: "/assets/category/health.png",
  Bills: "/assets/category/bills.png",
  Other: "/assets/category/other.png",
};
export function ExpenseScreen({
  mode,
  onBack,
  onNavigate,
  selectedExpenseId,
}: ExpenseScreenProps) {
  const user = getCurrentUser();
  const categories = ensureDefaultExpenseCategories();
  const expenses = user ? listUserExpenses(user.id) : [];
  const selectedExpense =
    expenses.find((expense) => expense.id === selectedExpenseId) ?? expenses[0];
  const title =
    mode === "add"
      ? "Add Expense"
      : mode === "history"
        ? "Expense History"
        : mode === "edit"
          ? "Edit Expense"
          : "Expense Detail";

  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        <AppHeader onBack={onBack} showBackButton title={title} />
        <div className="flex-1 overflow-y-auto px-md pb-[104px] pt-md">
          {!user ? (
            <EmptyState
              description="Please finish onboarding before adding expenses."
              title="No User Found"
            />
          ) : mode === "add" ? (
            <ExpenseForm
              categories={categories}
              onCancel={onBack}
              onSubmit={(expense) => {
                saveExpense(expense);
                onNavigate("dashboard");
              }}
              userId={user.id}
            />
          ) : mode === "history" ? (
            <ExpenseHistory
              categories={categories}
              expenses={expenses}
              onAdd={() => onNavigate("add-expense")}
              onOpen={(expense) => onNavigate("expense-detail", expense.id)}
            />
          ) : selectedExpense ? (
            mode === "edit" ? (
              <ExpenseForm
                categories={categories}
                expense={selectedExpense}
                onCancel={() => onNavigate("expense-detail", selectedExpense.id)}
                onSubmit={(expense) => {
                  saveExpense(expense);
                  onNavigate("expense-detail", expense.id);
                }}
                userId={user.id}
              />
            ) : (
              <ExpenseDetail
                categories={categories}
                expense={selectedExpense}
                onDelete={() => {
                  deleteExpense(selectedExpense);
                  onNavigate("expense-history");
                }}
                onEdit={() => onNavigate("expense-edit", selectedExpense.id)}
                onMarkCompleted={() => {
                  saveExpense({
                    ...selectedExpense,
                    status: "Completed",
                    completedDate:
                      selectedExpense.completedDate ?? new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  });
                  onNavigate("expense-detail", selectedExpense.id);
                }}
              />
            )
          ) : (
            <EmptyState
              actionLabel="Add Expense"
              description="Bạn chưa ghi nhận khoản chi nào."
              illustrationSrc="/assets/illustrations/Emty_expense.png"
              onAction={() => onNavigate("add-expense")}
              title="Expense History Empty"
            />
          )}
        </div>
        <BottomNav
          activeItem={mode === "add" ? "add-expense" : "report"}
          onNavigate={onNavigate}
        />
      </div>
    </MobileFrame>
  );
}

function ExpenseForm({
  categories,
  expense,
  onCancel,
  onSubmit,
  userId,
}: {
  categories: ExpenseCategory[];
  expense?: Expense;
  onCancel: () => void;
  onSubmit: (expense: Expense) => void;
  userId: string;
}) {
  const [form, setForm] = useState<ExpenseFormState>(() => ({
    amount: expense ? String(expense.amount) : "",
    categoryId: expense?.categoryId ?? categories[0]?.id ?? "",
    note: expense?.note ?? "",
    plannedDate: toDateTimeInputValue(expense?.plannedDate ?? new Date().toISOString()),
    status: expense?.status ?? "Planned",
  }));
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [pendingOverspend, setPendingOverspend] = useState<{
    expense: Expense;
    currentDailyAverage: number;
    newDailyAverage: number;
  } | null>(null);

  function validate() {
    const amount = parseCurrencyInput(form.amount);
    const nextErrors: ExpenseFormErrors = {};

    if (!Number.isFinite(amount) || amount <= 0) {
      nextErrors.amount = "Số tiền phải lớn hơn 0.";
    }

    if (!form.categoryId) {
      nextErrors.categoryId = "Vui lòng chọn Category.";
    }

    if (!form.plannedDate) {
      nextErrors.plannedDate = "Vui lòng chọn Planned Date.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function submit() {
    if (!validate()) {
      setDialogMessage("Không thể lưu khoản chi. Vui lòng kiểm tra lại thông tin.");
      return;
    }

    const now = new Date().toISOString();
    const amount = parseCurrencyInput(form.amount);
    const shouldDowngradeCompleted =
      !expense &&
      form.status === "Completed" &&
      countCompletedExpensesCreatedThisWeek(userId) >= 2;
    const status = shouldDowngradeCompleted ? "Planned" : form.status;
    const plannedDate = new Date(form.plannedDate).toISOString();

    const nextExpense: Expense = {
      id: expense?.id ?? createId(),
      userId,
      amount,
      categoryId: form.categoryId,
      note: form.note.trim() || undefined,
      plannedDate,
      completedDate:
        status === "Completed"
          ? expense?.completedDate ?? new Date().toISOString()
          : undefined,
      status,
      createdAt: expense?.createdAt ?? now,
      updatedAt: now,
    };

    const overspend = checkDailyBudgetOverspend({
      userId,
      amount,
      effectiveDate: nextExpense.completedDate ?? nextExpense.plannedDate,
      excludeExpenseId: expense?.id,
      previousAmount: expense?.amount ?? 0,
    });

    if (overspend.exceeds) {
      setPendingOverspend({
        expense: nextExpense,
        currentDailyAverage: overspend.currentDailyAverage,
        newDailyAverage: overspend.newDailyAverage,
      });
      return;
    }

    onSubmit(nextExpense);
  }

  return (
    <div className="space-y-lg">
      <Input
        error={errors.amount}
        inputMode="numeric"
        label="Amount"
        leftAddon="VND"
        onChange={(event) => setForm({ ...form, amount: event.target.value })}
        placeholder="65000"
        value={form.amount}
      />
      <div>
  <p className="mb-3 text-sm font-semibold text-pace-text-primary">
    Category
  </p>

  <div className="grid grid-cols-4 gap-3">
    {categories.map((category) => {
      const isSelected = form.categoryId === category.id;

      return (
        <button
          className={`flex min-w-0 flex-col items-center justify-center rounded-2xl border-2 px-1 py-3 transition ${
            isSelected
              ? "border-pace-primary bg-blue-50"
              : "border-gray-200 bg-white"
          }`}
          key={category.id}
          onClick={() =>
            setForm({
              ...form,
              categoryId: category.id,
            })
          }
          type="button"
        >
          <Image
            alt={category.name}
            className="h-10 w-10 object-contain"
            height={40}
            src={
              categoryIconMap[category.name] ??
              "/assets/category/other.png"
            }
            width={40}
          />

          <span className="mt-2 w-full truncate text-center text-xs font-semibold text-pace-text-primary">
            {category.name}
          </span>
        </button>
      );
    })}
  </div>

  {errors.categoryId ? (
    <p className="mt-2 text-sm text-red-500">
      {errors.categoryId}
    </p>
  ) : null}
</div>
      <Input
        label="Note"
        onChange={(event) => setForm({ ...form, note: event.target.value })}
        placeholder="Lunch, coffee, bus pass..."
        value={form.note}
      />
      <Input
        error={errors.plannedDate}
        label="Planned Date"
        onChange={(event) => setForm({ ...form, plannedDate: event.target.value })}
        type="datetime-local"
        value={form.plannedDate}
      />
      <FormSelect
        label="Status"
        onChange={(status) =>
          setForm({ ...form, status: status as ExpenseStatus })
        }
        options={[
          { label: "Planned", value: "Planned" },
          { label: "Completed", value: "Completed" },
        ]}
        value={form.status}
      />
      <Button onClick={submit}>{expense ? "Save Expense" : "Add Expense"}</Button>
      <Button onClick={onCancel} variant="secondary">
        Cancel
      </Button>
      <ConfirmationDialog
        confirmLabel="Đã hiểu"
        isOpen={Boolean(dialogMessage)}
        message={dialogMessage}
        onCancel={() => setDialogMessage(null)}
        onConfirm={() => setDialogMessage(null)}
        title="Không thể lưu khoản chi"
      />
      <ConfirmationDialog
        cancelLabel="Quay lại chỉnh sửa"
        confirmLabel="Tiếp tục lưu"
        isOpen={Boolean(pendingOverspend)}
        message={
          pendingOverspend
            ? `Nếu bạn chi tiêu khoản này, ngân sách trung bình mỗi ngày sẽ giảm từ ${formatVnd(
                pendingOverspend.currentDailyAverage,
              )} xuống ${formatVnd(pendingOverspend.newDailyAverage)}.`
            : ""
        }
        onCancel={() => setPendingOverspend(null)}
        onConfirm={() => {
          if (pendingOverspend) {
            onSubmit(pendingOverspend.expense);
          }
          setPendingOverspend(null);
        }}
        title="Vượt ngân sách hôm nay"
      />
    </div>
  );
}

function ExpenseHistory({
  categories,
  expenses,
  onAdd,
  onOpen,
}: {
  categories: ExpenseCategory[];
  expenses: Expense[];
  onAdd: () => void;
  onOpen: (expense: Expense) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<"All" | ExpenseStatus>("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const filteredExpenses = expenses.filter(
    (expense) =>
      (statusFilter === "All" || expense.status === statusFilter) &&
      (categoryFilter === "All" || expense.categoryId === categoryFilter),
  );

  if (expenses.length === 0) {
    return (
      <EmptyState
        actionLabel="Add Expense"
        description="Bạn chưa ghi nhận khoản chi nào."
        illustrationSrc="/assets/illustrations/Emty_expense.png"
        onAction={onAdd}
        title="Expense History Empty"
      />
    );
  }

  return (
    <div className="space-y-lg">
      <div className="grid grid-cols-2 gap-md">
        <FormSelect
          label="Status"
          onChange={(value) => setStatusFilter(value as "All" | ExpenseStatus)}
          options={[
            { label: "All", value: "All" },
            { label: "Planned", value: "Planned" },
            { label: "Completed", value: "Completed" },
          ]}
          value={statusFilter}
        />
        <FormSelect
          label="Category"
          onChange={setCategoryFilter}
          options={[
            { label: "All", value: "All" },
            ...categories.map((category) => ({
              label: category.name,
              value: category.id,
            })),
          ]}
          value={categoryFilter}
        />
      </div>
      <div className="space-y-md">
        {filteredExpenses.map((expense) => (
          <ExpenseListCard
            category={findCategoryName(categories, expense.categoryId)}
            expense={expense}
            key={expense.id}
            onClick={() => onOpen(expense)}
          />
        ))}
      </div>
    </div>
  );
}

function ExpenseDetail({
  categories,
  expense,
  onDelete,
  onEdit,
  onMarkCompleted,
}: {
  categories: ExpenseCategory[];
  expense: Expense;
  onDelete: () => void;
  onEdit: () => void;
  onMarkCompleted: () => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const categoryName = findCategoryName(categories, expense.categoryId);

  return (
    <div className="space-y-lg">
      <Card>
        <p className="text-caption text-pace-text-secondary">{categoryName}</p>
        <h1 className="mt-xs text-h2">{formatVnd(expense.amount)}</h1>
        <div className="mt-lg space-y-sm text-body">
          <DetailRow label="Note" value={expense.note ?? "No note"} />
          <DetailRow label="Planned Date" value={formatDateTime(expense.plannedDate)} />
          {expense.completedDate ? (
            <DetailRow
              label="Completed Date"
              value={formatDateTime(expense.completedDate)}
            />
          ) : null}
          <DetailRow label="Status" value={expense.status} />
          <DetailRow label="Created At" value={formatDateTime(expense.createdAt)} />
          <DetailRow label="Updated At" value={formatDateTime(expense.updatedAt)} />
        </div>
      </Card>
      {expense.status === "Planned" ? (
        <Button onClick={onMarkCompleted}>Mark as Completed</Button>
      ) : null}
      <Button leadingIcon={<Edit aria-hidden className="size-5" />} onClick={onEdit} variant="secondary">
        Edit Expense
      </Button>
      <Button
        leadingIcon={<Trash2 aria-hidden className="size-5" />}
        onClick={() => setShowDeleteDialog(true)}
        variant="danger"
      >
        Delete Expense
      </Button>
      <ConfirmationDialog
        confirmLabel="Delete"
        confirmVariant="danger"
        isOpen={showDeleteDialog}
        message="This expense will be removed and related budget data will be recalculated."
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={onDelete}
        title="Delete Expense?"
      />
    </div>
  );
}

function ExpenseListCard({
  category,
  expense,
  onClick,
}: {
  category: string;
  expense: Expense;
  onClick: () => void;
}) {
  return (
    <Card as="article" className="cursor-pointer active:scale-[0.99]" onClick={onClick}>
      <div className="flex items-start justify-between gap-md">
        <div className="min-w-0">
          <p className="text-caption text-pace-text-secondary">{category}</p>
          <h2 className="truncate text-title">{expense.note ?? "Expense"}</h2>
          <p className="mt-xs text-caption text-pace-text-secondary">
            {formatDateTime(expense.plannedDate)}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-body font-semibold text-pace-danger">
            -{formatVnd(expense.amount)}
          </p>
          <p className="mt-xs text-caption text-pace-text-secondary">
            {expense.status}
          </p>
        </div>
      </div>
    </Card>
  );
}

function FormSelect({
  error,
  label,
  onChange,
  options,
  value,
}: {
  error?: string;
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
      {error ? <span className="mt-xs block text-caption text-pace-danger">{error}</span> : null}
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

function findCategoryName(categories: ExpenseCategory[], categoryId: string) {
  return categories.find((category) => category.id === categoryId)?.name ?? "Other";
}

function toDateTimeInputValue(dateValue: string) {
  return new Date(dateValue).toISOString().slice(0, 16);
}

function formatDateTime(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(dateValue));
}
