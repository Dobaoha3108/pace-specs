import { Card } from "@/components/ui/card"; 
import { formatVnd } from "@/lib/finance/amount";
import type { ReportWeeklyBreakdown } from "@/features/report/lib/report-service";

type WeeklyComparisonChartProps = {
  weeks: ReportWeeklyBreakdown[];
};

// CMP-018 Weekly Comparison Bar Chart
// Chỉ dùng cho Monthly Report. Mỗi cột là một tuần trong tháng, mỗi cột
// một màu riêng (khác bảng màu Category Pie Chart).
export function WeeklyComparisonChart({ weeks }: WeeklyComparisonChartProps) {
  if (weeks.length === 0) {
    return null;
  }

  const maxSpending = Math.max(...weeks.map((week) => week.totalSpending), 1);

  return (
    <Card>
      <h2 className="text-subtitle">Weekly Comparison</h2>
      <div className="mt-md flex items-end justify-between gap-sm" style={{ height: 160 }}>
        {weeks.map((week) => {
          const heightPercent = Math.max(
            4,
            Math.round((week.totalSpending / maxSpending) * 100),
          );
          return (
            <div
              className="flex h-full flex-1 flex-col items-center justify-end gap-xs"
              key={week.label}
            >
              <p className="text-caption font-semibold text-pace-text-primary">
                {week.totalSpending > 0 ? formatVnd(week.totalSpending) : "0"}
              </p>
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md"
                  style={{ height: `${heightPercent}%`, backgroundColor: week.color }}
                />
              </div>
              <p className="text-caption text-pace-text-secondary">{week.label}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
