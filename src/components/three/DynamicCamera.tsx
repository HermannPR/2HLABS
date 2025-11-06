import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Dynamic camera that moves in an organic, figure-8 pattern
 * Explores molecules from multiple angles for cinematic effect
 */
export function DynamicCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    if (!cameraRef.current) return;

    const time = state.clock.getElapsedTime() * 0.15; // Slow, cinematic speed

    // Complex 3D Lissajous curve for organic movement
    // This creates a figure-8 pattern that explores all angles
    const radiusX = 10;
    const radiusY = 6;
    const radiusZ = 8;

    // Camera position with multiple frequency components
    const x = Math.sin(time * 1.0) * radiusX + Math.sin(time * 2.3) * 2;
    const y = Math.sin(time * 0.7) * radiusY + Math.cos(time * 1.5) * 1.5;
    const z = Math.cos(time * 1.2) * radiusZ + Math.sin(time * 0.9) * 1.8;

    // Smooth camera position updates
    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      x,
      0.05
    );
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      y,
      0.05
    );
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      z,
      0.05
    );

    // Dynamic look-at target with slight offset for interest
    targetRef.current.x = Math.sin(time * 0.5) * 1.5;
    targetRef.current.y = Math.cos(time * 0.3) * 1.0;
    targetRef.current.z = Math.sin(time * 0.4) * 0.8;

    // Smoothly look at the dynamic target
    cameraRef.current.lookAt(targetRef.current);

    // Update camera matrix
    cameraRef.current.updateMatrixWorld();
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[10, 0, 8]}
      fov={75}
      near={0.1}
      far={1000}
    />
  );
}
