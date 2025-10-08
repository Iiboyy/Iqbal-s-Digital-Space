import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const progressVariants = (percentage) => ({
    hidden: { width: 0 },
    visible: {
      width: `${percentage}%`,
      transition: {
        duration: 1.5,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  })

  // Skills order adjusted: 3D Design moved below Web Development
  const skills = [
    { name: "3D Blender", percentage: 95, color: "linear-gradient(90deg, #8B5CF6, #EC4899)" },
    { name: "HTML", percentage: 90, color: "linear-gradient(90deg, #8B5CF6, #A855F7)" },
    { name: "CSS", percentage: 85, color: "linear-gradient(90deg, #8B5CF6, #06B6D4)" },
    { name: "Javasript", percentage: 80, color: "linear-gradient(90deg, #8B5CF6, #F59E0B)" }
  ]

  return (
    <motion.section 
      id="about" 
      className="about"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div className="about-content">
          {/* Text & Skills Side */}
          <motion.div className="about-left" variants={containerVariants}>
            <motion.div 
              className="section-badge"
              variants={itemVariants}
            >
              <span>ABOUT ME</span>
            </motion.div>
            
            <motion.h2 
              className="about-title"
              variants={itemVariants}
            >
              BUILDING <span className="gradient-text">DIGITAL EXPERIENCE</span>
            </motion.h2>
            
            

            {/* Skills Grid - Order adjusted */}
            <motion.div 
              className="skills-grid"
              variants={containerVariants}
            >
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="skill-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.percentage}%</span>
                  </div>
                  <div className="skill-track">
                    <motion.div
                      className="skill-progress"
                      variants={progressVariants(skill.percentage)}
                      style={{
                        background: skill.color
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Code Window Side */}
          <motion.div 
            className="about-right"
            variants={itemVariants}
          >
            <motion.div 
              className="code-window"
              whileHover={{ y: -3 }}
            >
              <div className="window-header">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="window-title">about.js</div>
              </div>
              <div className="code-content">
                <pre>{`const developer = {
  name: "Iqbal Pratama Wijaya",
  role: "Admin",
  
  skills: {
    design: ["3D Design", "UI/UX"],
    development: ["React", "JS", "CSS"],
    tools: ["Figma", "Blender", "VS Code"]
  },
  
  experience: "3+ years",
  status: "Available for projects"
};`}</pre>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default About