import { AppError } from "@/lib/errors";
import type {
  Budget,
  Expense,
  PigCoinWallet,
  SavingGoal,
  User,
  Voucher,
} from "@/types/finance";

export function assertPositiveAmount(amount: number, fieldName: string): void {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      `${fieldName} must be greater than 0.`,
      { context: { fieldName, amount } },
    );
  }
}

export function assertExpenseIsValid(expense: Expense): void {
  assertPositiveAmount(expense.amount, "Expense amount");

  if (!expense.categoryId) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Expense must belong to exactly one category.",
      { context: { rule: "EXP-002", expenseId: expense.id } },
    );
  }

  if (expense.status === "Completed" && !expense.completedDate) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Completed expense must include a completed date.",
      { context: { rule: "EXP-003", expenseId: expense.id } },
    );
  }
}

export function assertBudgetIsValid(budget: Budget): void {
  if (budget.budgetResetDay < 1 || budget.budgetResetDay > 31) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Budget reset day must be between 1 and 31.",
      { context: { budgetResetDay: budget.budgetResetDay } },
    );
  }

  if (budget.monthlyBudget !== budget.monthlyIncome - budget.fixedExpenses) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Monthly budget must equal monthly income minus fixed expenses.",
      { context: { rule: "Budget monthlyBudget calculation" } },
    );
  }
}

export function assertSavingGoalCanBeCreated(
  user: User,
  currentSavingGoals: SavingGoal[],
): void {
  if (user.plan === "Premium") {
    return;
  }

  const activeGoalCount = currentSavingGoals.filter((goal) =>
    ["Active", "Cancelling"].includes(goal.status),
  ).length;

  if (activeGoalCount >= 2) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Free users can only have two active saving goals.",
      { context: { rule: "SVG-001", userId: user.id, activeGoalCount } },
    );
  }
}

export function assertSavingGoalIsValid(
  savingGoal: SavingGoal,
  now: Date = new Date(),
): void {
  if (!savingGoal.name.trim()) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Saving goal name is required.",
      { context: { rule: "SVG-002", savingGoalId: savingGoal.id } },
    );
  }

  assertPositiveAmount(savingGoal.targetAmount, "Saving goal target amount");

  if (new Date(savingGoal.targetDate).getTime() <= now.getTime()) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Saving goal target date must be in the future.",
      { context: { rule: "SVG-002", savingGoalId: savingGoal.id } },
    );
  }
}

export function assertSavingGoalCanDeposit(
  savingGoal: SavingGoal,
  budget: Budget,
  amount: number,
): void {
  assertPositiveAmount(amount, "Deposit amount");

  if (savingGoal.status !== "Active") {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Deposit is only allowed for active saving goals.",
      { context: { rule: "SVG-003", savingGoalId: savingGoal.id } },
    );
  }

  if (budget.remainingBudget < amount) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Remaining budget is not enough for this deposit.",
      { context: { rule: "SVG-003", budgetId: budget.id, amount } },
    );
  }
}

export function assertPigCoinWalletIsValid(wallet: PigCoinWallet): void {
  if (wallet.balance < 0 || wallet.totalEarned < 0 || wallet.totalSpent < 0) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Pig Coin values cannot be negative.",
      { context: { walletId: wallet.id } },
    );
  }
}

export function assertVoucherCanBeRedeemed(
  voucher: Voucher,
  wallet: PigCoinWallet,
): void {
  if (voucher.status !== "Active" || voucher.quantity <= 0) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Voucher is not available for redemption.",
      { context: { rule: "RWD-002", voucherId: voucher.id } },
    );
  }

  if (wallet.balance < voucher.pigCoinCost) {
    throw new AppError(
      "BUSINESS_RULE_VIOLATION",
      "Pig Coin balance is not enough to redeem this voucher.",
      { context: { rule: "RWD-002", voucherId: voucher.id, walletId: wallet.id } },
    );
  }
}
