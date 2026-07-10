"use client";

import { Bell } from "lucide-react";
import { AppHeader } from "@/components/app/app-header";
import { MobileFrame } from "@/components/app/mobile-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getNotificationIcon,
  getNotificationUser,
  listUserNotifications,
  markNotificationAsRead,
} from "@/features/notification/lib/notification-service";
import type { DashboardNavigationTarget } from "@/features/dashboard/types";
import type { Notification } from "@/types/finance";

type NotificationMode = "list" | "detail";

type NotificationScreenProps = {
  mode: NotificationMode;
  selectedNotificationId?: string;
  onBack: () => void;
  onNavigate: (target: DashboardNavigationTarget, id?: string) => void;
};

export function NotificationScreen({
  mode,
  onBack,
  onNavigate,
  selectedNotificationId,
}: NotificationScreenProps) {
  const user = getNotificationUser();
  const notifications = user ? listUserNotifications(user.id) : [];
  const selectedNotification =
    notifications.find((notification) => notification.id === selectedNotificationId) ??
    notifications[0];

  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        <AppHeader
          onBack={onBack}
          showBackButton
          title={mode === "detail" ? "Notification Detail" : "Notification"}
        />
        <div className="flex-1 overflow-y-auto px-md pb-lg pt-md">
          {!user ? (
            <EmptyState
              description="Please finish onboarding before viewing notifications."
              title="No User Found"
            />
          ) : mode === "detail" && selectedNotification ? (
            <NotificationDetail
              notification={selectedNotification}
              onNavigate={onNavigate}
            />
          ) : (
            <NotificationCenter
              notifications={notifications}
              onOpen={(notification) => {
                markNotificationAsRead(notification);
                onNavigate("notification-detail", notification.id);
              }}
            />
          )}
        </div>
      </div>
    </MobileFrame>
  );
}

function NotificationCenter({
  notifications,
  onOpen,
}: {
  notifications: Notification[];
  onOpen: (notification: Notification) => void;
}) {
  if (notifications.length === 0) {
    return (
      <EmptyState
        description="Bạn chưa có thông báo nào."
        title="Notification Empty"
      />
    );
  }

  return (
    <div className="space-y-md">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClick={() => onOpen(notification)}
        />
      ))}
    </div>
  );
}

function NotificationCard({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: () => void;
}) {
  return (
    <Card as="article" className="cursor-pointer active:scale-[0.99]" onClick={onClick}>
      <div className="flex items-start gap-md">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pace-primary/15 text-xl">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-md">
            <h2 className="text-body font-semibold">{notification.title}</h2>
            {!notification.isRead ? (
              <span className="mt-1 size-2 shrink-0 rounded-full bg-pace-primary" />
            ) : null}
          </div>
          <p className="mt-xs line-clamp-2 text-body text-pace-text-secondary">
            {notification.message}
          </p>
          <p className="mt-sm text-caption text-pace-text-secondary">
            {formatDateTime(notification.createdAt)}
          </p>
        </div>
      </div>
    </Card>
  );
}

function NotificationDetail({
  notification,
  onNavigate,
}: {
  notification: Notification;
  onNavigate: (target: DashboardNavigationTarget, id?: string) => void;
}) {
  const relatedTarget = getRelatedTarget(notification);

  return (
    <div className="space-y-lg">
      <Card>
        <div className="flex items-start gap-md">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-pace-primary/15 text-2xl">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="min-w-0">
            <p className="text-caption text-pace-text-secondary">
              {notification.type}
            </p>
            <h1 className="mt-xs text-title">{notification.title}</h1>
          </div>
        </div>
        <p className="mt-lg whitespace-pre-wrap text-body">
          {notification.message}
        </p>
        <div className="mt-lg space-y-sm">
          <DetailRow
            label="Created Time"
            value={formatDateTime(notification.createdAt)}
          />
          <DetailRow label="Read Status" value="Read" />
        </div>
      </Card>
      {relatedTarget ? (
        <Button
          leadingIcon={<Bell aria-hidden className="size-5" />}
          onClick={() => onNavigate(relatedTarget, notification.relatedEntityId)}
        >
          Xem chi tiết
        </Button>
      ) : null}
    </div>
  );
}

function getRelatedTarget(notification: Notification) {
  const target = notification.deepLinkTarget;

  if (
    target === "expense-detail" ||
    target === "saving-goal-detail" ||
    target === "reward-detail" ||
    target === "report" ||
    target === "dashboard" ||
    target === "saving-goal-history"
  ) {
    return target;
  }

  return undefined;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-md border-b border-pace-border py-sm last:border-b-0">
      <span className="text-pace-text-secondary">{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}

function formatDateTime(dateValue: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(dateValue));
}
