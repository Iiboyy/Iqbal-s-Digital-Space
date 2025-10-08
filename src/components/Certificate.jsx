import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import S1 from '../assets/img/S1.jpg'
import S2 from '../assets/img/S2.png'
import S3 from '../assets/img/S3.jpg'

function Certificate() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  }

  const certificates = [
    {
      id: 1,
      title: "IT Essentials - Cisco",
      issuer: "Cisco Networking Academy",
      date: "2024",
      description: "Achieved student level credential for completing IT Essentials course",
      image: S1,
      badge: "📃"
    },
    {
      id: 2,
      title: "UI/UX Design Competition",
      issuer: "Soegijapranata University",
      date: "2025",
      description: "Participated in UI/UX design competition",
      image: S2,
      badge: "📃"
    },
    {
      id: 3,
      title: "Technology for All",
      issuer: "IBM Skillsbuild",
      date: "2025",
      description: "Junior Achievement and IBM Skillsbuild partnership",
      image: S3,
      badge: "📃"
    }
  ]

  const scrollPositionRef = useRef(0)

  const openModal = (certificate) => {
    scrollPositionRef.current = window.pageYOffset
    setSelectedCertificate(certificate)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.classList.add('modal-open')
  }

  const closeModal = () => {
    setSelectedCertificate(null)
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    document.body.classList.remove('modal-open')
    window.scrollTo(0, scrollPositionRef.current)
  }

  const modalContentRef = useRef(null)

  // Remove scrollIntoView to rely on CSS centering
  // useEffect(() => {
  //   if (selectedCertificate && modalContentRef.current) {
  //     modalContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  //   }
  // }, [selectedCertificate])

  // Close modal dengan ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedCertificate) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCertificate])

  return (
    <section id="certificates" className="certificates" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <span>ACHIEVEMENTS</span>
          </div>
          <h2 className="section-title">
            MY <span className="gradient-text">CERTIFICATES</span>
          </h2>
          <p className="section-description">
            Professional certifications that validate my expertise in design and development.
          </p>
        </motion.div>

        <motion.div 
          className="certificates-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {certificates.map((certificate) => (
            <motion.div
              key={certificate.id}
              className="certificate-card"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="certificate-content">
                <div className="certificate-image">
                  <img 
                    src={certificate.image} 
                    alt={certificate.title}
                    loading="lazy"
                  />
                  <div className="certificate-badge">
                    {certificate.badge}
                  </div>
                </div>
                
                <div className="certificate-info">
                  <div className="certificate-meta">
                    <span className="certificate-issuer">{certificate.issuer}</span>
                    <span className="certificate-date">{certificate.date}</span>
                  </div>
                  
                  <h3 className="certificate-title">{certificate.title}</h3>
                  <p className="certificate-description">{certificate.description}</p>
                  
                  <div className="certificate-actions">
                    <button 
                      className="view-btn"
                      onClick={() => openModal(certificate)}
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Certificate Modal - FIXED POSITION */}
      {selectedCertificate && (
        <motion.div 
          className="certificate-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div 
            className="certificate-modal-content"
            ref={modalContentRef}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeModal}>
              ×
            </button>
            
            <div className="modal-header">
              <h3>{selectedCertificate.title}</h3>
              <p>{selectedCertificate.issuer} • {selectedCertificate.date}</p>
            </div>
            
            <div className="modal-image">
              <img 
                src={selectedCertificate.image} 
                alt={selectedCertificate.title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Certificate