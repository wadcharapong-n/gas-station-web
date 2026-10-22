import { Link } from 'react-router-dom'
import { LanguageSwitcher } from '../molecules/LanguageSwitcher'
import { NavItem } from '../molecules/NavItem'
import { useI18n } from '../lib/i18n/useI18n'
import { selectSelectedStation, usePublicStationStore } from '../store/usePublicStationStore'

export function PublicHeader() {
  const { t } = useI18n()
  const station = usePublicStationStore(selectSelectedStation)
  const title = station?.name ?? t('brand.short')

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f14]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="min-w-0 shrink font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] rounded-lg"
        >
          <span className="block truncate">{title}</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1" aria-label="Primary">
          <NavItem to="/">{t('nav.home')}</NavItem>
          <NavItem to="/map">{t('nav.map')}</NavItem>
          <NavItem to="/services">{t('nav.services')}</NavItem>
          <NavItem to="/contact">{t('nav.contact')}</NavItem>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
