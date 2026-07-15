import { Card } from "@/components/ui/card";
import { formatVnd } from "@/lib/finance/amount";
import type { ReportCategorySummary } from "@/features/report/lib/report-service";

type CategoryPieChartProps = {
  summaries: ReportCategorySummary[];
  totalSpending: number;
};

// CMP-017 Category Pie Chart (Donut Chart)
// Vẽ bằng CSS conic-gradient (không cần thêm thư viện chart ngoài) để tránh
// rủi ro thiếu dependency khi build. Mỗi Category giữ nguyên màu cố định
// (tính từ report-service) xuyên suốt toàn ứng dụng.
//
// Layout: Total Spending (label + số tiền lớn) ở trên -> Donut Chart canh giữa
// (lỗ rỗng ở giữa, không hiển thị chữ/số bên trong) -> Legend dạng danh sách
// đầy đủ chiều rộng bên dưới, mỗi dòng: tên Category + Amount (luôn hiển thị)
// ở bên trái, Percentage bên phải.
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
      <div className="flex flex-col items-center">
        <div className="w-full">
          <p className="text-caption text-pace-text-secondary">Tổng chi tiêu</p>
          <p className="mt-xs text-h2 font-extrabold text-pace-text-primary">
            {formatVnd(totalSpending)}
          </p>
        </div>

        <div className="relative my-lg shrink-0" style={{ width: 200, height: 200 }}>
          <div
            aria-hidden
            className="size-full rounded-full"
            style={{ backgroundImage: gradient }}
          />
          <div aria-hidden className="absolute inset-[26%] rounded-full bg-pace-surface" />
        </div>

        <div className="w-full space-y-lg">
          {summaries.map((summary) => (
            <div
              className="flex items-start justify-between gap-md"
              key={summary.category.id}
            >
              <div className="flex min-w-0 items-start gap-sm">
                <span
                  aria-hidden
                  className="mt-1 size-3.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: summary.color }}
                />
                <div className="min-w-0">
                  <p className="truncate text-body font-semibold text-pace-text-primary">
                    {summary.category.name}
                  </p>
                  <p className="text-caption text-pace-text-secondary">
                    {formatVnd(summary.totalSpending)}
                  </p>
                </div>
              </div>
              <p className="shrink-0 text-body font-semibold text-pace-text-primary">
                {summary.percentage}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
