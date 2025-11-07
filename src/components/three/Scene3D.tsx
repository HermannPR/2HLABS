import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { DynamicCamera } from './DynamicCamera';
import { FogExp2 } from 'three';

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  enableControls?: boolean;
  dynamicCamera?: boolean;
  mouseControlled?: boolean;
  onReady?: () => void;
  enableFog?: boolean;
  fogColor?: string;
  fogDensity?: number;
}

/**
 * Wrapper for 3D scenes using React Three Fiber
 */
export function Scene3D({
  children,
  className = '',
  enableControls = false,
  dynamicCamera = false,
  mouseControlled = false,
  onReady,
  enableFog = false,
  fogColor = '#0a0e27',
  fogDensity = 0.08,
}: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        className="w-full h-full"
        gl={{
          preserveDrawingBuffer: true,
          antialias: window.devicePixelRatio <= 1, // Disable on high DPI for performance
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false // Allow on low-end devices
        }}
        onCreated={({ gl, scene }) => {
          // Better error handling for context loss
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('WebGL context lost, attempting to restore...');
          });
          gl.domElement.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored');
          });

          // Set pixel ratio based on device - limit to 2 for performance
          const pixelRatio = Math.min(window.devicePixelRatio, 2);
          gl.setPixelRatio(pixelRatio);

          // Add volumetric fog if enabled
          if (enableFog) {
            scene.fog = new FogExp2(fogColor, fogDensity);
          }

          // Notify parent that 3D scene is ready
          if (onReady) {
            // Small delay to ensure everything is rendered
            setTimeout(onReady, 100);
          }
        }}
      >
        {dynamicCamera ? (
          <DynamicCamera mouseControlled={mouseControlled} />
        ) : (
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
        )}
        <Suspense fallback={null}>
          {children}
        </Suspense>
        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}
      </Canvas>
    </div>
  );
}
