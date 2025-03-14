import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FiCode, FiLayout, FiSmartphone, FiFigma } from 'react-icons/fi';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, useGLTF } from '@react-three/drei';

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
        position={[0, 0, -1]}
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

const About = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const controls = useAnimation();

  
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  const frontendSkills = [
    { icon: HtmlIcon },
    { icon: CssIcon },
    { icon: JsIcon },
    { icon: BootstrapIcon },
    { icon: TailwindIcon },
    { icon: ReactIcon },
    { icon: NextIcon },
    { icon: ReduxIcon },
    { icon: TypescriptIcon },
    { icon: GitIcon },
  ];

  const specializations = [
    {
      icon: <FiFigma className="w-12 h-12" />,
      title: "Figma to Code",
      description: "Transform designs into pixel-perfect responsive websites"
    },
    {
      icon: <FiSmartphone className="w-12 h-12" />,
      title: "Responsive Design",
      description: "Perfect display on all devices and screen sizes"
    },
    {
      icon: <FiLayout className="w-12 h-12" />,
      title: "Modern UI/UX",
      description: "Cutting-edge user interfaces with smooth interactions"
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div 
      className="bg-primary dark:bg-primary-dark py-24 px-6 lg:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
     
      <div className="relative lg:h-screen flex flex-col lg:flex-row items-center justify-center gap-12 max-sm:justify-start max-sm:mt-12">
        
        <div className="hidden sm:block w-full lg:w-[55%] h-[600px]">
          <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight 
              position={[10, 10, 10]} 
              color={theme === 'dark' ? '#7C3AED' : '#4F46E5'}
            />
            <Stars 
              radius={100} 
              depth={50} 
              count={5000} 
              factor={4} 
              saturation={0} 
              fade 
            />
            <Model />
          
            <OrbitControls 
              enableZoom={isLargeScreen} 
              autoRotate 
              autoRotateSpeed={2.5}
              enablePan={false}
            />
          </Canvas>
        </div>

        
        <motion.div 
          className="relative z-10 space-y-8 w-full lg:w-[45%] text-center lg:text-left px-12"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
              Frontend Developer
          </h1>
          
          <motion.p 
              className="text-lg sm:text-xl text-text dark:text-text-dark opacity-90"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
          >
              Turning ideas into intuitive digital experiences
          </motion.p>

          <motion.div
              className="text-base sm:text-lg text-text dark:text-text-dark opacity-85 leading-relaxed"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
          >
              <p>
                  Specialized in crafting responsive interfaces that balance form and function. 
                  Passionate about clean code architecture and user-centered design principles.
              </p>
              
              <p className="mt-4">
                  With cross-functional collaboration experience, I focus on creating solutions 
                  that grow with business needs while maintaining engaging interactions.
              </p>
          </motion.div>
        </motion.div>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-24 px-4">
        {specializations.map((item, index) => (
          <motion.div
            key={item.title}
            className="p-8 rounded-3xl bg-secondary dark:bg-secondary-dark dark:text-text-dark backdrop-blur-lg border border-accent/10 dark:border-accent-dark/10"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="text-accent dark:text-accent-dark mb-4">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-lg opacity-80">{item.description}</p>
          </motion.div>
        ))}
      </div>

    
      <div className="w-full h-[400px] px-4">
        <Canvas>
          <Stars 
            radius={100} 
            depth={70} 
            count={4000} 
            factor={4} 
            saturation={1} 
            fade 
          />
          <OrbitControls 
            enableZoom={true} 
            autoRotate 
            autoRotateSpeed={2.5}
            enablePan={true}
          />
        </Canvas>
      </div>

      <p className="text-4xl sm:text-5xl text-center -mb-5 text-text dark:text-text-dark mt-12">Skills</p>


      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 my-24 px-4"
        ref={ref}
      >
        {frontendSkills.map((skill, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-3xl bg-secondary dark:bg-secondary-dark backdrop-blur-lg flex flex-col items-center justify-center"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.1
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            <img 
              src={skill.icon} 
              alt="Skill icon" 
              className="w-16 sm:w-20 h-16 sm:h-20 hover:scale-110 transition-transform duration-300"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default About;
