import { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Sphere } from "@react-three/drei";

const AnimatedSphere = memo(() => {
  const sphereColor = "#00d3bd";
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[1, 32, 32]} scale={2.5}>
        <meshStandardMaterial
          color={sphereColor}
          wireframe
          transparent
          opacity={0.3}
          emissive={sphereColor}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
});

const Scene3D = memo(({ accentColor }) => (
  <Suspense fallback={null}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1.5} color={accentColor} />
    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d2ef" />
    <Stars
      radius={100}
      depth={50}
      count={1000}
      factor={4}
      saturation={0}
      fade
      speed={0.8}
    />
    <AnimatedSphere />
    <OrbitControls
      enableZoom={false}
      autoRotate
      autoRotateSpeed={0.5}
      enablePan={false}
    />
  </Suspense>
));

const ThreeBackground = memo(({ accentColor }) => (
  <Canvas
    camera={{ position: [0, 0, 8], fov: 50 }}
    dpr={[1, 1.5]}
    performance={{ min: 0.5 }}
    gl={{ alpha: true }}
  >
    <Scene3D accentColor={accentColor} />
  </Canvas>
));

export default ThreeBackground;
