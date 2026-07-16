import {
  ensureDefaultExpenseCategories,
  getCurrentBudget,
  getCurrentUser,
  listUserExpenses,
} from "@/features/finance/lib/finance-service";
import type {
  Budget,
  Expense,
  ExpenseCategory,
  PigPigInsightType,
  User,
} from "@/types/finance";

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

// Pig Pig Insight của Report là derived data, tính runtime (rule-based, không AI/LLM),
// khác với PigPigInsight lưu trữ dùng cho Dashboard — xem feature-specs/25_REPORT.md Section 8.
export type ReportInsight = {
  title: string;
  content: string;
  insightType: PigPigInsightType;
  hasOverspendDay: boolean;
  overspendDayCount: number;
  dominantCategoryId?: string;
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
  insight?: ReportInsight;
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
  const categorySummaries = buildCategorySummaries(
    categories,
    expenses,
    totalSpending,
    categoryColorMap,
  );
  return {
    user,
    budget,
    categories,
    expenses,
    totalBudget,
    totalSpending,
    remainingBudget,
    budgetUsage,
    categorySummaries,
    recentExpenses: [...expenses]
      .sort((a, b) => getExpenseDisplayTime(b) - getExpenseDisplayTime(a))
      .slice(0, 3),
    weeklyBreakdown: buildWeeklyBreakdown(period, expenses, range.start, range.end),
    insight:
      expenses.length === 0
        ? undefined
        : buildReportInsight({
            categoryId,
            categorySummaries,
            expenses,
            period,
            range,
            totalBudget,
          }),
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

// Số ngày trong kỳ đang chọn, dùng để tính mức chi tiêu bình quân cho phép mỗi ngày.
function getDaysInPeriod(period: ReportPeriod, start: Date, end: Date) {
  if (period === "week") {
    return 7;
  }
  return end.getDate();
}

// Overspend Day: một ngày được tính là Overspend Day nếu tổng Expense phát sinh
// trong ngày đó vượt quá mức chi tiêu bình quân cho phép mỗi ngày
// (Total Budget của kỳ ÷ số ngày trong kỳ) — feature-specs/25_REPORT.md Section 8.
function countOverspendDays(
  expenses: Expense[],
  averagePerDay: number,
): number {
  if (averagePerDay <= 0) {
    return 0;
  }
  const totalsByDay = new Map<string, number>();
  expenses.forEach((expense) => {
    const dateKey = new Date(expense.completedDate ?? expense.plannedDate)
      .toISOString()
      .slice(0, 10);
    totalsByDay.set(dateKey, (totalsByDay.get(dateKey) ?? 0) + expense.amount);
  });
  let overspendDays = 0;
  totalsByDay.forEach((dayTotal) => {
    if (dayTotal > averagePerDay) {
      overspendDays += 1;
    }
  });
  return overspendDays;
}

// Dominant Category: Category có Spending Percentage cao nhất trong kỳ,
// được coi là "chi tiêu lố" nếu Spending Percentage > 50% tổng chi tiêu.
// Không áp dụng khi đang lọc theo một Category cụ thể (đã chỉ còn 1 Category).
function findDominantCategory(
  categorySummaries: ReportCategorySummary[],
  categoryId: string,
) {
  if (categoryId !== "All") {
    return undefined;
  }
  const [top] = categorySummaries;
  if (top && top.percentage > 50) {
    return top;
  }
  return undefined;
}

function buildReportInsight({
  categoryId,
  categorySummaries,
  expenses,
  period,
  range,
  totalBudget,
}: {
  categoryId: string;
  categorySummaries: ReportCategorySummary[];
  expenses: Expense[];
  period: ReportPeriod;
  range: { start: Date; end: Date };
  totalBudget: number;
}): ReportInsight {
  const daysInPeriod = getDaysInPeriod(period, range.start, range.end);
  const averagePerDay = daysInPeriod > 0 ? totalBudget / daysInPeriod : 0;
  const overspendDayCount = countOverspendDays(expenses, averagePerDay);
  const hasOverspendDay = overspendDayCount > 0;
  const dominantCategory = findDominantCategory(categorySummaries, categoryId);

  const periodLabelUpper = period === "week" ? "Tuần" : "Tháng";
  const periodLabelLower = period === "week" ? "tuần" : "tháng";
  const title = period === "week" ? "Weekly Insight" : "Monthly Insight";

  let content: string;
  let insightType: PigPigInsightType;

  if (hasOverspendDay && dominantCategory) {
    content = `${periodLabelUpper} vừa rồi bạn đã chi tiêu lố ngân sách ${overspendDayCount} hôm và chi ${dominantCategory.percentage}% cho ${dominantCategory.category.name}, hãy cố gắng chi tiêu hợp lý hơn trong ${periodLabelLower} tới bạn nhé!`;
    insightType = "Warning";
  } else if (hasOverspendDay) {
    content = `${periodLabelUpper} vừa rồi bạn đã chi tiêu lố ngân sách ${overspendDayCount} hôm, hãy cố gắng cân đối chi tiêu hơn trong ${periodLabelLower} tới bạn nhé!`;
    insightType = "Warning";
  } else if (dominantCategory) {
    content = `${periodLabelUpper} vừa rồi bạn đã chi ${dominantCategory.percentage}% cho ${dominantCategory.category.name}, hãy thử cân đối chi tiêu sang các khoản khác trong ${periodLabelLower} tới bạn nhé!`;
    insightType = "Recommendation";
  } else {
    content = `${periodLabelUpper} vừa rồi bạn đã chi tiêu khá hợp lý, tiếp tục duy trì phong độ này nhé!`;
    insightType = "Achievement";
  }

  return {
    content,
    dominantCategoryId: dominantCategory?.category.id,
    hasOverspendDay,
    insightType,
    overspendDayCount,
    title,
  };
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
