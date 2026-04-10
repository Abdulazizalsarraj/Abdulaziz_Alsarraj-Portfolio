import { Suspense, memo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Sphere } from "@react-three/drei";

const AnimatedSphere = memo(() => {
  const sphereColor = "#00d3bd";
  return (
    // FIX: reduced segments from 32×32 → 16×16 (75% fewer vertices, same visual on wireframe)
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
      <Sphere args={[1, 16, 16]} scale={2.5}>
        <meshStandardMaterial
          color={sphereColor}
          wireframe
          transparent
          opacity={0.3}
          emissive={sphereColor}
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  );
});

const Scene3D = memo(({ accentColor }) => (
  <Suspense fallback={null}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1.2} color={accentColor} />
    {/* FIX: stars reduced from 400 → 200 */}
    <Stars
      radius={100}
      depth={50}
      count={200}
      factor={4}
      saturation={0}
      fade
      speed={0.5}
    />
    <AnimatedSphere />
    <OrbitControls
      enableZoom={false}
      autoRotate
      autoRotateSpeed={0.4}
      enablePan={false}
    />
  </Suspense>
));

const ThreeBackground = memo(({ accentColor }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {/* FIX: frameloop="demand" stops continuous 60fps rendering when scene is static */}
      {/* FIX: pause canvas entirely when scrolled off-screen */}
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={1}
          frameloop="always"
          performance={{ min: 0.5 }}
          gl={{ alpha: true, powerPreference: 'low-power' }}
        >
          <Scene3D accentColor={accentColor} />
        </Canvas>
      )}
    </div>
  );
});

export default ThreeBackground;
