import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';

interface StatBarProps {
  position: [number, number, number];
  targetHeight: number;
  color: string;
  label: string;
  value: number;
  unit: string;
  index: number;
  isVisible: boolean;
}

/**
 * Individual 3D bar with glass material
 */
function StatBar({ position, targetHeight, color, label, value, unit, index, isVisible }: StatBarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentHeight = useRef(0);
  const animationStarted = useRef(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Start animation when visible
    if (isVisible && !animationStarted.current) {
      animationStarted.current = true;
    }

    // Animate height growth
    if (animationStarted.current && currentHeight.current < targetHeight) {
      currentHeight.current = Math.min(
        currentHeight.current + delta * 2,
        targetHeight
      );

      // Update scale
      meshRef.current.scale.y = currentHeight.current;

      // Update position to grow from bottom
      meshRef.current.position.y = position[1] + currentHeight.current / 2;
    }

    // Gentle idle animation
    if (currentHeight.current >= targetHeight) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y =
        position[1] + targetHeight / 2 + Math.sin(time + index) * 0.05;
    }
  });

  return (
    <group>
      {/* Base platform */}
      <mesh position={[position[0], position[1] - 0.05, position[2]]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Main bar with glass material */}
      <mesh
        ref={meshRef}
        position={[position[0], position[1], position[2]]}
        scale={[1, 0, 1]}
      >
        <cylinderGeometry args={[0.35, 0.35, 1, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.1}
          roughness={0.1}
          transmission={0.8}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow effect at top */}
      <mesh
        position={[position[0], position[1] + targetHeight, position[2]]}
        scale={0.6}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Label below bar */}
      <Text
        position={[position[0], position[1] - 0.5, position[2]]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>

      {/* Value above bar (only show when fully grown) */}
      {currentHeight.current >= targetHeight * 0.95 && (
        <Text
          position={[position[0], position[1] + targetHeight + 0.6, position[2]]}
          fontSize={0.4}
          color={color}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          {value}
          {unit}
        </Text>
      )}
    </group>
  );
}

interface StatsChart3DProps {
  stats: Array<{
    label: string;
    value: number;
    unit: string;
    color: string;
  }>;
}

/**
 * 3D Stats visualization with glass bar chart
 * Shows performance metrics in an engaging way
 */
export function StatsChart3D({ stats }: StatsChart3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Detect when component is in view
  const { inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Calculate bar positions and heights
  const bars = useMemo(() => {
    const spacing = 2;
    const startX = -(stats.length - 1) * spacing / 2;

    return stats.map((stat, index) => ({
      ...stat,
      position: [startX + index * spacing, 0, 0] as [number, number, number],
      // Normalize height between 1 and 4
      targetHeight: 1 + (stat.value / 100) * 3,
    }));
  }, [stats]);

  // Gentle rotation of the entire group
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Enhanced lighting for glass */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, 10, -5]} intensity={1.5} color="#00E5FF" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />

      {/* Render all bars */}
      {bars.map((bar, index) => (
        <StatBar
          key={index}
          position={bar.position}
          targetHeight={bar.targetHeight}
          color={bar.color}
          label={bar.label}
          value={bar.value}
          unit={bar.unit}
          index={index}
          isVisible={inView}
        />
      ))}

      {/* Ground plane with grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial
          color="#0A0E27"
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Grid lines */}
      <gridHelper
        args={[20, 20, '#00E5FF', '#1a1e3a']}
        position={[0, -0.09, 0]}
      />
    </group>
  );
}
