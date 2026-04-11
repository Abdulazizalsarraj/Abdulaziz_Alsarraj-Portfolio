'use client';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useReducedMotion from '@/hooks/useReducedMotion';
import useIsMobile from '@/hooks/useIsMobile';
import { FiExternalLink, FiGithub, FiZap, FiCode } from 'react-icons/fi';

// ─── ProjectCard ─────────────────────────────────────────────────────────────
const ProjectCard = memo(({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });
  const reducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl pointer-events-none ${
          isEven ? 'bg-teal-400/8' : 'bg-cyan-400/8'
        }`}
        aria-hidden="true"
      />

      <div className={`w-full max-w-7xl mx-auto flex flex-col ${
        isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } items-center gap-8 lg:gap-16 relative z-10`}>

        {/* ── Image Side ── */}
        <div className="w-full lg:w-[55%] relative group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 rounded-3xl opacity-0 group-hover:opacity-60 blur-lg transition-opacity duration-500" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-secondary border border-teal-400/10">
              {/* Project Number Badge */}
              <div className="absolute top-6 left-6 z-30 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full">
                <span className="text-white font-bold text-sm">#{index + 1}</span>
              </div>

              {/* Quick Action Buttons */}
              <div className="absolute top-6 right-6 z-30 flex gap-2 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/80 backdrop-blur-md rounded-full hover:scale-110 transition-transform"
                  aria-label={`View ${project.title} live`}
                >
                  <FiExternalLink className="w-5 h-5 text-white" />
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/80 backdrop-blur-md rounded-full hover:scale-110 transition-transform"
                    aria-label={`${project.title} source code`}
                  >
                    <FiGithub className="w-5 h-5 text-white" />
                  </a>
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative z-10">
                <div className="aspect-video sm:aspect-auto sm:h-[400px] lg:h-[500px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 55vw"
                    quality={100}
                    unoptimized
                  />
                </div>
              </a>
            </div>

            <div
              className={`absolute -bottom-6 ${isEven ? '-left-6' : '-right-6'} w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl shadow-xl`}
            />
          </div>
        </div>

        {/* ── Content Side ── */}
        <div className="w-full lg:w-[45%] space-y-6 sm:space-y-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-400/10 backdrop-blur-sm rounded-full border border-teal-400/20">
            <FiZap className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-semibold text-teal-400">Featured Project</span>
          </span>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              {project.title}
            </span>
          </h3>

          <div className="p-6 rounded-2xl bg-secondary/60 backdrop-blur-sm border border-teal-400/10 shadow-xl">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiCode className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="relative px-4 py-2 rounded-xl bg-secondary border border-teal-400/20 text-gray-300 font-medium text-sm sm:text-base shadow-lg hover:border-teal-400/50 hover:text-white hover:shadow-teal-400/20 hover:shadow-xl transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-semibold rounded-2xl shadow-lg hover:shadow-teal-400/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>View Live</span>
              <FiExternalLink className="w-5 h-5" />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-gray-200 font-semibold rounded-2xl shadow-lg border border-teal-400/30 hover:border-teal-400/60 hover:-translate-y-0.5 transition-all duration-200"
              >
                <FiGithub className="w-5 h-5" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-teal-400/10">
            {[
              { label: 'Year', value: project.year || '2024' },
              { label: 'Type', value: project.type || 'Web App' },
              { label: 'Status', value: 'Live' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-sm sm:text-base font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
ProjectCard.displayName = 'ProjectCard';

// ─── Background Particles ─────────────────────────────────────────────────────
const PROJECTS_PARTICLES_DESKTOP = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${(i * 12.5 + 6) % 100}%`,
  top: `${(i * 11.3 + 4) % 100}%`,
  duration: 4 + (i % 4) * 0.8,
  delay: (i % 4) * 0.5,
}));

const PROJECTS_PARTICLES_MOBILE = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  left: `${(i * 25 + 10) % 100}%`,
  top: `${(i * 22 + 8) % 100}%`,
  duration: 4 + (i % 3) * 0.8,
  delay: i * 0.5,
}));

const ProjectsParticles = () => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const particles = isMobile ? PROJECTS_PARTICLES_MOBILE : PROJECTS_PARTICLES_DESKTOP;
  if (reducedMotion) return null;
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-teal-400/25 rounded-full"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

// ─── Projects Client Component ────────────────────────────────────────────────
const ProjectsClient = ({ projects }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative bg-gradient-to-br from-primary via-primary to-secondary min-h-screen overflow-hidden">
      {/* Static gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px]" />
      </div>

      <ProjectsParticles />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Header */}
      <motion.div
        className="relative text-center pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/70 backdrop-blur-sm rounded-full border border-teal-400/20 mb-8">
          <FiZap className="w-5 h-5 text-teal-400" />
          <span className="text-sm sm:text-base font-semibold text-gray-300">Featured Work</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-teal-300 to-cyan-300 bg-clip-text text-transparent">
            My Projects
          </span>
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          A curated collection of my latest work, showcasing innovation, creativity, and technical excellence
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-12 sm:mt-16">
          {[
            { number: projects.length, label: 'Projects' },
            { number: '50+', label: 'Technologies' },
            { number: '100%', label: 'Satisfaction' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.number}
              </p>
              <p className="text-sm sm:text-base text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Projects list */}
      <div className="relative" ref={containerRef}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id || project.title} project={project} index={index} />
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div
        className="relative text-center py-20 sm:py-32 px-4 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Let&apos;s Create Something Amazing Together
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            Have a project in mind? I&apos;d love to hear about it and bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-teal-400 font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
          >
            <span>Get In Touch</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsClient;
