import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  as?: "article" | "div" | "section";
};

export function Card({
  as: Component = "section",
  className,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "w-full rounded-card bg-pace-surface p-5 shadow-card",
        className,
      )}
      {...props}
    />
  );
}
