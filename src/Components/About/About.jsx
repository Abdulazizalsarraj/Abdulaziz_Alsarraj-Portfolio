import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FiCode, FiLayout, FiSmartphone, FiFigma, FiZap, FiTrendingUp } from 'react-icons/fi';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, useGLTF, PerspectiveCamera } from '@react-three/drei';
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

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  
  return matches;
};

const Model = () => {
  const { theme } = useTheme();
  const { scene } = useGLTF('/models/uu.glb'); 
  const color = theme === 'dark' ? '#7C3AED' : '#4F46E5';

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <primitive 
        object={scene} 
        scale={[0.15, 0.15, 0.15]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color={color}
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </primitive>
    </Float>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent dark:bg-accent-dark rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const StatCard = ({ number, label, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(number);
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-2xl bg-secondary/50 dark:bg-secondary-dark/50 backdrop-blur-sm border border-accent/10 dark:border-accent-dark/10"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
    >
      <motion.div 
        className="text-2xl sm:text-4xl md:text-5xl  font-bold bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {count}+
      </motion.div>
      <p className="text-[12px] sm:text-base text-text dark:text-text-dark opacity-70 mt-2">{label}</p>
    </motion.div>
  );
};

const About = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const controls = useAnimation();
  const navigate = useNavigate();
  
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 640px)');

  const frontendSkills = [
    { icon: HtmlIcon, name: "HTML5" },
    { icon: CssIcon, name: "CSS3" },
    { icon: JsIcon, name: "JavaScript" },
    { icon: BootstrapIcon, name: "Bootstrap" },
    { icon: TailwindIcon, name: "Tailwind" },
    { icon: ReactIcon, name: "React" },
    { icon: NextIcon, name: "Next.js" },
    { icon: ReduxIcon, name: "Redux" },
    { icon: TypescriptIcon, name: "TypeScript" },
    { icon: GitIcon, name: "Git" },
  ];

  const specializations = [
    {
      icon: <FiFigma className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Figma to Code",
      description: "Transform designs into pixel-perfect responsive websites with attention to every detail",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiSmartphone className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Responsive Design",
      description: "Seamless experiences across all devices with mobile-first approach",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiLayout className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Modern UI/UX",
      description: "Cutting-edge interfaces with smooth animations and intuitive interactions",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <FiZap className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Performance",
      description: "Lightning-fast load times with optimized code and best practices",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FiCode className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "Clean Code",
      description: "Maintainable and scalable architecture following industry standards",
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8 sm:w-12 sm:h-12" />,
      title: "SEO Optimized",
      description: "Built with SEO best practices for maximum visibility and reach",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div 
      className="bg-primary dark:bg-primary-dark relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParticleBackground />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6 py-20 lg:px-16">
        
        {/* 3D Model Section */}
        <motion.div 
          className="w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[600px] relative hidden md:block"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-blue-500/20 dark:from-accent-dark/20 dark:to-blue-400/20 rounded-3xl blur-3xl" />
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-accent/10 dark:border-accent-dark/10 backdrop-blur-sm">
            <Canvas
              camera={{ position: [0, 0, 5], fov: isMobile ? 60 : 50 }}
              gl={{ alpha: true }}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={isMobile ? 60 : 50} />
              <ambientLight intensity={0.5} />
              <pointLight 
                position={[10, 10, 10]} 
                intensity={1}
                color={theme === 'dark' ? '#7C3AED' : '#4F46E5'}
              />
              <pointLight 
                position={[-10, -10, -10]} 
                intensity={0.5}
                color={theme === 'dark' ? '#3B82F6' : '#60A5FA'}
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
              <Model />
              <OrbitControls 
                enableZoom={true}
                minDistance={3}
                maxDistance={8}
                autoRotate 
                autoRotateSpeed={2}
                enablePan={false}
              />
            </Canvas>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          ref={heroRef}
          className="w-full lg:w-1/2 space-y-6 text-center lg:text-left z-10"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="inline-block mt-5 px-4 py-2 rounded-full bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-dark text-sm font-semibold mb-4">
              Welcome to My Portfolio
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-accent via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Frontend Developer
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-text dark:text-text-dark opacity-80 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Turning ideas into <span className="text-accent dark:text-accent-dark font-semibold">intuitive</span> digital experiences
          </motion.p>

          <motion.div
            className="text-base sm:text-lg text-text dark:text-text-dark opacity-75 leading-relaxed space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p>
              Specialized in crafting <span className="text-accent dark:text-accent-dark font-medium">responsive interfaces</span> that perfectly balance form and function. 
              Passionate about clean code architecture and user-centered design principles.
            </p>
            
            <p>
              With cross-functional collaboration experience, I focus on creating solutions 
              that grow with business needs while maintaining engaging interactions.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <StatCard number="50" label="Projects" delay={0.9} />
            <StatCard number="30" label="Clients" delay={1.0} />
            <StatCard number="100" label="Components" delay={1.1} />
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
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent mb-4">
            What I Do Best
          </h2>
          <p className="text-lg sm:text-xl text-text dark:text-text-dark opacity-70 max-w-2xl mx-auto">
            Comprehensive frontend solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {specializations.map((item, index) => (
            <motion.div
              key={item.title}
              className="group relative p-8 rounded-3xl bg-secondary dark:bg-secondary-dark backdrop-blur-lg border border-accent/10 dark:border-accent-dark/10 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <motion.div 
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white mb-6`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {item.icon}
              </motion.div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-text dark:text-text-dark mb-3">
                {item.title}
              </h3>
              
              <p className="text-base sm:text-lg text-text dark:text-text-dark opacity-70 leading-relaxed">
                {item.description}
              </p>

              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-blue-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="px-6 py-20 lg:px-16 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent mb-4">
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
          {frontendSkills.map((skill, index) => (
            <motion.div
              key={index}
              className="group relative p-6 sm:p-8 rounded-3xl bg-secondary dark:bg-secondary-dark backdrop-blur-lg border border-accent/10 dark:border-accent-dark/10 flex flex-col items-center justify-center overflow-hidden"
              variants={{
                hidden: { opacity: 0, scale: 0.5, y: 50 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              initial="hidden"
              animate={controls}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.1
              }}
              whileHover={{ 
                scale: 1.15,
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.4 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className="w-12 h-12 sm:w-16 sm:h-16 mb-3 relative z-10 transition-transform duration-300"
              />
              
              <span className="text-xs sm:text-sm font-semibold text-text dark:text-text-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Interactive 3D Background Section */}
      <div className="relative w-full h-[400px] sm:h-[500px] my-20 hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#7C3AED" />
          <Stars 
            radius={100} 
            depth={70} 
            count={4000} 
            factor={4} 
            saturation={1} 
            fade 
            speed={1}
          />
          <OrbitControls 
            enableZoom={true}
            minDistance={2}
            maxDistance={10}
            autoRotate 
            autoRotateSpeed={1.5}
            enablePan={false}
          />
        </Canvas>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl sm:text-4xl lg:text-5xl py-4  font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h3>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="text-center px-6 py-20 lg:px-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text dark:text-text-dark mb-6">
          Ready to Start Your Project?
        </h3>
        <p className="text-lg sm:text-xl text-text dark:text-text-dark opacity-70 mb-8 max-w-2xl mx-auto">
          Let's collaborate and bring your vision to life with cutting-edge frontend solutions
        </p>
        <motion.button
          className="px-8 py-4 rounded-full bg-gradient-to-r from-accent to-blue-500 text-white font-semibold text-lg shadow-lg shadow-accent/50 dark:shadow-accent-dark/50"
          whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(124, 58, 237, 0.4)" }}
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