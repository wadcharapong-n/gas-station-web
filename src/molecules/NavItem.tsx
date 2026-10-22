import { NavLink } from 'react-router-dom'

export function NavItem({ to, children }: { to: string; children: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] ${
          isActive ? 'bg-white/10 text-white' : 'text-[var(--color-ink-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]'
        }`
      }
    >
      {children}
    </NavLink>
  )
}
