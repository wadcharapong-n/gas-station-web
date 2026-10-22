import { Badge } from '../atoms/Badge'
import { formatTodayHours, isStationOpen } from '../lib/hours'
import type { Station } from '../lib/types'
import { useI18n } from '../lib/i18n/useI18n'

export function StationHoursStatus({ station }: { station: Station }) {
  const { t } = useI18n()
  // const open = isStationOpen(station.hours)
  const open = station.isActive
  // const todayLabel = formatTodayHours(station.hours, {
  //   closed: t('hours.closed'),
  //   range: (a, b) => t('hours.range', a, b),
  // })

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
      <Badge tone={open ? 'success' : 'neutral'}>
        {open ? t('status.open') : t('status.closed')}
      </Badge>
      <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
        {t('hours.today')}
      </span>
      {/* <span className="text-sm font-semibold tabular-nums text-white">{todayLabel}</span> */}
    </div>
  )
}
