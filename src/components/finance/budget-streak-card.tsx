import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type BudgetStreakCardProps = {
  currentStreak: number;
  milestone?: number;
  rewardHint?: string;
};

export function BudgetStreakCard({
  currentStreak,
  milestone = 7,
  rewardHint = "Reach 7 days to unlock Pig Coin rewards.",
}: BudgetStreakCardProps) {
  return (
    <Card className="space-y-md">
      <div className="flex items-center justify-between gap-md">
        <div>
          <p className="text-caption text-pace-text-secondary">Budget Streak</p>
          <h2 className="mt-xs text-title">{currentStreak} days</h2>
        </div>
        <div className="flex size-12 items-center justify-center rounded-full bg-pace-secondary text-pace-warning">
          <Flame aria-hidden className="size-7 fill-current" />
        </div>
      </div>
      <Progress max={milestone} tone="coin" value={currentStreak} />
      <p className="text-caption text-pace-text-secondary">{rewardHint}</p>
    </Card>
  );
}
