'use client';

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo, memo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  FiGithub,
  FiLinkedin,
  FiArrowDown,
  FiCode,
  FiZap,
  FiAward,
  FiMail,
} from "react-icons/fi";
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import profileImage from "@/assets/images/linkedInprofile.webp";
import { useRouter } from "next/navigation";
import useReducedMotion from "@/hooks/useReducedMotion";
import useIsMobile from "@/hooks/useIsMobile";

// Dynamically import Three.js background with SSR disabled
const ThreeBackground = dynamic(() => import('./ThreeBackground'), { ssr: false });

// ─── ThreeBackground Skeleton ────────────────────────────────────────────────
const ThreeBackgroundSkeleton = () => (
  <div
    className="absolute inset-0"
    style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(0,211,189,0.08) 0%, transparent 60%)' }}
    aria-hidden="true"
  />
);

// ─── Mobile Hero Visual ──────────────────────────────────────────────────────
const MobileHeroVisual = memo(() => {
  const accent = '#00d3bd';
  const accent2 = '#00d2ef';
  const reducedMotion = useReducedMotion();
  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
      <div
        className="absolute inset-0 rounded-3xl opacity-20"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${accent}50 0%, transparent 70%)` }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full border-2 opacity-25"
        style={{ borderColor: accent }}
        animate={reducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-44 h-44 rounded-full border-2 border-dashed opacity-20"
        style={{ borderColor: accent2 }}
        animate={reducedMotion ? {} : { rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className="w-28 h-28 rounded-full"
        style={{ background: `radial-gradient(circle at 35% 35%, ${accent2}, ${accent})` }}
      />
    </div>
  );
});
MobileHeroVisual.displayName = 'MobileHeroVisual';

// ─── TypewriterText ──────────────────────────────────────────────────────────
const TypewriterText = memo(({ texts, className }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseRef = useRef(null);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          pauseRef.current = setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => {
      clearTimeout(timeout);
      clearTimeout(pauseRef.current);
    };
  }, [displayText, currentIndex, isDeleting, texts]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse ml-1" aria-hidden="true">|</span>
    </span>
  );
});
TypewriterText.displayName = 'TypewriterText';

// ─── StatCounter ─────────────────────────────────────────────────────────────
const StatCounter = memo(({ end, label, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
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
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <p className="text-xs sm:text-sm text-gray-400 mt-2 font-medium">{label}</p>
    </div>
  );
});
StatCounter.displayName = 'StatCounter';

// ─── FloatingParticles ───────────────────────────────────────────────────────
const HOME_PARTICLES_DESKTOP = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: `${(i * 16.6 + 8) % 100}%`,
  top: `${(i * 14.7 + 5) % 100}%`,
  delay: i * 0.6,
  duration: 4 + (i % 3) * 0.8,
}));

const HOME_PARTICLES_MOBILE = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  left: `${(i * 33 + 10) % 100}%`,
  top: `${(i * 30 + 8) % 100}%`,
  delay: i * 0.8,
  duration: 4 + i * 0.5,
}));

const FloatingParticles = memo(() => {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });
  if (reducedMotion) return null;
  const particles = isMobile ? HOME_PARTICLES_MOBILE : HOME_PARTICLES_DESKTOP;
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 bg-teal-400/25 rounded-full"
          style={{ left: p.left, top: p.top }}
          animate={isInView ? { y: [0, -25, 0] } : {}}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
});
FloatingParticles.displayName = 'FloatingParticles';

// ─── Main Component ───────────────────────────────────────────────────────────
const HomeClient = () => {
  const accentColor = "#00d3bd";
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const router = useRouter();

  const [showThree, setShowThree] = useState(false);
  useEffect(() => {
    if (isMobile) return;
    const id = setTimeout(() => setShowThree(true), 800);
    return () => clearTimeout(id);
  }, [isMobile]);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Abdulaziz_Alsarraj_Front_End_Developer_CV.pdf";
    link.download = "Abdulaziz_Alsarraj_Front_End_Developer_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = useMemo(() => [
    { icon: FiMail,          url: "mailto:abdulazizalsarraj77@gmail.com",                     label: "Email",     ariaLabel: "Contact with me" },
    { icon: FiLinkedin,      url: "https://www.linkedin.com/in/abdulaziz-alsarraj-4a6920355", label: "LinkedIn",  ariaLabel: "Connect on LinkedIn" },
    { icon: FaTelegramPlane, url: "https://t.me/Abdulaziz_Alsarraj",                          label: "Telegram",  ariaLabel: "Message on Telegram" },
    { icon: FiGithub,        url: "https://github.com/Abdulazizalsarraj",                     label: "GitHub",    ariaLabel: "Visit my GitHub profile" },
    { icon: FaInstagram,     url: "https://www.instagram.com/abdulaziz_alsarraj",             label: "Instagram", ariaLabel: "Follow on Instagram" },
  ], []);

  const features = useMemo(() => [
    { icon: FiCode,  title: "Clean Code",       description: "Writing maintainable, scalable, and testable code following best practices and SOLID principles.", gradient: "from-teal-400 to-cyan-400" },
    { icon: FiZap,   title: "Fast Performance", description: "Optimized bundle sizes, lazy loading, and efficient rendering for lightning-fast experiences.",    gradient: "from-cyan-500 to-teal-400" },
    { icon: FiAward, title: "Best Practices",   description: "Following industry standards, accessibility guidelines (WCAG), and modern web development patterns.", gradient: "from-teal-500 to-cyan-400" },
  ], []);

  const stats = useMemo(() => [
    { end: 50,  label: "Projects Completed", suffix: "+" },
    { end: 30,  label: "Happy Clients",      suffix: "+" },
    { end: 100, label: "UI Components",      suffix: "+" },
  ], []);

  return (
    <div className="mt-12 relative bg-primary transition-colors duration-300">
      {/* Desktop: Three.js delayed 800ms so hero paints first */}
      {showThree && (
        <div className="mt-12 fixed inset-0 z-[1]" aria-hidden="true">
          <ThreeBackground accentColor={accentColor} />
        </div>
      )}
      {!showThree && !isMobile && <ThreeBackgroundSkeleton />}

      {/* Gradient Overlay */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-transparent via-teal-500/5 to-cyan-500/5 pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <div className="relative z-10">
        {/* ── Hero Section ── */}
        <motion.section
          id="main-content"
          className="min-h-screen relative flex flex-col lg:flex-row items-center justify-between px-6 sm:px-8 lg:px-16 xl:px-24 pt-24 lg:pt-24 gap-8 lg:gap-12"
        >
          <FloatingParticles />

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 order-2 lg:order-1 max-w-3xl">
            {/* Status Badge */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/90 backdrop-blur-md border border-teal-400/20 shadow-lg">
                <span className="relative flex h-3 w-3" aria-label="Available for work">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-sm font-semibold text-gray-300">Available for work</span>
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.7 }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                Hi, I&apos;m
                <br />
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  Abdulaziz Alsarraj
                </span>
              </h1>
              <div className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-300 min-h-[40px]">
                <TypewriterText
                  texts={["Frontend Developer", "UI/UX Enthusiast", "Problem Solver", "Creative Thinker"]}
                  className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent"
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl"
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Crafting{" "}
              <span className="text-teal-400 font-semibold">immersive web experiences</span>{" "}
              with modern technologies and pixel-perfect implementation.
              Passionate about turning ideas into reality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <motion.button
                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-slate-900 overflow-hidden shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400/50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View my projects"
                onClick={() => router.push("/projects")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 transition-transform group-hover:scale-110" />
                <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                  View Projects
                  <span aria-hidden="true">→</span>
                </span>
              </motion.button>

              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-teal-400/40 font-semibold text-gray-200 hover:bg-teal-400/10 transition-colors shadow-lg backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-teal-400/30 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Download my CV"
                onClick={handleDownloadCV}
              >
                Download CV
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 lg:gap-6 pt-6 lg:pt-8"
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              role="region"
              aria-label="Portfolio statistics"
            >
              {stats.map((stat, i) => (
                <StatCounter key={i} {...stat} />
              ))}
            </motion.div>
          </div>

          {/* Profile Image */}
          <div className="w-full lg:w-1/2 flex flex-col items-center order-1 lg:order-2">
            <motion.div
              className="relative"
              initial={{ x: 80, opacity: 0, scale: 0.85 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-3xl opacity-20"
                aria-hidden="true"
              />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 rounded-full opacity-60 blur-md"
                animate={reducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />

              {/* Image Container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                <Image
                  src={profileImage}
                  alt="Abdulaziz Alsarraj - Frontend Developer"
                  className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-900 shadow-2xl"
                  priority
                  width={384}
                  height={384}
                  quality={100}
                  unoptimized
                />

                <div
                  className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full shadow-lg flex items-center justify-center animate-float"
                  aria-hidden="true"
                >
                  <FiCode className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                <div
                  className="absolute -bottom-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full shadow-lg flex items-center justify-center animate-float"
                  style={{ animationDelay: '1s' }}
                  aria-hidden="true"
                >
                  <FiZap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="pt-4 border-t border-white/10 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-white mb-3">Connect With Me</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                      aria-label={link.ariaLabel}
                      title={link.label}
                    >
                      <div className="relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-teal-400/40 group-hover:bg-teal-400/5 transition-all duration-200">
                        <Icon className="text-2xl text-gray-300 group-hover:text-teal-400 transition-colors duration-200" />
                      </div>
                      <p className="mt-2 text-xs font-medium text-gray-500 group-hover:text-gray-300 text-center transition-colors duration-200">
                        {link.label}
                      </p>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            aria-hidden="true"
          >
            <span className="text-sm text-gray-400 font-medium">Scroll to explore</span>
            <FiArrowDown className="w-6 h-6 text-teal-400 animate-bounce" />
          </motion.div>
        </motion.section>

        {/* ── Features Section ── */}
        <motion.section
          className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          aria-labelledby="features-heading"
        >
          <div className="w-full max-w-7xl">
            <motion.header
              className="text-center mb-12 lg:mb-16"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                id="features-heading"
                className="py-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4"
              >
                Why Work With Me
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
                Combining technical expertise with creative vision to deliver exceptional results
              </p>
            </motion.header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.article
                    key={index}
                    className="group relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-secondary/60 backdrop-blur-sm border border-teal-400/10 shadow-xl overflow-hidden hover:border-teal-400/30 transition-colors duration-300"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    whileHover={{ y: -8 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-4 lg:mb-6`}>
                        <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3">{feature.title}</h3>
                      <p className="text-sm lg:text-base text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ── CTA Section ── */}
        <motion.section
          className="min-h-[60vh] flex items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          aria-labelledby="cta-heading"
        >
          <motion.div
            className="w-full max-w-4xl text-center p-8 sm:p-12 lg:p-16 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-2xl relative overflow-hidden"
            initial={{ scale: 0.92, y: 40 }}
            whileInView={{ scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="relative z-10">
              <h2
                id="cta-heading"
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6"
              >
                Let&apos;s Build Something Amazing Together
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Get in touch and let&apos;s create something extraordinary.
              </p>
              <motion.button
                className="inline-flex items-center gap-2 px-8 lg:px-10 py-4 lg:py-5 rounded-xl lg:rounded-2xl bg-primary text-teal-400 font-bold text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-primary/50"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Get in touch with me"
                onClick={() => router.push("/contact")}
              >
                <FiMail className="w-5 h-5" />
                Get In Touch
              </motion.button>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomeClient;
