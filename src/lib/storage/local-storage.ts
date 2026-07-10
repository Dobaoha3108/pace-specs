import { AppError } from "@/lib/errors";

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export class BrowserLocalStorage implements KeyValueStorage {
  private get storage() {
    if (typeof window === "undefined" || !window.localStorage) {
      throw new AppError(
        "STORAGE_UNAVAILABLE",
        "Local storage is only available in the browser.",
      );
    }

    return window.localStorage;
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }
}

export class JsonLocalStorage<TValue> {
  constructor(
    private readonly key: string,
    private readonly defaultValue: TValue,
    private readonly storage: KeyValueStorage = new BrowserLocalStorage(),
  ) {}

  read(): TValue {
    const rawValue = this.storage.getItem(this.key);

    if (!rawValue) {
      return structuredClone(this.defaultValue);
    }

    try {
      return JSON.parse(rawValue) as TValue;
    } catch (error) {
      throw new AppError(
        "STORAGE_PARSE_ERROR",
        `Local storage value for "${this.key}" is not valid JSON.`,
        { cause: error },
      );
    }
  }

  write(value: TValue): void {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  update(updater: (currentValue: TValue) => TValue): TValue {
    const nextValue = updater(this.read());
    this.write(nextValue);
    return nextValue;
  }

  clear(): void {
    this.storage.removeItem(this.key);
  }
}
