export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface DayHours {
  open: string
  close: string
  closed?: boolean
}

export interface Station {
  id: string
  /** From public list/detail API; used to load fuel data. */
  slug?: string
  name: string
  logoUrl: string | null
  tagline: string
  description: string
  address: string
  latitude: number
  longitude: number
  phone: string
  email: string
  socialLinks: Record<string, string>
  services: string[]
  hours: Record<DayKey, DayHours>
  isActive: boolean
}

export interface FuelType {
  id: string
  name: string
  code: string
  tankCapacityLitres: number
  lowThresholdLitres: number
  isActive: boolean
}

export interface FuelPrice {
  /** When omitted in API responses, clients should assume the first station in the list. */
  stationId: string
  fuelTypeId: string
  pricePerLitre: number
  source: 'api' | 'manual'
  recordedAt: string
  stale?: boolean
  /** True when the API has no price for this fuel (show dash in UI). */
  unavailable?: boolean
}

export interface FuelLevel {
  stationId: string
  fuelTypeId: string
  volumeLitres: number
  source: 'api' | 'manual'
  recordedAt: string
  unavailable?: boolean
}
