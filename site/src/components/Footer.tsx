import { contact } from '../data'
import { useClock } from './useClock'

/* generaladmission.house's giant sign-off block, plus sebneil's corner details. */
export function Footer() {
  const time = useClock()
  return (
    <footer className="overflow-hidden px-4 pt-24 pb-6 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <p aria-label="Udit Rawat, AI engineer, New Delhi" className="display-wide text-[clamp(2.6rem,10.4vw,10rem)]">
          <span className="block">Udit Rawat</span>
          <span className="block">AI Engineer</span>
          <span className="block text-ink-faint">New Delhi, IN</span>
        </p>
        <div className="mt-14 flex flex-col gap-4 border-t border-rule pt-5 text-[13px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6">
            <span className="mono">{time} New Delhi</span>
            <span>© 2026 Udit Rawat</span>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><a className="hover:text-ink" href={`mailto:${contact.email}`}>Email</a></li>
            <li><a className="hover:text-ink" href={contact.github}>GitHub</a></li>
            <li><a className="hover:text-ink" href={contact.linkedin}>LinkedIn</a></li>
            <li><a className="hover:text-ink" href={contact.resume}>Resume</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
