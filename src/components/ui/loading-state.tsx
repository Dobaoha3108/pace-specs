import { cn } from "@/lib/cn";

type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({ className, label = "Loading" }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-32 w-full flex-col items-center justify-center gap-md rounded-card bg-pace-surface p-5 text-center",
        className,
      )}
      role="status"
    >
      <span
        aria-hidden
        className="size-8 animate-spin rounded-full border-4 border-pace-border border-t-pace-primary"
      />
      <p className="text-caption text-pace-text-secondary">{label}</p>
    </div>
  );
}
