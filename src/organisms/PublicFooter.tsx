import { useI18n } from '../lib/i18n/useI18n'

export function PublicFooter() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#080b0f]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-center text-sm text-[var(--color-ink-muted)] sm:flex-row sm:items-center sm:justify-between sm:text-left sm:px-6">
        <p>
          © {year} {t('brand.short')}. {t('footer.copy')}.
        </p>
        <p className="text-xs">Gas Station · Public site</p>
      </div>
    </footer>
  )
}
