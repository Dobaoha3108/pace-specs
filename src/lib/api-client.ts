import { AppError } from "@/lib/errors";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiResponse<TData> {
  data: TData;
  status: number;
  headers: Headers;
}

export interface ApiClientOptions {
  baseUrl?: string;
  defaultHeaders?: HeadersInit;
  fetcher?: typeof fetch;
}

export interface ApiRequestOptions<TBody = unknown> {
  method?: ApiMethod;
  path: string;
  body?: TBody;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

export class ApiClient {
  private readonly baseUrl?: string;
  private readonly defaultHeaders?: HeadersInit;
  private readonly fetcher: typeof fetch;

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl;
    this.defaultHeaders = options.defaultHeaders;
    this.fetcher = options.fetcher ?? fetch;
  }

  async request<TData, TBody = unknown>(
    options: ApiRequestOptions<TBody>,
  ): Promise<ApiResponse<TData>> {
    if (!this.baseUrl) {
      throw new AppError(
        "API_NOT_CONFIGURED",
        "MVP does not use a backend API. Data must be read from local storage.",
        { severity: "info" },
      );
    }

    const response = await this.safeFetch(options);
    const data = await this.parseResponse<TData>(response);

    if (!response.ok) {
      throw new AppError(
        "API_RESPONSE_ERROR",
        `API request failed with status ${response.status}.`,
        {
          context: {
            status: response.status,
            path: options.path,
          },
        },
      );
    }

    return {
      data,
      status: response.status,
      headers: response.headers,
    };
  }

  get<TData>(path: string, signal?: AbortSignal) {
    return this.request<TData>({ method: "GET", path, signal });
  }

  post<TData, TBody = unknown>(path: string, body: TBody) {
    return this.request<TData, TBody>({ method: "POST", path, body });
  }

  put<TData, TBody = unknown>(path: string, body: TBody) {
    return this.request<TData, TBody>({ method: "PUT", path, body });
  }

  patch<TData, TBody = unknown>(path: string, body: TBody) {
    return this.request<TData, TBody>({ method: "PATCH", path, body });
  }

  delete<TData>(path: string) {
    return this.request<TData>({ method: "DELETE", path });
  }

  private async safeFetch<TBody>(
    options: ApiRequestOptions<TBody>,
  ): Promise<Response> {
    try {
      const url = new URL(options.path, this.baseUrl);

      return await this.fetcher(url, {
        method: options.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.defaultHeaders,
          ...options.headers,
        },
        body:
          options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: options.signal,
      });
    } catch (error) {
      throw new AppError("API_NETWORK_ERROR", "API request failed.", {
        cause: error,
        context: {
          path: options.path,
        },
      });
    }
  }

  private async parseResponse<TData>(response: Response): Promise<TData> {
    if (response.status === 204) {
      return undefined as TData;
    }

    try {
      return (await response.json()) as TData;
    } catch (error) {
      throw new AppError("API_RESPONSE_ERROR", "API response is not valid JSON.", {
        cause: error,
        context: {
          status: response.status,
        },
      });
    }
  }
}

export const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
});
