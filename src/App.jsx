import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'
import About from './components/About'
import Certificate from './components/Certificate'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

function App() {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) return

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.1,
      multiplier: 0.7,
    })

    // Handle anchor links dengan Locomotive Scroll
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          scroll.scrollTo(target)
        }
      }
    }

    // Add event listeners untuk semua anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick)
    })

    return () => {
      // Cleanup
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick)
      })
      scroll.destroy()
    }
  }, [])

  return (
    <>
      <Navbar />
      <div data-scroll-container ref={scrollRef}>
        <Header />
        <About />
        <Certificate />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App