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
     <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-pace-background">
  {brandLogo ? (
    <Image
      alt={brandName}
      className="h-full w-full object-contain p-1"
      height={68}
      src={brandLogo}
      width={68}
    />
  ) : (
    <Gift aria-hidden className="size-7 text-pace-primary" />
  )}
</div>
     <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] gap-x-3 self-stretch">
  {/* Phần nội dung ở giữa */}
  <div className="flex min-w-0 flex-col">
    <p className="truncate text-[18px] font-bold text-black">
      {brandName}
    </p>

    <h2 className="mt-1 line-clamp-2 break-words pr-1 text-[14px] font-semibold leading-5 text-[#777777]">
      {title}
    </h2>

    <p className="mt-auto pt-2 text-[13px] text-pace-text-secondary">
      Exp: {expiredDate}
    </p>
  </div>

  {/* Cột số coin và nút đổi bên phải */}
  <div className="flex shrink-0 flex-col items-center justify-center gap-2">
 <div className="flex items-center gap-0">
  <span className="text-[22px] font-extrabold leading-none text-[#F21383]">
    {pigCoinCost}
  </span>

  <Image
    alt="Pig Coin"
    className="-ml-2 h-[60px] w-[60px] max-w-none shrink-0 object-contain"
    height={60}
    src="/assets/icons/pig_coin.png"
    width={60}
  />
</div>

    {status === "Active" ? (
      <button
        className="whitespace-nowrap rounded-full border-2 border-[#B96363] bg-[#FFC3C3] px-4 py-2 text-[16px] font-bold leading-none text-[#B96363]"
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
