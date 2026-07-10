"use client";

import { useState } from "react";
import { Bell, ChevronRight, Coins, LogOut, UserRound } from "lucide-react";
import { AppHeader } from "@/components/app/app-header";
import { MobileFrame } from "@/components/app/mobile-frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { formatVnd, parseCurrencyInput } from "@/lib/finance/amount";
import {
  loadProfileViewModel,
  setLocalPushEnabled,
  updateFinancialInformation,
} from "@/features/profile/lib/profile-service";
import type { DashboardNavigationTarget } from "@/features/dashboard/types";
import type { Budget } from "@/types/finance";

type ProfileMode = "overview" | "financial-settings";

type ProfileScreenProps = {
  mode: ProfileMode;
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (target: DashboardNavigationTarget, id?: string) => void;
};

type FinancialFormErrors = {
  monthlyIncome?: string;
  fixedExpenses?: string;
};

export function ProfileScreen({
  mode,
  onBack,
  onLogout,
  onNavigate,
}: ProfileScreenProps) {
  const [, setRefreshKey] = useState(0);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const viewModel = loadProfileViewModel();

  function refresh() {
    setRefreshKey((value) => value + 1);
  }

  return (
    <MobileFrame>
      <div className="flex h-full flex-col bg-pace-background">
        <AppHeader
          onBack={onBack}
          showBackButton
          title={mode === "financial-settings" ? "Financial Settings" : "Profile"}
        />
        <div className="flex-1 overflow-y-auto px-md pb-lg pt-md">
          {!viewModel ? (
            <EmptyState
              description="Không thể tải thông tin cá nhân."
              title="Profile Load Failed"
            />
          ) : mode === "financial-settings" && viewModel.budget ? (
            <FinancialSettings
              budget={viewModel.budget}
              onCancel={() => onNavigate("profile")}
              onSaved={() => {
                refresh();
                onNavigate("profile");
              }}
            />
          ) : (
            <ProfileOverview
              localPushEnabled={viewModel.localPushEnabled}
              monthlyBudget={viewModel.budget?.monthlyBudget ?? 0}
              onEditFinancial={() => onNavigate("profile-financial-settings")}
              onLogout={() => setLogoutOpen(true)}
              onToggleLocalPush={(isEnabled) => {
                setLocalPushEnabled(isEnabled);
                refresh();
              }}
              userId={viewModel.user.id}
              userName={viewModel.user.displayName}
              walletBalance={viewModel.wallet?.balance ?? 0}
              joinedDate={viewModel.user.createdAt}
              monthlyIncome={viewModel.budget?.monthlyIncome ?? 0}
              fixedExpenses={viewModel.budget?.fixedExpenses ?? 0}
            />
          )}
        </div>
        <ConfirmationDialog
          confirmLabel="Logout"
          confirmVariant="danger"
          isOpen={logoutOpen}
          message="Bạn sẽ quay về Splash Screen. Dữ liệu local hiện tại vẫn được giữ lại."
          onCancel={() => setLogoutOpen(false)}
          onConfirm={() => {
            setLogoutOpen(false);
            onLogout();
          }}
          title="Logout?"
        />
      </div>
    </MobileFrame>
  );
}

