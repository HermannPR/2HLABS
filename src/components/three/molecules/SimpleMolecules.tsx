import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface SimpleMoleculeProps {
  position: [number, number, number];
  scale: number;
  opacity: number;
  color: string;
  rotation: [number, number, number];
}

/**
 * Water Molecule (H₂O) - 3 atoms in bent configuration
 */
export function WaterMolecule({ position, scale, opacity, color, rotation }: SimpleMoleculeProps) {
  const material = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: opacity,
    fog: true,
  });

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Oxygen (center) */}
      <Sphere args={[0.4, 16, 16]} position={[0, 0, 0]}>
        <primitive object={material} attach="material" />
      </Sphere>
      {/* Hydrogen 1 (left) */}
      <Sphere args={[0.25, 12, 12]} position={[-0.8, 0.3, 0]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
      {/* Hydrogen 2 (right) */}
      <Sphere args={[0.25, 12, 12]} position={[0.8, 0.3, 0]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
    </group>
  );
}

/**
 * Carbon Dioxide (CO₂) - 3 atoms in linear configuration
 */
export function CarbonDioxideMolecule({ position, scale, opacity, color, rotation }: SimpleMoleculeProps) {
  const material = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: opacity,
    fog: true,
  });

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Oxygen 1 (left) */}
      <Sphere args={[0.35, 16, 16]} position={[-1, 0, 0]}>
        <primitive object={material} attach="material" />
      </Sphere>
      {/* Carbon (center) */}
      <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
      {/* Oxygen 2 (right) */}
      <Sphere args={[0.35, 16, 16]} position={[1, 0, 0]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
    </group>
  );
}

/**
 * Ammonia (NH₃) - 4 atoms in pyramidal configuration
 */
export function AmmoniaMolecule({ position, scale, opacity, color, rotation }: SimpleMoleculeProps) {
  const material = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: opacity,
    fog: true,
  });

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Nitrogen (center, slightly raised) */}
      <Sphere args={[0.35, 16, 16]} position={[0, 0.3, 0]}>
        <primitive object={material} attach="material" />
      </Sphere>
      {/* Hydrogen 1 (front) */}
      <Sphere args={[0.2, 12, 12]} position={[0, -0.2, 0.6]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
      {/* Hydrogen 2 (back left) */}
      <Sphere args={[0.2, 12, 12]} position={[-0.5, -0.2, -0.3]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
      {/* Hydrogen 3 (back right) */}
      <Sphere args={[0.2, 12, 12]} position={[0.5, -0.2, -0.3]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
    </group>
  );
}

/**
 * Methane (CH₄) - 5 atoms in tetrahedral configuration
 */
export function MethaneMolecule({ position, scale, opacity, color, rotation }: SimpleMoleculeProps) {
  const material = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: opacity,
    fog: true,
  });

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Carbon (center) */}
      <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
        <primitive object={material} attach="material" />
      </Sphere>
      {/* Hydrogen 1 (top) */}
      <Sphere args={[0.2, 12, 12]} position={[0, 0.7, 0]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
      {/* Hydrogen 2 (front) */}
      <Sphere args={[0.2, 12, 12]} position={[0, -0.23, 0.66]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
      {/* Hydrogen 3 (back left) */}
      <Sphere args={[0.2, 12, 12]} position={[-0.57, -0.23, -0.33]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
      {/* Hydrogen 4 (back right) */}
      <Sphere args={[0.2, 12, 12]} position={[0.57, -0.23, -0.33]}>
        <primitive object={material.clone()} attach="material" />
      </Sphere>
    </group>
  );
}
