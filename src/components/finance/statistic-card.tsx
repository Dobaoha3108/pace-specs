import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type StatisticCardProps = {
  title: string;
  value: string;
  comparison?: string;
  trend?: "up" | "down" | "flat";
  icon?: ReactNode;
  onClick?: () => void;
};

export function StatisticCard({
  comparison,
  icon,
  onClick,
  title,
  trend = "flat",
  value,
}: StatisticCardProps) {
  return (
    <Card
      as="article"
      className={cn(onClick && "cursor-pointer active:scale-[0.99]")}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-md">
        <p className="text-caption text-pace-text-secondary">{title}</p>
        {icon}
      </div>
      <p className="mt-xs text-title">{value}</p>
      {comparison ? (
        <p
          className={cn(
            "mt-xs text-caption",
            trend === "up" && "text-pace-success",
            trend === "down" && "text-pace-danger",
            trend === "flat" && "text-pace-text-secondary",
          )}
        >
          {comparison}
        </p>
      ) : null}
    </Card>
  );
}
