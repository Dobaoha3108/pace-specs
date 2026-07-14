import { Card } from "@/components/ui/card";
import { formatVnd } from "@/lib/finance/amount";
import type { ReportCategorySummary } from "@/features/report/lib/report-service";

type CategoryPieChartProps = {
  summaries: ReportCategorySummary[];
  totalSpending: number;
};

// CMP-017 Category Pie Chart
// Vẽ bằng CSS conic-gradient (không cần thêm thư viện chart ngoài) để tránh
// rủi ro thiếu dependency khi build. Mỗi Category giữ nguyên màu cố định
// (tính từ report-service) xuyên suốt toàn ứng dụng.
export function CategoryPieChart({ summaries, totalSpending }: CategoryPieChartProps) {
  if (summaries.length === 0 || totalSpending <= 0) {
    return null;
  }

  let cumulative = 0;
  const stops = summaries.map((summary) => {
    const fraction = summary.totalSpending / totalSpending;
    const start = cumulative * 360;
    cumulative += fraction;
    const end = cumulative * 360;
    return `${summary.color} ${start}deg ${end}deg`;
  });
  const gradient = `conic-gradient(${stops.join(", ")})`;

  return (
    <Card>
      <h2 className="text-subtitle">Category Analysis</h2>
      <div className="mt-md flex items-center gap-lg">
        <div className="relative shrink-0" style={{ width: 140, height: 140 }}>
          <div
            aria-hidden
            className="size-full rounded-full"
            style={{ backgroundImage: gradient }}
          />
          <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-pace-surface text-center">
            <p className="text-caption text-pace-text-secondary">Tổng chi</p>
            <p className="text-caption font-semibold text-pace-text-primary">
              {formatVnd(totalSpending)}
            </p>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-sm">
          {summaries.map((summary) => (
            <div
              className="flex items-center justify-between gap-sm"
              key={summary.category.id}
            >
              <div className="flex min-w-0 items-center gap-xs">
                <span
                  aria-hidden
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: summary.color }}
                />
                <span className="truncate text-caption text-pace-text-primary">
                  {summary.category.name}
                </span>
              </div>
              <span className="shrink-0 text-caption font-semibold text-pace-text-secondary">
                {summary.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
