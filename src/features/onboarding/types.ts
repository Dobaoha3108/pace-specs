export type OnboardingStep = "welcome" | "financial" | "saving-goal" | "completed";

export type FinancialSetupData = {
  budgetResetDay: number;
  monthlyIncome: number;
  fixedExpenses: number;
  remainingBudget: number;
  monthlyBudget: number;
};

export type SavingGoalSetupData = {
  name: string;
  targetAmount: number;
  targetDate: string;
  savingMode: "Flexible" | "Commitment";
};
