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
          <p className="truncate text-[18px] font-bold text-black">
        {brandName}
            </p>
         <div className="flex shrink-0 items-center gap-1">
  <span className="text-[22px] font-extrabold leading-none text-[#F21383]">
    {pigCoinCost}
  </span>

  <Image
    alt="Pig Coin"
    className="h-7 w-7 object-contain"
    height={28}
    src="/assets/icons/pig_coin.png"
    width={28}
  />
</div>
        </div>
        <h2 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-5 text-[#777777]">
  {title}
</h2>
        <div className="mt-xs flex items-center justify-between gap-sm">
          <p className="text-caption text-pace-text-secondary">
            Exp: {expiredDate}
          </p>
        {status === "Active" ? (
  <button
    className="shrink-0 rounded-full border-2 border-[#B96363] bg-[#FFC3C3] px-4 py-1.5 text-[16px] font-bold leading-none text-[#B96363]"
    onClick={(event) => {
      event.stopPropagation();
      onClick?.();
    }}
    type="button"
  >
    Đổi ngay
  </button>
) : (
  <p
    className={cn(
      "text-caption font-semibold",
      status === "Redeemed" && "text-pace-primary",
      status === "OutOfStock" && "text-pace-warning",
      status === "Expired" && "text-pace-danger",
    )}
  >
    {status}
  </p>
)}
        </div>
      </div>
    </Card>
  );
}
