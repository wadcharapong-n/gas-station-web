import { createContext } from 'react'
import type { Locale } from './strings'

export interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string, ...args: string[]) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)
