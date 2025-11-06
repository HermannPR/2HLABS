import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import type { ReactNode } from 'react';

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  enableControls?: boolean;
  onReady?: () => void;
}

/**
 * Wrapper for 3D scenes using React Three Fiber
 */
export function Scene3D({
  children,
  className = '',
  enableControls = false,
  onReady,
}: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        className="w-full h-full"
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('WebGL context lost, attempting to restore...');
          });
          gl.domElement.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored');
          });

          // Notify parent that 3D scene is ready
          if (onReady) {
            // Small delay to ensure everything is rendered
            setTimeout(onReady, 100);
          }
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
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
