import { formatLitres } from '../lib/format'
import type { FuelInStockRow } from '../lib/stationFuelSummary'
import type { Station } from '../lib/types'
import { useI18n } from '../lib/i18n/useI18n'
import { StationHoursStatus } from './StationHoursStatus'

export function StationOverviewListItem({
  station,
  selected,
  selectable,
  onSelect,
  inStockFuels = [],
}: {
  station: Station
  selected: boolean
  selectable: boolean
  onSelect?: () => void
  /** Fuels with more than 0 L reported (empty = nothing shown). */
  inStockFuels?: FuelInStockRow[]
}) {
  const { t } = useI18n()
  const body = (
    <>
      <div className="flex gap-4 sm:gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold text-white ring-1 ring-white/15 sm:h-16 sm:w-16 sm:text-2xl">
          {station.logoUrl ? (
            <img
              src={station.logoUrl}
              alt={station.name}
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : (
            <span aria-hidden>{station.name.charAt(0)}</span>
          )}
        </div>
        <div className="min-w-0 flex-1 text-left">
          <h3 className="text-lg font-semibold text-white sm:text-xl">{station.name}</h3>
          <p className="mt-1 text-sm text-[var(--color-brand-100)]/90">{station.tagline}</p>
          <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
            {station.description}
          </p>
          <StationHoursStatus station={station} />
          {inStockFuels.length > 0 ? (
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
                {t('home.stations.fuelInStockTitle')}
              </p>
              <ul
                className="mt-2 flex flex-col gap-1.5 text-sm text-[var(--color-ink)]"
                aria-label={t('home.stations.fuelInStockTitle')}
              >
                {inStockFuels.map((row, i) => (
                  <li key={`${station.id}-fuel-${i}`} className="flex justify-between gap-3 tabular-nums">
                    <span className="min-w-0 font-medium">{row.name}</span>
                    {/* <span className="shrink-0 text-[var(--color-brand-100)]">
                      {formatLitres(row.litres)} L
                    </span> */}
                    <span className="shrink-0 text-[var(--color-brand-100)]">
                      {row.litres > 0 ? 'ยังมีอยู่' : 'หมด'} 
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )

  if (selectable) {
    return (
      <li>
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={selected}
          aria-label={`${station.name} — ${t('home.stations.selectA11y')}`}
          className={`w-full rounded-3xl border border-white/10 bg-[var(--color-surface-muted)]/60 p-5 text-left transition hover:bg-[var(--color-surface-muted)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] sm:p-6 ${
            selected ? 'ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[#0b0f14]' : ''
          }`}
        >
          {body}
        </button>
      </li>
    )
  }

  return (
    <li>
      <article className="rounded-3xl border border-white/10 bg-[var(--color-surface-muted)]/60 p-5 sm:p-6">
        {body}
      </article>
    </li>
  )
}
