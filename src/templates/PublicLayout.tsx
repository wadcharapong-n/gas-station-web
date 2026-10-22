import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from '../atoms/Button'
import { SkipLink } from '../atoms/SkipLink'
import { useI18n } from '../lib/i18n/useI18n'
import { PublicFooter } from '../organisms/PublicFooter'
import { PublicHeader } from '../organisms/PublicHeader'
import { usePublicStationStore } from '../store/usePublicStationStore'

export function PublicLayout() {
  const { t } = useI18n()
  const load = usePublicStationStore((s) => s.load)
  const loading = usePublicStationStore((s) => s.loading)
  const error = usePublicStationStore((s) => s.error)

  useEffect(() => {
    void load()
  }, [load])

  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink href="#main-content">{t('skip.content')}</SkipLink>
      <PublicHeader />
      <main id="main-content" className="flex flex-1 flex-col">
        {loading && !error ? (
          <div className="flex flex-1 items-center justify-center px-4 py-24" role="status" aria-live="polite">
            <p className="text-sm text-[var(--color-ink-muted)]">{t('loading')}</p>
          </div>
        ) : error ? (
          <div className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
            <p className="text-lg font-medium text-white">{t('error.title')}</p>
            <p className="text-sm text-[var(--color-ink-muted)]">{error}</p>
            <Button type="button" onClick={() => void load()}>
              {t('error.retry')}
            </Button>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <PublicFooter />
    </div>
  )
}
