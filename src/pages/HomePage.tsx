import { useMemo } from 'react'
import { FuelDataTabs } from '../organisms/FuelDataTabs'
import { StationOverviewList } from '../organisms/StationOverviewList'
import { useI18n } from '../lib/i18n/useI18n'
import {
  usePublicStationStore,
  selectSelectedStation,
} from '../store/usePublicStationStore'

export function HomePage() {
  const { t } = useI18n()
  const stations = usePublicStationStore((s) => s.stations)
  const selectedStationId = usePublicStationStore((s) => s.selectedStationId)
  const selectStation = usePublicStationStore((s) => s.selectStation)
  const fuelTypes = usePublicStationStore((s) => s.fuelTypes)
  const allPrices = usePublicStationStore((s) => s.prices)
  const allLevels = usePublicStationStore((s) => s.levels)
  const detailLoading = usePublicStationStore((s) => s.detailLoading)
  const detailError = usePublicStationStore((s) => s.detailError)
  const stationDetailCache = usePublicStationStore((s) => s.stationDetailCache)
  const selectedStation = usePublicStationStore(selectSelectedStation)

  const activeId = selectedStationId ?? stations[0]?.id ?? null

  const prices = useMemo(
    () => (activeId ? allPrices.filter((p) => p.stationId === activeId) : []),
    [allPrices, activeId],
  )
  const levels = useMemo(
    () => (activeId ? allLevels.filter((l) => l.stationId === activeId) : []),
    [allLevels, activeId],
  )

  if (stations.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <p className="text-[var(--color-ink-muted)]">{t('home.emptyStations')}</p>
      </div>
    )
  }

  if (!selectedStation) return null

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-10 sm:px-6">
      <StationOverviewList
        stations={stations}
        selectedStationId={activeId}
        stationDetailCache={stationDetailCache}
        onSelectStation={(id) => {
          void selectStation(id)
        }}
      />
      {/* {detailError ? (
        <p className="rounded-2xl border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm text-red-200">
          {detailError}
        </p>
      ) : null}
      {detailLoading ? (
        <p className="text-sm text-[var(--color-ink-muted)]" role="status">
          {t('home.loadingFuel')}
        </p>
      ) : (
        <FuelDataTabs fuelTypes={fuelTypes} prices={prices} levels={levels} />
      )} */}
    </div>
  )
}
