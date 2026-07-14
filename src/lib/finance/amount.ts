export function parseCurrencyInput(value: string): number {
  const normalizedValue = value.replace(/[^\d.-]/g, "");
  const amount = Number(normalizedValue);

  return Number.isFinite(amount) ? amount : Number.NaN;
}

export function formatVnd(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function getRemainingDaysInMonth(date: Date): number {
  const lastDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();

  return Math.max(1, lastDayOfMonth - date.getDate() + 1);
}

export function getTotalDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getElapsedDaysInMonth(date: Date): number {
  return date.getDate();
}

/**
 * Resolves the actual Budget Reset Day for a given month/year, applying the
 * "short month" rule: if the month doesn't have enough days for the chosen
 * budgetResetDay (e.g. 31 in a 28/29/30-day month), the last day of that
 * month is used instead.
 */
export function resolveBudgetResetDayForMonth(
  budgetResetDay: number,
  date: Date,
): number {
  const totalDaysInMonth = getTotalDaysInMonth(date);

  return Math.min(budgetResetDay, totalDaysInMonth);
}

/** Whether `date` falls exactly on the resolved Budget Reset Day for its month. */
export function isBudgetResetDay(budgetResetDay: number, date: Date): boolean {
  return date.getDate() === resolveBudgetResetDayForMonth(budgetResetDay, date);
}

/**
 * Returns the next occurrence (strictly after `date`) of `budgetResetDay`,
 * applying the short-month rule for both the current and next month.
 */
export function getNextBudgetResetDate(
  budgetResetDay: number,
  date: Date,
): Date {
  const resolvedThisMonth = resolveBudgetResetDayForMonth(budgetResetDay, date);

  if (date.getDate() < resolvedThisMonth) {
    return new Date(date.getFullYear(), date.getMonth(), resolvedThisMonth);
  }

  const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const resolvedNextMonth = resolveBudgetResetDayForMonth(
    budgetResetDay,
    nextMonthDate,
  );

  return new Date(
    nextMonthDate.getFullYear(),
    nextMonthDate.getMonth(),
    resolvedNextMonth,
  );
}

/**
 * Returns the most recent occurrence (on or before `date`) of `budgetResetDay`
 * — i.e. the start date of the Budget cycle that `date` currently falls in.
 */
export function getPreviousBudgetResetDate(
  budgetResetDay: number,
  date: Date,
): Date {
  const resolvedThisMonth = resolveBudgetResetDayForMonth(budgetResetDay, date);

  if (date.getDate() >= resolvedThisMonth) {
    return new Date(date.getFullYear(), date.getMonth(), resolvedThisMonth);
  }

  const previousMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const resolvedPreviousMonth = resolveBudgetResetDayForMonth(
    budgetResetDay,
    previousMonthDate,
  );

  return new Date(
    previousMonthDate.getFullYear(),
    previousMonthDate.getMonth(),
    resolvedPreviousMonth,
  );
}

function diffInCalendarDays(later: Date, earlier: Date): number {
  const laterUtc = Date.UTC(
    later.getFullYear(),
    later.getMonth(),
    later.getDate(),
  );
  const earlierUtc = Date.UTC(
    earlier.getFullYear(),
    earlier.getMonth(),
    earlier.getDate(),
  );

  return Math.round((laterUtc - earlierUtc) / (1000 * 60 * 60 * 24));
}

/**
 * Số ngày còn lại của chu kỳ Budget hiện tại, tính từ `date` (bao gồm hôm nay)
 * tới trước lần Budget Reset Day tiếp theo. Thay thế `getRemainingDaysInMonth`
 * (DELTA-004/DELTA-007) — dùng cho baseline "Số tiền được tiêu hôm nay" và
 * ngưỡng cảnh báo EXP-007.
 */
export function getRemainingDaysInCycle(
  budgetResetDay: number,
  date: Date,
): number {
  const nextResetDate = getNextBudgetResetDate(budgetResetDay, date);

  return Math.max(1, diffInCalendarDays(nextResetDate, date));
}

/**
 * Tổng số ngày của chu kỳ Budget hiện tại (từ Budget Reset Day bắt đầu chu kỳ
 * tới Budget Reset Day kế tiếp). Luôn nằm trong khoảng 28–31 ngày tuỳ tháng.
 * Dùng cho ô "Dự kiến hết trong XX ngày" trên Dashboard (specs/17_UI_LAYOUT.md,
 * DELTA-007) — thay cho công thức tốc độ chi tiêu cũ.
 */
export function getCycleLengthDays(budgetResetDay: number, date: Date): number {
  const previousResetDate = getPreviousBudgetResetDate(budgetResetDay, date);
  const nextResetDate = getNextBudgetResetDate(budgetResetDay, previousResetDate);

  return Math.max(1, diffInCalendarDays(nextResetDate, previousResetDate));
}
