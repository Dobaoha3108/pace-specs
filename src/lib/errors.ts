export type AppErrorCode =
  | "UNKNOWN_ERROR"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "STORAGE_UNAVAILABLE"
  | "STORAGE_PARSE_ERROR"
  | "API_NOT_CONFIGURED"
  | "API_NETWORK_ERROR"
  | "API_RESPONSE_ERROR"
  | "BUSINESS_RULE_VIOLATION";

export type AppErrorSeverity = "info" | "warning" | "error" | "critical";

export type AppErrorContext = Record<
  string,
  string | number | boolean | null | undefined
>;

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly severity: AppErrorSeverity;
  readonly context?: AppErrorContext;

  constructor(
    code: AppErrorCode,
    message: string,
    options: {
      severity?: AppErrorSeverity;
      context?: AppErrorContext;
      cause?: unknown;
    } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "AppError";
    this.code = code;
    this.severity = options.severity ?? "error";
    this.context = options.context;
  }
}

export type Result<TData, TError = AppError> =
  | { ok: true; data: TData }
  | { ok: false; error: TError };

export function ok<TData>(data: TData): Result<TData> {
  return { ok: true, data };
}

export function err(error: AppError): Result<never> {
  return { ok: false, error };
}

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError("UNKNOWN_ERROR", error.message, { cause: error });
  }

  return new AppError("UNKNOWN_ERROR", "An unexpected error occurred.", {
    cause: error,
  });
}

export function getUserSafeErrorMessage(error: unknown): string {
  const appError = toAppError(error);

  switch (appError.code) {
    case "VALIDATION_ERROR":
    case "BUSINESS_RULE_VIOLATION":
      return appError.message;
    case "STORAGE_UNAVAILABLE":
      return "PACE cannot access local browser storage right now.";
    case "API_NOT_CONFIGURED":
      return "PACE MVP is running in local-only mode.";
    case "API_NETWORK_ERROR":
      return "PACE could not connect. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
