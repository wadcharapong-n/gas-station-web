import type { ButtonHTMLAttributes, ReactNode } from 'react'

export function TabTrigger({
  selected,
  children,
  id,
  ariaControls,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean
  children: ReactNode
  id: string
  ariaControls: string
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={selected}
      aria-controls={ariaControls}
      tabIndex={selected ? 0 : -1}
      className={`relative flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] sm:text-base ${
        selected
          ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/15'
          : 'text-[var(--color-ink-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]'
      }`}
      {...props}
    >
      {children}
    </button>
  )
}
