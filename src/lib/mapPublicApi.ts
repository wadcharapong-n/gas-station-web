import type { DayHours, DayKey, FuelLevel, FuelPrice, FuelType, Station } from './types'

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function str(v: unknown, fallback = ''): string {
  if (v === null || v === undefined) return fallback
  return String(v)
}

function num(v: unknown, fallback = 0): number {
  if (typeof v === 'number' && !Number.isNaN(v)) return v
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v)
    if (!Number.isNaN(n)) return n
  }
  return fallback
}

function bool(v: unknown, fallback = false): boolean {
  if (typeof v === 'boolean') return v
  return fallback
}

const DAY_KEYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

function mapDayHours(v: unknown): DayHours | undefined {
  if (!isRecord(v)) return undefined
  const closed = bool(v.closed, false)
  const open = str(v.open, '00:00')
  const close = str(v.close, '00:00')
  return { open, close, closed }
}

function mapHours(v: unknown): Record<DayKey, DayHours> {
  const empty: DayHours = { open: '09:00', close: '18:00' }
  const base = {} as Record<DayKey, DayHours>
  if (!isRecord(v)) {
    for (const k of DAY_KEYS) base[k] = { ...empty }
    return base
  }
  for (const k of DAY_KEYS) {
    const h = mapDayHours(v[k])
    base[k] = h ?? { ...empty }
  }
  return base
}

/** Backend stores hours as JSON string (JSONB); detail DTO exposes it as string. */
function parseJsonHoursField(v: unknown): Record<DayKey, DayHours> {
  if (typeof v === 'string') {
    const t = v.trim()
    if (!t) return mapHours(undefined)
    try {
      return mapHours(JSON.parse(t))
    } catch {
      return mapHours(undefined)
    }
  }
  return mapHours(v)
}

/** GET /api/v1/public/stations — one summary object. */
export function mapSummaryToStation(raw: unknown): Station {
  if (!isRecord(raw)) {
    throw new Error('Invalid station summary in API response')
  }
  return {
    id: str(raw.id),
    slug: str(raw.slug),
    name: str(raw.name, 'Station'),
    logoUrl: null,
    tagline: '',
    description: '',
    address: str(raw.address),
    latitude: num(raw.latitude, 0),
    longitude: num(raw.longitude, 0),
    phone: '',
    email: '',
    socialLinks: {},
    services: [],
    hours: mapHours(undefined),
    isActive: Boolean(raw.isActive ?? true),
  }
}

export interface StationDetailFuelPayload {
  stationPatch: Partial<Station>
  fuelTypes: FuelType[]
  prices: FuelPrice[]
  levels: FuelLevel[]
}

/** GET /api/v1/public/stations/{slug} — `fuels` array + station fields. */
export function mapStationDetailToFuelPayload(
  raw: unknown,
  stationId: string,
): StationDetailFuelPayload {
  if (!isRecord(raw)) {
    throw new Error('Invalid station detail in API response')
  }
  const now = new Date().toISOString()
  const fuelsRaw = raw.fuels
  const fuels: unknown[] = Array.isArray(fuelsRaw) ? fuelsRaw : []

  const fuelTypes: FuelType[] = []
  const prices: FuelPrice[] = []
  const levels: FuelLevel[] = []

  for (const f of fuels) {
    if (!isRecord(f)) continue
    const code = str(f.fuelTypeCode ?? f.fuel_type_code)
    const name = str(f.fuelTypeName ?? f.fuel_type_name, code || 'Fuel')
    if (!code) continue
    const ftid = `${stationId}::${code}`
    const cap = num(f.tankCapacityLitres ?? f.tank_capacity_litres, 0)
    fuelTypes.push({
      id: ftid,
      name,
      code,
      tankCapacityLitres: cap,
      lowThresholdLitres: 0,
      isActive: true,
    })
    const priceRaw = f.pricePerLitre ?? f.price_per_litre
    const priceMissing = priceRaw == null || priceRaw === ''
    const priceNum = priceMissing ? 0 : num(priceRaw, 0)
    prices.push({
      stationId,
      fuelTypeId: ftid,
      pricePerLitre: priceNum,
      source: 'api',
      recordedAt: now,
      unavailable: priceMissing,
    })
    const volRaw = f.volumeLitres ?? f.volume_litres
    const volMissing = volRaw == null
    levels.push({
      stationId,
      fuelTypeId: ftid,
      volumeLitres: volMissing ? 0 : num(volRaw, 0),
      source: 'api',
      recordedAt: now,
      unavailable: volMissing,
    })
  }

  const stationPatch: Partial<Station> = {
    tagline: str(raw.tagline),
    description: str(raw.description),
    address: str(raw.address),
    phone: str(raw.phone),
    hours: parseJsonHoursField(raw.hours),
  }

  return { stationPatch, fuelTypes, prices, levels }
}
