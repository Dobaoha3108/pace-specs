"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, ReceiptText } from "lucide-react";
import { AppHeader } from "@/components/app/app-header";
import { BottomNav, type BottomNavItemId } from "@/components/app/bottom-nav";
import { MobileFrame } from "@/components/app/mobile-frame";
import { PigPigInsightBanner } from "@/components/ai/pig-pig-insight-banner";
import { BudgetStreakCard } from "@/components/finance/budget-streak-card";
import { BudgetSummaryCard } from "@/components/finance/budget-summary-card";
import { SavingGoalCard } from "@/components/finance/saving-goal-card";
import { StatisticCard } from "@/components/finance/statistic-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { formatVnd } from "@/lib/finance/amount";
import { loadDashboardViewModel } from "@/features/dashboard/lib/dashboard-view-model";
import type {
  DashboardNavigationTarget,
  DashboardViewModel,
} from "@/features/dashboard/types";
import type { Expense, SavingGoal } from "@/types/finance";

type DashboardScreenProps = {
  onNavigate?: (target: DashboardNavigationTarget, id?: string) => void;
  onMissingBudget?: () => void;
};

type DashboardState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: DashboardViewModel };

export function DashboardScreen({
  onMissingBudget,
  onNavigate,
}: DashboardScreenProps) {
  const [state, setState] = useState<DashboardState>({ status: "loading" });

  const loadDashboard = useCallback(() => {
    setState({ status: "loading" });

    try {
      const viewModel = loadDashboardViewModel();

      if (!viewModel) {
        onMissingBudget?.();
        return;
      }

      setState({ status: "ready", data: viewModel });
    } catch {
      setState({ status: "error" });
    }
  }, [onMissingBudget]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  function handleBottomNavigation(item: BottomNavItemId) {
    onNavigate?.(item);
  }

  if (state.status === "loading") {
    return (
      <MobileFrame>
        <div className="flex h-full items-center bg-pace-background px-md">
          <LoadingState label="Loading Dashboard" />
        </div>
      </MobileFrame>
    );
  }

  if (state.status === "error") {
    return (
      <MobileFrame>
        <div className="flex h-full items-center bg-pace-background px-md">
          <EmptyState
            actionLabel="Retry"
            description="PACE could not load your dashboard data."
            illustrationSrc="/assets/illustrations/No_data.png"
            onAction={loadDashboard}
            title="Không thể tải Dashboard"
          />
        </div>
      </MobileFrame>
    );
  }

  const { data } = state;
  const budgetUsage = getBudgetUsage(data);

  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        <AppHeader
          greeting={getGreeting()}
          notificationCount={data.unreadNotificationCount}
          onNotificationClick={() => onNavigate?.("notification")}
          onProfileClick={() => onNavigate?.("profile")}
          userName={data.user.displayName}
        />

        <div className="flex-1 overflow-y-auto px-md pb-[104px]">
          <div className="space-y-lg">
            <BudgetSummaryCard
              budgetCycle={data.budget.cycle}
              budgetProgress={budgetUsage}
              dailyProgress={getDailyBudgetUsage(data)}
              monthlyBudget={formatVnd(data.budget.monthlyBudget)}
              remainingBudget={formatVnd(data.budget.remainingBudget)}
              remainingDailyBudget={formatVnd(data.budget.remainingDailyBudget)}
              state={data.budget.remainingDailyBudget <= 0 ? "warning" : "normal"}
            />

            <Button
              leadingIcon={<Plus aria-hidden className="size-5" />}
              onClick={() => onNavigate?.("add-expense")}
            >
              Add Expense
            </Button>

            <SavingGoalSection
              goals={data.activeSavingGoals}
              onCreate={() => onNavigate?.("saving-goal-create")}
              onOpenGoal={(goal) => onNavigate?.("saving-goal-detail", goal.id)}
              onViewAll={() => onNavigate?.("saving-goal-list")}
            />

            <BudgetStreakCard currentStreak={data.budgetStreak.currentStreak} />

            <section className="space-y-md">
              <h2 className="text-subtitle">Weekly Spending Snapshot</h2>
              {data.weeklySpending > 0 ? (
                <StatisticCard
                  comparison={`${data.weeklyBudgetUsage}% of weekly budget used`}
                  onClick={() => onNavigate?.("report")}
                  title="Total Spending This Week"
                  trend={data.weeklyBudgetUsage > 100 ? "down" : "flat"}
                  value={formatVnd(data.weeklySpending)}
                />
              ) : (
                <EmptyState
                  description="Chưa có đủ dữ liệu để tạo snapshot tuần này."
                  illustrationSrc="/assets/illustrations/Empty_report.png"
                  title="Empty Weekly Report"
                />
              )}
            </section>

            <RecentExpenseSection
              expenses={data.recentExpenses}
              onOpenExpense={(expense) =>
                onNavigate?.("expense-detail", expense.id)
              }
              onViewAll={() => onNavigate?.("expense-history")}
            />

            <PigPigInsightBanner
              content={
                data.latestInsight?.content ??
                "Hôm nay Pig Pig chưa có gợi ý mới."
              }
              insightType={data.latestInsight?.insightType ?? "Information"}
              onChat={() => onNavigate?.("pig-pig")}
              title={data.latestInsight?.title ?? "Pig Pig Insight"}
            />
          </div>
        </div>

        <BottomNav
          activeItem="dashboard"
          onNavigate={handleBottomNavigation}
        />
      </div>
    </MobileFrame>
  );
}

