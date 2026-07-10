"use client";

import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";
import { MobileFrame } from "@/components/app/mobile-frame";
import { PigPigInsightBanner } from "@/components/ai/pig-pig-insight-banner";
import { BudgetStreakCard } from "@/components/finance/budget-streak-card";
import { BudgetSummaryCard } from "@/components/finance/budget-summary-card";
import { SavingGoalCard } from "@/components/finance/saving-goal-card";
import { StatisticCard } from "@/components/finance/statistic-card";

export function DashboardScreen() {
  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        <AppHeader
          greeting="Good afternoon"
          notificationCount={2}
          onNotificationClick={() => undefined}
          onProfileClick={() => undefined}
          userName="PACE"
        />

        <div className="flex-1 overflow-y-auto px-md pb-[104px]">
          <div className="space-y-lg">
            <BudgetSummaryCard
              budgetCycle="Monthly"
              budgetProgress={62}
              dailyProgress={72}
              monthlyBudget="4.000.000 VND"
              remainingBudget="2.450.000 VND"
              remainingDailyBudget="180.000 VND"
            />

            <BudgetStreakCard currentStreak={7} />

            <section className="space-y-md">
              <div className="flex items-center justify-between gap-md">
                <h2 className="text-subtitle">Saving Goal</h2>
                <button className="text-caption text-pace-primary" type="button">
                  View All
                </button>
              </div>
              <SavingGoalCard
                currentAmount="4.200.000 VND"
                name="New laptop fund"
                progress={42}
                savingMode="Commitment"
                status="Active"
                targetAmount="10.000.000 VND"
                targetDate="30/09/2026"
              />
            </section>

            <section className="space-y-md">
              <h2 className="text-subtitle">Weekly Spending Snapshot</h2>
              <StatisticCard
                comparison="72% of weekly budget"
                title="Weekly Spending"
                value="520.000 VND"
              />
            </section>

            <PigPigInsightBanner
              content="Great pace today. Keep dinner under 80K to protect tomorrow's budget."
              insightType="Recommendation"
              title="Pig Pig check-in"
            />
          </div>
        </div>

        <BottomNav activeItem="dashboard" />
      </div>
    </MobileFrame>
  );
}
