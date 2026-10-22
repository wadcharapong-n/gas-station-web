import { Lead } from '../atoms/Text'
import { useI18n } from '../lib/i18n/useI18n'
import { StationMap } from '../organisms/StationMap'
import { selectSelectedStation, usePublicStationStore } from '../store/usePublicStationStore'

export function MapPage() {
  const { t } = useI18n()
  const station = usePublicStationStore(selectSelectedStation)

  if (!station) return null

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-10 sm:px-6">
      <div>
        <p className="text-sm font-medium text-[var(--color-accent)]">{t('nav.map')}</p>
        <Lead className="mt-2 max-w-2xl">{station.address}</Lead>
      </div>
      <StationMap station={station} />
    </div>
  )
}
