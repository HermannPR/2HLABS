import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface MoleculeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}

function Molecule({ position, color, speed = 1 }: MoleculeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * speed;
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.8; // Increased movement
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[1.2, 32, 32]} position={position}> {/* Increased size from 0.5 to 1.2 */}
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4} // Increased distortion
        speed={2.5} // Faster distortion
        roughness={0.1} // More reflective
        metalness={0.9} // More metallic/shiny
        emissive={color} // Makes it glow
        emissiveIntensity={0.3} // Glow intensity
      />
    </Sphere>
  );
}

/**
 * Floating molecules background for hero section
 * Optimized for both desktop and mobile visibility
 */
export function FloatingMolecules() {
  return (
    <>
      {/* Brighter ambient light for mobile visibility */}
      <ambientLight intensity={1.2} />

      {/* Multiple colored lights for better visibility - increased intensity */}
      <pointLight position={[10, 10, 10]} intensity={3} color="#00E5FF" />
      <pointLight position={[-10, -10, -10]} color="#FF00E5" intensity={2.5} />
      <pointLight position={[0, 10, -5]} color="#39FF14" intensity={2} />

      {/* Spotlight for dramatic effect */}
      <spotLight position={[0, 15, 0]} intensity={2} angle={0.6} penumbra={1} color="#ffffff" />

      {/* Original 5 molecules - larger and more visible */}
      <Molecule position={[-3, 0, 0]} color="#00E5FF" speed={0.8} />
      <Molecule position={[3, 0, -2]} color="#FF00E5" speed={1.2} />
      <Molecule position={[0, 3, -1]} color="#39FF14" speed={1} />
      <Molecule position={[-2, -3, -3]} color="#00B8D4" speed={0.9} />
      <Molecule position={[4, -1, -2]} color="#6EFFFF" speed={1.1} />

      {/* Additional 5 molecules for more density */}
      <Molecule position={[1, 1, -4]} color="#00E5FF" speed={0.7} />
      <Molecule position={[-3, 2, -1]} color="#FF00E5" speed={1.3} />
      <Molecule position={[2, -2, -5]} color="#39FF14" speed={0.95} />
      <Molecule position={[-1, -1, -2]} color="#C700B3" speed={1.05} />
      <Molecule position={[0, -3, -4]} color="#6EFFFF" speed={0.85} />
    </>
  );
}
