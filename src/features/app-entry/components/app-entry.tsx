"use client";

import { useCallback, useEffect, useState } from "react";
import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";
import { MobileFrame } from "@/components/app/mobile-frame";
import { DashboardScreen } from "@/features/dashboard/components/dashboard-screen";
import type { DashboardNavigationTarget } from "@/features/dashboard/types";
import { ExpenseScreen } from "@/features/expense/components/expense-screen";
import { NotificationScreen } from "@/features/notification/components/notification-screen";
import { OnboardingScreen } from "@/features/onboarding/components/onboarding-screen";
import { PigPigScreen } from "@/features/pig-pig/components/pig-pig-screen";
import { ProfileScreen } from "@/features/profile/components/profile-screen";
import { ReportScreen } from "@/features/report/components/report-screen";
import { RewardScreen } from "@/features/reward/components/reward-screen";
import { SavingGoalScreen } from "@/features/saving-goal/components/saving-goal-screen";
import { SplashScreen } from "@/features/splash/components/splash-screen";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";

type AppRoute = "splash" | "onboarding" | DashboardNavigationTarget;

const routeTitles: Record<DashboardNavigationTarget, string> = {
  dashboard: "Dashboard",
  report: "Financial Report",
  "add-expense": "Add Expense",
  reward: "Reward Marketplace",
  "voucher-detail": "Voucher Detail",
  "my-voucher": "My Voucher",
  "reward-detail": "Redeemed Voucher",
  "pig-pig": "Pig Pig Chat",
  "pig-pig-history": "Pig Pig History",
  notification: "Notification Center",
  "notification-detail": "Notification Detail",
  profile: "Profile",
  "profile-financial-settings": "Financial Settings",
  "saving-goal-list": "Saving Goal",
  "saving-goal-detail": "Saving Goal Detail",
  "saving-goal-create": "Create Saving Goal",
  "saving-goal-history": "Saving Goal History",
  "saving-goal-edit": "Edit Saving Goal",
  "expense-history": "Expense History",
  "expense-detail": "Expense Detail",
  "expense-edit": "Edit Expense",
};

// Bottom Navigation tab-level routes (specs/15_SCREEN_MAP.md, NAV-012).
// Navigating to one of these always starts a fresh navigation context: the
// in-session Navigation Stack is cleared instead of accumulating history
// across tabs.
const TAB_ROUTES: ReadonlySet<DashboardNavigationTarget> = new Set([
  "dashboard",
  "report",
  "add-expense",
  "reward",
  "pig-pig",
]);

