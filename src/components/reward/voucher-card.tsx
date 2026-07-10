import Image from "next/image";
import { Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { VoucherStatus } from "@/types/finance";

type VoucherCardProps = {
  brandName: string;
  brandLogo?: string;
  title: string;
  pigCoinCost: number;
  expiredDate: string;
  status: VoucherStatus | "Redeemed";
  onClick?: () => void;
};

export function VoucherCard({
  brandLogo,
  brandName,
  expiredDate,
  onClick,
  pigCoinCost,
  status,
  title,
}: VoucherCardProps) {
  const isDisabled = status === "Expired" || status === "OutOfStock";

  return (
    <Card
      as="article"
      className={cn(
        "flex items-center gap-md",
        onClick && "cursor-pointer active:scale-[0.99]",
        isDisabled && "opacity-60",
      )}
      onClick={onClick}
    >
      <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-card bg-pace-background">
        {brandLogo ? (
          <Image alt={brandName} height={56} src={brandLogo} width={56} />
        ) : (
          <Gift aria-hidden className="size-7 text-pace-primary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-sm">
          <p className="truncate text-caption text-pace-text-secondary">
            {brandName}
          </p>
          <span className="rounded-button bg-pace-secondary px-sm py-xs text-caption text-pace-text-primary">
            {pigCoinCost}
          </span>
        </div>
        <h2 className="mt-xs line-clamp-2 text-body font-semibold">{title}</h2>
        <div className="mt-xs flex items-center justify-between gap-sm">
          <p className="text-caption text-pace-text-secondary">
            Exp: {expiredDate}
          </p>
          <p
            className={cn(
              "text-caption",
              status === "Active" && "text-pace-success",
              status === "Redeemed" && "text-pace-primary",
              status === "OutOfStock" && "text-pace-warning",
              status === "Expired" && "text-pace-danger",
            )}
          >
            {status}
          </p>
        </div>
      </div>
    </Card>
  );
}
