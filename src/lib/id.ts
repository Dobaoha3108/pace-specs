export function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Derives a short, stable 8-digit numeric ID for display purposes only
 * (e.g. "User ID" on the Profile screen). The full id (UUID) keeps being
 * used everywhere else for data relations — this never touches storage.
 */
export function formatShortDisplayId(id: string): string {
  let hash = 0;

  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) >>> 0;
  }

  return String(hash % 100_000_000).padStart(8, "0");
}
