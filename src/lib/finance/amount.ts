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
