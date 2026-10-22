import { H2, Lead } from '../atoms/Text'
import type { StationDetailCacheEntry } from '../store/usePublicStationStore'
import type { Station } from '../lib/types'
import { fuelsInStock } from '../lib/stationFuelSummary'
import { useI18n } from '../lib/i18n/useI18n'
import { StationOverviewListItem } from '../molecules/StationOverviewListItem'

export function StationOverviewList({
  stations,
  selectedStationId,
  onSelectStation,
  stationDetailCache,
}: {
  stations: Station[]
  selectedStationId: string | null
  onSelectStation: (id: string) => void
  stationDetailCache: Record<string, StationDetailCacheEntry>
}) {
  const { t } = useI18n()
  const selectable = stations.length > 1

  return (
    <section className="space-y-4" aria-labelledby="station-list-heading">
      <div>
        <H2 id="station-list-heading">{t('home.stations.title')}</H2>
        <Lead className="mt-2 max-w-2xl">
          {selectable ? t('home.stations.subMulti') : t('home.stations.subSingle')}
        </Lead>
      </div>
      <ul className="flex flex-col gap-4" role="list">
        {stations.map((s) => {
          const entry = stationDetailCache[s.id]
          const inStockFuels = entry
            ? fuelsInStock(entry.fuelTypes, entry.levels, s.id)
            : []
          return (
            <StationOverviewListItem
              key={s.id}
              station={s}
              selected={s.id === selectedStationId}
              selectable={selectable}
              onSelect={selectable ? () => onSelectStation(s.id) : undefined}
              inStockFuels={inStockFuels}
            />
          )
        })}
      </ul>
    </section>
  )
}
