import { H1, Lead } from '../atoms/Text'
import { useI18n } from '../lib/i18n/useI18n'
import { selectSelectedStation, usePublicStationStore } from '../store/usePublicStationStore'

export function ServicesPage() {
  const { t } = useI18n()
  const station = usePublicStationStore(selectSelectedStation)

  if (!station) return null

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <H1>{t('services.title')}</H1>
      <Lead className="mt-2 max-w-2xl">{t('services.sub')}</Lead>
      <ul
        className="mt-8 grid gap-3 sm:grid-cols-2"
        role="list"
      >
        {station.services.map((s) => (
          <li
            key={s}
            className="rounded-2xl border border-white/10 bg-[var(--color-surface-muted)]/80 px-5 py-4 text-[var(--color-ink)]"
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}
