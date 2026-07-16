import { getTodayBudgetBreakdown } from "@/features/finance/lib/finance-service";
import {
  getRemainingDaysInCycle,
} from "@/lib/finance/amount";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";
import type { BudgetStreak, Expense, PigPigInsight } from "@/types/finance";
import type { DashboardViewModel } from "@/features/dashboard/types";

function isThisWeek(dateValue: string, now = new Date()) {
  const date = new Date(dateValue);
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return date >= startOfWeek && date < endOfWeek;
}

function getExpenseDisplayDate(expense: Expense) {
  return expense.completedDate ?? expense.plannedDate;
}

function getLatestInsight(insights: PigPigInsight[]) {
  return [...insights].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];
}

function createFallbackBudgetStreak(userId: string): BudgetStreak {
  const timestamp = new Date().toISOString();

  return {
    id: "dashboard-fallback-streak",
    userId,
    currentStreak: 0,
    noExpenseDays: 0,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function loadDashboardViewModel(): DashboardViewModel | null {
  const user = paceLocalDataSource
    .users
    .list()
    .find((item) => item.onboardingCompleted);

  if (!user) {
    return null;
  }

  const budget = paceLocalDataSource
    .budgets
    .list()
    .find((item) => item.userId === user.id);

  if (!budget) {
    return null;
  }

  const expenses = paceLocalDataSource
    .expenses
    .list()
    .filter((expense) => expense.userId === user.id);
  const activeSavingGoals = paceLocalDataSource
    .savingGoals
    .list()
    .filter(
      (goal) =>
        goal.userId === user.id &&
        (goal.status === "Active" || goal.status === "Cancelling"),
    )
    .slice(0, 2);
  const budgetStreak =
    paceLocalDataSource
      .budgetStreaks
      .list()
      .find((streak) => streak.userId === user.id) ??
    createFallbackBudgetStreak(user.id);
  const latestInsight = getLatestInsight(
    paceLocalDataSource
      .pigPigInsights
      .list()
      .filter((insight) => insight.userId === user.id),
  );
  const unreadNotificationCount = paceLocalDataSource
    .notifications
    .list()
    .filter((notification) => notification.userId === user.id && !notification.isRead)
    .length;
  const weeklyExpenses = expenses.filter((expense) =>
    isThisWeek(getExpenseDisplayDate(expense)),
  );
  const weeklySpending = weeklyExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  const weeklyBudget = budget.remainingDailyBudget * Math.min(
    7,
    getRemainingDaysInCycle(budget.budgetResetDay, new Date()),
  );
  const weeklyBudgetUsage =
    weeklyBudget > 0 ? Math.round((weeklySpending / weeklyBudget) * 100) : 0;

  const now = new Date();
  // "Dự kiến hết trong XX ngày" (specs/17_UI_LAYOUT.md, DELTA-009): XX = số
  // ngày CÒN LẠI của chu kỳ Budget hiện tại, tính từ hôm nay tới trước lần
  // Budget Reset Day kế tiếp. Trước đây (DELTA-007) dùng getCycleLengthDays,
  // tức tổng độ dài cả chu kỳ (hằng số 28-31 ngày, không phụ thuộc ngày hôm
  // nay) — gây ra lỗi luôn hiển thị cùng một số ngày bất kể Budget Reset Day
  // là bao nhiêu. Dùng chung công thức với baseline "Số tiền được tiêu hôm
  // nay" bên dưới.
  const projectedDaysLeft = getRemainingDaysInCycle(budget.budgetResetDay, now);

  // Today's allowance is derived from the shared getTodayBudgetBreakdown
  // helper so the Dashboard display always matches the EXP-007 overspend
  // check used on the Add/Edit Expense screen.
  const { todayBudgetBaseline, todayRemainingBudget } = getTodayBudgetBreakdown(
    user.id,
  );

  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(getExpenseDisplayDate(b)).getTime() -
        new Date(getExpenseDisplayDate(a)).getTime(),
    )
    .slice(0, 3);

  return {
    user,
    budget,
    activeSavingGoals,
    budgetStreak,
    weeklySpending,
    weeklyBudget,
    weeklyBudgetUsage,
    projectedDaysLeft,
    todayBudgetBaseline,
    todayRemainingBudget,
    recentExpenses,
    latestInsight,
    unreadNotificationCount,
  };
}
