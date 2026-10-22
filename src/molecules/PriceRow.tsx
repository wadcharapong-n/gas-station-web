import { Badge } from '../atoms/Badge'
import { formatBangkokDateTime, formatThbPerLitre } from '../lib/format'
import type { FuelPrice } from '../lib/types'
import { useI18n } from '../lib/i18n/useI18n'

export function PriceRow({
  label,
  price,
}: {
  label: string
  price: FuelPrice
}) {
  const { t, locale } = useI18n()
  const sym = t('currency.symbol')
  const updated = formatBangkokDateTime(price.recordedAt, locale)

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[var(--color-surface-muted)]/80 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-[var(--color-ink)]">{label}</p>
        <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
          {t('home.prices.updated')}: {updated} ·{' '}
          {price.source === 'api' ? t('home.prices.source.api') : t('home.prices.source.manual')}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {price.unavailable ? (
          <Badge tone="neutral">{t('home.levels.unavailable')}</Badge>
        ) : price.stale ? (
          <Badge tone="warn">{t('home.prices.stale')}</Badge>
        ) : null}
        <p className="text-2xl font-semibold tabular-nums text-white">
          {price.unavailable ? (
            '—'
          ) : (
            <>
              {sym}
              {formatThbPerLitre(price.pricePerLitre)}
              <span className="ml-1 text-sm font-normal text-[var(--color-ink-muted)]">/L</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
