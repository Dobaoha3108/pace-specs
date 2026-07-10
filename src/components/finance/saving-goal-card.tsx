import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/cn";
import type { SavingGoalStatus } from "@/types/finance";

type SavingGoalCardProps = {
  name: string;
  currentAmount: string;
  targetAmount: string;
  targetDate: string;
  savingMode: string;
  status: SavingGoalStatus;
  progress: number;
  onClick?: () => void;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onCreate?: () => void;
};

export function SavingGoalCard({
  currentAmount,
  name,
  onClick,
  onCreate,
  onDeposit,
  onWithdraw,
  progress,
  savingMode,
  status,
  targetAmount,
  targetDate,
}: SavingGoalCardProps) {
  const isEmpty = status === "Cancelled" && onCreate;
  const isLocked = status !== "Active";

  if (isEmpty) {
    return (
      <Card className="text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-pace-primary/15 text-pace-primary">
          <Target aria-hidden className="size-7" />
        </div>
        <h2 className="mt-md text-title">No saving goal yet</h2>
        <p className="mt-xs text-body text-pace-text-secondary">
          Create your first jar and Pig Pig will help you keep track.
        </p>
        <Button className="mt-lg" onClick={onCreate}>
          Create Saving Goal
        </Button>
      </Card>
    );
  }

  return (
    <Card
      as="article"
      className={cn(onClick && "cursor-pointer active:scale-[0.99]")}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-md">
        <div className="min-w-0">
          <p className="text-caption text-pace-text-secondary">{savingMode}</p>
          <h2 className="truncate text-title">{name}</h2>
        </div>
        <span
          className={cn(
            "rounded-button px-sm py-xs text-caption",
            status === "Active" && "bg-pace-success/15 text-pace-success",
            status === "Cancelling" && "bg-pace-warning/15 text-pace-warning",
            status === "Completed" && "bg-pace-primary/15 text-pace-primary",
            status === "Cancelled" && "bg-pace-border text-pace-text-secondary",
          )}
        >
          {status}
        </span>
      </div>
      <div className="mt-md flex items-end justify-between gap-md">
        <p className="text-body font-semibold">{currentAmount}</p>
        <p className="text-caption text-pace-text-secondary">of {targetAmount}</p>
      </div>
      <Progress className="mt-sm" tone="success" value={progress} />
      <p className="mt-sm text-caption text-pace-text-secondary">
        Target date: {targetDate}
      </p>
      {onDeposit || onWithdraw ? (
        <div className="mt-md grid grid-cols-2 gap-md">
          {onDeposit ? (
            <Button disabled={isLocked} onClick={onDeposit} variant="secondary">
              Deposit
            </Button>
          ) : null}
          {onWithdraw ? (
            <Button disabled={isLocked} onClick={onWithdraw} variant="ghost">
              Withdraw
            </Button>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
