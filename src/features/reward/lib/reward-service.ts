import { createId } from "@/lib/id";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";
import type {
  Notification,
  PigCoinWallet,
  User,
  UserReward,
  Voucher,
} from "@/types/finance";

export type RewardVoucher = Voucher & {
  terms: string[];
  voucherCode: string;
};

const mockVouchers: RewardVoucher[] = [
  {
    id: "voucher-highlands-20k",
    brandName: "Highlands Coffee",
    title: "Giam 20.000d cho hoa don tu 60.000d",
    description: "Voucher danh rieng cho khach hang than thiet cua PACE.",
    pigCoinCost: 50,
    expiredDate: "2026-12-31",
    status: "Active",
    quantity: 99,
    voucherCode: "PACE-HL20K-2026",
    terms: [
      "Ap dung tai tat ca cua hang Highlands Coffee.",
      "Khong ap dung dong thoi voi cac chuong trinh khuyen mai khac.",
      "Khong quy doi thanh tien mat.",
      "Moi voucher chi su dung mot lan.",
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "voucher-cgv-30k",
    brandName: "CGV",
    title: "Giam 30.000d ve xem phim",
    description: "Voucher danh rieng cho khach hang than thiet cua PACE.",
    pigCoinCost: 80,
    expiredDate: "2026-12-31",
    status: "Active",
    quantity: 99,
    voucherCode: "PACE-CGV30K-2026",
    terms: [
      "Ap dung tai cac cum rap CGV.",
      "Khong ap dung cho suat chieu dac biet.",
      "Khong quy doi thanh tien mat.",
      "Moi voucher chi su dung mot lan.",
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "voucher-circlek-15k",
    brandName: "Circle K",
    title: "Giam 15.000d cho hoa don tu 50.000d",
    description: "Voucher danh rieng cho khach hang than thiet cua PACE.",
    pigCoinCost: 40,
    expiredDate: "2026-12-31",
    status: "Active",
    quantity: 99,
    voucherCode: "PACE-CK15K-2026",
    terms: [
      "Ap dung cho mua truc tiep tai cua hang.",
      "Khong ap dung voi thuoc la va the cao.",
      "Khong quy doi thanh tien mat.",
      "Moi voucher chi su dung mot lan.",
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "voucher-mixue-10k",
    brandName: "Mixue",
    title: "Giam 10.000d cho do uong bat ky",
    description: "Voucher danh rieng cho khach hang than thiet cua PACE.",
    pigCoinCost: 30,
    expiredDate: "2026-12-31",
    status: "Active",
    quantity: 99,
    voucherCode: "PACE-MX10K-2026",
    terms: [
      "Ap dung tai cac cua hang Mixue tham gia chuong trinh.",
      "Khong ap dung dong thoi voi chuong trinh giam gia khac.",
      "Khong quy doi thanh tien mat.",
      "Moi voucher chi su dung mot lan.",
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "voucher-shopeefood-25k",
    brandName: "ShopeeFood",
    title: "Freeship 25.000d",
    description: "Voucher danh rieng cho khach hang than thiet cua PACE.",
    pigCoinCost: 60,
    expiredDate: "2026-12-31",
    status: "Active",
    quantity: 99,
    voucherCode: "PACE-SF25K-2026",
    terms: [
      "Ap dung cho don hang du dieu kien.",
      "Khong ap dung cung voucher freeship khac.",
      "Khong quy doi thanh tien mat.",
      "Moi voucher chi su dung mot lan.",
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export function getCurrentRewardUser(): User | undefined {
  return paceLocalDataSource
    .users
    .list()
    .find((user) => user.onboardingCompleted);
}

export function ensureRewardSeedData(userId: string) {
  const existingVouchers = paceLocalDataSource.vouchers.list();

  if (existingVouchers.length === 0) {
    paceLocalDataSource.vouchers.replaceAll(mockVouchers);
  }

  const existingWallet = paceLocalDataSource
    .pigCoinWallets
    .list()
    .find((wallet) => wallet.userId === userId);

  if (existingWallet) {
    if (
      existingWallet.balance === 0 &&
      existingWallet.totalEarned === 0 &&
      existingWallet.totalSpent === 0
    ) {
      paceLocalDataSource.pigCoinWallets.upsert({
        ...existingWallet,
        balance: 500,
        totalEarned: 500,
        updatedAt: new Date().toISOString(),
      });
    }

    return;
  }

  const now = new Date().toISOString();

  paceLocalDataSource.pigCoinWallets.upsert({
    id: createId(),
    userId,
    balance: 500,
    totalEarned: 500,
    totalSpent: 0,
    createdAt: now,
    updatedAt: now,
  });
}

export function getRewardWallet(userId: string): PigCoinWallet | undefined {
  return paceLocalDataSource
    .pigCoinWallets
    .list()
    .find((wallet) => wallet.userId === userId);
}

export function listRewardVouchers(): RewardVoucher[] {
  return paceLocalDataSource.vouchers.list() as RewardVoucher[];
}

export function listUserRewards(userId: string): UserReward[] {
  return paceLocalDataSource
    .userRewards
    .list()
    .filter((reward) => reward.userId === userId)
    .map(normalizeExpiredReward)
    .sort(
      (a, b) => new Date(b.redeemedAt).getTime() - new Date(a.redeemedAt).getTime(),
    );
}

export function redeemVoucher(
  userId: string,
  voucher: RewardVoucher,
): UserReward {
  const wallet = getRewardWallet(userId);
  const now = new Date().toISOString();

  if (!wallet) {
    throw new Error("Pig Coin wallet is required.");
  }

  if (!isVoucherRedeemable(voucher) || wallet.balance < voucher.pigCoinCost) {
    throw new Error("Voucher cannot be redeemed.");
  }

  paceLocalDataSource.pigCoinWallets.upsert({
    ...wallet,
    balance: wallet.balance - voucher.pigCoinCost,
    totalSpent: wallet.totalSpent + voucher.pigCoinCost,
    updatedAt: now,
  });

  const reward: UserReward = {
    id: createId(),
    userId,
    voucherId: voucher.id,
    voucherCode: voucher.voucherCode,
    status: "Available",
    redeemedAt: now,
    expiredAt: voucher.expiredDate,
  };

  paceLocalDataSource.userRewards.upsert(reward);
  paceLocalDataSource.notifications.upsert(createRedeemNotification(userId, reward.id));

  return reward;
}

export function markRewardAsUsed(reward: UserReward): UserReward {
  const updatedReward: UserReward = {
    ...reward,
    status: "Used",
    usedAt: new Date().toISOString(),
  };

  paceLocalDataSource.userRewards.upsert(updatedReward);
  return updatedReward;
}

export function isVoucherRedeemable(voucher: RewardVoucher) {
  return voucher.status === "Active" && new Date(voucher.expiredDate).getTime() >= Date.now();
}

function normalizeExpiredReward(reward: UserReward) {
  if (
    reward.status === "Available" &&
    reward.expiredAt &&
    new Date(reward.expiredAt).getTime() < Date.now()
  ) {
    const updatedReward: UserReward = {
      ...reward,
      status: "Expired",
    };

    paceLocalDataSource.userRewards.upsert(updatedReward);
    return updatedReward;
  }

  return reward;
}

function createRedeemNotification(
  userId: string,
  rewardId: string,
): Notification {
  return {
    id: createId(),
    userId,
    title: "Redeem voucher successful",
    message: "Your voucher is ready in My Voucher.",
    type: "Voucher",
    deepLinkTarget: "reward-detail",
    relatedEntityId: rewardId,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
}
