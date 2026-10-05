/**
 * Same-origin API client. In dev, Vite proxies `/api` to the FastAPI server
 * (see vite.config.ts). Override with VITE_API_URL for split hosting.
 * Non-JSON replies (e.g. the static host's SPA fallback page) surface as
 * ApiError(-1) so callers can fall back to bundled data.
 */
const BASE = (
  (import.meta.env.VITE_API_URL as string | undefined) ?? ''
).replace(/\/$/, '');

const url = (path: string) => `${BASE}/api${path}`;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function isJson(res: Response): boolean {
  return (res.headers.get('content-type') ?? '').includes('application/json');
}

async function readJson<T>(res: Response): Promise<T> {
  if (!isJson(res)) {
    throw new ApiError(-1, 'Non-JSON response — is the API running?');
  }
  return (await res.json()) as T;
}

async function detail(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data?.detail === 'string') return data.detail;
    if (data?.detail != null) return JSON.stringify(data.detail);
    return res.statusText || `HTTP ${res.status}`;
  } catch {
    return res.statusText || `HTTP ${res.status}`;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url(path), { credentials: 'include' });
  } catch {
    throw new ApiError(-1, 'Network error — is the API running?');
  }
  if (!res.ok) throw new ApiError(res.status, await detail(res));
  return readJson<T>(res);
}

export async function apiSend<T>(
  method: 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: unknown,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url(path), {
      method,
      credentials: 'include',
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(-1, 'Network error — is the API running?');
  }
  if (!res.ok) throw new ApiError(res.status, await detail(res));
  if (res.status === 204) return undefined as T;
  return readJson<T>(res);
}
