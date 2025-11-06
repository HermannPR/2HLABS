import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VolumetricFogProps {
  particleCount?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  size?: number;
  opacity?: number;
  driftSpeed?: number;
}

/**
 * Particle-based volumetric fog with brand gradient colors
 * Creates atmospheric depth with animated floating particles
 */
export function VolumetricFog({
  particleCount = 800,
  color1 = '#FFE500', // Yellow
  color2 = '#FF00E5', // Magenta
  color3 = '#00E5FF', // Cyan
  size = 2.0,
  opacity = 0.15,
  driftSpeed = 0.01,
}: VolumetricFogProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate fog particles with brand gradient colors
  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    // Parse brand colors
    const parseColor = (hex: string) => new THREE.Color(hex);
    const brandColor1 = parseColor(color1);
    const brandColor2 = parseColor(color2);
    const brandColor3 = parseColor(color3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Spread particles across space
      positions[i3] = (Math.random() - 0.5) * 60; // X
      positions[i3 + 1] = (Math.random() - 0.5) * 40; // Y
      positions[i3 + 2] = (Math.random() - 0.5) * 70; // Z (deep spread)

      // Assign colors based on depth (gradient effect)
      const depth = (positions[i3 + 2] + 35) / 70; // Normalize to 0-1
      let particleColor: THREE.Color;

      if (depth < 0.33) {
        // Far: Cyan to Magenta
        particleColor = brandColor3.clone().lerp(brandColor2, depth * 3);
      } else if (depth < 0.66) {
        // Mid: Magenta to Yellow
        particleColor = brandColor2.clone().lerp(brandColor1, (depth - 0.33) * 3);
      } else {
        // Near: Yellow (with variation)
        particleColor = brandColor1.clone();
      }

      colors[i3] = particleColor.r;
      colors[i3 + 1] = particleColor.g;
      colors[i3 + 2] = particleColor.b;

      // Random drift velocities
      velocities[i3] = (Math.random() - 0.5) * driftSpeed; // X velocity
      velocities[i3 + 1] = Math.random() * driftSpeed * 0.5; // Y velocity (upward bias)
      velocities[i3 + 2] = (Math.random() - 0.5) * driftSpeed * 0.5; // Z velocity
    }

    return { positions, colors, velocities };
  }, [particleCount, color1, color2, color3, driftSpeed]);

  // Animate particles
  useFrame(() => {
    if (!pointsRef.current) return;

    const positionsAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Apply drift
      positionsAttr.array[i3] += velocities[i3];
      positionsAttr.array[i3 + 1] += velocities[i3 + 1];
      positionsAttr.array[i3 + 2] += velocities[i3 + 2];

      // Wrap around when particles drift too far
      if (positionsAttr.array[i3] > 30) positionsAttr.array[i3] = -30;
      if (positionsAttr.array[i3] < -30) positionsAttr.array[i3] = 30;

      if (positionsAttr.array[i3 + 1] > 20) positionsAttr.array[i3 + 1] = -20;
      if (positionsAttr.array[i3 + 1] < -20) positionsAttr.array[i3 + 1] = 20;

      if (positionsAttr.array[i3 + 2] > 35) positionsAttr.array[i3 + 2] = -35;
      if (positionsAttr.array[i3 + 2] < -35) positionsAttr.array[i3 + 2] = 35;
    }

    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        transparent
        opacity={opacity}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
        fog={true}
      />
    </points>
  );
}
