import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import type { Archetype } from '../../types';
import { PokemonCard } from './PokemonCard';

interface Card3DProps {
  archetype: Archetype;
  brandColor: { primary: string; secondary: string };
  getSoulLogo: (id: string) => string;
  position: [number, number, number];
  onSelect: (archetype: Archetype) => void;
  cardNumber: number;
  index: number;
}

function Card3D({
  archetype,
  brandColor,
  getSoulLogo,
  position,
  onSelect,
  cardNumber,
}: Card3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth animation using useFrame
  useFrame(() => {
    if (!groupRef.current) return;

    // Smooth rotation
    const targetRotation = isFlipped ? Math.PI : 0;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      0.1
    );

    // Smooth scale
    const targetScale = isHovered ? 1.05 : 1;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
    );

    // Smooth hover lift
    const targetY = isHovered ? position[1] + 0.3 : position[1];
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.1
    );
  });

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2]]}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setIsFlipped(false);
      }}
      onClick={() => {
        if (isFlipped) {
          onSelect(archetype);
        } else {
          setIsFlipped(true);
        }
      }}
    >
      {/* Card front (PokemonCard) */}
      <Html
        transform
        distanceFactor={1.5}
        position={[0, 0, 0.01]}
        style={{
          width: '300px',
          height: '420px',
          pointerEvents: 'auto',
          backfaceVisibility: 'hidden',
        }}
      >
        <div style={{ width: '300px', height: '420px' }}>
          <PokemonCard
            archetype={archetype}
            brandColor={brandColor}
            getSoulLogo={getSoulLogo}
            caffeineRange={archetype.formulaProfile.caffeineRange}
            intensity={archetype.formulaProfile.intensity}
            isFlipped={isFlipped}
          />
        </div>
      </Html>

      {/* Card back */}
      <Html
        transform
        distanceFactor={1.5}
        position={[0, 0, -0.01]}
        rotation-y={Math.PI}
        style={{
          width: '300px',
          height: '420px',
          pointerEvents: 'none',
          backfaceVisibility: 'hidden',
        }}
      >
        <div
          style={{
            width: '300px',
            height: '420px',
            background: `linear-gradient(135deg, ${brandColor.primary}, ${brandColor.secondary})`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {cardNumber}
        </div>
      </Html>
    </group>
  );
}

interface WebGLCardGridProps {
  archetypes: Archetype[];
  brandColors: Record<string, { primary: string; secondary: string }>;
  getSoulLogo: (id: string) => string;
  onCardSelect: (archetype: Archetype) => void;
}

export function WebGLCardGrid({
  archetypes,
  brandColors,
  getSoulLogo,
  onCardSelect,
}: WebGLCardGridProps) {
  // Calculate grid positions (3 columns)
  const getCardPosition = (index: number): [number, number, number] => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = (col - 1) * 3.5; // Spacing between columns
    const y = -row * 5; // Spacing between rows
    const z = 0;
    return [x, y, z];
  };

  return (
    <div style={{ width: '100%', height: '100vh', maxHeight: '2000px' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, 10]} intensity={0.3} />

        {/* Render all cards */}
        {archetypes.map((archetype, index) => (
          <Card3D
            key={archetype.id}
            archetype={archetype}
            brandColor={brandColors[archetype.id] || { primary: '#00e5ff', secondary: '#00e5ff' }}
            getSoulLogo={getSoulLogo}
            position={getCardPosition(index)}
            onSelect={onCardSelect}
            cardNumber={index + 1}
            index={index}
          />
        ))}
      </Canvas>
    </div>
  );
}
