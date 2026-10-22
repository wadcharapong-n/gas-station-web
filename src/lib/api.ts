import axios from 'axios'

/**
 * - If `VITE_PUBLIC_API_URL` is set → use it (no proxy).
 * - In dev without env → `/api` (Vite proxies to `http://localhost:8080`).
 * - Production build without env → `http://localhost:8080` (override in real deployments).
 */
export function resolvePublicApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_PUBLIC_API_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (import.meta.env.DEV) return '/api'
  return 'http://localhost:8080'
}

const client = axios.create({
  baseURL: resolvePublicApiBaseUrl(),
  timeout: 15_000,
  headers: { Accept: 'application/json' },
})

const PUBLIC_STATIONS_PATH = '/api/v1/public/stations'

/** GET /api/v1/public/stations — list of active station summaries (JSON array). */
export async function fetchPublicStationSummaries(): Promise<unknown[]> {
  try {
    const { data } = await client.get<unknown>(PUBLIC_STATIONS_PATH)
    return Array.isArray(data) ? data : []
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const msg = e.response?.status
        ? `API error ${e.response.status}: ${e.response.statusText || 'request failed'}`
        : e.message || 'Network error'
      throw new Error(msg)
    }
    throw e
  }
}

/** GET /api/v1/public/stations/{slug} — station detail with embedded fuels. */
export async function fetchPublicStationDetail(slug: string): Promise<unknown> {
  try {
    const { data } = await client.get<unknown>(
      `${PUBLIC_STATIONS_PATH}/${encodeURIComponent(slug)}`,
    )
    return data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const msg = e.response?.status
        ? `API error ${e.response.status}: ${e.response.statusText || 'request failed'}`
        : e.message || 'Network error'
      throw new Error(msg)
    }
    throw e
  }
}
