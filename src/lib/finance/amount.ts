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
