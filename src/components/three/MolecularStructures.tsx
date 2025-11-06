import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface AtomProps {
  position: [number, number, number];
  color: string;
  size?: number;
}

/**
 * Individual atom with metallic/glossy material
 */
function Atom({ position, color, size = 0.3 }: AtomProps) {
  return (
    <Sphere args={[size, 16, 16]} position={position}>
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
}

interface BondProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}

/**
 * Molecular bond connecting two atoms
 */
function Bond({ start, end, color = '#ffffff' }: BondProps) {
  // Calculate bond position and rotation
  const direction = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]);
  const length = direction.length();
  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  direction.normalize();
  const axis = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
  const euler = new THREE.Euler().setFromQuaternion(quaternion);

  return (
    <Cylinder
      args={[0.05, 0.05, length, 8]}
      position={midpoint}
      rotation={[euler.x, euler.y, euler.z]}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Cylinder>
  );
}

interface MoleculeProps {
  position: [number, number, number];
  rotationSpeed?: number;
}

/**
 * Caffeine molecule (C8H10N4O2) - simplified representation
 * Caffeine is a key pre-workout ingredient
 */
function CaffeineMolecule({ position, rotationSpeed = 1 }: MoleculeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime() * rotationSpeed * 0.15;
    groupRef.current.rotation.y = time;
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Carbon atoms (cyan) - ring structure */}
      <Atom position={[0, 0, 0]} color="#00E5FF" size={0.25} />
      <Atom position={[0.6, 0.4, 0]} color="#00E5FF" size={0.25} />
      <Atom position={[1.2, 0, 0]} color="#00E5FF" size={0.25} />
      <Atom position={[1.2, -0.8, 0]} color="#00E5FF" size={0.25} />
      <Atom position={[0.6, -1.2, 0]} color="#00E5FF" size={0.25} />
      <Atom position={[0, -0.8, 0]} color="#00E5FF" size={0.25} />

      {/* Nitrogen atoms (magenta) */}
      <Atom position={[0.3, 0.8, 0.5]} color="#FF00E5" size={0.3} />
      <Atom position={[0.9, -1.2, 0.5]} color="#FF00E5" size={0.3} />

      {/* Oxygen atoms (green) */}
      <Atom position={[1.8, 0.2, 0]} color="#39FF14" size={0.28} />
      <Atom position={[-0.3, -1.2, 0.5]} color="#39FF14" size={0.28} />

      {/* Bonds */}
      <Bond start={[0, 0, 0]} end={[0.6, 0.4, 0]} color="#00B8D4" />
      <Bond start={[0.6, 0.4, 0]} end={[1.2, 0, 0]} color="#00B8D4" />
      <Bond start={[1.2, 0, 0]} end={[1.2, -0.8, 0]} color="#00B8D4" />
      <Bond start={[1.2, -0.8, 0]} end={[0.6, -1.2, 0]} color="#00B8D4" />
      <Bond start={[0.6, -1.2, 0]} end={[0, -0.8, 0]} color="#00B8D4" />
      <Bond start={[0, -0.8, 0]} end={[0, 0, 0]} color="#00B8D4" />
      <Bond start={[0.6, 0.4, 0]} end={[0.3, 0.8, 0.5]} color="#FF00E5" />
      <Bond start={[1.2, 0, 0]} end={[1.8, 0.2, 0]} color="#39FF14" />
    </group>
  );
}

/**
 * Creatine molecule (C4H9N3O2) - simplified
 * Key for strength and power output
 */
function CreatineMolecule({ position, rotationSpeed = 1 }: MoleculeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime() * rotationSpeed * 0.15;
    groupRef.current.rotation.x = time * 0.5;
    groupRef.current.rotation.y = time;
    groupRef.current.position.y = position[1] + Math.cos(time * 0.5) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Carbon backbone (cyan) */}
      <Atom position={[0, 0, 0]} color="#00E5FF" size={0.25} />
      <Atom position={[0.7, 0, 0]} color="#00E5FF" size={0.25} />
      <Atom position={[1.1, 0.6, 0]} color="#00E5FF" size={0.25} />

      {/* Nitrogen (magenta) */}
      <Atom position={[0.3, 0.7, 0]} color="#FF00E5" size={0.3} />
      <Atom position={[1.5, 0.9, 0.5]} color="#FF00E5" size={0.3} />

      {/* Oxygen (green) */}
      <Atom position={[-0.5, 0.3, 0.5]} color="#39FF14" size={0.28} />

      {/* Bonds */}
      <Bond start={[0, 0, 0]} end={[0.7, 0, 0]} color="#00B8D4" />
      <Bond start={[0.7, 0, 0]} end={[1.1, 0.6, 0]} color="#00B8D4" />
      <Bond start={[0, 0, 0]} end={[0.3, 0.7, 0]} color="#FF00E5" />
      <Bond start={[1.1, 0.6, 0]} end={[1.5, 0.9, 0.5]} color="#FF00E5" />
      <Bond start={[0, 0, 0]} end={[-0.5, 0.3, 0.5]} color="#39FF14" />
    </group>
  );
}

/**
 * Beta-Alanine molecule (C3H7NO2) - simplified
 * Improves endurance and reduces fatigue
 */
function BetaAlanineMolecule({ position, rotationSpeed = 1 }: MoleculeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime() * rotationSpeed * 0.15;
    groupRef.current.rotation.z = time * 0.7;
    groupRef.current.rotation.y = time * 0.5;
    groupRef.current.position.y = position[1] + Math.sin(time * 0.7) * 0.25;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Carbon chain (cyan) */}
      <Atom position={[0, 0, 0]} color="#00E5FF" size={0.25} />
      <Atom position={[0.6, 0.5, 0]} color="#00E5FF" size={0.25} />
      <Atom position={[1.2, 0, 0]} color="#00E5FF" size={0.25} />

      {/* Nitrogen (magenta) */}
      <Atom position={[0, 0.8, 0.4]} color="#FF00E5" size={0.3} />

      {/* Oxygen (green) */}
      <Atom position={[1.7, 0.4, 0.5]} color="#39FF14" size={0.28} />
      <Atom position={[1.5, -0.6, 0]} color="#39FF14" size={0.28} />

      {/* Bonds */}
      <Bond start={[0, 0, 0]} end={[0.6, 0.5, 0]} color="#00B8D4" />
      <Bond start={[0.6, 0.5, 0]} end={[1.2, 0, 0]} color="#00B8D4" />
      <Bond start={[0, 0, 0]} end={[0, 0.8, 0.4]} color="#FF00E5" />
      <Bond start={[1.2, 0, 0]} end={[1.7, 0.4, 0.5]} color="#39FF14" />
      <Bond start={[1.2, 0, 0]} end={[1.5, -0.6, 0]} color="#39FF14" />
    </group>
  );
}

/**
 * Molecular structures representing actual supplement compounds
 * Much more relevant than generic geometric shapes
 */
export function MolecularStructures() {
  return (
    <>
      {/* Optimized lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, 5, 2]} intensity={1.5} color="#00E5FF" />
      <pointLight position={[5, -3, 2]} intensity={1.2} color="#FF00E5" />

      {/* Key supplement molecules */}
      <CaffeineMolecule position={[0, 0, -3]} rotationSpeed={0.8} />
      <CreatineMolecule position={[-3.5, 1, -5]} rotationSpeed={1.0} />
      <BetaAlanineMolecule position={[3, -0.5, -4]} rotationSpeed={0.9} />
    </>
  );
}
