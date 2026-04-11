import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState, useMemo, memo, useCallback } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';
import useIsMobile from '../../hooks/useIsMobile';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../../hooks/useTheme';
import { FiCode, FiLayout, FiSmartphone, FiFigma, FiZap, FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import HtmlIcon from '../../assets/icons/icons8-html.svg';
import CssIcon from '../../assets/icons/icons8-css.svg';
import JsIcon from '../../assets/icons/icons8-js.svg';
import BootstrapIcon from '../../assets/icons/icons8-bootstrap.svg';
import TailwindIcon from '../../assets/icons/icons8-tailwindcss.svg';
import ReactIcon from '../../assets/icons/icons8-react-js.svg';
import NextIcon from '../../assets/icons/icons8-nextjs.svg';
import ReduxIcon from '../../assets/icons/icons8-redux.svg';
import TypescriptIcon from '../../assets/icons/icons8-typescript.svg';
import GitIcon from '../../assets/icons/icons8-git.svg';
import TanstackIcon from '../../assets/icons/tanstack-query.svg';
import ZustandIcon from '../../assets/icons/zustand.svg';
import ViteIcon from '../../assets/icons/vitejs-svgrepo-com.svg';
import ExpoIcon from '../../assets/icons/expo-svgrepo-com.svg';
import ReactNativeIcon from '../../assets/icons/react-native.svg';
import WebpackIcon from '../../assets/icons/webpack.svg';
import ThreejsIcon from '../../assets/icons/threejs-1.svg';

const ABOUT_PARTICLES_DESKTOP = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 5.3 + 7) % 100}%`,
  top: `${(i * 7.1 + 3) % 100}%`,
  duration: 3 + (i % 5) * 0.4,
  delay: (i % 10) * 0.2,
}));

const ABOUT_PARTICLES_MOBILE = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: `${(i * 16.7 + 8) % 100}%`,
  top: `${(i * 14.3 + 5) % 100}%`,
  duration: 3 + (i % 3) * 0.5,
  delay: (i % 3) * 0.4,
}));

const ParticleBackground = memo(() => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.05 });
  const particles = isMobile ? ABOUT_PARTICLES_MOBILE : ABOUT_PARTICLES_DESKTOP;
  if (reducedMotion) return null;
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-accent dark:bg-accent-dark rounded-full"
          style={{ left: p.left, top: p.top }}
          animate={isInView ? { y: [0, -30, 0], opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}
    </div>
  );
});

// بديل CSS احترافي عن Three.js Canvas
const HeroVisual = memo(({ theme }) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const accent = '#00d3bd';
  const accent2 = '#00d2ef';
  const animate = isInView && !reducedMotion;

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
      {/* Glow backgrounds */}
      <div
        className="absolute inset-0 rounded-3xl opacity-30"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${accent}40 0%, transparent 70%)` }}
      />

      {/* Outer rotating ring */}
      <motion.div
        className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border-2 opacity-30"
        style={{ borderColor: accent }}
        animate={animate ? { rotate: 360 } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Middle dashed ring */}
      <motion.div
        className="absolute w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full border-2 border-dashed opacity-20"
        style={{ borderColor: accent2 }}
        animate={animate ? { rotate: -360 } : {}}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      {/* Center glowing orb — static boxShadow, only scale animates */}
      <motion.div
        className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${accent2}, ${accent})`,
          boxShadow: `0 0 60px ${accent}80, 0 0 120px ${accent}30`,
        }}
        animate={animate ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Wireframe lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="45" ry="18" fill="none" stroke="white" strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="18" ry="45" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>
        <FiCode className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10" />
      </motion.div>

      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{ background: i % 2 === 0 ? accent : accent2 }}
          animate={animate ? { rotate: 360 } : {}}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
          initial={{ rotate: deg }}
        >
          <div
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              transform: `translateX(${80 + i * 4}px)`,
              background: i % 2 === 0 ? accent : accent2,
              boxShadow: `0 0 8px ${i % 2 === 0 ? accent : accent2}`,
            }}
          />
        </motion.div>
      ))}

      {/* Tech floating badges */}
      {[
        { label: 'React', x: '-60%', y: '-70%', delay: 0, dur: 3.2 },
        { label: 'Next.js', x: '60%', y: '-60%', delay: 0.5, dur: 3.7 },
        { label: 'TypeScript', x: '-70%', y: '50%', delay: 1, dur: 3.4 },
        { label: 'Tailwind', x: '65%', y: '60%', delay: 1.5, dur: 3.9 },
      ].map((badge) => (
        <motion.div
          key={badge.label}
          className="absolute px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md border border-white/20"
          style={{
            background: `${accent}90`,
            translateX: badge.x,
            translateY: badge.y,
          }}
          animate={animate ? { y: [0, -8, 0] } : {}}
          transition={{ duration: badge.dur, repeat: Infinity, delay: badge.delay, ease: 'easeInOut' }}
        >
          {badge.label}
        </motion.div>
      ))}
    </div>
  );
});

const StatCard = memo(({ number, label, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const end = parseInt(number);
    const duration = 1800;
    let startTime = null;
    let rafId;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-2xl bg-secondary/50 dark:bg-secondary-dark/50 backdrop-blur-sm border border-accent/10 dark:border-accent-dark/10"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      viewport={{ once: true }}
    >
      <div className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
        {count}+
      </div>
      <p className="text-[12px] sm:text-base text-text dark:text-text-dark opacity-70 mt-2">{label}</p>
    </motion.div>
  );
});

const SPECIALIZATIONS = [
  { icon: FiFigma, title: 'Figma to Code', description: 'Transform designs into pixel-perfect responsive websites with attention to every detail', gradient: 'from-teal-400 to-cyan-400' },
  { icon: FiSmartphone, title: 'Responsive Design', description: 'Seamless experiences across all devices with mobile-first approach', gradient: 'from-cyan-400 to-teal-400' },
  { icon: FiLayout, title: 'Modern UI/UX', description: 'Cutting-edge interfaces with smooth animations and intuitive interactions', gradient: 'from-teal-500 to-cyan-300' },
  { icon: FiZap, title: 'Performance', description: 'Lightning-fast load times with optimized code and best practices', gradient: 'from-cyan-500 to-teal-400' },
  { icon: FiCode, title: 'Clean Code', description: 'Maintainable and scalable architecture following industry standards', gradient: 'from-teal-400 to-cyan-500' },
  { icon: FiTrendingUp, title: 'SEO Optimized', description: 'Built with SEO best practices for maximum visibility and reach', gradient: 'from-cyan-400 to-teal-500' },
];

const FRONTEND_SKILLS = [
  { icon: HtmlIcon, name: 'HTML5' },
  { icon: CssIcon, name: 'CSS3' },
  { icon: JsIcon, name: 'JavaScript' },
  { icon: BootstrapIcon, name: 'Bootstrap' },
  { icon: TailwindIcon, name: 'Tailwind' },
  { icon: ReactIcon, name: 'React' },
  { icon: NextIcon, name: 'Next.js' },
  { icon: ReduxIcon, name: 'Redux' },
  { icon: TypescriptIcon, name: 'TypeScript' },
  { icon: GitIcon, name: 'Git' },
  { icon: TanstackIcon, name: 'TanStack Query' },
  { icon: ZustandIcon, name: 'Zustand' },
  { icon: ViteIcon, name: 'Vite' },
  { icon: ExpoIcon, name: 'Expo', darkInvert: true },
  { icon: ReactNativeIcon, name: 'React Native' },
  { icon: WebpackIcon, name: 'Webpack' },
  { icon: ThreejsIcon, name: 'Three.js', darkInvert: true },
];

const SkillCard = memo(({ skill, index, controls }) => (
  <motion.div
    className="group relative p-6 sm:p-8 rounded-3xl bg-secondary/80 dark:bg-secondary-dark/80 border border-accent/10 dark:border-accent-dark/10 flex flex-col items-center justify-center overflow-hidden"
    variants={{
      hidden: { opacity: 0, scale: 0.5, y: 50 },
      visible: { opacity: 1, scale: 1, y: 0 },
    }}
    initial="hidden"
    animate={controls}
    transition={{ type: 'spring', stiffness: 100, damping: 15, delay: index * 0.08 }}
    whileHover={{ scale: 1.12, transition: { duration: 0.25 } }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <img
      src={skill.icon}
      alt={skill.name}
      width="64"
      height="64"
      className={`w-12 h-12 sm:w-16 sm:h-16 mb-3 relative z-10 ${skill.darkInvert ? 'dark:invert' : ''}`}
      loading="lazy"
    />
    <span className="text-xs sm:text-sm font-semibold text-text dark:text-text-dark opacity-60 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
      {skill.name}
    </span>
  </motion.div>
));

const About = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <motion.div
      className="bg-primary dark:bg-primary-dark relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>About | Abdulaziz Alsarraj</title>
        <meta name="description" content="Frontend Developer with expertise in React, Next.js, TypeScript and modern UI frameworks. Passionate about responsive design, performance and clean code." />
        <meta name="keywords" content="About, Frontend Developer, React, Next.js, TypeScript, Skills, HTML, CSS, JavaScript" />
        <meta property="og:title" content="About | Abdulaziz Alsarraj" />
        <meta property="og:description" content="Learn more about Abdulaziz Alsarraj — a frontend developer turning ideas into intuitive digital experiences." />
        <link rel="canonical" href="https://abdulazizalsarraj.dev/about" />
      </Helmet>

      <ParticleBackground />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6 py-20 lg:px-16">

        {/* Visual Section (CSS-based — no WebGL) */}
        <motion.div
          className="w-full lg:w-1/2 h-[360px] sm:h-[440px] lg:h-[560px] relative"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-blue-500/20 dark:from-accent-dark/20 dark:to-blue-400/20 rounded-3xl blur-3xl" />
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-accent/10 dark:border-accent-dark/10 backdrop-blur-sm bg-white/5 dark:bg-black/10">
            <HeroVisual theme={theme} />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="w-full lg:w-1/2 space-y-6 text-center lg:text-left z-10"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block mt-5 px-4 py-2 rounded-full bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-dark text-sm font-semibold mb-4">
              Welcome to My Portfolio
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Frontend Developer
            </span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-text dark:text-text-dark opacity-80 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Turning ideas into{' '}
            <span className="text-accent dark:text-accent-dark font-semibold">intuitive</span>{' '}
            digital experiences
          </motion.p>

          <motion.div
            className="text-base sm:text-lg text-text dark:text-text-dark opacity-75 leading-relaxed space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p>
              Specialized in crafting{' '}
              <span className="text-accent dark:text-accent-dark font-medium">responsive interfaces</span>{' '}
              that perfectly balance form and function. Passionate about clean code architecture and
              user-centered design principles.
            </p>
            <p>
              With cross-functional collaboration experience, I focus on creating solutions that grow
              with business needs while maintaining engaging interactions.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <StatCard number="50" label="Projects" delay={0.8} />
            <StatCard number="30" label="Clients" delay={0.9} />
            <StatCard number="100" label="Components" delay={1.0} />
          </motion.div>
        </motion.div>
      </div>

      {/* Specializations Section */}
      <div className="px-6 py-20 lg:px-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            What I Do Best
          </h2>
          <p className="text-lg sm:text-xl text-text dark:text-text-dark opacity-70 max-w-2xl mx-auto">
            Comprehensive frontend solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {SPECIALIZATIONS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="group relative p-8 rounded-3xl bg-secondary/80 dark:bg-secondary-dark/80 border border-accent/10 dark:border-accent-dark/10 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white mb-6`}>
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text dark:text-text-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-base sm:text-lg text-text dark:text-text-dark opacity-70 leading-relaxed">
                  {item.description}
                </p>

                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 + 0.3, duration: 0.6 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Skills Section */}
      <div className="px-6 py-20 lg:px-16 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-lg sm:text-xl text-text dark:text-text-dark opacity-70">
            Technologies I work with daily
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
          ref={ref}
        >
          {FRONTEND_SKILLS.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} controls={controls} />
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="text-center px-6 py-20 lg:px-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text dark:text-text-dark mb-6">
          Ready to Start Your Project?
        </h3>
        <p className="text-lg sm:text-xl text-text dark:text-text-dark opacity-70 mb-8 max-w-2xl mx-auto">
          Let's collaborate and bring your vision to life with cutting-edge frontend solutions
        </p>
        <motion.button
          className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-semibold text-lg shadow-lg shadow-teal-400/30"
          whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0, 211, 189, 0.35)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/contact')}
        >
          Get In Touch
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default About;
