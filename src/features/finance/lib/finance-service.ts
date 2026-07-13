import { getRemainingDaysInMonth } from "@/lib/finance/amount";
import { createId } from "@/lib/id";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";
import type {
  Budget,
  Expense,
  ExpenseCategory,
  ExpenseCategoryName,
  Notification,
  PigPigInsight,
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

  const expenseTotal = paceLocalDataSource
    .expenses
    .list()
    .filter((expense) => expense.userId === userId)
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
    budget.monthlyBudget - expenseTotal - reservedSavingTotal,
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

function getTodayKey(now: Date) {
  return now.toISOString().slice(0, 10);
}

function getExpenseDayKey(expense: Expense) {
  return new Date(expense.completedDate ?? expense.plannedDate)
    .toISOString()
    .slice(0, 10);
}

export function getTodaysExpenseTotal(
  userId: string,
  options?: { excludeExpenseId?: string },
) {
  const todayKey = getTodayKey(new Date());

  return paceLocalDataSource
    .expenses
    .list()
    .filter(
      (expense) =>
        expense.userId === userId &&
        expense.id !== options?.excludeExpenseId &&
        getExpenseDayKey(expense) === todayKey,
    )
    .reduce((total, expense) => total + expense.amount, 0);
}

export function getTodayBudgetBreakdown(
  userId: string,
  options?: { excludeExpenseId?: string },
): {
  todayBudgetBaseline: number;
  todayRemainingBudget: number;
  todaysExpenseTotal: number;
} {
  const budget = getCurrentBudget(userId);

  if (!budget) {
    return { todayBudgetBaseline: 0, todayRemainingBudget: 0, todaysExpenseTotal: 0 };
  }

  const todaysExpenseTotal = getTodaysExpenseTotal(userId, options);
  const daysLeftInCycle = getRemainingDaysInMonth(new Date());
  // Baseline is derived as if today's expenses hadn't happened yet, so it
  // stays fixed for the day while remainingBudget (and thus this baseline's
  // numerator) only moves once the day rolls over.
  const todayBudgetBaseline =
    (budget.remainingBudget + todaysExpenseTotal) / daysLeftInCycle;
  const todayRemainingBudget = Math.max(
    0,
    todayBudgetBaseline - todaysExpenseTotal,
  );

  return { todayBudgetBaseline, todayRemainingBudget, todaysExpenseTotal };
}

export function checkDailyBudgetOverspend({
  amount,
  effectiveDate,
  excludeExpenseId,
  previousAmount = 0,
  userId,
}: {
  userId: string;
  amount: number;
  effectiveDate: string;
  excludeExpenseId?: string;
  /** Amount of the expense being edited, before this save (0 when creating). */
  previousAmount?: number;
}): {
  exceeds: boolean;
  currentDailyAverage: number;
  newDailyAverage: number;
} {
  const todayKey = getTodayKey(new Date());
  const effectiveDateKey = new Date(effectiveDate).toISOString().slice(0, 10);
  const budget = getCurrentBudget(userId);

  if (!budget || effectiveDateKey !== todayKey) {
    return { exceeds: false, currentDailyAverage: 0, newDailyAverage: 0 };
  }

  const { todayBudgetBaseline, todaysExpenseTotal } = getTodayBudgetBreakdown(
    userId,
    { excludeExpenseId },
  );
  const projectedTodayTotal = todaysExpenseTotal + amount;
  const exceeds = projectedTodayTotal > todayBudgetBaseline;

  const daysLeftInCycle = getRemainingDaysInMonth(new Date());
  const currentDailyAverage = budget.remainingBudget / daysLeftInCycle;
  const projectedRemainingBudget = Math.max(
    0,
    budget.remainingBudget - amount + previousAmount,
  );
  const newDailyAverage = projectedRemainingBudget / daysLeftInCycle;

  return { exceeds, currentDailyAverage, newDailyAverage };
}

export function saveExpense(expense: Expense) {
  paceLocalDataSource.expenses.upsert(expense);
  synchronizeFinancialState(expense.userId, "Expense");
}

export function deleteExpense(expense: Expense) {
  paceLocalDataSource.expenses.remove(expense.id);
  synchronizeFinancialState(expense.userId, "Expense");
}

export function saveGoal(goal: SavingGoal) {
  const previousGoal = paceLocalDataSource.savingGoals.findById(goal.id);

  paceLocalDataSource.savingGoals.upsert(goal);
  synchronizeFinancialState(goal.userId, "SavingGoal", {
    previousGoal,
    savingGoal: goal,
  });
}

export function synchronizeFinancialState(
  userId: string,
  source: "Expense" | "SavingGoal" | "Budget" = "Budget",
  context?: {
    previousGoal?: SavingGoal;
    savingGoal?: SavingGoal;
  },
) {
  const budget = recalculateBudget(userId);

  evaluateBudgetStreak(userId, budget);
  generatePigPigInsight(userId, budget, source);

  if (context?.savingGoal) {
    generateSavingGoalNotifications(
      userId,
      context.savingGoal,
      context.previousGoal,
    );
  }

  return budget;
}

function evaluateBudgetStreak(userId: string, budget: Budget) {
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const todaysExpenseTotal = paceLocalDataSource
    .expenses
    .list()
    .filter((expense) => {
      const expenseDate = new Date(expense.completedDate ?? expense.plannedDate)
        .toISOString()
        .slice(0, 10);

      return expense.userId === userId && expenseDate === todayKey;
    })
    .reduce((total, expense) => total + expense.amount, 0);
  const existingStreak = paceLocalDataSource
    .budgetStreaks
    .list()
    .find((streak) => streak.userId === userId);
  const now = new Date().toISOString();
  const currentStreak = existingStreak ?? {
    id: createId(),
    userId,
    currentStreak: 0,
    noExpenseDays: 0,
    createdAt: now,
    updatedAt: now,
  };
  const alreadyQualifiedToday = currentStreak.lastQualifiedDate === todayKey;
  const nextStreak =
    todaysExpenseTotal > 0 && todaysExpenseTotal <= budget.remainingDailyBudget
      ? {
          ...currentStreak,
          currentStreak: alreadyQualifiedToday
            ? currentStreak.currentStreak
            : currentStreak.currentStreak + 1,
          noExpenseDays: 0,
          lastQualifiedDate: todayKey,
          updatedAt: now,
        }
      : todaysExpenseTotal > budget.remainingDailyBudget
        ? {
            ...currentStreak,
            currentStreak: 0,
            noExpenseDays: 0,
            updatedAt: now,
          }
        : currentStreak;

  paceLocalDataSource.budgetStreaks.upsert(nextStreak);
}

function generatePigPigInsight(
  userId: string,
  budget: Budget,
  source: PigPigInsight["source"] = "Budget",
) {
  const latestInsight = paceLocalDataSource
    .pigPigInsights
    .list()
    .filter((insight) => insight.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
  const insightType = budget.remainingDailyBudget <= 0 ? "Warning" : "Information";
  const content =
    budget.remainingDailyBudget <= 0
      ? "Remaining Daily Budget is at or below zero. Consider slowing down new spending today."
      : `Remaining Daily Budget is ${Math.round(budget.remainingDailyBudget).toLocaleString("vi-VN")} VND.`;

  if (
    latestInsight?.content === content &&
    latestInsight?.insightType === insightType
  ) {
    return;
  }

  const insight: PigPigInsight = {
    id: createId(),
    userId,
    title:
      insightType === "Warning"
        ? "Pig Pig Budget Warning"
        : "Pig Pig Budget Update",
    content,
    insightType,
    source,
    createdAt: new Date().toISOString(),
  };

  paceLocalDataSource.pigPigInsights.upsert(insight);
}

function generateSavingGoalNotifications(
  userId: string,
  savingGoal: SavingGoal,
  previousGoal?: SavingGoal,
) {
  const previousProgress = previousGoal ? getSavingGoalProgress(previousGoal) : 0;
  const currentProgress = getSavingGoalProgress(savingGoal);

  [25, 50, 75].forEach((milestone) => {
    if (previousProgress < milestone && currentProgress >= milestone) {
      createNotificationOnce({
        userId,
        title: `Saving Goal reached ${milestone}%`,
        message: `${savingGoal.name} has reached ${milestone}% of its target.`,
        type: "SavingGoal",
        deepLinkTarget: "saving-goal-detail",
        relatedEntityId: savingGoal.id,
      });
    }
  });

  if (previousGoal?.status !== "Completed" && savingGoal.status === "Completed") {
    createNotificationOnce({
      userId,
      title: "Saving Goal completed",
      message: `You completed Saving Goal "${savingGoal.name}".`,
      type: "SavingGoal",
      deepLinkTarget: "saving-goal-detail",
      relatedEntityId: savingGoal.id,
    });
  }

  if (previousGoal?.status !== "Cancelling" && savingGoal.status === "Cancelling") {
    createNotificationOnce({
      userId,
      title: "Saving Goal cancellation requested",
      message: `${savingGoal.name} is now in a 12-hour cancelling period.`,
      type: "SavingGoal",
      deepLinkTarget: "saving-goal-detail",
      relatedEntityId: savingGoal.id,
    });
  }

  if (previousGoal?.status !== "Cancelled" && savingGoal.status === "Cancelled") {
    createNotificationOnce({
      userId,
      title: "Saving Goal cancelled",
      message: `${savingGoal.name} has been cancelled and remaining saved money is back in your budget.`,
      type: "SavingGoal",
      deepLinkTarget: "saving-goal-history",
      relatedEntityId: savingGoal.id,
    });
  }
}

function getSavingGoalProgress(goal: SavingGoal) {
  if (goal.targetAmount <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
}

function createNotificationOnce({
  deepLinkTarget,
  message,
  relatedEntityId,
  title,
  type,
  userId,
}: {
  deepLinkTarget?: string;
  message: string;
  relatedEntityId?: string;
  title: string;
  type: Notification["type"];
  userId: string;
}) {
  const exists = paceLocalDataSource
    .notifications
    .list()
    .some(
      (notification) =>
        notification.userId === userId &&
        notification.relatedEntityId === relatedEntityId &&
        notification.message === message,
    );

  if (exists) {
    return;
  }

  paceLocalDataSource.notifications.upsert({
    id: createId(),
    userId,
    title,
    message,
    type,
    deepLinkTarget,
    relatedEntityId,
    isRead: false,
    createdAt: new Date().toISOString(),
  });
}
