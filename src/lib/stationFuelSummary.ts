import type { FuelLevel, FuelType } from './types'

export interface FuelInStockRow {
  name: string
  litres: number
}

/** Fuels with a known level and strictly more than zero litres in tank. */
export function fuelsInStock(
  fuelTypes: FuelType[],
  levels: FuelLevel[],
  stationId: string,
): FuelInStockRow[] {
  const byFt = new Map(fuelTypes.map((ft) => [ft.id, ft]))
  const rows: FuelInStockRow[] = []
  for (const l of levels) {
    if (l.stationId !== stationId) continue
    if (l.unavailable) continue
    if (l.volumeLitres <= 0) continue
    const ft = byFt.get(l.fuelTypeId)
    if (!ft) continue
    rows.push({ name: ft.name, litres: l.volumeLitres })
  }
  return rows
}
