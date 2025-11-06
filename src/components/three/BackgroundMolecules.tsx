import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  WaterMolecule,
  CarbonDioxideMolecule,
  AmmoniaMolecule,
  MethaneMolecule,
} from './molecules/SimpleMolecules';
import * as THREE from 'three';

interface MoleculeInstance {
  id: string;
  type: 'water' | 'co2' | 'ammonia' | 'methane';
  position: [number, number, number];
  scale: number;
  opacity: number;
  color: string;
  rotation: [number, number, number];
  rotationSpeed: [number, number, number];
}

interface BackgroundMoleculesProps {
  farCount?: number;
  midCount?: number;
  nearCount?: number;
}

/**
 * Background molecules at different depth zones for molecular space atmosphere
 */
export function BackgroundMolecules({
  farCount = 30,
  midCount = 15,
  nearCount = 5,
}: BackgroundMoleculesProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate molecules at different depth zones
  const molecules = useMemo(() => {
    const result: MoleculeInstance[] = [];
    const moleculeTypes: ('water' | 'co2' | 'ammonia' | 'methane')[] = ['water', 'co2', 'ammonia', 'methane'];

    // Far zone (distant, small, cyan tinted)
    for (let i = 0; i < farCount; i++) {
      result.push({
        id: `far-${i}`,
        type: moleculeTypes[Math.floor(Math.random() * moleculeTypes.length)],
        position: [
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40,
          -30 + Math.random() * -20,
        ],
        scale: 0.3 + Math.random() * 0.3,
        opacity: 0.1 + Math.random() * 0.1,
        color: '#00E5FF', // Cyan (cool, distant)
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ],
        rotationSpeed: [
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
        ],
      });
    }

    // Mid zone (medium distance, magenta tinted)
    for (let i = 0; i < midCount; i++) {
      result.push({
        id: `mid-${i}`,
        type: moleculeTypes[Math.floor(Math.random() * moleculeTypes.length)],
        position: [
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 35,
          -15 + Math.random() * -15,
        ],
        scale: 0.6 + Math.random() * 0.6,
        opacity: 0.2 + Math.random() * 0.2,
        color: '#FF00E5', // Magenta (warm, middle)
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ],
        rotationSpeed: [
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
        ],
      });
    }

    // Near zone (close, larger, yellow tinted - but behind hero molecules)
    for (let i = 0; i < nearCount; i++) {
      result.push({
        id: `near-${i}`,
        type: moleculeTypes[Math.floor(Math.random() * moleculeTypes.length)],
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          -10 + Math.random() * -5,
        ],
        scale: 1.0 + Math.random() * 1.0,
        opacity: 0.3 + Math.random() * 0.2,
        color: '#FFE500', // Yellow (bright, closer)
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ],
        rotationSpeed: [
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
        ],
      });
    }

    return result;
  }, [farCount, midCount, nearCount]);

  // Animate rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const molecule = molecules[index];
        if (molecule && child instanceof THREE.Group) {
          child.rotation.x += molecule.rotationSpeed[0];
          child.rotation.y += molecule.rotationSpeed[1];
          child.rotation.z += molecule.rotationSpeed[2];

          // Subtle floating animation
          const time = state.clock.getElapsedTime();
          const originalY = molecule.position[1];
          child.position.y = originalY + Math.sin(time * 0.3 + index) * 0.3;
        }
      });
    }
  });

  // Render molecules based on type
  const renderMolecule = (molecule: MoleculeInstance) => {
    switch (molecule.type) {
      case 'water':
        return (
          <WaterMolecule
            key={molecule.id}
            position={molecule.position}
            scale={molecule.scale}
            opacity={molecule.opacity}
            color={molecule.color}
            rotation={molecule.rotation}
          />
        );
      case 'co2':
        return (
          <CarbonDioxideMolecule
            key={molecule.id}
            position={molecule.position}
            scale={molecule.scale}
            opacity={molecule.opacity}
            color={molecule.color}
            rotation={molecule.rotation}
          />
        );
      case 'ammonia':
        return (
          <AmmoniaMolecule
            key={molecule.id}
            position={molecule.position}
            scale={molecule.scale}
            opacity={molecule.opacity}
            color={molecule.color}
            rotation={molecule.rotation}
          />
        );
      case 'methane':
        return (
          <MethaneMolecule
            key={molecule.id}
            position={molecule.position}
            scale={molecule.scale}
            opacity={molecule.opacity}
            color={molecule.color}
            rotation={molecule.rotation}
          />
        );
    }
  };

  return (
    <group ref={groupRef}>
      {molecules.map((molecule) => renderMolecule(molecule))}
    </group>
  );
}
