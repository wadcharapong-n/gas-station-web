import { Button } from '../atoms/Button'
import { useI18n } from '../lib/i18n/useI18n'
import type { Locale } from '../lib/i18n/strings'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  const cycle = () => {
    const next: Locale = locale === 'th' ? 'en' : 'th'
    setLocale(next)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="!px-3 !py-1.5 text-xs"
      onClick={cycle}
      aria-label={locale === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
    >
      <span className={locale === 'th' ? 'text-white' : 'text-[var(--color-ink-muted)]'}>
        {t('lang.th')}
      </span>
      <span className="text-[var(--color-ink-muted)]">/</span>
      <span className={locale === 'en' ? 'text-white' : 'text-[var(--color-ink-muted)]'}>
        {t('lang.en')}
      </span>
    </Button>
  )
}
