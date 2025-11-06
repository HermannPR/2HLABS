import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ProductModelProps {
  flavor: string;
  isDragging: boolean;
}

/**
 * Placeholder 3D product model
 * TODO: Replace with actual GLTF model when created
 *
 * This is a simplified container representation
 * Real model should be created using:
 * - Blender for modeling
 * - PBR materials for photorealism
 * - Exported as GLTF/GLB format
 */
function ProductModel({ flavor, isDragging }: ProductModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Flavor colors
  const flavorColors: Record<string, string> = {
    'Blue Razz': '#00E5FF',
    'Fruit Punch': '#FF00E5',
    'Green Apple': '#39FF14',
    'Lemon': '#FFE500',
  };

  const primaryColor = flavorColors[flavor] || '#00E5FF';

  // Idle rotation when not dragging
  useFrame((state) => {
    if (!groupRef.current || isDragging) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Container body - glass cylinder */}
      <Cylinder args={[1, 1, 3, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={primaryColor}
          metalness={0.1}
          roughness={0.05}
          transmission={0.85}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.9}
        />
      </Cylinder>

      {/* Container lid - metallic */}
      <Cylinder args={[1.1, 1.1, 0.3, 32]} position={[0, 1.65, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </Cylinder>

      {/* Label band - simulated */}
      <Cylinder args={[1.02, 1.02, 0.8, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#0A0E27"
          metalness={0.3}
          roughness={0.7}
        />
      </Cylinder>

      {/* Logo placeholder on label */}
      <Sphere args={[0.3, 32, 32]} position={[0, 0, 1.05]}>
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.8}
          metalness={0.5}
          roughness={0.3}
        />
      </Sphere>

      {/* Powder inside - particle effect */}
      <Cylinder args={[0.9, 0.9, 2, 32]} position={[0, -0.3, 0]}>
        <meshStandardMaterial
          color={primaryColor}
          metalness={0.2}
          roughness={0.8}
          emissive={primaryColor}
          emissiveIntensity={0.3}
        />
      </Cylinder>

      {/* Glow effect around container */}
      <Cylinder args={[1.15, 1.15, 3.2, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={primaryColor}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Cylinder>
    </group>
  );
}

export interface ProductViewer3DProps {
  selectedFlavor: string;
  onFlavorChange?: (flavor: string) => void;
}

/**
 * 3D Product viewer with glass/reflective materials
 * Allows 360° rotation and flavor selection
 *
 * NOTE: Currently uses placeholder geometry
 * Real product model should be created in Blender and imported
 */
export function ProductViewer3D({ selectedFlavor }: ProductViewer3DProps) {
  const [isDragging] = useState(false);

  return (
    <>
      {/* Studio Lighting Setup (3-point lighting) */}

      {/* Key light - main illumination */}
      <spotLight
        position={[5, 8, 5]}
        angle={0.3}
        penumbra={1}
        intensity={3}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill light - soften shadows */}
      <pointLight
        position={[-5, 3, -3]}
        intensity={1.5}
        color="#00E5FF"
      />

      {/* Rim/Back light - edge highlight */}
      <pointLight
        position={[0, 4, -8]}
        intensity={2}
        color="#FF00E5"
      />

      {/* Ambient light - overall illumination */}
      <ambientLight intensity={0.4} />

      {/* Hemisphere light for natural feel */}
      <hemisphereLight
        intensity={0.5}
        color="#ffffff"
        groundColor="#0A0E27"
      />

      {/* Product Model */}
      <ProductModel
        flavor={selectedFlavor}
        isDragging={isDragging}
      />

      {/* Reflective ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0A0E27"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
}
