export type OnboardingStep = "welcome" | "financial" | "saving-goal" | "completed";

export type FinancialScenario = "first-day" | "mid-month";

export type FinancialSetupData = {
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
