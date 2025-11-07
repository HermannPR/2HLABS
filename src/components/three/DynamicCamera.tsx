import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface DynamicCameraProps {
  mouseControlled?: boolean;
}

/**
 * Dynamic camera that combines automatic movement with mouse parallax
 * and click-drag rotation for user control
 */
export function DynamicCamera({ mouseControlled = false }: DynamicCameraProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Click-drag rotation state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ theta: 0, phi: 0 }); // Spherical rotation angles
  const dragRotationRef = useRef({ theta: 0, phi: 0 });

  // Track mouse position for parallax effect
  useEffect(() => {
    if (!mouseControlled) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        // Calculate drag delta for rotation
        const deltaX = event.clientX - dragStart.x;
        const deltaY = event.clientY - dragStart.y;

        // Update rotation based on drag (reduced sensitivity: 0.003 radians per pixel)
        const newTheta = dragRotationRef.current.theta + deltaX * 0.003;
        const newPhi = THREE.MathUtils.clamp(
          dragRotationRef.current.phi + deltaY * 0.003,
          -Math.PI / 4, // More limited vertical rotation
          Math.PI / 4
        );

        setRotation({ theta: newTheta, phi: newPhi });
      } else {
        // Normal parallax movement when not dragging
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y });
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY });
      dragRotationRef.current = { ...rotation };
      document.body.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [mouseControlled, isDragging, dragStart, rotation]);

  useFrame((state) => {
    if (!cameraRef.current) return;

    const time = state.clock.getElapsedTime() * 0.05; // Ultra-slow, Apple-like smooth motion

    // Very subtle radii for gentle, premium movement
    const radiusX = 4;
    const radiusY = 2.5;
    const radiusZ = 4;

    // Smooth sinusoidal motion with matching frequencies to avoid jumps
    let baseX = Math.sin(time * 0.8) * radiusX + Math.sin(time * 1.6) * 0.6;
    let baseY = Math.sin(time * 0.5) * radiusY + Math.cos(time * 1.0) * 0.5;
    let baseZ = Math.cos(time * 0.8) * radiusZ + Math.sin(time * 0.6) * 0.7;

    // Add mouse-driven parallax offset (only when NOT dragging) - Ultra-subtle Apple-style
    if (mouseControlled && !isDragging) {
      const parallaxStrength = 0.3; // Minimal parallax for premium, controlled feel
      baseX += mousePosition.x * parallaxStrength;
      baseY += mousePosition.y * parallaxStrength;

      // Almost imperceptible Z-axis movement
      const distanceFromCenter = Math.sqrt(
        mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y
      );
      baseZ += distanceFromCenter * 0.15; // Ultra-subtle depth response
    }

    // Apply user rotation from click-drag (spherical coordinates)
    // Convert base position to spherical, add user rotation, convert back to cartesian
    const baseRadius = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);
    const baseTheta = Math.atan2(baseX, baseZ);
    const basePhi = Math.asin(baseY / baseRadius);

    // Apply user rotation
    const finalTheta = baseTheta + rotation.theta;
    const finalPhi = basePhi + rotation.phi;

    // Convert back to cartesian
    const x = baseRadius * Math.sin(finalTheta) * Math.cos(finalPhi);
    const y = baseRadius * Math.sin(finalPhi);
    const z = baseRadius * Math.cos(finalTheta) * Math.cos(finalPhi);

    // Ultra-smooth camera position updates with slower lerp
    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      x,
      0.02 // Slower interpolation for buttery smooth movement
    );
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      y,
      0.02
    );
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      z,
      0.02
    );

    // Very subtle look-at target movement for premium feel
    targetRef.current.x = Math.sin(time * 0.3) * 0.8;
    targetRef.current.y = Math.cos(time * 0.2) * 0.5;
    targetRef.current.z = Math.sin(time * 0.25) * 0.4;

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
