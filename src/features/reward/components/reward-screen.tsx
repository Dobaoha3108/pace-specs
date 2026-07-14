"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronRight, Gift, TicketCheck } from "lucide-react";
import { AppHeader } from "@/components/app/app-header";
import { BottomNav } from "@/components/app/bottom-nav";
import { MobileFrame } from "@/components/app/mobile-frame";
import { VoucherCard } from "@/components/reward/voucher-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { formatNumber } from "@/lib/finance/amount";
import {
  ensureRewardSeedData,
  getCurrentRewardUser,
  getRewardWallet,
  isVoucherRedeemable,
  listRewardVouchers,
  listUserRewards,
  markRewardAsUsed,
  redeemVoucher,
  type RewardVoucher,
} from "@/features/reward/lib/reward-service";
import type { DashboardNavigationTarget } from "@/features/dashboard/types";
import type { UserReward } from "@/types/finance";

type RewardMode = "marketplace" | "voucher-detail" | "my-voucher" | "reward-detail";

type RewardScreenProps = {
  mode: RewardMode;
  selectedRewardId?: string;
  selectedVoucherId?: string;
  onBack: () => void;
  onNavigate: (target: DashboardNavigationTarget, id?: string) => void;
};

export function RewardScreen({
  mode,
  onBack,
  onNavigate,
  selectedRewardId,
  selectedVoucherId,
}: RewardScreenProps) {
  const user = getCurrentRewardUser();
  const [, setRefreshKey] = useState(0);

  if (user) {
    ensureRewardSeedData(user.id);
  }

  const wallet = user ? getRewardWallet(user.id) : undefined;
  const vouchers = listRewardVouchers();
  const userRewards = user ? listUserRewards(user.id) : [];
  const selectedVoucher =
    vouchers.find((voucher) => voucher.id === selectedVoucherId) ?? vouchers[0];
  const selectedReward =
    userRewards.find((reward) => reward.id === selectedRewardId) ?? userRewards[0];
  const selectedRewardVoucher = selectedReward
    ? vouchers.find((voucher) => voucher.id === selectedReward.voucherId)
    : undefined;
  const title =
    mode === "voucher-detail"
      ? "Voucher Detail"
      : mode === "my-voucher"
        ? "My Voucher"
        : mode === "reward-detail"
          ? "Redeemed Voucher"
          : "Reward Marketplace";

  function refresh() {
    setRefreshKey((value) => value + 1);
  }

  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        <AppHeader onBack={onBack} showBackButton title={title} />
        <div className="flex-1 overflow-y-auto px-md pb-[104px] pt-md">
          {!user || !wallet ? (
            <EmptyState
              description="Please finish onboarding before using Reward Marketplace."
              title="No Pig Coin Wallet"
            />
          ) : mode === "voucher-detail" && selectedVoucher ? (
            <VoucherDetail
              onRedeemed={(reward) => onNavigate("reward-detail", reward.id)}
              userId={user.id}
              voucher={selectedVoucher}
              walletBalance={wallet.balance}
            />
          ) : mode === "my-voucher" ? (
            <MyVoucher
              onExplore={() => onNavigate("reward")}
              onOpen={(reward) => onNavigate("reward-detail", reward.id)}
              rewards={userRewards}
              vouchers={vouchers}
            />
          ) : mode === "reward-detail" && selectedReward && selectedRewardVoucher ? (
            <RedeemedVoucherDetail
              onChanged={refresh}
              reward={selectedReward}
              voucher={selectedRewardVoucher}
            />
          ) : (
            <RewardMarketplace
              onMyVoucher={() => onNavigate("my-voucher")}
              onOpen={(voucher) => onNavigate("voucher-detail", voucher.id)}
              vouchers={vouchers}
              walletBalance={wallet.balance}
            />
          )}
        </div>
        <BottomNav activeItem="reward" onNavigate={onNavigate} />
      </div>
    </MobileFrame>
  );
}

