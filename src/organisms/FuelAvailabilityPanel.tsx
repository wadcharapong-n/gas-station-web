import { H2 } from '../atoms/Text'
import { FuelGaugeRow } from '../molecules/FuelGaugeRow'
import type { FuelLevel, FuelType } from '../lib/types'
import { useI18n } from '../lib/i18n/useI18n'

export function FuelAvailabilityPanel({
  fuelTypes,
  levels,
  embedded = false,
}: {
  fuelTypes: FuelType[]
  levels: FuelLevel[]
  embedded?: boolean
}) {
  const { t } = useI18n()
  const byId = new Map(levels.map((l) => [l.fuelTypeId, l]))

  const shell = embedded
    ? 'space-y-6'
    : 'space-y-6 rounded-3xl border border-white/10 bg-[var(--color-surface)]/80 p-6 sm:p-8'

  return (
    <section className={shell} aria-labelledby={embedded ? undefined : 'levels-heading'}>
      <div className="mb-6">
        {embedded ? null : <H2 id="levels-heading">{t('home.levels.title')}</H2>}
        <p
          className={`text-sm text-[var(--color-ink-muted)] ${embedded ? '' : 'mt-1'}`}
        >
          {t('home.levels.sub')}
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2" role="list">
        {fuelTypes.map((ft) => (
          <li key={ft.id}>
            <FuelGaugeRow fuel={ft} level={byId.get(ft.id)} />
          </li>
        ))}
      </ul>
    </section>
  )
}
