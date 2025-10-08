import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  const handleEmailClick = () => {
    window.open('mailto:youremail@gmail.com?subject=Hello%20from%20Portfolio&body=Hi%20there!%20I%20would%20like%20to%20get%20in%20touch.', '_blank')
  }

  return (
    <motion.section 
      id="contact" 
      className="contact"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div className="section-header" variants={itemVariants}>
          <div className="section-badge">
            <span>CONTACT</span>
          </div>
          <h2 className="section-title">
            GET IN <span className="gradient-text">TOUCH</span>
          </h2>
          <p className="section-description">
            Let's talk about something interesting!
          </p>
        </motion.div>

        <motion.div className="contact-content" variants={containerVariants}>
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="contact-main">
              <h3>Ready to Start Your Project?</h3>
              <p>
                I'm always excited to hear about new opportunities and creative projects. 
                Whether you need a website, 3D Design, or just want to chat about tech, 
                I'd love to hear from you!
              </p>
              
              <div className="contact-cta">
                <motion.a
                  href="https://wa.me/6285175454067" 
                  className="email-btn"
                  onClick={handleEmailClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </div>
            </div>

            <div className="contact-details">
              <h4>Other Ways to Connect</h4>
              <div className="social-links">
                <motion.a 
                  href="https://github.com/Iiboyy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="social-link"
                >
                  GitHub
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/iqblpra_?igsh=MTNncGVnYWFjMGk5OA==" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="social-link"
                >
                  Instagram
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div className="contact-visual" variants={itemVariants}>
            <div className="visual-content">
              <div className="floating-element">🚀</div>
              <div className="floating-element">💡</div>
              <div className="floating-element">✨</div>
              <h4>Let's Build Something Amazing Together!</h4>
              <p>We make a breakthrough</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Contact