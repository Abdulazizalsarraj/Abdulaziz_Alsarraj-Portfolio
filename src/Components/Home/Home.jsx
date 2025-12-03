/** @format */

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Sphere } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo, Suspense } from "react";
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
import profileImage from "../../assets/images/linkedInprofile.jfif";
import { useNavigate } from "react-router-dom";
import cv from "../../assets/Abdulaziz Alsarraj - Front-End Developer.pdf";
// ============================================
// 3D Components (Optimized)
// ============================================

const AnimatedSphere = ({ theme }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (!meshRef.current) return;

    let animationFrameId;
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.001;
        meshRef.current.rotation.y += 0.002;
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const sphereColor = theme === "dark" ? "#7C3AED" : "#4F46E5";

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 32, 32]} scale={2.5}>
        <meshStandardMaterial
          color={sphereColor}
          wireframe
          transparent
          opacity={0.3}
          emissive={sphereColor}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
};

const Scene3D = ({ theme, accentColor }) => (
  <Suspense fallback={null}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1.5} color={accentColor} />
    <pointLight
      position={[-10, -10, -10]}
      intensity={0.5}
      color={theme === "dark" ? "#3B82F6" : "#60A5FA"}
    />
    <Stars
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
    <AnimatedSphere theme={theme} />
    <OrbitControls
      enableZoom={false}
      autoRotate
      autoRotateSpeed={0.5}
      enablePan={false}
    />
  </Suspense>
);

// ============================================
// Utility Components
// ============================================

const TypewriterText = ({ texts, className }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentText.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
};

const StatCounter = ({ end, label, suffix = "+", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {count}
        {suffix}
      </motion.div>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">
        {label}
      </p>
    </motion.div>
  );
};

const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-500/30 dark:bg-purple-500/30 rounded-full"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// Main Component
// ============================================

