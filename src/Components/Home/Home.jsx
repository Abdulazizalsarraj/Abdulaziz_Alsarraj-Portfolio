import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Stars, Float, useGLTF } from '@react-three/drei';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../../hooks/useTheme';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../assets/images/linkedInprofile.jfif';
import cvFile from '../../assets/Abdulaziz_Alsarraj CV- 2025.pdf'; 
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';

// const Model = () => {
//   const { theme } = useTheme();
//   const { scene } = useGLTF('/models/uu.glb');
  
//   return (
//     <primitive object={scene} scale={[0.7, 0.6, 0.6]}>
//       <meshStandardMaterial
//         color={theme === 'dark' ? '#7C3AED' : '#4F46E5'}
//         metalness={0.9}
//         roughness={0.2}
//         emissive={theme === 'dark' ? '#7C3AED' : '#4F46E5'}
//         emissiveIntensity={0.3}
//       />
//     </primitive>
//   );
// };

const Home = () => {
  const { theme } = useTheme();
  const accentColor = theme === 'dark' ? '#7C3AED' : '#4F46E5';
  const navigate = useNavigate();

 
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/Abdulazizalsarraj' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/abdulaziz-alsarraj-4a6920355' },
    { icon: <FaTelegramPlane />, url: 'https://t.me/Abdulaziz_Alsarraj' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/abdulaziz_alsarraj?igsh=MXZoeDVzNDJjMmhwdw==' }
  ];

  return (
    <>
      <Helmet>
        <title>Abdulaziz Alsarraj | Frontend Developer</title>
        <meta name="theme-color" content={accentColor} />
      </Helmet>

      <div className="block lg:hidden fixed inset-0 z-10 h-screen w-full">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
        >
          <ambientLight intensity={0.5} />
          <Stars
            radius={100}
            depth={50}
            count={4000}
            factor={5} 
            saturation={0}
            fade
          />
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.5} 
            enablePan={false}
            dampingFactor={0.1}
          />
        </Canvas>
      </div>

      <div className="hidden lg:block fixed inset-0 z-10 h-screen w-full">
        <Canvas
          camera={{
            position: [5, 12, 15],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight
            position={[10, 10, 10]}
            intensity={1.5}
            color={theme === 'dark' ? '#7C3AED' : '#4F46E5'}
          />
          <Stars
            radius={100}
            depth={50}
            count={4000}
            factor={4}
            color={accentColor}
          />
          <Float
            speed={2}
            rotationIntensity={0.4}
            floatIntensity={1.5}
            floatingRange={[0.5, 1]}
          >
            {/* <Model />  */}
          </Float>
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2.5}
            enablePan={false}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      <div className="hidden lg:block fixed inset-0 z-10 h-screen w-full">
        <Canvas
          camera={{
            position: [5, 12, 15],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight
            position={[10, 10, 10]}
            intensity={1.5}
            color={theme === 'dark' ? '#7C3AED' : '#4F46E5'}
          />
          <Stars
            radius={100}
            depth={50}
            count={4000}
            factor={4}
            color={accentColor}
          />
          <Float
            speed={2}
            rotationIntensity={0.4}
            floatIntensity={1.5}
            floatingRange={[0.5, 1]}
          >
            {/* <Model />  */}
          </Float>
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2.5}
            enablePan={false}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      <Navbar />

      <motion.div
        className="min-h-screen relative z-20 select-none flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 pt-24 text-gray-900 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
       
        <div className="order-1 lg:order-2 flex flex-col items-center">
          <motion.div
            className="relative w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 mb-8 lg:mb-0"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/30 dark:bg-purple-900/30 blur-2xl" />
            <img
              src={profileImage}
              alt="Profile"
              className="mt-8 w-full h-full object-cover rounded-full border-4 border-accent transform rotate-3 hover:rotate-0 transition-all duration-500"
            />
          </motion.div>
        
          <motion.div
            className="flex justify-center gap-6 mt-6 lg:mt-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full backdrop-blur-lg border border-accent/10 dark:border-accent-dark/10 text-text dark:text-text-dark transition-transform"
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
        </div>

        <div className="order-2 lg:order-1 max-w-2xl space-y-8 mt-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Building Digital
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Experiences
              </span>
              <br />
              <span className="text-3xl lg:text-5xl font-normal opacity-80">
                That Inspire
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl lg:text-2xl opacity-90"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Frontend Developer specializing in creating immersive web experiences
            with modern technologies and pixel-perfect implementation.
          </motion.p>

          <motion.div
            className="flex gap-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <button 
              className="px-8 py-4 rounded-full font-medium transition-colors bg-accent hover:bg-blue-600 text-white dark:bg-accent-dark dark:hover:bg-purple-700 max-lg:mb-10"
              onClick={() => {navigate('/projects')}}
            >
              View Projects
            </button>
       
            <a href={cvFile} download="Abdulaziz_Alsarraj CV- 2025.pdf">
              <button 
                className="px-8 py-4 rounded-full border border-accent hover:bg-blue-500/10 text-gray-700 dark:border-accent-dark dark:hover:bg-purple-900/20 dark:text-gray-300 max-lg:mb-10"
              >
                Download CV
              </button>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
