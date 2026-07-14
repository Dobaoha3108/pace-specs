import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type BudgetStreakCardProps = {
  currentStreak: number;
  milestone?: number;
  rewardHint?: string;
};

const FLAME_REWARD_PIG_COIN = 35;

export function BudgetStreakCard({
  currentStreak,
  milestone = 7,
  rewardHint = `Đủ 7 ngọn lửa nhận ${FLAME_REWARD_PIG_COIN} Pig Coin.`,
}: BudgetStreakCardProps) {
  // STR-005: currentStreak luôn được reset về 0 ngay sau khi đủ 7 ngày và
  // nhận thưởng (STR-004), nên số ngọn lửa đã hoàn thành trong chu kỳ 7 ngày
  // hiện tại chính là currentStreak (0-6 khi đang chạy, về lại 0 sau reset).
  const completedFlames = Math.min(currentStreak, milestone);

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

      <div className="flex items-center justify-between gap-xs">
        {Array.from({ length: milestone }, (_, index) => {
          const isCompleted = index < completedFlames;

          return (
            <Flame
              key={index}
              aria-hidden
              className={cn(
                "size-6",
                isCompleted
                  ? "fill-pace-warning text-pace-warning"
                  : "fill-transparent text-pace-text-secondary/40",
              )}
            />
          );
        })}
      </div>

      <p className="text-caption text-pace-text-secondary">{rewardHint}</p>
    </Card>
  );
}
