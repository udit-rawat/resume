import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })

/* Current time in New Delhi, updated every 20 seconds. */
export function useClock() {
  const [now, setNow] = useState(() => fmt.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 20_000)
    return () => clearInterval(id)
  }, [])
  return now
}
