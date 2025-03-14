import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import Logo from "../../assets/images/02145.png"

const navItems = [
  { name: 'Home', path: '/home' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  };

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 lg:px-24 py-4 bg-primary/90 dark:bg-primary-dark/90 border-b border-blue-500/30 dark:border-purple-900/30 backdrop-blur-lg transition-colors duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex justify-between items-center rounded-full w-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
   
        <motion.img
          src={Logo} 
          alt="Logo"
          onClick={() => handleNavigate('/home')}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
          className="h-14 w-14 p-2 rounded-lg cursor-pointer"
        />

    
        <div className="flex gap-8 items-center hidden lg:flex">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              <NavLink
                to={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.path);
                }} 
                className={({ isActive }) =>
                  `font-medium relative group transition-transform transform hover:scale-105 text-gray-700 dark:text-gray-300 hover:opacity-60 ${
                    isActive ? 'p-1 border-b-2 border-accent dark:border-accent-dark opacity-60' : ''
                  }`
                }
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent dark:bg-accent-dark transition-all duration-300 group-hover:w-full"
                />
              </NavLink>
            </motion.div>
          ))}

          <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/10 backdrop-blur-lg shadow-lg text-accent dark:text-accent-dark"
            whileHover={{ scale: 1.1 }}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </motion.button>
        </div>

    
        <div className="lg:hidden flex items-center">
          <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/10 backdrop-blur-lg shadow-lg text-accent dark:text-accent-dark"
            whileHover={{ scale: 1.1 }}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </motion.button>

       
          <motion.div
            className="flex flex-col items-center justify-center space-y-1 mx-5 cursor-pointer"
            onClick={toggleMenu}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="w-6 h-0.5 bg-accent dark:bg-accent-dark"></div>
            <div className="w-6 h-0.5 bg-accent dark:bg-accent-dark"></div>
            <div className="w-6 h-0.5 bg-accent dark:bg-accent-dark"></div>
          </motion.div>
        </div>
      </motion.div>

      
      {isMenuOpen && (
        <motion.div
          className="lg:hidden absolute top-16 left-0 w-full h-screen bg-primary/90 dark:bg-primary-dark/90 backdrop-blur-lg p-6 flex flex-col items-center space-y-6 mt-5"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              <div
                onClick={() => handleNavigate(item.path)}
                className={`font-medium text-xl text-gray-700 dark:text-gray-300 hover:opacity-60 cursor-pointer ${
                  item.path === window.location.pathname ? 'p-1 border-b-2 border-accent dark:border-accent-dark' : ''
                }`}
              >
                {item.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
