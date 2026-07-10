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
  | "voucher-detail"
  | "my-voucher"
  | "reward-detail"
  | "pig-pig"
  | "pig-pig-history"
  | "notification"
  | "profile"
  | "saving-goal-list"
  | "saving-goal-detail"
  | "saving-goal-create"
  | "saving-goal-history"
  | "saving-goal-edit"
  | "expense-history"
  | "expense-detail"
  | "expense-edit";

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
