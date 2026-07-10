import { createId } from "@/lib/id";
import { paceLocalDataSource } from "@/lib/storage/pace-storage";
import type { Notification, NotificationType, User } from "@/types/finance";

export function getNotificationUser(): User | undefined {
  return paceLocalDataSource
    .users
    .list()
    .find((user) => user.onboardingCompleted);
}

export function ensureMockNotifications(userId: string) {
  const existingNotifications = paceLocalDataSource
    .notifications
    .list()
    .filter((notification) => notification.userId === userId);

  if (existingNotifications.length > 0) {
    return;
  }

  const mockNotifications: Notification[] = [
    {
      id: createId(),
      userId,
      title: "Chúc mừng!",
      message: 'Bạn đã hoàn thành Saving Goal "MacBook Air".',
      type: "SavingGoal",
      deepLinkTarget: "saving-goal-detail",
      isRead: false,
      createdAt: "2026-06-19T09:30:00.000Z",
    },
    {
      id: createId(),
      userId,
      title: "Đổi Voucher thành công",
      message:
        "Bạn vừa đổi thành công Voucher Highlands Coffee trị giá 20.000đ.",
      type: "Voucher",
      deepLinkTarget: "reward-detail",
      isRead: false,
      createdAt: "2026-06-18T18:20:00.000Z",
    },
    {
      id: createId(),
      userId,
      title: "Đừng quên cập nhật khoản chi",
      message:
        'Khoản chi "Ăn trưa" vẫn đang ở trạng thái Planned. Hãy xác nhận nếu bạn đã hoàn thành.',
      type: "Expense",
      deepLinkTarget: "expense-detail",
      isRead: true,
      createdAt: "2026-06-18T13:00:00.000Z",
    },
  ];

  mockNotifications.forEach((notification) => {
    paceLocalDataSource.notifications.upsert(notification);
  });
}

export function listUserNotifications(userId: string) {
  ensureMockNotifications(userId);

  return paceLocalDataSource
    .notifications
    .list()
    .filter((notification) => notification.userId === userId)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function markNotificationAsRead(notification: Notification) {
  const updatedNotification: Notification = {
    ...notification,
    isRead: true,
  };

  paceLocalDataSource.notifications.upsert(updatedNotification);
  return updatedNotification;
}

export function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "SavingGoal":
      return "🎯";
    case "Voucher":
      return "🎁";
    case "Expense":
      return "💰";
    case "Report":
      return "📊";
    case "Budget":
      return "💳";
    case "PigPig":
      return "🐷";
    default:
      return "🔔";
  }
}
