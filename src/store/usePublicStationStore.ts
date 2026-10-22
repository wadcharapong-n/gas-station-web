import { create } from 'zustand'
import { fetchPublicStationDetail, fetchPublicStationSummaries } from '../lib/api'
import { mapStationDetailToFuelPayload, mapSummaryToStation } from '../lib/mapPublicApi'
import type { FuelLevel, FuelPrice, FuelType, Station } from '../lib/types'

export interface StationDetailCacheEntry {
  fuelTypes: FuelType[]
  prices: FuelPrice[]
  levels: FuelLevel[]
}

interface PublicStationState {
  loading: boolean
  detailLoading: boolean
  error: string | null
  detailError: string | null
  stations: Station[]
  selectedStationId: string | null
  /** Per-station detail (filled on load for all slugs; updated when switching station). */
  stationDetailCache: Record<string, StationDetailCacheEntry>
  fuelTypes: FuelType[]
  prices: FuelPrice[]
  levels: FuelLevel[]
  load: () => Promise<void>
  selectStation: (id: string) => Promise<void>
}

function mergeStation(list: Station[], id: string, patch: Partial<Station>): Station[] {
  return list.map((s) => (s.id === id ? { ...s, ...patch } : s))
}

function initialSelection(stations: Station[]): string | null {
  return stations[0]?.id ?? null
}

export function selectSelectedStation(s: PublicStationState): Station | null {
  if (s.stations.length === 0) return null
  const id = s.selectedStationId
  return s.stations.find((x) => x.id === id) ?? s.stations[0]
}

export const usePublicStationStore = create<PublicStationState>((set, get) => ({
  loading: true,
  detailLoading: false,
  error: null,
  detailError: null,
  stations: [],
  selectedStationId: null,
  stationDetailCache: {},
  fuelTypes: [],
  prices: [],
  levels: [],

  selectStation: async (id: string) => {
    if (!get().stations.some((s) => s.id === id)) return
    const st = get().stations.find((s) => s.id === id)
    if (!st?.slug) {
      set({ detailError: 'Station has no slug — cannot load fuel data.' })
      return
    }
    set({ selectedStationId: id, detailLoading: true, detailError: null })
    try {
      const raw = await fetchPublicStationDetail(st.slug)
      const { stationPatch, fuelTypes, prices, levels } = mapStationDetailToFuelPayload(raw, id)
      const ft = fuelTypes.filter((f) => f.isActive)
      const entry: StationDetailCacheEntry = { fuelTypes: ft, prices, levels }
      set((state) => ({
        detailLoading: false,
        stations: mergeStation(state.stations, id, stationPatch),
        stationDetailCache: { ...state.stationDetailCache, [id]: entry },
        fuelTypes: ft,
        prices,
        levels,
      }))
    } catch (e) {
      set((state) => ({
        detailLoading: false,
        detailError: e instanceof Error ? e.message : 'Could not load station detail.',
        fuelTypes: state.stationDetailCache[id]?.fuelTypes ?? [],
        prices: state.stationDetailCache[id]?.prices ?? [],
        levels: state.stationDetailCache[id]?.levels ?? [],
      }))
    }
  },

  load: async () => {
    set({
      loading: true,
      error: null,
      detailError: null,
      detailLoading: false,
      stationDetailCache: {},
    })
    try {
      const rawList = await fetchPublicStationSummaries()
      const stations = rawList.map(mapSummaryToStation)
      if (stations.length === 0) {
        set({
          loading: false,
          stations: [],
          selectedStationId: null,
          stationDetailCache: {},
          fuelTypes: [],
          prices: [],
          levels: [],
        })
        return
      }
      if (!stations.some((s) => s.slug)) {
        set({
          loading: false,
          error: 'Station list is missing slug fields.',
          stations,
          selectedStationId: initialSelection(stations),
          stationDetailCache: {},
          fuelTypes: [],
          prices: [],
          levels: [],
        })
        return
      }

      const detailResults = await Promise.all(
        stations.map(async (s) => {
          if (!s.slug) return null
          try {
            const raw = await fetchPublicStationDetail(s.slug)
            const mapped = mapStationDetailToFuelPayload(raw, s.id)
            return { id: s.id, mapped }
          } catch {
            return null
          }
        }),
      )

      let mergedStations = stations
      const stationDetailCache: Record<string, StationDetailCacheEntry> = {}
      for (const r of detailResults) {
        if (!r) continue
        mergedStations = mergeStation(mergedStations, r.id, r.mapped.stationPatch)
        const ft = r.mapped.fuelTypes.filter((f) => f.isActive)
        stationDetailCache[r.id] = {
          fuelTypes: ft,
          prices: r.mapped.prices,
          levels: r.mapped.levels,
        }
      }

      const first = mergedStations[0]
      const firstEntry = stationDetailCache[first.id]

      set({
        loading: false,
        stations: mergedStations,
        selectedStationId: first.id,
        stationDetailCache,
        fuelTypes: firstEntry?.fuelTypes ?? [],
        prices: firstEntry?.prices ?? [],
        levels: firstEntry?.levels ?? [],
      })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'load_failed',
      })
    }
  },
}))
