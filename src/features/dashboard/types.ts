import type {
  Budget,
  BudgetStreak,
  Expense,
  PigPigInsight,
  SavingGoal,
  User,
} from "@/types/finance";

export type DashboardNavigationTarget =
  | "dashboard"
  | "report"
  | "add-expense"
  | "reward"
  | "pig-pig"
  | "notification"
  | "profile"
  | "saving-goal-list"
  | "saving-goal-detail"
  | "saving-goal-create"
  | "expense-history"
  | "expense-detail";

export type DashboardViewModel = {
  user: User;
  budget: Budget;
  activeSavingGoals: SavingGoal[];
  budgetStreak: BudgetStreak;
  weeklySpending: number;
  weeklyBudget: number;
  weeklyBudgetUsage: number;
  recentExpenses: Expense[];
  latestInsight?: PigPigInsight;
  unreadNotificationCount: number;
};
