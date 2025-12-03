import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend, FiCheck } from 'react-icons/fi';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const controls = useAnimation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const socialLinks = [
    { 
      icon: <FiMail />, 
      url: 'mailto:abdulazizalsarraj77@gmail.com',
      label: 'Email',
      color: 'from-gray-600 to-gray-900'
    },
  
    { 
      icon: <FiLinkedin />, 
      url: 'https://www.linkedin.com/in/abdulaziz-alsarraj-4a6920355',
      label: 'LinkedIn',
      color: 'from-blue-600 to-blue-900'
    },
    { 
      icon: <FaTelegramPlane />, 
      url: 'https://t.me/Abdulaziz_Alsarraj',
      label: 'Telegram',
      color: 'from-blue-400 to-blue-700'
    },
    { 
      icon: <FiGithub />, 
      url: 'https://github.com/Abdulazizalsarraj',
      label: 'GitHub',
      color: 'from-gray-600 to-gray-900'
    },
    { 
      icon: <FaInstagram />, 
      url: 'https://www.instagram.com/abdulaziz_alsarraj?igsh=MXZoeDVzNDJjMmhwdw==',
      label: 'Instagram',
      color: 'from-pink-500 to-purple-700'
    }
  ];

  const contactInfo = [
    { 
      icon: <FiMail />, 
      value: 'abdulazizalsarraj77@gmail.com',
      label: 'Email',
      action: 'mailto:abdulazizalsarraj77@gmail.com'
    },
    { 
      icon: <FiPhone />, 
      value: '+963 967 841 647',
      label: 'Phone',
      action: 'tel:+963967841647'
    },
    { 
      icon: <FiMapPin />, 
      value: 'Homs, Syria',
      label: 'Location'
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        'service_q6rm8r8',
        'template_d064uml',
        {
          name: name,
          email: email,
          message: message
        },
        'A3vMZF026Ue4EY9hT'
      );

      toast.success('🎉 Message sent successfully! I\'ll get back to you soon.', {
        position: "top-center",
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
      toast.error('😢 Failed to send message. Please try again.', {
        position: "top-center",
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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const contactCardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100 }
    },
    hover: {
      x: 10,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    }),
    hover: {
      y: -8,
      scale: 1.15,
      transition: { type: 'spring', stiffness: 400 }
    }
  };

  return (
    <motion.div
      className="min-h-screen relative bg-primary dark:bg-primary-dark py-20 px-4 sm:px-6 lg:px-24 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ToastContainer />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              x: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 dark:border-purple-500/30 backdrop-blur-md">
              <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            I'd love to hear from you! Whether you have a project in mind or just want to say hello, feel free to reach out.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Section - Contact Info & Social */}
          <motion.div className="lg:col-span-2 space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.action}
                  variants={contactCardVariants}
                  whileHover="hover"
                  className="block group"
                >
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 dark:from-black/20 dark:to-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />

                    <div className="relative z-10 flex items-start gap-4">
                      <motion.div
                        className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-purple-400 flex-shrink-0"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          {item.label}
                        </p>
                        <p className="text-gray-900 dark:text-white font-semibold break-all">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links Section */}
            <motion.div
              className="pt-8 border-t border-white/10 dark:border-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Connect With Me
              </h3>
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
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-black/30 dark:to-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 group-hover:border-white/40 dark:group-hover:border-white/20 transition-all duration-300">
                      <span className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {link.icon}
                      </span>
                    </div>
                    <motion.p
                      className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400 text-center"
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

          {/* Right Section - Contact Form */}
          <motion.form
            ref={ref}
            className="lg:col-span-3 group"
            variants={itemVariants}
            onSubmit={handleSubmit}
          >
            <div className="relative">
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

              <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 dark:from-black/30 dark:to-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-white/40 dark:hover:border-white/20 transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Send Me a Message
                </h3>

                <motion.div
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate={controls}
                >
                  {/* Name Input */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">
                      Your Name *
                    </label>
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className={`w-full px-5 py-4 rounded-xl bg-white/5 dark:bg-black/20 border-2 transition-all duration-300 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 ${
                          focusedField === 'name'
                            ? 'border-blue-500 dark:border-purple-500 shadow-lg shadow-blue-500/20'
                            : 'border-white/10 dark:border-white/5 hover:border-white/20 dark:hover:border-white/10'
                        }`}
                        required
                      />
                    </motion.div>
                  </motion.div>

                  {/* Email Input */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">
                      Your Email *
                    </label>
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your@email.com"
                        className={`w-full px-5 py-4 rounded-xl bg-white/5 dark:bg-black/20 border-2 transition-all duration-300 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 ${
                          focusedField === 'email'
                            ? 'border-blue-500 dark:border-purple-500 shadow-lg shadow-blue-500/20'
                            : 'border-white/10 dark:border-white/5 hover:border-white/20 dark:hover:border-white/10'
                        }`}
                        required
                      />
                    </motion.div>
                  </motion.div>

                  {/* Message Textarea */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">
                      Message *
                    </label>
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <textarea
                        rows="5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell me about your project or ideas..."
                        className={`w-full px-5 py-4 rounded-xl bg-white/5 dark:bg-black/20 border-2 transition-all duration-300 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 resize-none ${
                          focusedField === 'message'
                            ? 'border-blue-500 dark:border-purple-500 shadow-lg shadow-blue-500/20'
                            : 'border-white/10 dark:border-white/5 hover:border-white/20 dark:hover:border-white/10'
                        }`}
                        required
                      />
                    </motion.div>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-100 group-hover/btn:opacity-90 transition-opacity duration-300" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 blur-lg transition-opacity duration-300" />

                    <motion.div
                      className="relative px-6 py-4 rounded-xl flex items-center justify-center gap-2 text-white font-semibold"
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
          className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 dark:border-purple-500/30 backdrop-blur-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: '-100px' }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Prefer a different way to connect?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You can also reach out via my social media channels or contact me directly at the details above.
          </p>
          <motion.button
            onClick={() => window.open('mailto:abdulazizalsarraj77@gmail.com')}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
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

export default Contact;