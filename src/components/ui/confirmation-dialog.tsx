import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type ConfirmationDialogProps = {
  isOpen: boolean;
  title: string;
  message: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  isConfirmLoading?: boolean;
  confirmVariant?: "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationDialog({
  cancelLabel = "Cancel",
  confirmLabel,
  confirmVariant = "primary",
  isConfirmLoading = false,
  isOpen,
  message,
  onCancel,
  onConfirm,
  title,
}: ConfirmationDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="absolute inset-0 z-50 flex items-center justify-center bg-pace-text-primary/35 px-md"
      role="dialog"
    >
      <div className="w-full rounded-dialog bg-pace-surface p-5 text-center shadow-dialog">
        <h2 className="text-title">{title}</h2>
        <div className="mt-sm text-body text-pace-text-secondary">{message}</div>
        <div className={cn("mt-lg grid gap-md", "grid-cols-1")}>
          <Button
            isLoading={isConfirmLoading}
            onClick={onConfirm}
            variant={confirmVariant}
          >
            {confirmLabel}
          </Button>
          <Button onClick={onCancel} variant="secondary">
            {cancelLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
