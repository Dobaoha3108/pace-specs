"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardScreen } from "@/features/dashboard/components/dashboard-screen";
import { OnboardingScreen } from "@/features/onboarding/components/onboarding-screen";
import { SplashScreen } from "@/features/splash/components/splash-screen";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";

type AppRoute = "splash" | "onboarding" | "dashboard";

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

  return <DashboardScreen />;
}
