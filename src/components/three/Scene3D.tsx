import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import type { ReactNode } from 'react';

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  enableControls?: boolean;
}

/**
 * Wrapper for 3D scenes using React Three Fiber
 */
export function Scene3D({
  children,
  className = '',
  enableControls = false,
}: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        className="w-full h-full"
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
