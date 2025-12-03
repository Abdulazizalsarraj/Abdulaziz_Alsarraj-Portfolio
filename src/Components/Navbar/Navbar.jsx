import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import Logo from "../../assets/images/02145.png"
import {
  HomeIcon,
  BriefcaseIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  SunIcon,
  MoonIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const navItems = [
  { 
    name: 'Home', 
    path: '/home', 
    icon: HomeIcon,
    activeIcon: HomeIcon 
  },
  { 
    name: 'Projects', 
    path: '/projects', 
    icon: BriefcaseIcon,
    activeIcon: BriefcaseIcon 
  },
  { 
    name: 'About', 
    path: '/about', 
    icon: UserIcon,
    activeIcon: UserIcon 
  },
  { 
    name: 'Contact', 
    path: '/contact', 
    icon: ChatBubbleBottomCenterTextIcon,
    activeIcon: ChatBubbleBottomCenterTextIcon 
  },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  };

  const isActive = (path) => location.pathname === path;

  // Animation variants
  const navContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -3,
      transition: { duration: 0.2 }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.3
      }
    }),
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 lg:px-24 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-primary/95 dark:bg-primary-dark/95 shadow-2xl'
          : 'py-4 bg-primary/90 dark:bg-primary-dark/90 shadow-lg'
      } border-b ${
        isScrolled
          ? 'border-blue-500/40 dark:border-purple-900/40'
          : 'border-blue-500/20 dark:border-purple-900/20'
      } backdrop-blur-xl`}
      variants={navContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex justify-between items-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          onClick={() => handleNavigate('/home')}
          className="cursor-pointer relative group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
          />
          <motion.img
            src={Logo}
            alt="Logo"
            className="h-14 w-14 p-2 rounded-lg relative z-10"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, type: 'spring' }}
          />
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1 items-center bg-white/5 dark:bg-black/20 rounded-full px-8 py-3 backdrop-blur-md border border-white/10 dark:border-white/5">
            {navItems.map((item, index) => {
              const Icon = isActive(item.path) ? item.activeIcon : item.icon;
              const isActivePath = isActive(item.path);
              
              return (
                <motion.div
                  key={item.name}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <motion.button
                    onClick={() => handleNavigate(item.path)}
                    className="relative px-4 py-2 group rounded-full transition-all duration-300"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <motion.div
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        isActivePath
                          ? 'bg-gradient-to-r from-blue-500/40 to-purple-500/40 shadow-lg shadow-blue-500/20'
                          : 'bg-transparent group-hover:bg-white/10 dark:group-hover:bg-white/5'
                      }`}
                      layoutId="navBg"
                    />
                    <motion.span
                      className={`relative flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                        isActivePath
                          ? 'text-white dark:text-white'
                          : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Icon className={`w-5 h-5 ${isActivePath ? 'text-blue-400 dark:text-purple-300' : ''}`} />
                      </motion.div>
                      {item.name}
                    </motion.span>
                    
                    {isActivePath && (
                      <motion.div
                        className="absolute -bottom-1 left-4 right-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        layoutId="underline"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Section - Theme & Mobile Menu */}
        <motion.div className="flex items-center gap-3 lg:gap-4">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 backdrop-blur-md border border-white/10 dark:border-white/5 transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            />
            <span className="relative block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {theme === 'dark' ? (
                    <SunIcon className="w-5 h-5 text-amber-500" />
                  ) : (
                    <MoonIcon className="w-5 h-5 text-indigo-400" />
                  )}
                </motion.div>
              </AnimatePresence>
            </span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={toggleMenu}
            className="lg:hidden p-2.5 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 backdrop-blur-md border border-white/10 dark:border-white/5 transition-all duration-300 relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              className="w-6 h-6 flex items-center justify-center"
              animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed top-20 left-0 right-0 mx-4 mt-4 rounded-2xl bg-gradient-to-br from-white/95 to-blue-50/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl p-6 max-h-[calc(100vh-100px)] overflow-y-auto"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div className="flex flex-col gap-3">
              {navItems.map((item, index) => {
                const Icon = isActive(item.path) ? item.activeIcon : item.icon;
                const isActivePath = isActive(item.path);
                
                return (
                  <motion.button
                    key={item.name}
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 group relative overflow-hidden ${
                      isActivePath
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                        : 'text-gray-900 dark:text-white hover:bg-white/50 dark:hover:bg-white/10'
                    }`}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className={`w-6 h-6 ${isActivePath ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                    </motion.span>
                    <span>{item.name}</span>
                    {isActivePath && (
                      <motion.div
                        className="absolute right-4"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;