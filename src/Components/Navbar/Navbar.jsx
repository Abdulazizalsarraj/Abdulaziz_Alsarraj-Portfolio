'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from "@/assets/icons/logo.svg";
import {
  HomeIcon,
  BriefcaseIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Projects', path: '/projects', icon: BriefcaseIcon },
  { name: 'About', path: '/about', icon: UserIcon },
  { name: 'Contact', path: '/contact', icon: ChatBubbleBottomCenterTextIcon },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled((prev) => {
          const scrolled = window.scrollY > 10;
          return prev === scrolled ? prev : scrolled;
        });
        rafId = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavigate = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  };

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname === path;
  };

  const navContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' } }),
    hover: { y: -3, transition: { duration: 0.2 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.08, duration: 0.3 } }),
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 lg:px-24 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-[#0a0a0a]/95 shadow-2xl' : 'py-4 bg-[#0a0a0a]/90 shadow-lg'
      } border-b ${isScrolled ? 'border-teal-400/30' : 'border-teal-400/10'} backdrop-blur-md`}
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
          onClick={() => handleNavigate('/')}
          className="cursor-pointer relative group flex items-center gap-2.5"
        >
          <motion.div className="absolute -inset-2 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            className="relative z-10"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Image src={Logo} alt="Abdulaziz Alsarraj logo" width={40} height={40} className="rounded-xl" />
          </motion.div>
          <div className="relative z-10 hidden sm:flex flex-col leading-none">
            <span className="text-sm font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
              Abdulaziz
            </span>
            <span className="text-[10px] font-medium text-gray-500 tracking-widest uppercase">Alsarraj</span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1 items-center bg-white/5 dark:bg-black/20 rounded-full px-8 py-3 backdrop-blur-md border border-white/10 dark:border-white/5">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActivePath = isActive(item.path);
              return (
                <motion.div key={item.name} custom={index} variants={navItemVariants} initial="hidden" animate="visible" whileHover="hover">
                  <motion.button
                    onClick={() => handleNavigate(item.path)}
                    className="relative px-4 py-2 group rounded-full transition-all duration-300"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isActivePath
                        ? 'bg-gradient-to-r from-teal-400/30 to-cyan-400/30 shadow-lg shadow-teal-400/20'
                        : 'bg-transparent group-hover:bg-white/10 dark:group-hover:bg-white/5'
                    }`} />
                    <motion.span className={`relative flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                      isActivePath ? 'text-teal-300' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                        <Icon className={`w-5 h-5 ${isActivePath ? 'text-teal-400' : ''}`} />
                      </motion.div>
                      {item.name}
                    </motion.span>
                    {isActivePath && (
                      <motion.div
                        className="absolute -bottom-1 left-4 right-4 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
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

        {/* Mobile Menu Toggle */}
        <motion.div className="flex items-center gap-3 lg:gap-4">
          <motion.button
            onClick={toggleMenu}
            className="lg:hidden p-2.5 rounded-full bg-teal-400/10 hover:bg-teal-400/20 backdrop-blur-md border border-teal-400/20 transition-all duration-300 relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.div
              className="w-6 h-6 flex items-center justify-center"
              animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <XMarkIcon className="w-6 h-6 text-gray-300" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Bars3Icon className="w-6 h-6 text-gray-300" />
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
            className="lg:hidden fixed top-20 left-0 right-0 mx-4 mt-4 rounded-2xl bg-[#060c0b]/95 backdrop-blur-xl border border-teal-400/25 shadow-[0_8px_32px_rgba(0,211,189,0.08)] p-6 max-h-[calc(100vh-100px)] overflow-y-auto"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div className="flex flex-col gap-3">
              {navItems.map((item, index) => {
                const Icon = item.icon;
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
                        ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 shadow-lg shadow-teal-400/30'
                        : 'text-gray-300 hover:bg-teal-400/10'
                    }`}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <motion.span whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <Icon className={`w-6 h-6 ${isActivePath ? 'text-slate-900' : 'text-gray-400'}`} />
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
