import { getRemainingDaysInMonth } from "@/lib/finance/amount";
import { createId } from "@/lib/id";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";
import type {
  Budget,
  Expense,
  ExpenseCategory,
  ExpenseCategoryName,
  SavingGoal,
  User,
} from "@/types/finance";

const defaultCategoryNames: ExpenseCategoryName[] = [
  "Food",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Education",
  "Health",
  "Bills",
  "Other",
];

export function getCurrentUser(): User | undefined {
  return paceLocalDataSource
    .users
    .list()
    .find((user) => user.onboardingCompleted);
}

export function getCurrentBudget(userId: string): Budget | undefined {
  return paceLocalDataSource
    .budgets
    .list()
    .find((budget) => budget.userId === userId);
}

export function ensureDefaultExpenseCategories(): ExpenseCategory[] {
  const existingCategories = paceLocalDataSource.expenseCategories.list();

  if (existingCategories.length > 0) {
    return existingCategories;
  }

  const categories = defaultCategoryNames.map((name) => ({
    id: createId(),
    name,
    isDefault: true,
  }));

  paceLocalDataSource.expenseCategories.replaceAll(categories);
  return categories;
}

export function recalculateBudget(userId: string): Budget {
  const budget = getCurrentBudget(userId);

  if (!budget) {
    throw new Error("Budget is required.");
  }

  const completedExpenseTotal = paceLocalDataSource
    .expenses
    .list()
    .filter((expense) => expense.userId === userId && expense.status === "Completed")
    .reduce((total, expense) => total + expense.amount, 0);
  const reservedSavingTotal = paceLocalDataSource
    .savingGoals
    .list()
    .filter(
      (goal) =>
        goal.userId === userId &&
        goal.status !== "Cancelled" &&
        goal.currentAmount > 0,
    )
    .reduce((total, goal) => total + goal.currentAmount, 0);
  const remainingBudget = Math.max(
    0,
    budget.monthlyBudget - completedExpenseTotal - reservedSavingTotal,
  );
  const updatedBudget = {
    ...budget,
    remainingBudget,
    remainingDailyBudget: remainingBudget / getRemainingDaysInMonth(new Date()),
    updatedAt: new Date().toISOString(),
  };

  paceLocalDataSource.budgets.upsert(updatedBudget);
  return updatedBudget;
}

export function listUserExpenses(userId: string) {
  return paceLocalDataSource
    .expenses
    .list()
    .filter((expense) => expense.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.plannedDate).getTime() - new Date(a.plannedDate).getTime(),
    );
}

export function listUserSavingGoals(userId: string) {
  return paceLocalDataSource
    .savingGoals
    .list()
    .filter((goal) => goal.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function countCompletedExpensesCreatedThisWeek(userId: string) {
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  return paceLocalDataSource
    .expenses
    .list()
    .filter((expense) => {
      const createdAt = new Date(expense.createdAt);

      return (
        expense.userId === userId &&
        expense.status === "Completed" &&
        createdAt >= startOfWeek
      );
    }).length;
}

export function saveExpense(expense: Expense) {
  paceLocalDataSource.expenses.upsert(expense);
  recalculateBudget(expense.userId);
}

export function deleteExpense(expense: Expense) {
  paceLocalDataSource.expenses.remove(expense.id);
  recalculateBudget(expense.userId);
}

export function saveGoal(goal: SavingGoal) {
  paceLocalDataSource.savingGoals.upsert(goal);
  recalculateBudget(goal.userId);
}
