import {
  ensureDefaultExpenseCategories,
  getCurrentBudget,
  getCurrentUser,
  listUserExpenses,
} from "@/features/finance/lib/finance-service";
import type { Budget, Expense, ExpenseCategory, User } from "@/types/finance";

export type ReportPeriod = "week" | "month";

export type ReportCategorySummary = {
  category: ExpenseCategory;
  totalSpending: number;
  percentage: number;
};

export type ReportViewModel = {
  user: User;
  budget: Budget;
  categories: ExpenseCategory[];
  expenses: Expense[];
  totalBudget: number;
  totalSpending: number;
  remainingBudget: number;
  budgetUsage: number;
  categorySummaries: ReportCategorySummary[];
  recentExpenses: Expense[];
};

export function loadReportViewModel(
  period: ReportPeriod,
  categoryId = "All",
): ReportViewModel | undefined {
  const user = getCurrentUser();

  if (!user) {
    return undefined;
  }

  const budget = getCurrentBudget(user.id);

  if (!budget) {
    return undefined;
  }

  const categories = ensureDefaultExpenseCategories();
  const range = getReportRange(period);
  const expenses = listUserExpenses(user.id)
    .filter((expense) => isExpenseInRange(expense, range.start, range.end))
    .filter((expense) => categoryId === "All" || expense.categoryId === categoryId);
  const completedExpenses = expenses.filter(
    (expense) => expense.status === "Completed",
  );
  const totalSpending = completedExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  const totalBudget =
    period === "week" ? Math.round(budget.monthlyBudget / 4) : budget.monthlyBudget;
  const remainingBudget = Math.max(0, totalBudget - totalSpending);
  const budgetUsage =
    totalBudget > 0 ? Math.min(999, Math.round((totalSpending / totalBudget) * 100)) : 0;

  return {
    user,
    budget,
    categories,
    expenses,
    totalBudget,
    totalSpending,
    remainingBudget,
    budgetUsage,
    categorySummaries: buildCategorySummaries(
      categories,
      completedExpenses,
      totalSpending,
    ),
    recentExpenses: [...expenses]
      .sort((a, b) => getExpenseDisplayTime(b) - getExpenseDisplayTime(a))
      .slice(0, 3),
  };
}

function buildCategorySummaries(
  categories: ExpenseCategory[],
  completedExpenses: Expense[],
  totalSpending: number,
) {
  return categories
    .map((category) => {
      const categoryTotal = completedExpenses
        .filter((expense) => expense.categoryId === category.id)
        .reduce((total, expense) => total + expense.amount, 0);

      return {
        category,
        totalSpending: categoryTotal,
        percentage:
          totalSpending > 0 ? Math.round((categoryTotal / totalSpending) * 100) : 0,
      };
    })
    .filter((summary) => summary.totalSpending > 0)
    .sort((a, b) => b.totalSpending - a.totalSpending);
}

function getReportRange(period: ReportPeriod) {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (period === "week") {
    const day = start.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diffToMonday);
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  end.setMonth(start.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

function isExpenseInRange(expense: Expense, start: Date, end: Date) {
  const expenseTime = getExpenseDisplayTime(expense);

  return expenseTime >= start.getTime() && expenseTime <= end.getTime();
}

function getExpenseDisplayTime(expense: Expense) {
  return new Date(expense.completedDate ?? expense.plannedDate).getTime();
}