function ProfileOverview({
  fixedExpenses,
  joinedDate,
  localPushEnabled,
  monthlyBudget,
  monthlyIncome,
  onEditFinancial,
  onLogout,
  onToggleLocalPush,
  userId,
  userName,
  walletBalance,
}: {
  fixedExpenses: number;
  joinedDate: string;
  localPushEnabled: boolean;
  monthlyBudget: number;
  monthlyIncome: number;
  onEditFinancial: () => void;
  onLogout: () => void;
  onToggleLocalPush: (isEnabled: boolean) => void;
  userId: string;
  userName: string;
  walletBalance: number;
}) {
  return (
    <div className="space-y-lg">
      <Card>
        <div className="flex items-center gap-md">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-pace-primary text-white">
            <UserRound aria-hidden className="size-8" />
          </div>
          <div className="min-w-0">
            <p className="text-caption text-pace-text-secondary">{userId}</p>
            <h1 className="truncate text-title">{userName}</h1>
            <p className="mt-xs text-caption text-pace-text-secondary">
              Student · Joined {formatDate(joinedDate)}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-md">
          <div>
            <p className="text-caption text-pace-text-secondary">
              Pig Coin Balance
            </p>
            <h2 className="mt-xs text-title">{walletBalance}</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full bg-pace-secondary text-pace-primary">
            <Coins aria-hidden className="size-6" />
          </div>
        </div>
      </Card>

      <section className="space-y-md">
        <h2 className="text-subtitle">Financial Settings</h2>
        <Card className="space-y-sm">
          <DetailRow label="Monthly Income" value={formatVnd(monthlyIncome)} />
          <DetailRow label="Fixed Expense" value={formatVnd(fixedExpenses)} />
          <DetailRow label="Monthly Budget" value={formatVnd(monthlyBudget)} />
          <DetailRow label="Budget Cycle" value="Monthly" />
          <button
            className="mt-md flex w-full items-center justify-between rounded-button bg-pace-background px-md py-sm text-body font-semibold text-pace-primary"
            onClick={onEditFinancial}
            type="button"
          >
            Edit Financial Information
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </Card>
      </section>

      <section className="space-y-md">
        <h2 className="text-subtitle">App Settings</h2>
        <Card>
          <div className="flex items-center justify-between gap-md">
            <div className="flex items-center gap-md">
              <Bell aria-hidden className="size-5 text-pace-primary" />
              <div>
                <p className="text-body font-semibold">Local Push Notification</p>
                <p className="text-caption text-pace-text-secondary">
                  Notification Center vẫn lưu thông báo khi tắt.
                </p>
              </div>
            </div>
            <button
              aria-pressed={localPushEnabled}
              className="relative h-8 w-14 rounded-full bg-pace-border transition-colors aria-pressed:bg-pace-primary"
              onClick={() => onToggleLocalPush(!localPushEnabled)}
              type="button"
            >
              <span
                className={[
                  "absolute top-1 size-6 rounded-full bg-white transition-transform",
                  localPushEnabled ? "translate-x-7" : "translate-x-1",
                ].join(" ")}
              />
            </button>
          </div>
        </Card>
      </section>

      <Card>
        <p className="text-caption text-pace-text-secondary">About</p>
        <h2 className="mt-xs text-title">PACE</h2>
        <p className="mt-xs text-body text-pace-text-secondary">
          Version 1.0 MVP · Copyright 2026 PACE
        </p>
      </Card>

      <Button
        leadingIcon={<LogOut aria-hidden className="size-5" />}
        onClick={onLogout}
        variant="danger"
      >
        Logout
      </Button>
    </div>
  );
}

function FinancialSettings({
  budget,
  onCancel,
  onSaved,
}: {
  budget: Budget;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [monthlyIncome, setMonthlyIncome] = useState(String(budget.monthlyIncome));
  const [fixedExpenses, setFixedExpenses] = useState(String(budget.fixedExpenses));
  const [errors, setErrors] = useState<FinancialFormErrors>({});
  const [dialogMessage, setDialogMessage] = useState<string | undefined>();

  function validate() {
    const parsedIncome = parseCurrencyInput(monthlyIncome);
    const parsedFixedExpenses = parseCurrencyInput(fixedExpenses);
    const nextErrors: FinancialFormErrors = {};

    if (!Number.isFinite(parsedIncome) || parsedIncome <= 0) {
      nextErrors.monthlyIncome = "Monthly Income phải lớn hơn 0.";
    }

    if (!Number.isFinite(parsedFixedExpenses) || parsedFixedExpenses < 0) {
      nextErrors.fixedExpenses = "Fixed Expense phải lớn hơn hoặc bằng 0.";
    }

    if (
      Number.isFinite(parsedIncome) &&
      Number.isFinite(parsedFixedExpenses) &&
      parsedFixedExpenses > parsedIncome
    ) {
      nextErrors.fixedExpenses = "Fixed Expense không được lớn hơn Monthly Income.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function save() {
    if (!validate()) {
      return;
    }

    try {
      updateFinancialInformation({
        budget,
        monthlyIncome: parseCurrencyInput(monthlyIncome),
        fixedExpenses: parseCurrencyInput(fixedExpenses),
      });
      onSaved();
    } catch {
      setDialogMessage("Không thể cập nhật thông tin tài chính.");
    }
  }

  const previewBudget =
    parseCurrencyInput(monthlyIncome) - parseCurrencyInput(fixedExpenses);

  return (
    <div className="space-y-lg">
      <Input
        error={errors.monthlyIncome}
        inputMode="numeric"
        label="Monthly Income"
        leftAddon="VND"
        onChange={(event) => setMonthlyIncome(event.target.value)}
        value={monthlyIncome}
      />
      <Input
        error={errors.fixedExpenses}
        inputMode="numeric"
        label="Fixed Expense"
        leftAddon="VND"
        onChange={(event) => setFixedExpenses(event.target.value)}
        value={fixedExpenses}
      />
      <Card>
        <DetailRow label="Budget Cycle" value="Monthly" />
        <DetailRow
          label="Monthly Budget Preview"
          value={Number.isFinite(previewBudget) ? formatVnd(Math.max(0, previewBudget)) : "-"}
        />
      </Card>
      <Button onClick={save}>Save</Button>
      <Button onClick={onCancel} variant="secondary">
        Cancel
      </Button>
      <ConfirmationDialog
        confirmLabel="Thử lại"
        isOpen={Boolean(dialogMessage)}
        message={dialogMessage}
        onCancel={() => setDialogMessage(undefined)}
        onConfirm={() => setDialogMessage(undefined)}
        title="Update Failed"
      />
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
