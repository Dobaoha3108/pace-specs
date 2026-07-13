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
  projectedDaysLeftLabel: string;
  spendingPaceLabel: string;
  spendingPaceDelta: number;
  state?: BudgetSummaryState;
  onEditBudget?: () => void;
};

export function BudgetSummaryCard({
  budgetCycle,
  budgetProgress,
  monthlyBudget,
  onEditBudget,
  projectedDaysLeftLabel,
  remainingBudget,
  remainingDailyBudget,
  spendingPaceDelta,
  spendingPaceLabel,
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
        <p className="text-caption opacity-90">Còn được tiêu trong tháng</p>
        <p className="mt-xs text-[32px] font-bold leading-10">
          {remainingBudget}
          <span className="ml-xs text-caption font-normal opacity-90">
            / {monthlyBudget}
          </span>
        </p>
        <Progress
          className="mt-md bg-white/25"
          max={100}
          value={budgetProgress}
        />
      </div>

      <div className="grid grid-cols-3 gap-sm">
        <BudgetInfoBox label="Hôm nay nên tiêu" value={remainingDailyBudget} />
        <BudgetInfoBox label="Dự kiến hết" value={projectedDaysLeftLabel} />
        <BudgetInfoBox
          label="Tốc độ chi tiêu"
          tone={
            spendingPaceDelta > 0
              ? "warning"
              : spendingPaceDelta < 0
                ? "success"
                : "neutral"
          }
          value={spendingPaceLabel}
        />
      </div>

      {isWarning ? (
        <p className="text-caption text-pace-warning">
          Bạn đang tiêu vượt mức cho phép hôm nay. Cân nhắc điều chỉnh để
          không hết tiền sớm nhé.
        </p>
      ) : null}

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

function BudgetInfoBox({
  label,
  tone = "neutral",
  value,
}: {
  label: string;
  tone?: "neutral" | "warning" | "success";
  value: string;
}) {
  return (
    <div className="rounded-input bg-pace-background p-sm text-center">
      <p className="text-[11px] leading-tight text-pace-text-secondary">
        {label}
      </p>
      <p
        className={cn(
          "mt-xs text-caption font-semibold",
          tone === "warning" && "text-pace-warning",
          tone === "success" && "text-pace-success",
          tone === "neutral" && "text-pace-text-primary",
        )}
      >
        {value}
      </p>
    </div>
  );
}
