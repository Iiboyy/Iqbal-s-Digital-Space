import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Profile from '../assets/img/profile.png'

function Header() {
  const [typedText, setTypedText] = useState('')
  const texts = ['3D DESIGNER', 'WEB DEVELOPER', 'CREATIVE DESIGNER']
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (charIndex < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + texts[textIndex][charIndex])
        setCharIndex(charIndex + 1)
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setTypedText('')
        setCharIndex(0)
        setTextIndex((textIndex + 1) % texts.length)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [charIndex, textIndex])

  // Animation variants untuk lanyard
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Lanyard animation - foto kayak digantung
  const lanyardVariants = {
    initial: { 
      y: -100,
      rotate: -5 
    },
    animate: { 
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 1.5
      }
    },
    hover: {
      y: [-5, 5, -5],
      rotate: [-1, 1, -1],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        },
        rotate: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }
    }
  }

  const ropeVariants = {
    initial: { scaleY: 0 },
    animate: { 
      scaleY: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  }

  const hookVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }
  }

  return (
    <motion.header 
      className="hero" 
      id="home"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className="animated-bg">
        <motion.div 
          className="floating-shape shape-1"
          variants={floatingVariants}
          animate="animate"
        ></motion.div>
        <motion.div 
          className="floating-shape shape-2"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        ></motion.div>
        <motion.div 
          className="floating-shape shape-3"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        ></motion.div>
      </div>

      <div className="hero-content">
        <motion.div className="hero-text" variants={containerVariants}>
          <motion.div 
            className="greeting"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            HAI! SAYA
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="gradient-text"
          >
            IQBAL PRATAMA
          </motion.h1>
          <motion.div 
            className="title typing-text"
            variants={itemVariants}
          >
            {typedText}|
          </motion.div>
          <motion.p 
            className="description"
            variants={itemVariants}
          >
            I am a <span className='highlight'>3D Designer</span> and <span className='highlight'>Web Developer</span> passionate about creating engaging and functional digital experiences.
          </motion.p>

          <motion.a 
            href="#about"
            className="cta-button glow-button"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            ABOUT ME
          </motion.a>
        </motion.div>
        
        {/* Lanyard Photo Container */}
        <motion.div 
          className="lanyard-container"
          variants={itemVariants}
        >
          {/* Tali/Gantungan */}
          <motion.div 
            className="lanyard-hook"
            variants={hookVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div 
            className="lanyard-rope"
            variants={ropeVariants}
            initial="initial"
            animate="animate"
          />
          
          {/* Foto dengan efek lanyard */}
          <motion.div 
            className="photo-frame"
            variants={lanyardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <motion.img 
              src={Profile}
              alt="Profile" 
              className="profile-pic"
              whileHover={{ 
                scale: 1.02,
              }}
            />
            {/* Efek bayangan untuk realism */}
            <div className="photo-shadow"></div>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header