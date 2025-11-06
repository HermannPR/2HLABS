import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CrystalProps {
  position: [number, number, number];
  color: string;
  geometry: THREE.BufferGeometry;
  speed?: number;
  scale?: number;
}

/**
 * Individual crystal with glass-like material and slow rotation
 */
function Crystal({ position, color, geometry, speed = 1, scale = 1 }: CrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * speed * 0.2;

    // Slow elegant rotation
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.rotation.z = time * 0.2;

    // Gentle floating
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;

    // Sync glow with main mesh
    if (glowRef.current) {
      glowRef.current.rotation.copy(meshRef.current.rotation);
      glowRef.current.position.copy(meshRef.current.position);
    }
  });

  return (
    <group>
      {/* Inner emissive core */}
      <mesh ref={glowRef} geometry={geometry} position={position} scale={scale * 0.6}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Main crystal with glass material */}
      <mesh ref={meshRef} geometry={geometry} position={position} scale={scale}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.1}
          roughness={0.05}
          transmission={0.9}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

/**
 * Geometric Crystals background for hero section
 * Samsung/Apple-like premium aesthetic with crystalline polyhedrons
 */
export function GeometricCrystals() {
  // Create different crystal geometries
  const octahedron = new THREE.OctahedronGeometry(1, 0);
  const dodecahedron = new THREE.DodecahedronGeometry(1, 0);
  const icosahedron = new THREE.IcosahedronGeometry(1, 0);
  const tetrahedron = new THREE.TetrahedronGeometry(1, 0);

  // Crystal configurations
  const crystals: Array<{
    position: [number, number, number];
    color: string;
    geometry: THREE.BufferGeometry;
    speed: number;
    scale: number;
  }> = [
    // Large centerpiece crystals
    { position: [-2, 1, -2], color: '#00E5FF', geometry: dodecahedron, speed: 0.8, scale: 1.8 },
    { position: [3, -1, -3], color: '#FF00E5', geometry: octahedron, speed: 1.2, scale: 1.6 },
    { position: [0, 2, -1], color: '#39FF14', geometry: icosahedron, speed: 1.0, scale: 1.5 },

    // Medium accent crystals
    { position: [-3, -2, -4], color: '#00B8D4', geometry: tetrahedron, speed: 0.9, scale: 1.2 },
    { position: [2, 3, -2], color: '#C700B3', geometry: dodecahedron, speed: 1.1, scale: 1.3 },

    // Small detail crystals
    { position: [4, 0, -4], color: '#6EFFFF', geometry: octahedron, speed: 0.7, scale: 1.0 },
    { position: [-1, -3, -3], color: '#FF6EC7', geometry: icosahedron, speed: 1.3, scale: 0.9 },
    { position: [1, -1, -5], color: '#00FFB3', geometry: tetrahedron, speed: 0.85, scale: 1.1 },
  ];

  return (
    <>
      {/* Enhanced lighting for glass materials */}
      <ambientLight intensity={0.6} />

      {/* Key light - cyan */}
      <pointLight
        position={[10, 10, 10]}
        intensity={3}
        color="#00E5FF"
        castShadow
      />

      {/* Fill light - magenta */}
      <pointLight
        position={[-10, -5, -5]}
        intensity={2.5}
        color="#FF00E5"
      />

      {/* Rim light - green */}
      <pointLight
        position={[5, 15, 0]}
        intensity={2}
        color="#39FF14"
      />

      {/* Dramatic spotlight from above */}
      <spotLight
        position={[0, 20, 5]}
        intensity={2.5}
        angle={0.6}
        penumbra={1}
        color="#ffffff"
        castShadow
      />

      {/* Environment light for reflections */}
      <hemisphereLight
        intensity={0.5}
        color="#00E5FF"
        groundColor="#FF00E5"
      />

      {/* Render all crystals */}
      {crystals.map((crystal, index) => (
        <Crystal
          key={index}
          position={crystal.position}
          color={crystal.color}
          geometry={crystal.geometry}
          speed={crystal.speed}
          scale={crystal.scale}
        />
      ))}
    </>
  );
}
