import { Badge } from '../atoms/Badge'
import { formatBangkokDateTime, formatLitres } from '../lib/format'
import type { FuelLevel, FuelType } from '../lib/types'
import { useI18n } from '../lib/i18n/useI18n'

export function FuelGaugeRow({ fuel, level }: { fuel: FuelType; level: FuelLevel | undefined }) {
  const { t, locale } = useI18n()
  const cap = fuel.tankCapacityLitres
  const unavailable = !level || level.unavailable
  const vol = level && !level.unavailable ? level.volumeLitres : 0
  const pct = cap > 0 && !unavailable ? Math.min(100, Math.round((vol / cap) * 100)) : 0
  const low = !unavailable && vol <= fuel.lowThresholdLitres
  const barTone = unavailable ? 'bg-white/10' : low ? 'bg-amber-500' : 'bg-[var(--color-brand-500)]'

  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--color-surface-muted)]/80 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-[var(--color-ink)]">{fuel.name}</p>
          {level ? (
            <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
              {formatBangkokDateTime(level.recordedAt, locale)}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {unavailable ? (
            <Badge tone="neutral">{t('home.levels.unavailable')}</Badge>
          ) : low ? (
            <Badge tone="warn">{t('home.levels.low')}</Badge>
          ) : null}
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-2 flex items-baseline justify-between gap-2 text-sm">
          <span className="tabular-nums text-[var(--color-ink)]">
            {unavailable ? '—' : `${formatLitres(vol)} L`}
          </span>
          <span className="text-[var(--color-ink-muted)]">{unavailable ? '—' : `${pct}%`}</span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={unavailable ? undefined : pct}
          aria-label={fuel.name}
        >
          <div
            className={`h-full rounded-full transition-all ${barTone}`}
            style={{ width: unavailable ? '0%' : `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
