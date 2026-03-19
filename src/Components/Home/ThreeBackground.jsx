import { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
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
    {/* FIX: removed second pointLight — one is sufficient for wireframe */}
    {/* FIX: stars reduced from 1000 → 400, speed reduced from 0.8 → 0.5 */}
    <Stars
      radius={100}
      depth={50}
      count={400}
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

const ThreeBackground = memo(({ accentColor }) => (
  // FIX: dpr fixed at 1 instead of [1, 1.5] — no quality difference on wireframe
  <Canvas
    camera={{ position: [0, 0, 8], fov: 50 }}
    dpr={1}
    performance={{ min: 0.5 }}
    gl={{ alpha: true, powerPreference: 'low-power' }}
  >
    <Scene3D accentColor={accentColor} />
  </Canvas>
));

export default ThreeBackground;
