export function formatBangkokDateTime(iso: string, locale: 'th' | 'en'): string {
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-GB', {
    timeZone: 'Asia/Bangkok',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

export function formatThbPerLitre(n: number): string {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)
}

export function formatLitres(n: number): string {
  return new Intl.NumberFormat('th-TH', {
    maximumFractionDigits: 0,
  }).format(n)
}