function RewardMarketplace({
  onMyVoucher,
  onOpen,
  vouchers,
  walletBalance,
}: {
  onMyVoucher: () => void;
  onOpen: (voucher: RewardVoucher) => void;
  vouchers: RewardVoucher[];
  walletBalance: number;
}) {
  return (
    <div className="space-y-lg">
      <Card className="relative h-[235px] overflow-hidden bg-[#FFE6EA]">
        <div className="flex h-full items-stretch gap-md">
          <div className="flex w-[54%] flex-col justify-between gap-sm py-xs">
            <div className="space-y-sm">
             <p className="whitespace-nowrap text-[20px] font-bold text-pace-text-primary">
  Pig Coin của bạn
</p>
              <div className="flex items-center gap-sm">
                <Image
                  alt="Pig Coin"
                  className="h-[58px] w-[58px]"
                  height={58}
                  src="/assets/icons/pig_coin.png"
                  width={58}
                />
                <div>
                  <p className="text-[44px] font-extrabold leading-none text-pace-text-primary">
                    {formatNumber(walletBalance)}
                  </p>
                  <p className="mt-xs text-caption text-pace-text-secondary">
                    Pig Coin
                  </p>
                </div>
              </div>
            </div>
          </div>
         <div className="flex h-full w-[46%] items-center justify-end overflow-visible">
  <Image
    alt="Pig Pig"
    className="h-[230px] w-[230px] max-w-none translate-x-4 object-contain"
    height={230}
    src="/assets/pig-pig/pig_default.png"
    width={230}
  />
</div>
        </div>
      </Card>
      <Button
        leadingIcon={<TicketCheck aria-hidden className="size-5" />}
        onClick={onMyVoucher}
        variant="secondary"
      >
        My Voucher
      </Button>
      <section className="space-y-md">
        <h2 className="text-subtitle">Voucher List</h2>
        {vouchers.length === 0 ? (
          <EmptyState
            description="Không thể tải danh sách Voucher."
            title="No Voucher"
          />
        ) : (
          <div className="space-y-md">
            {vouchers.map((voucher) => (
              <VoucherCard
                brandLogo={voucher.brandLogo}
                brandName={voucher.brandName}
                expiredDate={formatDate(voucher.expiredDate)}
                key={voucher.id}
                onClick={() => onOpen(voucher)}
                pigCoinCost={voucher.pigCoinCost}
                status={voucher.status}
                title={voucher.title}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function VoucherDetail({
  onRedeemed,
  userId,
  voucher,
  walletBalance,
}: {
  onRedeemed: (reward: UserReward) => void;
  userId: string;
  voucher: RewardVoucher;
  walletBalance: number;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const canRedeem = isVoucherRedeemable(voucher) && walletBalance >= voucher.pigCoinCost;

  function confirmRedeem() {
    try {
      const reward = redeemVoucher(userId, voucher);
      setConfirmOpen(false);
      onRedeemed(reward);
    } catch {
      setConfirmOpen(false);
      setErrorMessage("Không thể đổi Voucher.");
    }
  }

  return (
    <div className="space-y-lg">
      <VoucherHero voucher={voucher} />
      <VoucherBody voucher={voucher} />
      {!canRedeem ? (
        <p className="text-caption text-pace-danger">
          Bạn chưa đủ Pig Coin để đổi Voucher này hoặc Voucher không khả dụng.
        </p>
      ) : null}
      <Button
        disabled={!canRedeem}
        leadingIcon={<Gift aria-hidden className="size-5" />}
        onClick={() => setConfirmOpen(true)}
      >
        Đổi ngay
      </Button>
      <ConfirmationDialog
        confirmLabel="Đổi ngay"
        isOpen={confirmOpen}
        message={`Redeem this voucher for ${voucher.pigCoinCost} Pig Coins?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmRedeem}
        title="Redeem Voucher?"
      />
      <ConfirmationDialog
        confirmLabel="Thử lại"
        isOpen={Boolean(errorMessage)}
        message={errorMessage}
        onCancel={() => setErrorMessage(undefined)}
        onConfirm={() => setErrorMessage(undefined)}
        title="Redeem Failed"
      />
    </div>
  );
}

function MyVoucher({
  onExplore,
  onOpen,
  rewards,
  vouchers,
}: {
  onExplore: () => void;
  onOpen: (reward: UserReward) => void;
  rewards: UserReward[];
  vouchers: RewardVoucher[];
}) {
  const groupedRewards = useMemo(
    () => ({
      Available: rewards.filter((reward) => reward.status === "Available"),
      Used: rewards.filter((reward) => reward.status === "Used"),
      Expired: rewards.filter((reward) => reward.status === "Expired"),
    }),
    [rewards],
  );

  if (rewards.length === 0) {
    return (
      <EmptyState
        actionLabel="Khám phá Voucher"
        description="Bạn chưa đổi Voucher nào."
        onAction={onExplore}
        title="My Voucher Empty"
      />
    );
  }

  return (
    <div className="space-y-lg">
      {Object.entries(groupedRewards).map(([status, statusRewards]) => (
        <section className="space-y-md" key={status}>
          <h2 className="text-subtitle">{status}</h2>
          {statusRewards.length === 0 ? (
            <Card>
              <p className="text-body text-pace-text-secondary">
                No {status.toLowerCase()} voucher.
              </p>
            </Card>
          ) : (
            <div className="space-y-md">
              {statusRewards.map((reward) => {
                const voucher = vouchers.find(
                  (item) => item.id === reward.voucherId,
                );

                if (!voucher) {
                  return null;
                }

                return (
                  <VoucherCard
                    brandLogo={voucher.brandLogo}
                    brandName={voucher.brandName}
                    expiredDate={formatDate(reward.expiredAt ?? voucher.expiredDate)}
                    key={reward.id}
                    onClick={() => onOpen(reward)}
                    pigCoinCost={voucher.pigCoinCost}
                    status="Redeemed"
                    title={voucher.title}
                  />
                );
              })}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function RedeemedVoucherDetail({
  onChanged,
  reward,
  voucher,
}: {
  onChanged: () => void;
  reward: UserReward;
  voucher: RewardVoucher;
}) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  function markAsUsed() {
    try {
      markRewardAsUsed(reward);
      onChanged();
    } catch {
      setErrorMessage("Không thể cập nhật Voucher.");
    }
  }

  return (
    <div className="space-y-lg">
      <VoucherHero voucher={voucher} />
      <Card>
        <div className="space-y-sm">
          <DetailRow label="Voucher Code" value={reward.voucherCode} />
          <DetailRow label="Status" value={reward.status} />
          <DetailRow
            label="Expired Date"
            value={formatDate(reward.expiredAt ?? voucher.expiredDate)}
          />
        </div>
      </Card>
      <VoucherBody voucher={voucher} />
      {reward.status === "Available" ? (
        <Button onClick={markAsUsed} variant="secondary">
          Mark as Used
        </Button>
      ) : null}
      <ConfirmationDialog
        confirmLabel="Thử lại"
        isOpen={Boolean(errorMessage)}
        message={errorMessage}
        onCancel={() => setErrorMessage(undefined)}
        onConfirm={() => setErrorMessage(undefined)}
        title="Update Failed"
      />
    </div>
  );
}

function VoucherHero({ voucher }: { voucher: RewardVoucher }) {
  return (
    <Card>
      <div className="flex items-center gap-md">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-card bg-pace-secondary text-pace-primary">
          <Gift aria-hidden className="size-8" />
        </div>
        <div className="min-w-0">
          <p className="text-caption text-pace-text-secondary">
            {voucher.brandName}
          </p>
          <h1 className="mt-xs text-title">{voucher.title}</h1>
        </div>
      </div>
      <div className="mt-lg grid grid-cols-2 gap-md">
        <DetailPill label="Pig Coin" value={String(voucher.pigCoinCost)} />
        <DetailPill label="Expired" value={formatDate(voucher.expiredDate)} />
      </div>
    </Card>
  );
}

function VoucherBody({ voucher }: { voucher: RewardVoucher }) {
  return (
    <Card>
      <div className="space-y-md">
        <div>
          <p className="text-caption text-pace-text-secondary">Chi tiết ưu đãi</p>
          <p className="mt-xs text-body">{voucher.description}</p>
        </div>
        <div>
          <p className="text-caption text-pace-text-secondary">
            Điều khoản & Điều kiện
          </p>
          <ul className="mt-xs space-y-xs text-body text-pace-text-primary">
            {voucher.terms.map((term) => (
              <li key={term}>- {term}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card bg-pace-background p-md">
      <p className="text-caption text-pace-text-secondary">{label}</p>
      <p className="mt-xs text-body font-semibold">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-md border-b border-pace-border py-sm last:border-b-0">
      <span className="text-pace-text-secondary">{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateValue));
}
