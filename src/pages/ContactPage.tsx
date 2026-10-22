import { H1, Lead } from '../atoms/Text'
import { ButtonLink } from '../atoms/ButtonLink'
import { useI18n } from '../lib/i18n/useI18n'
import { selectSelectedStation, usePublicStationStore } from '../store/usePublicStationStore'

export function ContactPage() {
  const { t } = useI18n()
  const station = usePublicStationStore(selectSelectedStation)

  if (!station) return null

  const socialEntries = Object.entries(station.socialLinks)

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <H1>{t('contact.title')}</H1>
      <Lead className="mt-2 max-w-2xl">{station.address}</Lead>

      <dl className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[var(--color-surface-muted)]/80 p-6">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
            {t('contact.phone')}
          </dt>
          <dd className="mt-2">
            <a
              href={`tel:${station.phone.replace(/\s/g, '')}`}
              className="text-lg text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
            >
              {station.phone}
            </a>
          </dd>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[var(--color-surface-muted)]/80 p-6">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
            {t('contact.email')}
          </dt>
          <dd className="mt-2">
            <a
              href={`mailto:${station.email}`}
              className="text-lg text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded break-all"
            >
              {station.email}
            </a>
          </dd>
        </div>
      </dl>

      {socialEntries.length > 0 ? (
        <section className="mt-10" aria-labelledby="social-heading">
          <h2 id="social-heading" className="text-sm font-semibold text-[var(--color-ink)]">
            {t('contact.social')}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3" role="list">
            {socialEntries.map(([platform, url]) => (
              <li key={platform}>
                <ButtonLink href={url} target="_blank" rel="noopener noreferrer" variant="outline">
                  {platform}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
