import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type BottomSheetProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  onClose: () => void;
};

export function BottomSheet({
  children,
  isOpen,
  onClose,
  onPrimary,
  onSecondary,
  primaryLabel,
  secondaryLabel,
  title,
}: BottomSheetProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="absolute inset-0 z-40 flex items-end bg-pace-text-primary/35"
      role="dialog"
    >
      <section className="w-full rounded-t-sheet bg-pace-surface px-md pb-lg pt-sm shadow-dialog">
        <div className="mx-auto mb-md h-1 w-12 rounded-full bg-pace-border" />
        <div className="mb-md flex items-center justify-between gap-md">
          <h2 className="text-title">{title}</h2>
          <button
            aria-label="Close"
            className="flex size-11 items-center justify-center rounded-full text-pace-text-secondary"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <div className="max-h-[520px] overflow-y-auto">{children}</div>
        {primaryLabel || secondaryLabel ? (
          <div className="mt-lg space-y-md">
            {primaryLabel && onPrimary ? (
              <Button onClick={onPrimary}>{primaryLabel}</Button>
            ) : null}
            {secondaryLabel && onSecondary ? (
              <Button onClick={onSecondary} variant="secondary">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
