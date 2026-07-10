"use client";

import { useMemo, useState } from "react";
import { BarChart3, ListFilter, ReceiptText } from "lucide-react";
import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";
import { MobileFrame } from "@/components/app/mobile-frame";
import { StatisticCard } from "@/components/finance/statistic-card";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatVnd } from "@/lib/finance/amount";
import {
  loadReportViewModel,
  type ReportCategorySummary,
  type ReportPeriod,
} from "@/features/report/lib/report-service";
import type { DashboardNavigationTarget } from "@/features/dashboard/types";
import type { Expense, ExpenseCategory } from "@/types/finance";

type ReportScreenProps = {
  onBack: () => void;
  onNavigate: (target: DashboardNavigationTarget, id?: string) => void;
};

export function ReportScreen({ onBack, onNavigate }: ReportScreenProps) {
  const [period, setPeriod] = useState<ReportPeriod>("week");
  const [categoryId, setCategoryId] = useState("All");
  const viewModel = useMemo(
    () => loadReportViewModel(period, categoryId),
    [categoryId, period],
  );

  if (!viewModel) {
    return (
      <MobileFrame>
        <div className="flex h-full flex-col bg-pace-background">
          <AppHeader onBack={onBack} showBackButton title="Financial Report" />
          <div className="flex flex-1 items-center px-md pb-[104px]">
            <EmptyState
              actionLabel="Back to Dashboard"
              description="Không thể tải báo cáo tài chính."
              onAction={() => onNavigate("dashboard")}
              title="Report Load Failed"
            />
          </div>
          <BottomNav activeItem="report" onNavigate={onNavigate} />
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        <AppHeader
          onBack={onBack}
          showBackButton
          title="Financial Report"
        />
        <div className="flex-1 overflow-y-auto px-md pb-[104px] pt-md">
          <div className="space-y-lg">
            <ReportFilters
              categories={viewModel.categories}
              categoryId={categoryId}
              onCategoryChange={setCategoryId}
              onPeriodChange={setPeriod}
              period={period}
            />

            <section className="grid grid-cols-2 gap-md">
              <StatisticCard
                comparison={period === "week" ? "This Week" : "This Month"}
                icon={<BarChart3 aria-hidden className="size-5 text-pace-primary" />}
                title="Total Budget"
                value={formatVnd(viewModel.totalBudget)}
              />
              <StatisticCard
                comparison={`${viewModel.budgetUsage}% used`}
                title="Total Spending"
                trend={viewModel.budgetUsage > 100 ? "down" : "flat"}
                value={formatVnd(viewModel.totalSpending)}
              />
              <StatisticCard
                title="Remaining Budget"
                value={formatVnd(viewModel.remainingBudget)}
              />
              <StatisticCard
                comparison={period === "week" ? "Weekly Usage" : "Monthly Usage"}
                title="Budget Usage"
                trend={viewModel.budgetUsage > 100 ? "down" : "flat"}
                value={`${viewModel.budgetUsage}%`}
              />
            </section>

            <CategoryAnalysis summaries={viewModel.categorySummaries} />

            <TransactionPreview
              categories={viewModel.categories}
              expenses={viewModel.recentExpenses}
              hasMore={viewModel.expenses.length > 3}
              onAdd={() => onNavigate("add-expense")}
              onOpen={(expense) => onNavigate("expense-detail", expense.id)}
              onViewAll={() => onNavigate("expense-history")}
            />

            <Card>
              <p className="text-caption text-pace-text-secondary">
                {period === "week" ? "Weekly Summary" : "Monthly Summary"}
              </p>
              <h2 className="mt-xs text-title">
                {formatVnd(viewModel.totalSpending)}
              </h2>
              <p className="mt-xs text-body text-pace-text-secondary">
                {viewModel.budgetUsage}% of{" "}
                {period === "week" ? "weekly" : "monthly"} budget used.
              </p>
            </Card>
          </div>
        </div>
        <BottomNav activeItem="report" onNavigate={onNavigate} />
      </div>
    </MobileFrame>
  );
}

function ReportFilters({
  categories,
  categoryId,
  onCategoryChange,
  onPeriodChange,
  period,
}: {
  categories: ExpenseCategory[];
  categoryId: string;
  onCategoryChange: (categoryId: string) => void;
  onPeriodChange: (period: ReportPeriod) => void;
  period: ReportPeriod;
}) {
  return (
    <section className="space-y-md">
      <div className="grid grid-cols-2 gap-sm rounded-card bg-pace-surface p-xs shadow-card">
        <button
          className={getSegmentClass(period === "week")}
          onClick={() => onPeriodChange("week")}
          type="button"
        >
          This Week
        </button>
        <button
          className={getSegmentClass(period === "month")}
          onClick={() => onPeriodChange("month")}
          type="button"
        >
          This Month
        </button>
      </div>
      <label className="block w-full">
        <span className="mb-xs flex items-center gap-xs text-caption text-pace-text-secondary">
          <ListFilter aria-hidden className="size-4" />
          Category
        </span>
        <select
          className="h-14 w-full rounded-input bg-pace-surface px-md text-body text-pace-text-primary shadow-card outline-none ring-1 ring-transparent focus:ring-pace-primary"
          onChange={(event) => onCategoryChange(event.target.value)}
          value={categoryId}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

function CategoryAnalysis({
  summaries,
}: {
  summaries: ReportCategorySummary[];
}) {
  return (
    <section className="space-y-md">
      <h2 className="text-subtitle">Category Analysis</h2>
      {summaries.length === 0 ? (
        <EmptyState
          description="Không có khoản chi Completed trong bộ lọc hiện tại."
          title="No Category Data"
        />
      ) : (
        <div className="space-y-md">
          {summaries.map((summary) => (
            <Card key={summary.category.id}>
              <div className="flex items-center justify-between gap-md">
                <div>
                  <p className="text-body font-semibold">
                    {summary.category.name}
                  </p>
                  <p className="mt-xs text-caption text-pace-text-secondary">
                    {summary.percentage}% of spending
                  </p>
                </div>
                <p className="text-body font-semibold">
                  {formatVnd(summary.totalSpending)}
                </p>
              </div>
              <div className="mt-md h-2 overflow-hidden rounded-full bg-pace-border">
                <div
                  className="h-full rounded-full bg-pace-primary"
                  style={{ width: `${summary.percentage}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

function TransactionPreview({
  categories,
  expenses,
  hasMore,
  onAdd,
  onOpen,
  onViewAll,
}: {
  categories: ExpenseCategory[];
  expenses: Expense[];
  hasMore: boolean;
  onAdd: () => void;
  onOpen: (expense: Expense) => void;
  onViewAll: () => void;
}) {
  return (
    <section className="space-y-md">
      <div className="flex items-center justify-between gap-md">
        <h2 className="text-subtitle">Transaction History</h2>
        {hasMore ? (
          <button className="text-caption text-pace-primary" onClick={onViewAll} type="button">
            View All
          </button>
        ) : null}
      </div>
      {expenses.length === 0 ? (
        <EmptyState
          actionLabel="Add Expense"
          description="Chưa có khoản chi nào trong bộ lọc hiện tại."
          illustrationSrc="/assets/illustrations/Emty_expense.png"
          onAction={onAdd}
          title="No Transactions"
        />
      ) : (
        <div className="space-y-md">
          {expenses.map((expense) => (
            <Card
              as="article"
              className="cursor-pointer active:scale-[0.99]"
              key={expense.id}
              onClick={() => onOpen(expense)}
            >
              <div className="flex items-center justify-between gap-md">
                <div className="flex min-w-0 items-center gap-md">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pace-primary/15 text-pace-primary">
                    <ReceiptText aria-hidden className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-body font-semibold">
                      {findCategoryName(categories, expense.categoryId)}
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
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

function getSegmentClass(isActive: boolean) {
  return [
    "h-11 rounded-button px-sm text-caption font-semibold transition-colors",
    isActive
      ? "bg-pace-primary text-white"
      : "text-pace-text-secondary hover:text-pace-text-primary",
  ].join(" ");
}

function findCategoryName(categories: ExpenseCategory[], categoryId: string) {
  return categories.find((category) => category.id === categoryId)?.name ?? "Other";
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateValue));
}
