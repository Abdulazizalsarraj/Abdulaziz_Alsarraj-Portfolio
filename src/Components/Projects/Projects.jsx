import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import projectsData from '../../data/projects';



const ProjectCard = ({ project, index }) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div
      ref={ref}
      className={`min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-8 p-6 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
      style={{ y, opacity }}
    >

      <motion.a 
  href={project.link} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="w-full lg:w-1/2 relative overflow-hidden rounded-3xl shadow-2xl block"
  initial={{ scale: 0.95, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  
  <div className="max-sm:aspect-video max-sm:block hidden">
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-contain"
    />
  </div>
  

  <div className="max-sm:hidden h-96">
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
    />
  </div>
</motion.a>


   
      <motion.div 
        className="w-full lg:w-1/2 space-y-6 p-6 lg:p-12"
        initial={{ x: index % 2 === 0 ? 100 : -100 }}
        whileInView={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <h3 className="text-4xl lg:text-5xl font-bold text-accent dark:text-accent-dark">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-4 py-2 rounded-full bg-primary/20 text-gray-700 dark:bg-primary-dark/20 dark:text-gray-300"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
          {project.description}
        </p>


        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block px-6 py-3 mt-4 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-accent-dark transition"
        >
          View Project
        </a>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative" ref={containerRef}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent/20 z-40"
        style={{ scaleX }}
      />

      <div className="space-y-20 py-32">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
