import { cn } from "@/lib/cn";

type ProgressProps = {
  value: number;
  max?: number;
  tone?: "primary" | "success" | "warning" | "danger" | "coin";
  className?: string;
};

export function Progress({
  value,
  max = 100,
  tone = "primary",
  className,
}: ProgressProps) {
  const percentage = max <= 0 ? 0 : (value / max) * 100;
  const normalizedValue = Math.min(100, Math.max(0, percentage));

  return (
    <div
      className={cn("h-3 overflow-hidden rounded-full bg-pace-border", className)}
      role="progressbar"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={normalizedValue}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-card ease-in-out",
          tone === "primary" && "bg-pace-primary",
          tone === "success" && "bg-pace-success",
          tone === "warning" && "bg-pace-warning",
          tone === "danger" && "bg-pace-danger",
          tone === "coin" && "bg-pace-secondary",
        )}
        style={{ width: `${normalizedValue}%` }}
      />
    </div>
  );
}
