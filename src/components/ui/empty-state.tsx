import type { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  illustrationSrc?: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
};

export function EmptyState({
  actionLabel,
  children,
  description,
  illustrationSrc,
  onAction,
  title,
}: EmptyStateProps) {
  return (
    <section className="flex w-full flex-col items-center rounded-card bg-pace-surface p-5 text-center shadow-card">
      {illustrationSrc ? (
        <Image
          alt=""
          className="mb-md"
          height={128}
          src={illustrationSrc}
          width={128}
        />
      ) : null}
      <h2 className="text-title">{title}</h2>
      <p className="mt-xs text-body text-pace-text-secondary">{description}</p>
      {children}
      {actionLabel && onAction ? (
        <Button className="mt-lg" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </section>
  );
}
