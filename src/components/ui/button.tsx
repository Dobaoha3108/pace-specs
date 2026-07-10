import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
};

export function Button({
  className,
  children,
  disabled,
  isLoading = false,
  leadingIcon,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-14 w-full items-center justify-center gap-sm rounded-button px-md text-body font-semibold transition duration-micro active:scale-[0.98] disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-50",
        variant === "primary" &&
          "bg-pace-primary text-white shadow-floating hover:bg-pace-primary/90",
        variant === "secondary" &&
          "border border-pace-primary bg-pace-surface text-pace-primary active:bg-blue-50",
        variant === "ghost" &&
          "bg-transparent text-pace-primary active:bg-blue-50",
        variant === "danger" &&
          "bg-pace-danger text-white shadow-floating hover:bg-pace-danger/90",
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      type={type}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden
          className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        leadingIcon
      )}
      <span>{children}</span>
    </button>
  );
}
