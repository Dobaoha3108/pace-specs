import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    error,
    helperText,
    id,
    label,
    leftAddon,
    rightAddon,
    type = "text",
    ...props
  },
  ref,
) {
  const inputId = id ?? props.name;
  const helperId = inputId ? `${inputId}-helper` : undefined;
  const errorId = inputId ? `${inputId}-error` : undefined;

  return (
    <label className="block w-full" htmlFor={inputId}>
      <span className="mb-xs block text-caption text-pace-text-secondary">
        {label}
      </span>
      <span
        className={cn(
          "flex h-14 items-center gap-sm rounded-input bg-pace-background px-md ring-1 ring-pace-border transition duration-micro focus-within:bg-pace-surface focus-within:ring-pace-primary",
          error && "ring-pace-danger focus-within:ring-pace-danger",
          props.disabled && "cursor-not-allowed opacity-50",
        )}
      >
        {leftAddon ? (
          <span className="shrink-0 text-body text-pace-text-secondary">
            {leftAddon}
          </span>
        ) : null}
        <input
          aria-describedby={error ? errorId : helperId}
          aria-invalid={Boolean(error)}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-body text-pace-text-primary outline-none placeholder:text-pace-text-secondary",
            className,
          )}
          id={inputId}
          ref={ref}
          type={type}
          {...props}
        />
        {rightAddon ? (
          <span className="shrink-0 text-body text-pace-text-secondary">
            {rightAddon}
          </span>
        ) : null}
      </span>
      {error ? (
        <span className="mt-xs block text-caption text-pace-danger" id={errorId}>
          {error}
        </span>
      ) : helperText ? (
        <span
          className="mt-xs block text-caption text-pace-text-secondary"
          id={helperId}
        >
          {helperText}
        </span>
      ) : null}
    </label>
  );
});
