import {
  BarChart3,
  Gift,
  Home,
  MessageCircle,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type BottomNavItemId =
  | "dashboard"
  | "report"
  | "add-expense"
  | "reward"
  | "pig-pig";

type BottomNavItem = {
  id: BottomNavItemId;
  label: string;
  icon: LucideIcon;
};

const items: BottomNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "report", label: "Report", icon: BarChart3 },
  { id: "add-expense", label: "Add", icon: Plus },
  { id: "reward", label: "Reward", icon: Gift },
  { id: "pig-pig", label: "Pig Pig", icon: MessageCircle },
];

type BottomNavProps = {
  activeItem?: BottomNavItemId;
  onNavigate?: (item: BottomNavItemId) => void;
};

export function BottomNav({
  activeItem = "dashboard",
  onNavigate,
}: BottomNavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="absolute inset-x-0 bottom-0 border-t border-pace-border bg-pace-surface px-md pb-md pt-sm"
    >
      <ul className="grid grid-cols-5 gap-sm">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeItem;
          const isAddAction = item.id === "add-expense";

          return (
            <li key={item.id}>
              <button
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-[52px] w-full flex-col items-center justify-center gap-xs rounded-button text-caption transition-colors duration-micro",
                  isAddAction &&
                    "bg-pace-primary text-white shadow-floating active:scale-[0.98]",
                  !isAddAction &&
                    (isActive
                      ? "text-pace-primary"
                      : "text-pace-text-secondary hover:text-pace-text-primary"),
                  isAddAction && !isActive && "hover:bg-pace-primary/90",
                  isAddAction && isActive && "bg-pace-primary text-white",
                )}
                onClick={() => onNavigate?.(item.id)}
                type="button"
              >
                <Icon
                  aria-hidden
                  className={cn("size-6", isAddAction && "size-7")}
                  strokeWidth={2.4}
                />
                <span
                  className={cn(
                    isAddAction && "sr-only",
                    !isAddAction && "block",
                  )}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
