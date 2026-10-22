import { ButtonLink } from '../atoms/ButtonLink'
import { H2 } from '../atoms/Text'
import { directionsUrl, embedMapUrl } from '../lib/maps'
import type { Station } from '../lib/types'
import { useI18n } from '../lib/i18n/useI18n'

export function StationMap({ station }: { station: Station }) {
  const { t } = useI18n()
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
  const embed = embedMapUrl(station.latitude, station.longitude, key)
  const dir = directionsUrl(station.latitude, station.longitude)

  return (
    <section className="rounded-3xl border border-white/10 bg-[var(--color-surface)]/80 p-6 sm:p-8" aria-labelledby="map-heading">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <H2 id="map-heading">{t('map.title')}</H2>
        <ButtonLink href={dir} target="_blank" rel="noopener noreferrer">
          {t('map.directions')}
        </ButtonLink>
      </div>
      {embed ? (
        <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
          <iframe
            title={station.name}
            className="aspect-video min-h-[280px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={embed}
          />
        </div>
      ) : (
        <div className="flex aspect-video min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl bg-[var(--color-surface-muted)] px-6 text-center ring-1 ring-white/10">
          <p className="max-w-md text-sm text-[var(--color-ink-muted)]">{t('map.embed.fallback')}</p>
          <ButtonLink variant="outline" href={dir} target="_blank" rel="noopener noreferrer">
            {t('map.directions')}
          </ButtonLink>
        </div>
      )}
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
          {t('map.address')}
        </p>
        <p className="mt-1 text-base text-[var(--color-ink)]">{station.address}</p>
      </div>
    </section>
  )
}
