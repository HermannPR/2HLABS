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
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.5;
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

/**
 * Floating molecules background for hero section
 */
export function FloatingMolecules() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#FF00E5" intensity={0.5} />

      <Molecule position={[-2, 0, 0]} color="#00E5FF" speed={0.8} />
      <Molecule position={[2, 0, -2]} color="#FF00E5" speed={1.2} />
      <Molecule position={[0, 2, -1]} color="#39FF14" speed={1} />
      <Molecule position={[-1, -2, -3]} color="#00B8D4" speed={0.9} />
      <Molecule position={[3, -1, -2]} color="#6EFFFF" speed={1.1} />
    </>
  );
}
