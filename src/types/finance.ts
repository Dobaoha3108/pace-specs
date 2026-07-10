export type UUID = string;
export type ISODate = string;
export type ISODateTime = string;
export type Currency = number;

export type UserPlan = "Free" | "Premium";

export interface User {
  id: UUID;
  displayName: string;
  avatar?: string;
  onboardingCompleted: boolean;
  plan: UserPlan;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export type BudgetCycle = "Monthly";

export interface Budget {
  id: UUID;
  userId: UUID;
  monthlyIncome: Currency;
  fixedExpenses: Currency;
  monthlyBudget: Currency;
  remainingBudget: Currency;
  remainingDailyBudget: Currency;
  budgetResetDay: number;
  cycle: BudgetCycle;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export type ExpenseStatus = "Planned" | "Completed";

export interface Expense {
  id: UUID;
  userId: UUID;
  categoryId: UUID;
  amount: Currency;
  note?: string;
  plannedDate: ISODateTime;
  completedDate?: ISODateTime;
  status: ExpenseStatus;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export type ExpenseCategoryName =
  | "Food"
  | "Transportation"
  | "Shopping"
  | "Entertainment"
  | "Education"
  | "Health"
  | "Bills"
  | "Other";

export interface ExpenseCategory {
  id: UUID;
  name: ExpenseCategoryName | string;
  icon?: string;
  color?: string;
  isDefault: boolean;
}

export type SavingMode = "Flexible" | "Commitment";
export type SavingGoalStatus =
  | "Active"
  | "Cancelling"
  | "Completed"
  | "Cancelled";

export interface SavingGoal {
  id: UUID;
  userId: UUID;
  name: string;
  targetAmount: Currency;
  currentAmount: Currency;
  targetDate: ISODateTime;
  savingMode: SavingMode;
  status: SavingGoalStatus;
  cancelRequestedAt?: ISODateTime;
  cancelAvailableAt?: ISODateTime;
  withdrawRequestedAmount?: Currency;
  withdrawRequestedAt?: ISODateTime;
  withdrawAvailableAt?: ISODateTime;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface BudgetStreak {
  id: UUID;
  userId: UUID;
  currentStreak: number;
  noExpenseDays: number;
  lastQualifiedDate?: ISODate;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface PigCoinWallet {
  id: UUID;
  userId: UUID;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export type VoucherStatus = "Active" | "OutOfStock" | "Expired";

export interface Voucher {
  id: UUID;
  brandName: string;
  brandLogo?: string;
  title: string;
  description?: string;
  pigCoinCost: number;
  expiredDate: ISODate;
  status: VoucherStatus;
  quantity: number;
  imageUrl?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export type UserRewardStatus = "Available" | "Used" | "Expired";

export interface UserReward {
  id: UUID;
  userId: UUID;
  voucherId: UUID;
  voucherCode: string;
  qrCodeValue?: string;
  barcodeValue?: string;
  status: UserRewardStatus;
  redeemedAt: ISODateTime;
  usedAt?: ISODateTime;
  expiredAt?: ISODate;
}

export type NotificationType =
  | "Budget"
  | "Expense"
  | "SavingGoal"
  | "Voucher"
  | "PigPig"
  | "Report"
  | "System";

export interface Notification {
  id: UUID;
  userId: UUID;
  title: string;
  message: string;
  type: NotificationType;
  deepLinkTarget?: string;
  relatedEntityId?: UUID;
  isRead: boolean;
  scheduledAt?: ISODateTime;
  createdAt: ISODateTime;
}

export type PigPigInsightType =
  | "Information"
  | "Recommendation"
  | "Warning"
  | "Achievement";

export type PigPigInsightSource =
  | "Budget"
  | "Expense"
  | "SavingGoal"
  | "Report"
  | "BudgetStreak";

export interface PigPigInsight {
  id: UUID;
  userId: UUID;
  title: string;
  content: string;
  insightType: PigPigInsightType;
  source?: PigPigInsightSource;
  createdAt: ISODateTime;
}

export interface ChatHistory {
  id: UUID;
  userId: UUID;
  userMessage: string;
  aiResponse: string;
  createdAt: ISODateTime;
}

export interface WeeklySpendingSnapshot {
  startDate: ISODate;
  endDate: ISODate;
  totalExpense: Currency;
}

export interface DashboardSummary {
  remainingBudget: Currency;
  remainingDailyBudget: Currency;
  activeSavingGoal?: SavingGoal;
  budgetStreak?: BudgetStreak;
  pigCoinBalance: number;
  weeklySpendingSnapshot: WeeklySpendingSnapshot;
  latestPigPigInsight?: PigPigInsight;
  recentExpenses: Expense[];
}

export type FinancialReportPeriod = "Weekly" | "Monthly";

export interface FinancialReport {
  id: UUID;
  userId: UUID;
  reportPeriod: FinancialReportPeriod;
  totalExpense: Currency;
  totalBudget: Currency;
  remainingBudget: Currency;
  budgetUsage: number;
  generatedAt: ISODateTime;
}

export interface PaceDataStore {
  schemaVersion: 1;
  users: User[];
  budgets: Budget[];
  expenses: Expense[];
  expenseCategories: ExpenseCategory[];
  savingGoals: SavingGoal[];
  budgetStreaks: BudgetStreak[];
  pigCoinWallets: PigCoinWallet[];
  vouchers: Voucher[];
  userRewards: UserReward[];
  notifications: Notification[];
  pigPigInsights: PigPigInsight[];
  chatHistories: ChatHistory[];
}

export type PaceEntityName = Exclude<keyof PaceDataStore, "schemaVersion">;
