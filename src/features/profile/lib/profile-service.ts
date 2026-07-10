import {
  getCurrentBudget,
  getCurrentUser,
  recalculateBudget,
} from "@/features/finance/lib/finance-service";
import {
  ensureRewardSeedData,
  getRewardWallet,
} from "@/features/reward/lib/reward-service";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";
import type { Budget, PigCoinWallet, User } from "@/types/finance";

const notificationSettingKey = "pace:settings:local-push-enabled";

export type ProfileViewModel = {
  user: User;
  budget?: Budget;
  wallet?: PigCoinWallet;
  localPushEnabled: boolean;
};

export function loadProfileViewModel(): ProfileViewModel | undefined {
  const user = getCurrentUser();

  if (!user) {
    return undefined;
  }

  ensureRewardSeedData(user.id);

  return {
    user,
    budget: getCurrentBudget(user.id),
    wallet: getRewardWallet(user.id),
    localPushEnabled: getLocalPushEnabled(),
  };
}

export function updateFinancialInformation({
  budget,
  fixedExpenses,
  monthlyIncome,
}: {
  budget: Budget;
  fixedExpenses: number;
  monthlyIncome: number;
}) {
  const updatedBudget: Budget = {
    ...budget,
    monthlyIncome,
    fixedExpenses,
    monthlyBudget: monthlyIncome - fixedExpenses,
    updatedAt: new Date().toISOString(),
  };

  paceLocalDataSource.budgets.upsert(updatedBudget);
  return recalculateBudget(budget.userId);
}

export function setLocalPushEnabled(isEnabled: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(notificationSettingKey, String(isEnabled));
}

function getLocalPushEnabled() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.localStorage.getItem(notificationSettingKey) !== "false";
}
