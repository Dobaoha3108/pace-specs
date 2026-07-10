import { Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/cn";

type BudgetSummaryState = "loading" | "normal" | "warning" | "empty";

type BudgetSummaryCardProps = {
  monthlyBudget: string;
  remainingBudget: string;
  remainingDailyBudget: string;
  budgetCycle: string;
  budgetProgress: number;
  dailyProgress: number;
  state?: BudgetSummaryState;
  onEditBudget?: () => void;
};

export function BudgetSummaryCard({
  budgetCycle,
  budgetProgress,
  dailyProgress,
  monthlyBudget,
  onEditBudget,
  remainingBudget,
  remainingDailyBudget,
  state = "normal",
}: BudgetSummaryCardProps) {
  const isWarning = state === "warning";

  return (
    <Card
      className={cn(
        "space-y-md",
        isWarning && "ring-1 ring-pace-warning",
      )}
    >
      <div className="flex items-start justify-between gap-md">
        <div>
          <p className="text-caption text-pace-text-secondary">
            Current Budget Cycle
          </p>
          <h2 className="mt-xs text-title">{budgetCycle}</h2>
        </div>
        <div className="flex size-12 items-center justify-center rounded-full bg-pace-primary/15 text-pace-primary">
          <Wallet aria-hidden className="size-6" />
        </div>
      </div>

      <div className="rounded-card bg-pace-primary p-md text-white">
        <p className="text-caption opacity-90">Remaining Budget</p>
        <p className="mt-xs text-[32px] font-bold leading-10">
          {remainingBudget}
        </p>
        <p className="mt-xs text-caption opacity-90">
          Monthly Budget: {monthlyBudget}
        </p>
        <Progress
          className="mt-md bg-white/25"
          max={100}
          value={budgetProgress}
        />
      </div>

      <div>
        <div className="mb-sm flex items-center justify-between gap-md">
          <p className="text-caption text-pace-text-secondary">
            Remaining Daily Budget
          </p>
          <p
            className={cn(
              "text-caption",
              isWarning ? "text-pace-warning" : "text-pace-text-primary",
            )}
          >
            {remainingDailyBudget}
          </p>
        </div>
        <Progress
          max={100}
          tone={isWarning ? "warning" : "success"}
          value={dailyProgress}
        />
      </div>

      {onEditBudget ? (
        <button
          className="text-caption text-pace-primary"
          onClick={onEditBudget}
          type="button"
        >
          Edit Budget
        </button>
      ) : null}
    </Card>
  );
}
