import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../assets/img/Logo-3.png'

// ambil instance locomotive scroll global (dari App.jsx)
import LocomotiveScroll from 'locomotive-scroll'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('EN')
  const [progress, setProgress] = useState(0)

  // === Ambil instance locomotive scroll sekali aja ===
  const locoScroll = useRef(null)
  useEffect(() => {
    if (!locoScroll.current) {
      locoScroll.current = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.1,
        multiplier: 0.7,
      })
    }

    // progress bar handler
    locoScroll.current.on("scroll", (args) => {
      const scrollHeight = args.limit.y
      const scrollTop = args.scroll.y
      const prog = (scrollTop / scrollHeight) * 100
      setProgress(prog)
      setIsScrolled(scrollTop > 10)
    })

    return () => {
      locoScroll.current?.destroy()
      locoScroll.current = null
    }
  }, [])

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageOpen && !event.target.closest('.language-switcher')) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isLanguageOpen])

  // Smooth scroll pakai locomotive
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    setIsLanguageOpen(false)

    const target = document.querySelector(targetId)
    if (target && locoScroll.current) {
      locoScroll.current.scrollTo(target, {
        offset: -80, // biar ga ketutup navbar
        duration: 800,
        easing: [0.25, 0.0, 0.35, 1.0],
      })
    }
  }

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang)
    setIsLanguageOpen(false)
  }

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Certificate', href: '#certificate' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' }
  ]

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-container">
        <div className="nav-content">
          {/* Logo */}
          <motion.a 
            href="#home" 
            className="nav-logo"
            onClick={(e) => handleSmoothScroll(e, '#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={Logo} alt="Logo" width={125} />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.href}
                className="nav-link"
                onClick={(e) => handleSmoothScroll(e, link.href)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right Section */}
          <div className="nav-right">
            {/* Language Switcher */}
            <div className="language-switcher">
              <motion.button 
                className="language-trigger"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="language-flag">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
                <span className="language-code">{currentLanguage}</span>
                <motion.span
                  animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: '0.6rem', marginLeft: '0.25rem' }}
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div 
                    className="language-dropdown"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
                        onClick={() => handleLanguageChange(language.code)}
                      >
                        <span className="language-flag">{language.flag}</span>
                        <span className="language-name">{language.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <motion.a 
              href="#contact" 
              className="nav-cta-button"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Contact</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <span></span><span></span><span></span>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                >
                  {link.name}
                </motion.a>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="mobile-language-switcher">
                {languages.map((language) => (
                  <motion.button
                    key={language.code}
                    className={`mobile-language-option ${currentLanguage === language.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(language.code)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="language-flag">{language.flag}</span>
                    <span>{language.name}</span>
                  </motion.button>
                ))}
              </div>

              <motion.a 
                href="#contact" 
                className="mobile-cta-button"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress"
        style={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--primary-purple), var(--accent-purple))',
          transform: `scaleX(${progress / 100})`,
          transformOrigin: '0%',
          transition: 'transform 0.1s linear',
          zIndex: 1002
        }}
      />
    </motion.nav>
  )
}

export default Navbar
