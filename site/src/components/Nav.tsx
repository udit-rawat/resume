import { Link, useLocation } from 'react-router-dom'
import { contact } from '../data'

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Services', href: '/#services' },
]

/* Floating pill nav, after butter.video. */
export function Nav() {
  const { pathname } = useLocation()
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
      <nav
        aria-label="Main"
        className="pointer-events-auto flex w-full max-w-[1120px] items-center justify-between gap-3"
      >
        <div className="flex items-center gap-1 rounded-2xl bg-card/90 p-1.5 pr-2 shadow-[0_1px_0_rgb(0_0_0/0.04),0_6px_24px_rgb(0_0_0/0.06)] ring-1 ring-black/5 backdrop-blur-md">
          <Link to="/" className="rounded-xl px-3 py-1.5 text-[15px] font-semibold tracking-tight">
            Udit Rawat
          </Link>
          <ul className="hidden items-center sm:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={pathname === '/' ? l.href.slice(1) : l.href}
                  className="rounded-xl px-3 py-1.5 text-[14px] text-ink-soft transition-colors hover:bg-black/5 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={contact.resume}
                className="rounded-xl px-3 py-1.5 text-[14px] text-ink-soft transition-colors hover:bg-black/5 hover:text-ink"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-card/90 p-1.5 shadow-[0_1px_0_rgb(0_0_0/0.04),0_6px_24px_rgb(0_0_0/0.06)] ring-1 ring-black/5 backdrop-blur-md">
          <a
            href={contact.projectMail}
            className="block rounded-xl bg-ink px-3.5 py-1.5 text-[14px] font-medium text-ground transition-colors hover:bg-black"
          >
            Start a project
          </a>
        </div>
      </nav>
    </header>
  )
}
