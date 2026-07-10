"use client";

import { useCallback, useEffect, useState } from "react";
import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";
import { MobileFrame } from "@/components/app/mobile-frame";
import { DashboardScreen } from "@/features/dashboard/components/dashboard-screen";
import type { DashboardNavigationTarget } from "@/features/dashboard/types";
import { OnboardingScreen } from "@/features/onboarding/components/onboarding-screen";
import { SplashScreen } from "@/features/splash/components/splash-screen";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";

type AppRoute = "splash" | "onboarding" | DashboardNavigationTarget;

const routeTitles: Record<DashboardNavigationTarget, string> = {
  dashboard: "Dashboard",
  report: "Financial Report",
  "add-expense": "Add Expense",
  reward: "Reward Marketplace",
  "pig-pig": "Pig Pig Chat",
  notification: "Notification Center",
  profile: "Profile",
  "saving-goal-list": "Saving Goal",
  "saving-goal-detail": "Saving Goal Detail",
  "saving-goal-create": "Create Saving Goal",
  "expense-history": "Expense History",
  "expense-detail": "Expense Detail",
};

export function AppEntry() {
  const [route, setRoute] = useState<AppRoute>("splash");
  const [hasSplashError, setHasSplashError] = useState(false);

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
        onNavigate={setRoute}
      />
    );
  }

  return (
    <PlaceholderScreen
      onBack={() => setRoute("dashboard")}
      onNavigate={setRoute}
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
  onNavigate: (target: DashboardNavigationTarget) => void;
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
