import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import projectsData from '../../data/projects';
import { FiExternalLink, FiGithub, FiZap, FiCode, FiEye } from 'react-icons/fi';

const ProjectCard = ({ project, index }) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  
  const smoothY = useSpring(y, { stiffness: 80, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 80, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 80, damping: 30 });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{
        y: smoothY,
        opacity: smoothOpacity,
        scale: smoothScale
      }}
    >
      {/* Decorative Background Elements */}
      <motion.div
        className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br ${
          isEven ? 'from-blue-500/10 to-purple-500/10' : 'from-purple-500/10 to-pink-500/10'
        } rounded-full blur-3xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className={`w-full max-w-7xl mx-auto flex flex-col ${
        isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } items-center gap-8 lg:gap-16 relative z-10`}>
        
        {/* Image Container with Premium Effects */}
        <motion.div 
          className="w-full lg:w-[55%] relative group"
          initial={{ x: isEven ? 100 : -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: isEven ? 100 : -100, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 50, 
            damping: 20,
            duration: 0.8
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            {/* Glowing Border Effect */}
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500"
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 3, ease: "linear" }}
            />
            
            {/* Main Image Container */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200/20 dark:border-gray-700/20">
              
              {/* Project Number Badge */}
              <motion.div 
                className="absolute top-6 left-6 z-30 px-4 py-2 bg-black/80 dark:bg-white/90 backdrop-blur-md rounded-full"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <span className="text-white dark:text-black font-bold text-sm">#{index + 1}</span>
              </motion.div>

              {/* Quick Action Buttons */}
              <motion.div 
                className="absolute top-6 right-6 z-30 flex gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/80 dark:bg-white/90 backdrop-blur-md rounded-full hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiExternalLink className="w-5 h-5 text-white dark:text-black" />
                </motion.a>
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/80 dark:bg-white/90 backdrop-blur-md rounded-full hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub className="w-5 h-5 text-white dark:text-black" />
                  </motion.a>
                )}
              </motion.div>

              {/* Overlay Gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Image */}
              <motion.a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block relative z-10"
              >
                <div className="aspect-video sm:aspect-auto sm:h-[400px] lg:h-[500px] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </motion.a>

              {/* Bottom Info Bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 z-30 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full">
                    <FiEye className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Live Preview</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
              className={`absolute -bottom-6 ${isEven ? '-left-6' : '-right-6'} w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl`}
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>

        {/* Content Container */}
        <motion.div 
          className="w-full lg:w-[45%] space-y-6 sm:space-y-8"
          initial={{ x: isEven ? -100 : 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: isEven ? -100 : 100, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 50, 
            damping: 20,
            duration: 0.8,
            delay: 0.2
          }}
        >
          {/* Category Badge */}
          <motion.div
            initial={{ scale: 0, x: -20 }}
            animate={isInView ? { scale: 1, x: 0 } : { scale: 0, x: -20 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 backdrop-blur-sm rounded-full border border-blue-500/20 dark:border-blue-400/20">
              <FiZap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Featured Project</span>
            </span>
          </motion.div>

          {/* Project Title */}
          <motion.h3 
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              {project.title}
            </span>
          </motion.h3>

          {/* Description with Glass Effect */}
          <motion.div
            className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Tech Stack with Enhanced Design */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FiCode className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 200,
                    delay: 0.6 + (i * 0.05)
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10 text-sm sm:text-base">{tech}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 pt-4"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10">View Live</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 3, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <FiExternalLink className="w-5 h-5" />
              </motion.span>
            </motion.a>

            {project.github && (
              <motion.a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl border border-gray-300 dark:border-gray-600 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiGithub className="w-5 h-5" />
                <span>Source Code</span>
              </motion.a>
            )}
          </motion.div>

          {/* Project Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { label: 'Year', value: project.year || '2024' },
              { label: 'Type', value: project.type || 'Web App' },
              { label: 'Status', value: 'Live' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20 min-h-screen overflow-hidden">
      
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px]"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 dark:bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left shadow-lg"
        style={{ scaleX }}
      />

      {/* Header Section */}
      <motion.div 
        className="relative text-center pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Subtitle Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-full border border-gray-200/50 dark:border-gray-700/50 mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <FiZap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">Featured Work</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
        >
          <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            My Projects
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          A curated collection of my latest work, showcasing innovation, 
          creativity, and technical excellence
        </motion.p>

        {/* Stats Bar */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { number: projectsData.length, label: 'Projects' },
            { number: '50+', label: 'Technologies' },
            { number: '100%', label: 'Satisfaction' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + (i * 0.1), type: "spring" }}
            >
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Projects Grid */}
      <div className="relative" ref={containerRef}>
        {projectsData.map((project, index) => (
          <ProjectCard 
            key={project.id || project.title} 
            project={project} 
            index={index} 
          />
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div 
        className="relative text-center py-20 sm:py-32 px-4 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl"
          initial={{ scale: 0.9, y: 50 }}
          whileInView={{ scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Let's Create Something Amazing Together
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            Have a project in mind? I'd love to hear about it and bring your vision to life.
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get In Touch</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;