const Home = () => {
  const [theme, setTheme] = useState("dark");
  const accentColor = theme === "dark" ? "#7C3AED" : "#4F46E5";
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const opacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3], [1, 0.95]);
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -50]);

  // Handle CV download
  const handleDownloadCV = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = cv;
    link.download = "Abdulaziz_Alsarraj_Front_End_Developer_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = useMemo(
    () => [
      {
        icon: FiMail,
        url: "mailto:abdulazizalsarraj77@gmail.com",
        label: "Email",
        color: "hover:bg-gray-800",
        ariaLabel: "Contact with me",
      },
      {
        icon: FiLinkedin,
        url: "https://www.linkedin.com/in/abdulaziz-alsarraj-4a6920355",
        label: "LinkedIn",
        color: "hover:bg-blue-600",
        ariaLabel: "Connect on LinkedIn",
      },
      {
        icon: FaTelegramPlane,
        url: "https://t.me/Abdulaziz_Alsarraj",
        label: "Telegram",
        color: "hover:bg-blue-500",
        ariaLabel: "Message on Telegram",
      },
      {
        icon: FiGithub,
        url: "https://github.com/Abdulazizalsarraj",
        label: "GitHub",
        color: "hover:bg-gray-800",
        ariaLabel: "Visit my GitHub profile",
      },
      {
        icon: FaInstagram,
        url: "https://www.instagram.com/abdulaziz_alsarraj",
        label: "Instagram",
        color: "hover:bg-pink-600",
        ariaLabel: "Follow on Instagram",
      },
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        icon: FiCode,
        title: "Clean Code",
        description:
          "Writing maintainable, scalable, and testable code following best practices and SOLID principles.",
        gradient: "from-blue-500 to-cyan-500",
      },
      {
        icon: FiZap,
        title: "Fast Performance",
        description:
          "Optimized bundle sizes, lazy loading, and efficient rendering for lightning-fast experiences.",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        icon: FiAward,
        title: "Best Practices",
        description:
          "Following industry standards, accessibility guidelines (WCAG), and modern web development patterns.",
        gradient: "from-orange-500 to-red-500",
      },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { end: 50, label: "Projects Completed", suffix: "+" },
      { end: 30, label: "Happy Clients", suffix: "+" },
      { end: 100, label: "UI Components", suffix: "+" },
    ],
    []
  );

  return (
    <div className="mt-12 relative bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* 3D Background Canvas */}
      <div className="mt-12 fixed inset-0 z-0" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <Scene3D theme={theme} accentColor={accentColor} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-purple-500/5 dark:via-blue-500/10 dark:to-purple-500/10 pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Skip to main content - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <div ref={containerRef} className="relative z-10">
        {/* Hero Section */}
        <motion.section
          id="main-content"
          className="min-h-screen relative flex flex-col lg:flex-row items-center justify-between px-6 sm:px-8 lg:px-16 xl:px-24 pt-24 lg:pt-0 gap-8 lg:gap-12"
          style={{ opacity, scale, y: heroY }}
        >
          <FloatingParticles />

          {/* Content Section */}
          <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 order-2 lg:order-1 max-w-3xl">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg">
                <span
                  className="relative flex h-3 w-3"
                  aria-label="Available for work"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Available for work
                </span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
                Hi, I'm
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Abdulaziz Alsarraj
                </span>
              </h1>
              <div className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 min-h-[40px]">
                <TypewriterText
                  texts={[
                    "Frontend Developer",
                    "UI/UX Enthusiast",
                    "Problem Solver",
                    "Creative Thinker",
                  ]}
                  className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white bg-clip-text text-transparent"
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Crafting{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                immersive web experiences
              </span>{" "}
              with modern technologies and pixel-perfect implementation.
              Passionate about turning ideas into reality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <motion.button
                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-white overflow-hidden shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View my projects"
                onClick={() => navigate("/projects")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform group-hover:scale-110" />
                <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                  View Projects
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    aria-hidden="true"
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-300 dark:border-gray-600 font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-lg backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-gray-500/50 text-sm sm:text-base"
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
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              role="region"
              aria-label="Portfolio statistics"
            >
              {stats.map((stat, index) => (
                <StatCounter key={index} {...stat} />
              ))}
            </motion.div>
          </div>

          {/* Profile Image Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center order-1 lg:order-2">
            <motion.div
              className="relative"
              initial={{ x: 100, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
            >
              {/* Glowing Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />

              {/* Rotating Border */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-75 blur-md"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />

              {/* Image Container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                <img
                  src={profileImage}
                  alt="Abdulaziz Alsarraj - Frontend Developer"
                  className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-900 shadow-2xl"
                  loading="eager"
                />

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center"
                  animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  aria-hidden="true"
                >
                  <FiCode className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center"
                  animate={{ y: [0, 10, 0], rotate: [360, 180, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  aria-hidden="true"
                >
                  <FiZap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Social Links - Updated to match contact page design */}
            <motion.div
              className="pt-4 border-t border-white/10 dark:border-white/5 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      custom={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative group"
                      aria-label={link.ariaLabel}
                      title={link.label}
                    >
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300`}
                      />
                      <div className="relative p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-black/30 dark:to-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 group-hover:border-white/40 dark:group-hover:border-white/20 transition-all duration-300">
                        <Icon className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
                      </div>
                      <motion.p
                        className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400 text-center"
                        initial={{ opacity: 0, y: 5 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        {link.label}
                      </motion.p>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            aria-hidden="true"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiArrowDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          aria-labelledby="features-heading"
        >
          <div className="w-full max-w-7xl">
            <motion.header
              className="text-center mb-12 lg:mb-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2
                id="features-heading"
                className="py-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
              >
                Why Work With Me
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Combining technical expertise with creative vision to deliver
                exceptional results
              </p>
            </motion.header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.article
                    key={index}
                    className="group relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      <motion.div
                        className={`inline-flex p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-4 lg:mb-6`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                      </motion.div>

                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3">
                        {feature.title}
                      </h3>

                      <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="min-h-[60vh] flex items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          aria-labelledby="cta-heading"
        >
          <motion.div
            className="w-full max-w-4xl text-center p-8 sm:p-12 lg:p-16 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl relative overflow-hidden"
            initial={{ scale: 0.9, y: 50 }}
            whileInView={{ scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              <h2
                id="cta-heading"
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6"
              >
                Let's Build Something Amazing Together
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Get in touch and let's create
                something extraordinary. 
              </p>
              <motion.button
                className="inline-flex items-center gap-2 px-8 lg:px-10 py-4 lg:py-5 rounded-xl lg:rounded-2xl bg-white text-gray-900 font-bold text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-white/50"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Get in touch with me"
                onClick={() => navigate("/contact")}
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

export default Home;
