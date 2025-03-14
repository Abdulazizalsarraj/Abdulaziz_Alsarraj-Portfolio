import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
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

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/Abdulazizalsarraj' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/abdulaziz-alsarraj-4a6920355' },
    { icon: <FaTelegramPlane />, url: 'https://t.me/Abdulaziz_Alsarraj' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/abdulaziz_alsarraj?igsh=MXZoeDVzNDJjMmhwdw==' }
  ];

  const contactInfo = [
    { icon: <FiMail />, value: 'abdulazizalsarraj77@gmail.com' },
    { icon: <FiPhone />, value: '+963 967 841 647' },
    { icon: <FiMapPin />, value: 'Homs, Syria' }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const handleSubmit = (e) => {
    e.preventDefault();

   
    emailjs.send(
      'service_q6rm8r8', 
      'template_d064uml', 
      {
        name: name,
        email: email,
        message: message
      },
      'A3vMZF026Ue4EY9hT' 
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      toast.success('Message sent successfully! 🎉', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme === 'dark' ? 'dark' : 'light',
      });
      setName('');
      setEmail('');
      setMessage('');
    })
    .catch((error) => {
      console.error('FAILED...', error);
      toast.error('Failed to send message. Please try again. 😢', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme === 'dark' ? 'dark' : 'light',
      });
    });
  };

  return (
    <motion.div 
      className="min-h-screen bg-primary dark:bg-primary-dark py-24 px-6 lg:px-24 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    
      <ToastContainer />


      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[200%] h-[200%] bg-gradient-to-r from-accent/10 dark:from-accent-dark/10 to-transparent"
          animate={{ 
            rotate: [0, 360],
            x: [-50, 50, -50]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

  
      <div className="relative z-10 max-w-7xl mx-auto">
    
        <motion.div 
          className="text-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl mt-3 lg:text-6xl font-bold bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-xl text-text dark:text-text-dark mt-4 opacity-90">
            Get in touch for collaborations or just say hello!
          </p>
        </motion.div>

   
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    
          <motion.div 
            className="space-y-8"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-3xl bg-secondary dark:bg-secondary-dark backdrop-blur-lg border border-accent/10 dark:border-accent-dark/10"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-dark">
                    {item.icon}
                  </div>
                  <p className="text-sm max-[350px]:text-[12px] sm:text-lg text-text dark:text-text-dark">{item.value}</p>
                </div>
              </motion.div>
            ))}

      
            <motion.div 
              className="flex gap-6 justify-center lg:justify-start"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full backdrop-blur-lg border border-accent/10 dark:border-accent-dark/10 text-text dark:text-text-dark"
                  whileHover={{ 
                    y: -5,
                    scale: 1.1,
                    backgroundColor: theme === 'dark' ? '#7C3AED20' : '#4F46E520'
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-2xl">{link.icon}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>


          <motion.form
            ref={ref}
            className="space-y-6 p-8 rounded-3xl bg-secondary dark:bg-secondary-dark backdrop-blur-lg border border-accent/10 dark:border-accent-dark/10"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            onSubmit={handleSubmit}
          >
            <motion.div 
              className="space-y-4"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              initial="hidden"
              animate={controls}
            >
              <div className="space-y-2">
                <label className="text-text dark:text-text-dark">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-xl bg-primary dark:bg-primary-dark border border-accent/10 dark:border-accent-dark/10 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark dark:text-text-dark"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-text dark:text-text-dark">Your Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-xl bg-primary dark:bg-primary-dark border border-accent/10 dark:border-accent-dark/10 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark dark:text-text-dark"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-text dark:text-text-dark">Message</label>
                <textarea
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-xl bg-primary dark:bg-primary-dark border border-accent/10 dark:border-accent-dark/10 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark dark:text-text-dark"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 px-8 rounded-xl bg-accent dark:bg-accent-dark text-white font-medium hover:bg-blue-600 dark:hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </div>

      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-accent dark:bg-accent-dark"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Contact;