export function AppEntry() {
  const [route, setRoute] = useState<AppRoute>("splash");
  // Navigation Stack of the current session (specs/15_SCREEN_MAP.md,
  // NAV-012): holds the screens the User drilled down from, so Back Button
  // can return to the nearest previous screen instead of always jumping to
  // Dashboard.
  const [history, setHistory] = useState<DashboardNavigationTarget[]>([]);
  const [hasSplashError, setHasSplashError] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string>();
  const [selectedGoalId, setSelectedGoalId] = useState<string>();
  const [selectedVoucherId, setSelectedVoucherId] = useState<string>();
  const [selectedRewardId, setSelectedRewardId] = useState<string>();
  const [selectedNotificationId, setSelectedNotificationId] = useState<string>();

  function navigate(target: DashboardNavigationTarget, id?: string) {
    if (target === "expense-detail" || target === "expense-edit") {
      setSelectedExpenseId(id);
    }

    if (target === "saving-goal-detail" || target === "saving-goal-edit") {
      setSelectedGoalId(id);
    }

    if (target === "voucher-detail") {
      setSelectedVoucherId(id);
    }

    if (target === "reward-detail") {
      setSelectedRewardId(id);
    }

    if (target === "notification-detail") {
      setSelectedNotificationId(id);
    }

    if (TAB_ROUTES.has(target)) {
      // Switching Bottom Navigation tab: start a fresh navigation context.
      setHistory([]);
    } else if (route !== "splash" && route !== "onboarding" && route !== target) {
      // Drilling into a sub-screen: remember where we came from.
      setHistory((previousHistory) => [...previousHistory, route]);
    }

    setRoute(target);
  }

  function goBack() {
    setHistory((previousHistory) => {
      if (previousHistory.length === 0) {
        setRoute("dashboard");
        return previousHistory;
      }

      const nextHistory = previousHistory.slice(0, -1);
      setRoute(previousHistory[previousHistory.length - 1]);
      return nextHistory;
    });
  }

  function logoutToSplash() {
    setHasSplashError(false);
    setHistory([]);
    setRoute("splash");
    window.setTimeout(() => {
      setRoute("onboarding");
    }, 900);
  }

  const initializeApplication = useCallback(() => {
    setHasSplashError(false);
    setRoute("splash");

    window.setTimeout(() => {
      try {
        const hasCompletedUser = paceLocalDataSource
          .users
          .list()
          .some((user) => user.onboardingCompleted);

        setRoute(hasCompletedUser ? "dashboard" : "onboarding");
      } catch {
        setHasSplashError(true);
      }
    }, 900);
  }, []);

  useEffect(() => {
    initializeApplication();
  }, [initializeApplication]);

  if (route === "splash") {
    return (
      <SplashScreen
        hasError={hasSplashError}
        onRetry={initializeApplication}
      />
    );
  }

  if (route === "onboarding") {
    return <OnboardingScreen onCompleted={() => setRoute("dashboard")} />;
  }

  if (route === "dashboard") {
    return (
      <DashboardScreen
        onMissingBudget={() => setRoute("onboarding")}
        onNavigate={navigate}
      />
    );
  }

  if (route === "report") {
    return (
      <ReportScreen
        onBack={goBack}
        onNavigate={navigate}
      />
    );
  }

  if (
    route === "reward" ||
    route === "voucher-detail" ||
    route === "my-voucher" ||
    route === "reward-detail"
  ) {
    const rewardMode =
      route === "voucher-detail"
        ? "voucher-detail"
        : route === "my-voucher"
          ? "my-voucher"
          : route === "reward-detail"
            ? "reward-detail"
            : "marketplace";

    return (
      <RewardScreen
        mode={rewardMode}
        onBack={goBack}
        onNavigate={navigate}
        selectedRewardId={selectedRewardId}
        selectedVoucherId={selectedVoucherId}
      />
    );
  }

  if (route === "pig-pig" || route === "pig-pig-history") {
    return (
      <PigPigScreen
        mode={route === "pig-pig-history" ? "history" : "chat"}
        onBack={goBack}
        onNavigate={navigate}
      />
    );
  }

  if (route === "notification" || route === "notification-detail") {
    return (
      <NotificationScreen
        mode={route === "notification-detail" ? "detail" : "list"}
        onBack={goBack}
        onNavigate={navigate}
        selectedNotificationId={selectedNotificationId}
      />
    );
  }

  if (route === "profile" || route === "profile-financial-settings") {
    return (
      <ProfileScreen
        mode={route === "profile-financial-settings" ? "financial-settings" : "overview"}
        onBack={goBack}
        onLogout={logoutToSplash}
        onNavigate={navigate}
      />
    );
  }

  if (
    route === "add-expense" ||
    route === "expense-history" ||
    route === "expense-detail" ||
    route === "expense-edit"
  ) {
    const expenseMode =
      route === "add-expense"
        ? "add"
        : route === "expense-history"
          ? "history"
          : route === "expense-edit"
            ? "edit"
            : "detail";

    return (
      <ExpenseScreen
        mode={expenseMode}
        onBack={goBack}
        onNavigate={navigate}
        selectedExpenseId={selectedExpenseId}
      />
    );
  }

  if (
    route === "saving-goal-list" ||
    route === "saving-goal-detail" ||
    route === "saving-goal-create" ||
    route === "saving-goal-history" ||
    route === "saving-goal-edit"
  ) {
    const savingGoalMode =
      route === "saving-goal-create"
        ? "create"
        : route === "saving-goal-history"
          ? "history"
          : route === "saving-goal-edit"
            ? "edit"
            : route === "saving-goal-detail"
              ? "detail"
              : "list";

    return (
      <SavingGoalScreen
        mode={savingGoalMode}
        onBack={goBack}
        onNavigate={navigate}
        selectedGoalId={selectedGoalId}
      />
    );
  }

  return (
    <PlaceholderScreen
      onBack={goBack}
      onNavigate={navigate}
      route={route}
    />
  );
}

function PlaceholderScreen({
  onBack,
  onNavigate,
  route,
}: {
  onBack: () => void;
  onNavigate: (target: DashboardNavigationTarget, id?: string) => void;
  route: DashboardNavigationTarget;
}) {
  const bottomNavItem =
    route === "report" ||
    route === "add-expense" ||
    route === "reward" ||
    route === "pig-pig"
      ? route
      : "dashboard";

  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        <AppHeader
          onBack={onBack}
          showBackButton
          title={routeTitles[route]}
        />
        <div className="flex flex-1 items-center px-md pb-[104px]">
          <section className="w-full rounded-card bg-pace-surface p-5 text-center shadow-card">
            <h1 className="text-title">{routeTitles[route]}</h1>
            <p className="mt-sm text-body text-pace-text-secondary">
              Navigation is wired from Dashboard. This screen will be
              implemented in its feature task.
            </p>
          </section>
        </div>
        <BottomNav activeItem={bottomNavItem} onNavigate={onNavigate} />
      </div>
    </MobileFrame>
  );
}
