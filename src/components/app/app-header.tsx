import type { ReactNode } from "react";
import { ArrowLeft, Bell, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";

type AppHeaderProps = {
  title?: string;
  greeting?: string;
  userName?: string;
  showBackButton?: boolean;
  notificationCount?: number;
  action?: ReactNode;
  onBack?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
};

export function AppHeader({
  action,
  greeting,
  notificationCount = 0,
  onBack,
  onNotificationClick,
  onProfileClick,
  showBackButton = false,
  title,
  userName,
}: AppHeaderProps) {
  return (
    <header className="flex min-h-[72px] items-center justify-between gap-md bg-pace-background px-md py-md">
      <div className="flex min-w-0 items-center gap-sm">
        {showBackButton ? (
          <button
            aria-label="Back"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pace-surface text-pace-text-primary shadow-card"
            onClick={onBack}
            type="button"
          >
            <ArrowLeft aria-hidden className="size-5" />
          </button>
        ) : null}
        <div className="min-w-0">
          {greeting ? (
            <p className="truncate text-caption text-pace-text-secondary">
              {greeting}
            </p>
          ) : null}
          <h1 className="truncate text-h2">
            {title ?? (userName ? `Hi, ${userName}` : "PACE")}
          </h1>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-sm">
        {action}
        {onNotificationClick ? (
          <button
            aria-label="Open notifications"
            className="relative flex size-11 items-center justify-center rounded-full bg-pace-surface text-pace-text-primary shadow-card"
            onClick={onNotificationClick}
            type="button"
          >
            <Bell aria-hidden className="size-5" />
            {notificationCount > 0 ? (
              <span
                className={cn(
                  "absolute right-2 top-2 size-2.5 rounded-full bg-pace-primary",
                )}
              />
            ) : null}
          </button>
        ) : null}
        {onProfileClick ? (
          <button
            aria-label="Open profile"
            className="flex size-11 items-center justify-center rounded-full bg-pace-secondary text-pace-text-primary"
            onClick={onProfileClick}
            type="button"
          >
            <UserRound aria-hidden className="size-5" />
          </button>
        ) : null}
      </div>
    </header>
  );
}
