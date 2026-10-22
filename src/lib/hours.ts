import type { DayHours, DayKey } from './types'

const LONG_TO_KEY: Record<string, DayKey> = {
  monday: 'mon',
  tuesday: 'tue',
  wednesday: 'wed',
  thursday: 'thu',
  friday: 'fri',
  saturday: 'sat',
  sunday: 'sun',
}

function bangkokDateParts(d: Date): { weekday: string; hour: number; minute: number } {
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Bangkok',
    weekday: 'long',
  })
    .formatToParts(d)
    .find((p) => p.type === 'weekday')?.value
    .toLowerCase() ?? 'monday'

  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Bangkok',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d)

  const [h, m] = time.split(':').map(Number)
  return { weekday, hour: h, minute: m }
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function getBangkokDayKey(now = new Date()): DayKey {
  const { weekday } = bangkokDateParts(now)
  return LONG_TO_KEY[weekday] ?? 'mon'
}

export function isStationOpen(hours: Record<DayKey, DayHours>, now = new Date()): boolean {
  const day = getBangkokDayKey(now)
  const h = hours[day]
  if (!h || h.closed) return false
  const { hour, minute } = bangkokDateParts(now)
  const cur = hour * 60 + minute
  const open = toMinutes(h.open)
  const close = toMinutes(h.close)
  if (close <= open) return cur >= open || cur < close
  return cur >= open && cur < close
}

export function formatTodayHours(
  hours: Record<DayKey, DayHours>,
  labels: { closed: string; range: (open: string, close: string) => string },
  now = new Date(),
): string {
  const day = getBangkokDayKey(now)
  const h = hours[day]
  if (!h || h.closed) return labels.closed
  return labels.range(h.open, h.close)
}
