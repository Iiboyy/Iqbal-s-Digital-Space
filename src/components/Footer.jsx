import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Iiboyy' },
    { name: 'Instagram', url: 'https://www.instagram.com/iqblpra_?igsh=MTNncGVnYWFjMGk5OA==' }
  ];

  const quickLinks = [
    { name: 'Home', url: '#home' },
    { name: 'About', url: '#about' },
    { name: 'Certificates', url: '#certificates' },
    { name: 'Projects', url: '#projects' },
    { name: 'Contact', url: '#contact' }
  ];

  return (
    <motion.footer 
      className="footer"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        {/* Main Footer Content */}
        <motion.div className="footer-content" variants={containerVariants}>
          {/* Brand Section */}
          <motion.div className="footer-brand" variants={itemVariants}>
            <motion.h3 
              className="footer-logo"
              whileHover={{ scale: 1.05 }}
            >
            Iqbal's <span className="gradient-text">Digital Space</span>
            </motion.h3>
            <p className="footer-description">
              Design and Code That Drive Digital Experiences.
            </p>
            <motion.div 
              className="social-links"
              variants={containerVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="social-link"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.2,
                    y: -2
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="social-name">{social.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer-links" variants={itemVariants}>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="links-list">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                >
                  <motion.a 
                    href={link.url}
                    className="footer-link"
                    whileHover={{ 
                      x: 5,
                      color: 'var(--primary-purple)'
                    }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="footer-contact" variants={itemVariants}>
            <h4 className="footer-title">Get In Touch</h4>
            <motion.div 
              className="contact-info"
              variants={containerVariants}
            >
              <motion.div 
                className="contact-item"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <span className="contact-icon">📩</span>
                <span>iibrrot.15@gmail.com</span>
              </motion.div>
              <motion.div 
                className="contact-item"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <span className="contact-icon">📞</span>
                <span>+62 812 2673 6699</span>
              </motion.div>
              <motion.div 
                className="contact-item"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <span className="contact-icon">🗺</span>
                <span>Semarang, Jawa Tengah, Indonesia</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div className="footer-cta" variants={itemVariants}>
            <h4 className="footer-title">Ready to Work Together?</h4>
            <p className="cta-description">
              Let's create something amazing. Get in touch and let's discuss your project.
            </p>
            <motion.a
              href="#contact"
              className="cta-button"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Project
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="footer-bottom"
          variants={itemVariants}
        >
          <div className="footer-divider"></div>
          <div className="bottom-content">
            <p className="copyright">
              © 2025 Iqbal Pratama. All rights reserved.
            </p>
            <motion.a 
              className="back-to-top"
              whileHover={{ y: -2 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              href="#home"
            >
              <span>↑ Back to Top</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;