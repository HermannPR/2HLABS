import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface DynamicCameraProps {
  mouseControlled?: boolean;
}

/**
 * Dynamic camera that combines automatic movement with mouse parallax
 * Creates an immersive, interactive experience
 */
export function DynamicCamera({ mouseControlled = false }: DynamicCameraProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for parallax effect
  useEffect(() => {
    if (!mouseControlled) return;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseControlled]);

  useFrame((state) => {
    if (!cameraRef.current) return;

    const time = state.clock.getElapsedTime() * 0.15; // Slow, cinematic speed

    // Complex 3D Lissajous curve for organic movement
    const radiusX = 10;
    const radiusY = 6;
    const radiusZ = 8;

    // Base camera position with multiple frequency components
    let x = Math.sin(time * 1.0) * radiusX + Math.sin(time * 2.3) * 2;
    let y = Math.sin(time * 0.7) * radiusY + Math.cos(time * 1.5) * 1.5;
    let z = Math.cos(time * 1.2) * radiusZ + Math.sin(time * 0.9) * 1.8;

    // Add mouse-driven parallax offset
    if (mouseControlled) {
      const parallaxStrength = 3.5; // How much mouse affects camera
      x += mousePosition.x * parallaxStrength;
      y += mousePosition.y * parallaxStrength;

      // Slight Z-axis movement based on distance from center
      const distanceFromCenter = Math.sqrt(
        mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y
      );
      z += distanceFromCenter * 2;
    }

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
