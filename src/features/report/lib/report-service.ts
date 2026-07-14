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
  color: string;
};

export type ReportWeeklyBreakdown = {
  label: string;
  totalSpending: number;
  color: string;
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
  weeklyBreakdown: ReportWeeklyBreakdown[];
};

// Bảng màu cố định cho Category Analysis (Pie Chart).
// Màu được gán theo vị trí Category trong danh sách mặc định của hệ thống,
// nên luôn nhất quán giữa các lần render / Time Filter / Category Filter.
const CATEGORY_COLOR_PALETTE = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFD166",
  "#6C5CE7",
  "#00B894",
  "#FD79A8",
  "#0984E3",
  "#E17055",
  "#00CEC9",
  "#B2BEC3",
];

// Bảng màu riêng cho Weekly Spending Comparison (Bar Chart),
// cố tình khác bảng màu Category để không gây nhầm lẫn giữa hai biểu đồ.
const WEEK_COLOR_PALETTE = ["#FF9F43", "#54A0FF", "#5F27CD", "#1DD1A1", "#EE5A6F", "#A29BFE"];

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
  const categoryColorMap = buildCategoryColorMap(categories);
  const range = getReportRange(period);
  const expenses = listUserExpenses(user.id)
    .filter((expense) => isExpenseInRange(expense, range.start, range.end))
    .filter((expense) => categoryId === "All" || expense.categoryId === categoryId);
  const totalSpending = expenses.reduce(
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
      expenses,
      totalSpending,
      categoryColorMap,
    ),
    recentExpenses: [...expenses]
      .sort((a, b) => getExpenseDisplayTime(b) - getExpenseDisplayTime(a))
      .slice(0, 3),
    weeklyBreakdown: buildWeeklyBreakdown(period, expenses, range.start, range.end),
  };
}

function buildCategoryColorMap(categories: ExpenseCategory[]) {
  const map = new Map<string, string>();
  categories.forEach((category, index) => {
    map.set(category.id, CATEGORY_COLOR_PALETTE[index % CATEGORY_COLOR_PALETTE.length]);
  });
  return map;
}

function buildCategorySummaries(
  categories: ExpenseCategory[],
  expenses: Expense[],
  totalSpending: number,
  categoryColorMap: Map<string, string>,
) {
  return categories
    .map((category) => {
      const categoryTotal = expenses
        .filter((expense) => expense.categoryId === category.id)
        .reduce((total, expense) => total + expense.amount, 0);
      return {
        category,
        totalSpending: categoryTotal,
        percentage:
          totalSpending > 0 ? Math.round((categoryTotal / totalSpending) * 100) : 0,
        color: categoryColorMap.get(category.id) ?? "#B2BEC3",
      };
    })
    .filter((summary) => summary.totalSpending > 0)
    .sort((a, b) => b.totalSpending - a.totalSpending);
}

function getMondayOffset(date: Date) {
  const day = date.getDay(); // 0 = Sunday .. 6 = Saturday
  return day === 0 ? 6 : day - 1; // Monday = 0
}

// Chia các Expense trong tháng đang chọn thành các tuần dương lịch (bắt đầu Thứ Hai),
// dùng cho Weekly Spending Comparison. Chỉ có dữ liệu khi period === "month".
function buildWeeklyBreakdown(
  period: ReportPeriod,
  expenses: Expense[],
  monthStart: Date,
  monthEnd: Date,
): ReportWeeklyBreakdown[] {
  if (period !== "month") {
    return [];
  }
  const offset = getMondayOffset(monthStart);
  const daysInMonth = monthEnd.getDate();
  const weekCount = Math.ceil((daysInMonth + offset) / 7);
  const totals = new Array(weekCount).fill(0) as number[];
  expenses.forEach((expense) => {
    const date = new Date(expense.completedDate ?? expense.plannedDate);
    const weekIndex = Math.floor((date.getDate() - 1 + offset) / 7);
    if (weekIndex >= 0 && weekIndex < totals.length) {
      totals[weekIndex] += expense.amount;
    }
  });
  return totals.map((totalSpending, index) => ({
    label: `Tuần ${index + 1}`,
    totalSpending,
    color: WEEK_COLOR_PALETTE[index % WEEK_COLOR_PALETTE.length],
  }));
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
