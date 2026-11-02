import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Ring } from './components/Ring'
import { ProjectIndex } from './components/ProjectIndex'
import { Timeline } from './components/Timeline'
import { Services } from './components/Services'
import { Footer } from './components/Footer'
import { ProjectPage } from './pages/ProjectPage'

function Home() {
  useEffect(() => {
    document.title = 'Udit Rawat, AI Engineer'
  }, [])
  return (
    <main>
      <Hero />
      <Ring />
      <ProjectIndex />
      <Timeline />
      <Services />
    </main>
  )
}

/* Scroll to the hash target after navigation, or to the top on a new page. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView())
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="*" element={<ProjectPage />} />
      </Routes>
      <Footer />
    </>
  )
}
