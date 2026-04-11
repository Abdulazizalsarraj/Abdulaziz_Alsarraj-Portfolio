'use client';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import useReducedMotion from '@/hooks/useReducedMotion';
import useIsMobile from '@/hooks/useIsMobile';
import { useTheme } from '@/hooks/useTheme';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';

// Lazy-load EmailJS and Toastify only on form submit
let emailjsLoaded = null;
let toastifyLoaded = null;

const getEmailjs = () => {
  if (!emailjsLoaded) emailjsLoaded = import('emailjs-com');
  return emailjsLoaded;
};

const getToastify = () => {
  if (!toastifyLoaded) toastifyLoaded = import('react-toastify');
  return toastifyLoaded;
};

const CONTACT_PARTICLES_DESKTOP = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${(i * 6.8 + 4.2) % 100}%`,
  top: `${(i * 9.3 + 1.6) % 100}%`,
  duration: 4 + (i % 5) * 0.6,
  delay: (i % 8) * 0.25,
  xOffset: (i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 5),
}));

const CONTACT_PARTICLES_MOBILE = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: `${(i * 20 + 10) % 100}%`,
  top: `${(i * 17 + 8) % 100}%`,
  duration: 4 + (i % 3) * 0.5,
  delay: i * 0.3,
  xOffset: (i % 2 === 0 ? 1 : -1) * 15,
}));

const LazyToastContainer = lazy(() =>
  import('react-toastify').then((m) => ({ default: m.ToastContainer }))
);

const ContactClient = () => {
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const contactParticles = isMobile ? CONTACT_PARTICLES_MOBILE : CONTACT_PARTICLES_DESKTOP;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const [showToast, setShowToast] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const bgRef = useRef(null);
  const isBgInView = useInView(bgRef, { amount: 0.05 });

  const socialLinks = [
    { icon: <FiMail />, url: 'mailto:abdulazizalsarraj77@gmail.com', label: 'Email', color: 'from-teal-400 to-teal-600' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/abdulaziz-alsarraj-4a6920355', label: 'LinkedIn', color: 'from-teal-400 to-cyan-500' },
    { icon: <FaTelegramPlane />, url: 'https://t.me/Abdulaziz_Alsarraj', label: 'Telegram', color: 'from-cyan-400 to-teal-500' },
    { icon: <FiGithub />, url: 'https://github.com/Abdulazizalsarraj', label: 'GitHub', color: 'from-teal-500 to-cyan-400' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/abdulaziz_alsarraj', label: 'Instagram', color: 'from-pink-500 to-purple-700' },
  ];

  const contactInfo = [
    { icon: <FiMail />, value: 'abdulazizalsarraj77@gmail.com', label: 'Email', action: 'mailto:abdulazizalsarraj77@gmail.com' },
    { icon: <FiPhone />, value: '+963 967 841 647', label: 'Phone', action: 'tel:+963967841647' },
    { icon: <FiMapPin />, value: 'Homs, Syria', label: 'Location' },
  ];

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowToast(true);
    try {
      const [{ default: emailjs }, { toast }] = await Promise.all([
        getEmailjs(),
        getToastify(),
      ]);

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        { name, email, message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      toast.success("🎉 Message sent successfully! I'll get back to you soon.", {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: theme === 'dark' ? 'dark' : 'light',
      });

      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('FAILED...', error);
      const { toast } = await getToastify();
      toast.error('😢 Failed to send message. Please try again.', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: theme === 'dark' ? 'dark' : 'light',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  const contactCardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
    hover: { x: 10, transition: { type: 'spring', stiffness: 300 } },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 } }),
    hover: { y: -8, scale: 1.15, transition: { type: 'spring', stiffness: 400 } },
  };

  return (
    <motion.div
      className="min-h-screen relative bg-primary py-20 px-4 sm:px-6 lg:px-24 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {showToast && (
        <Suspense fallback={null}>
          <LazyToastContainer />
        </Suspense>
      )}

      {/* Animated Background Elements */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/15 to-cyan-400/15 rounded-full blur-2xl"
          animate={isBgInView && !reducedMotion ? { x: [0, 30, -30, 0], y: [0, -30, 30, 0] } : {}}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/15 to-teal-400/15 rounded-full blur-2xl"
          animate={isBgInView && !reducedMotion ? { x: [0, -30, 30, 0], y: [0, 30, -30, 0] } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating Particles */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {contactParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
              style={{ left: p.left, top: p.top }}
              animate={isBgInView ? { y: [0, -100, 0], opacity: [0, 1, 0], x: [0, p.xOffset, 0] } : { opacity: 0 }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div className="inline-block mb-6" whileHover={{ scale: 1.05 }}>
            <div className="px-4 py-2 rounded-full bg-teal-400/10 border border-teal-400/30 backdrop-blur-md">
              <p className="text-sm font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                ✨ Get In Touch
              </p>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            I&apos;d love to hear from you! Whether you have a project in mind or just want to say hello, feel free to reach out.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left - Contact Info & Social */}
          <motion.div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.action}
                  variants={contactCardVariants}
                  whileHover="hover"
                  className="block group"
                >
                  <div className="relative p-6 rounded-2xl bg-secondary/40 backdrop-blur-sm border border-teal-400/10 hover:border-teal-400/40 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 to-cyan-400/0 group-hover:from-teal-400/10 group-hover:to-cyan-400/10 transition-all duration-300" />
                    <div className="relative z-10 flex items-start gap-4">
                      <motion.div
                        className="p-3 rounded-xl bg-teal-400/10 text-teal-400 flex-shrink-0"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500 mb-1">{item.label}</p>
                        <p className="text-gray-200 font-semibold break-all">{item.value}</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="pt-8 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">Connect With Me</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={index}
                    variants={socialIconVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                    className="relative group"
                    title={link.label}
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300`} />
                    <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300">
                      <span className="text-2xl text-gray-300 group-hover:text-teal-400 transition-colors duration-300">
                        {link.icon}
                      </span>
                    </div>
                    <motion.p
                      className="mt-2 text-xs font-medium text-gray-400 text-center"
                      initial={{ opacity: 0, y: 5 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      {link.label}
                    </motion.p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.form
            ref={ref}
            className="lg:col-span-3 group"
            variants={itemVariants}
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-400/15 via-cyan-400/15 to-teal-300/15 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              <div className="relative p-8 sm:p-10 rounded-3xl bg-secondary/40 backdrop-blur-sm border border-teal-400/10 hover:border-teal-400/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-8">Send Me a Message</h3>

                <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate={controls}>
                  {/* Name */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300 block">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      className={`w-full px-5 py-4 rounded-xl bg-secondary/50 border-2 transition-all duration-300 focus:outline-none text-white placeholder-gray-500 ${
                        focusedField === 'name' ? 'border-teal-400 shadow-lg shadow-teal-400/20' : 'border-white/10 hover:border-teal-400/30'
                      }`}
                      required
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300 block">Your Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your@email.com"
                      className={`w-full px-5 py-4 rounded-xl bg-secondary/50 border-2 transition-all duration-300 focus:outline-none text-white placeholder-gray-500 ${
                        focusedField === 'email' ? 'border-teal-400 shadow-lg shadow-teal-400/20' : 'border-white/10 hover:border-teal-400/30'
                      }`}
                      required
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300 block">Message *</label>
                    <textarea
                      rows="5"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project or ideas..."
                      className={`w-full px-5 py-4 rounded-xl bg-secondary/50 border-2 transition-all duration-300 focus:outline-none text-white placeholder-gray-500 resize-none ${
                        focusedField === 'message' ? 'border-teal-400 shadow-lg shadow-teal-400/20' : 'border-white/10 hover:border-teal-400/30'
                      }`}
                      required
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || !name || !email || !message}
                    variants={itemVariants}
                    className="relative w-full group/btn overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl" />
                    <motion.div
                      className="relative px-6 py-4 rounded-xl flex items-center justify-center gap-2 text-slate-900 font-semibold"
                      animate={isLoading ? { opacity: 0.7 } : { opacity: 1 }}
                    >
                      <AnimatePresence mode="wait">
                        {isLoading ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 180 }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                          />
                        ) : (
                          <motion.div
                            key="idle"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center gap-2"
                          >
                            <FiSend className="text-lg" />
                            <span>Send Message</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.form>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 p-8 rounded-3xl bg-teal-400/5 border border-teal-400/20 backdrop-blur-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="text-2xl font-bold text-white mb-3">Prefer a different way to connect?</h3>
          <p className="text-gray-400 mb-6">
            You can also reach out via my social media channels or contact me directly at the details above.
          </p>
          <motion.button
            onClick={() => window.open('mailto:abdulazizalsarraj77@gmail.com')}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-semibold hover:shadow-lg hover:shadow-teal-400/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Email Directly
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactClient;
