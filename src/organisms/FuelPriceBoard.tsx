import { Badge } from '../atoms/Badge'
import { H2 } from '../atoms/Text'
import { PriceRow } from '../molecules/PriceRow'
import type { FuelPrice, FuelType } from '../lib/types'
import { useI18n } from '../lib/i18n/useI18n'

export function FuelPriceBoard({
  fuelTypes,
  prices,
  embedded = false,
}: {
  fuelTypes: FuelType[]
  prices: FuelPrice[]
  embedded?: boolean
}) {
  const { t } = useI18n()
  const anyStale = prices.some((p) => p.stale)

  const byId = new Map(prices.map((p) => [p.fuelTypeId, p]))

  const shell = embedded
    ? 'space-y-6'
    : 'space-y-6 rounded-3xl border border-white/10 bg-[var(--color-surface)]/80 p-6 sm:p-8'

  return (
    <section className={shell} aria-labelledby={embedded ? undefined : 'prices-heading'}>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {embedded ? null : <H2 id="prices-heading">{t('home.prices.title')}</H2>}
          <p
            className={`text-sm text-[var(--color-ink-muted)] ${embedded ? '' : 'mt-1'}`}
          >
            {t('home.prices.sub')}
          </p>
        </div>
        {anyStale ? <Badge tone="warn">{t('home.prices.stale')}</Badge> : null}
      </div>
      <ul className="flex flex-col gap-3" role="list">
        {fuelTypes.map((ft) => {
          const p = byId.get(ft.id)
          if (!p) return null
          return (
            <li key={ft.id}>
              <PriceRow label={ft.name} price={p} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
