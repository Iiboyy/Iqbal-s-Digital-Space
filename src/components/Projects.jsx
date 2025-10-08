import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import P1 from '../assets/img/P1.jpg'
import P2 from '../assets/img/P2.jpg'
import P3 from '../assets/img/P3.jpg'
import P4 from '../assets/img/P4.jpg'

function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })
  const [activeFilter, setActiveFilter] = useState('all')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const projects = [
    {
      id: 1,
      title: "School Web",
      description: "I tried to make my own version of the SMKN 7 Semarang website",
      tech: ["HTML", "CSS", "JavasScript"],
      image: P1,
      link: "https://github.com/Iiboyy/School-Web",
      category: "web",
    },
    {
      id: 2,
      title: "Aurora Hotel",
      description: "I created a hotel website that introduces the hotel so that guests can book a room.",
      tech: ["HTML", "CSS", "JavasScript"],
      image: P2,
      link: "https://github.com/Iiboyy/Aurora-Hotel",
      category: "web",
    },
    {
      id: 3,
      title: "Jetbus 5 Adi Putro Bus Custom Interior",
      description: "I created the bus interior from scratch using Blender. The entire interior is incredibly detailed.",
      tech: ["Blender"],
      image: P3,
      link: "#",
      category: "3d"
    },
    {
      id: 4,
      title: "MPGT Morodadi Prima Bus Interior",
      description: "I created the bus interior from scratch using Blender. The entire interior is incredibly detailed.",
      tech: ["Blender"],
      image: P4,
      link: "#",
      category: "3d"
    }
  ]

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Development' },
    { key: '3d', label: '3D Design' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <motion.section 
      id="projects" 
      className="projects"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div 
          className="section-header"
          variants={itemVariants}
        >
          <div className="section-badge">
            <span>FEATURED WORK</span>
          </div>
          <h2 className="section-title">
            MY <span className="gradient-text">PROJECTS</span>
          </h2>
          <p className="section-description">
            A collection of my projects showcasing my skills and creativity.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="project-filters"
          variants={itemVariants}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="projects-grid"
          layout
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              variants={itemVariants}
              layout
              whileHover="hover"
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="project-content"
                variants={{
                  hover: {
                    y: -5,
                    transition: { duration: 0.2 }
                  }
                }}
              >
                {/* Project Image */}
                <div className="project-image">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="project-overlay">
                    <div className="project-category">
                      {project.category === '3d' ? '🎨 3D Design' : '💻 Web Dev'}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.tech.map((tech, index) => (
                      <motion.span 
                        key={index}
                        className="tech-tag"
                        whileHover={{ 
                          scale: 1.1,
                          y: -2
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <motion.a 
                      href={project.link}
                      className="project-link"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      
                    </motion.a>
                    <motion.a
                      href={project.link}
                      className="project-demo"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project ↗
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Projects