function SavingGoalSection({
  goals,
  onCreate,
  onOpenGoal,
  onViewAll,
}: {
  goals: SavingGoal[];
  onCreate: () => void;
  onOpenGoal: (goal: SavingGoal) => void;
  onViewAll: () => void;
}) {
  return (
    <section className="space-y-md">
      <div className="flex items-center justify-between gap-md">
        <h2 className="text-subtitle">Saving Goal</h2>
        {goals.length > 0 ? (
          <button className="text-caption text-pace-primary" onClick={onViewAll} type="button">
            View All
          </button>
        ) : null}
      </div>
      {goals.length === 0 ? (
        <EmptyState
          actionLabel="Create Saving Goal"
          description="Bạn chưa có hũ tiết kiệm nào. Tạo mục tiêu đầu tiên để bắt đầu."
          illustrationSrc="/assets/illustrations/Empty_saving_goal.png"
          onAction={onCreate}
          title="No Saving Goal"
        />
      ) : (
        <div className="space-y-md">
          {goals.map((goal) => (
            <SavingGoalCard
              currentAmount={formatVnd(goal.currentAmount)}
              key={goal.id}
              name={goal.name}
              onClick={() => onOpenGoal(goal)}
              progress={getSavingGoalProgress(goal)}
              savingMode={goal.savingMode}
              status={goal.status}
              targetAmount={formatVnd(goal.targetAmount)}
              targetDate={formatDate(goal.targetDate)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function RecentExpenseSection({
  expenses,
  onOpenExpense,
  onViewAll,
}: {
  expenses: Expense[];
  onOpenExpense: (expense: Expense) => void;
  onViewAll: () => void;
}) {
  return (
    <section className="space-y-md">
      <div className="flex items-center justify-between gap-md">
        <h2 className="text-subtitle">Recent Expense</h2>
        {expenses.length > 0 ? (
          <button className="text-caption text-pace-primary" onClick={onViewAll} type="button">
            View All
          </button>
        ) : null}
      </div>
      {expenses.length === 0 ? (
        <EmptyState
          description="Bạn chưa ghi nhận khoản chi nào."
          illustrationSrc="/assets/illustrations/Emty_expense.png"
          title="No Expenses Yet"
        />
      ) : (
        <div className="space-y-md">
          {expenses.map((expense) => (
            <Card
              as="article"
              className="flex cursor-pointer items-center justify-between gap-md active:scale-[0.99]"
              key={expense.id}
              onClick={() => onOpenExpense(expense)}
            >
              <div className="flex min-w-0 items-center gap-md">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pace-primary/15 text-pace-primary">
                  <ReceiptText aria-hidden className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-body font-semibold">
                    {expense.note || "Expense"}
                  </p>
                  <p className="text-caption text-pace-text-secondary">
                    {formatDate(expense.completedDate ?? expense.plannedDate)} ·{" "}
                    {expense.status}
                  </p>
                </div>
              </div>
              <p className="shrink-0 text-body font-semibold text-pace-danger">
                -{formatVnd(expense.amount)}
              </p>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

function getBudgetUsage(data: DashboardViewModel) {
  if (data.budget.monthlyBudget <= 0) {
    return 0;
  }

  return Math.round(
    (data.budget.remainingBudget / data.budget.monthlyBudget) * 100,
  );
}

function getDailyBudgetUsage(data: DashboardViewModel) {
  if (data.budget.remainingDailyBudget <= 0 || data.budget.monthlyBudget <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.round(
      (data.budget.remainingDailyBudget / data.budget.monthlyBudget) * 100,
    ),
  );
}

function getSavingGoalProgress(goal: SavingGoal) {
  if (goal.targetAmount <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateValue));
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}
