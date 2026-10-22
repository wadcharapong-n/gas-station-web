import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nContext } from './context'
import type { Locale } from './strings'
import { STRINGS } from './strings'

const STORAGE_KEY = 'gas-station-public-locale'

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'th'
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
  if (stored === 'en' || stored === 'th') return stored
  const nav = navigator.language.toLowerCase()
  return nav.startsWith('th') ? 'th' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l === 'th' ? 'th' : 'en'
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === 'th' ? 'th' : 'en'
  }, [locale])

  const t = useCallback(
    (key: string, ...args: string[]) => {
      const table = STRINGS[locale]
      const raw = table[key]
      if (typeof raw === 'function') return raw(...args)
      if (typeof raw === 'string') return raw
      const fallback = STRINGS.en[key]
      if (typeof fallback === 'function') return fallback(...args)
      if (typeof fallback === 'string') return fallback
      return key
    },
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
