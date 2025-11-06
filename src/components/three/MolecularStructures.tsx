import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface AtomProps {
  position: [number, number, number];
  size?: number;
  gradientStart: string;
  gradientEnd: string;
}

/**
 * Atom with iridescent gradient material (Mario star effect)
 */
function IridescentAtom({ position, size = 0.3, gradientStart, gradientEnd }: AtomProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create custom shader material for gradient
  const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(gradientStart) },
      color2: { value: new THREE.Color(gradientEnd) },
      time: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        // Create iridescent effect based on view angle
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);

        // Rainbow gradient that shifts over time
        vec3 rainbow = vec3(
          0.5 + 0.5 * sin(vUv.y * 10.0 + time * 2.0),
          0.5 + 0.5 * sin(vUv.y * 10.0 + time * 2.0 + 2.094),
          0.5 + 0.5 * sin(vUv.y * 10.0 + time * 2.0 + 4.188)
        );

        // Mix gradient colors with rainbow
        vec3 gradient = mix(color1, color2, vUv.y);
        vec3 finalColor = mix(gradient, rainbow, fresnel * 0.5);

        // Add extra glow
        finalColor += rainbow * fresnel * 0.3;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
  });

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
      meshRef.current.material.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
      <primitive object={gradientMaterial} attach="material" />
    </Sphere>
  );
}

interface BondProps {
  start: [number, number, number];
  end: [number, number, number];
}

/**
 * Holographic bond with gradient colors
 */
function HolographicBond({ start, end }: BondProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Calculate bond position and rotation
  const direction = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]);
  const length = direction.length();
  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  direction.normalize();
  const axis = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
  const euler = new THREE.Euler().setFromQuaternion(quaternion);

  const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;

      void main() {
        // Moving rainbow gradient
        vec3 color = vec3(
          0.5 + 0.5 * sin(vUv.x * 5.0 + time * 3.0),
          0.5 + 0.5 * sin(vUv.x * 5.0 + time * 3.0 + 2.094),
          0.5 + 0.5 * sin(vUv.x * 5.0 + time * 3.0 + 4.188)
        );

        gl_FragColor = vec4(color, 0.9);
      }
    `,
    transparent: true,
  });

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
      meshRef.current.material.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <Cylinder
      ref={meshRef}
      args={[0.06, 0.06, length, 8]}
      position={midpoint}
      rotation={[euler.x, euler.y, euler.z]}
    >
      <primitive object={gradientMaterial} attach="material" />
    </Cylinder>
  );
}

interface MoleculeProps {
  position: [number, number, number];
  rotationSpeed?: number;
}

/**
 * Caffeine molecule with holographic rainbow colors
 */
function CaffeineMolecule({ position, rotationSpeed = 1 }: MoleculeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime() * rotationSpeed * 0.15;
    groupRef.current.rotation.y = time;
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Carbon atoms - cyan to yellow gradient */}
      <IridescentAtom position={[0, 0, 0]} size={0.28} gradientStart="#00E5FF" gradientEnd="#FFE500" />
      <IridescentAtom position={[0.6, 0.4, 0]} size={0.28} gradientStart="#00E5FF" gradientEnd="#39FF14" />
      <IridescentAtom position={[1.2, 0, 0]} size={0.28} gradientStart="#00B8D4" gradientEnd="#00E5FF" />
      <IridescentAtom position={[1.2, -0.8, 0]} size={0.28} gradientStart="#39FF14" gradientEnd="#00E5FF" />
      <IridescentAtom position={[0.6, -1.2, 0]} size={0.28} gradientStart="#FFE500" gradientEnd="#00E5FF" />
      <IridescentAtom position={[0, -0.8, 0]} size={0.28} gradientStart="#00E5FF" gradientEnd="#6EFFFF" />

      {/* Nitrogen atoms - magenta to cyan gradient */}
      <IridescentAtom position={[0.3, 0.8, 0.5]} size={0.32} gradientStart="#FF00E5" gradientEnd="#00E5FF" />
      <IridescentAtom position={[0.9, -1.2, 0.5]} size={0.32} gradientStart="#C700B3" gradientEnd="#FF00E5" />

      {/* Oxygen atoms - green to yellow gradient */}
      <IridescentAtom position={[1.8, 0.2, 0]} size={0.3} gradientStart="#39FF14" gradientEnd="#FFE500" />
      <IridescentAtom position={[-0.3, -1.2, 0.5]} size={0.3} gradientStart="#00FFB3" gradientEnd="#39FF14" />

      {/* Holographic bonds */}
      <HolographicBond start={[0, 0, 0]} end={[0.6, 0.4, 0]} />
      <HolographicBond start={[0.6, 0.4, 0]} end={[1.2, 0, 0]} />
      <HolographicBond start={[1.2, 0, 0]} end={[1.2, -0.8, 0]} />
      <HolographicBond start={[1.2, -0.8, 0]} end={[0.6, -1.2, 0]} />
      <HolographicBond start={[0.6, -1.2, 0]} end={[0, -0.8, 0]} />
      <HolographicBond start={[0, -0.8, 0]} end={[0, 0, 0]} />
      <HolographicBond start={[0.6, 0.4, 0]} end={[0.3, 0.8, 0.5]} />
      <HolographicBond start={[1.2, 0, 0]} end={[1.8, 0.2, 0]} />
    </group>
  );
}

/**
 * Creatine molecule with rainbow gradients
 */
function CreatineMolecule({ position, rotationSpeed = 1 }: MoleculeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime() * rotationSpeed * 0.15;
    groupRef.current.rotation.x = time * 0.5;
    groupRef.current.rotation.y = time;
    groupRef.current.position.y = position[1] + Math.cos(time * 0.5) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Carbon atoms - various gradients */}
      <IridescentAtom position={[0, 0, 0]} size={0.28} gradientStart="#00E5FF" gradientEnd="#FF00E5" />
      <IridescentAtom position={[0.7, 0, 0]} size={0.28} gradientStart="#FF00E5" gradientEnd="#39FF14" />
      <IridescentAtom position={[1.1, 0.6, 0]} size={0.28} gradientStart="#39FF14" gradientEnd="#FFE500" />

      {/* Nitrogen atoms */}
      <IridescentAtom position={[0.3, 0.7, 0]} size={0.32} gradientStart="#FF00E5" gradientEnd="#6EFFFF" />
      <IridescentAtom position={[1.5, 0.9, 0.5]} size={0.32} gradientStart="#C700B3" gradientEnd="#00E5FF" />

      {/* Oxygen atoms */}
      <IridescentAtom position={[-0.5, 0.3, 0.5]} size={0.3} gradientStart="#39FF14" gradientEnd="#00FFB3" />

      {/* Bonds */}
      <HolographicBond start={[0, 0, 0]} end={[0.7, 0, 0]} />
      <HolographicBond start={[0.7, 0, 0]} end={[1.1, 0.6, 0]} />
      <HolographicBond start={[0, 0, 0]} end={[0.3, 0.7, 0]} />
      <HolographicBond start={[1.1, 0.6, 0]} end={[1.5, 0.9, 0.5]} />
      <HolographicBond start={[0, 0, 0]} end={[-0.5, 0.3, 0.5]} />
    </group>
  );
}

/**
 * Beta-Alanine molecule with holographic colors
 */
function BetaAlanineMolecule({ position, rotationSpeed = 1 }: MoleculeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime() * rotationSpeed * 0.15;
    groupRef.current.rotation.z = time * 0.7;
    groupRef.current.rotation.y = time * 0.5;
    groupRef.current.position.y = position[1] + Math.sin(time * 0.7) * 0.25;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Carbon chain */}
      <IridescentAtom position={[0, 0, 0]} size={0.28} gradientStart="#FFE500" gradientEnd="#FF00E5" />
      <IridescentAtom position={[0.6, 0.5, 0]} size={0.28} gradientStart="#FF00E5" gradientEnd="#00E5FF" />
      <IridescentAtom position={[1.2, 0, 0]} size={0.28} gradientStart="#00E5FF" gradientEnd="#39FF14" />

      {/* Nitrogen */}
      <IridescentAtom position={[0, 0.8, 0.4]} size={0.32} gradientStart="#FF00E5" gradientEnd="#FFE500" />

      {/* Oxygen */}
      <IridescentAtom position={[1.7, 0.4, 0.5]} size={0.3} gradientStart="#39FF14" gradientEnd="#6EFFFF" />
      <IridescentAtom position={[1.5, -0.6, 0]} size={0.3} gradientStart="#00FFB3" gradientEnd="#39FF14" />

      {/* Bonds */}
      <HolographicBond start={[0, 0, 0]} end={[0.6, 0.5, 0]} />
      <HolographicBond start={[0.6, 0.5, 0]} end={[1.2, 0, 0]} />
      <HolographicBond start={[0, 0, 0]} end={[0, 0.8, 0.4]} />
      <HolographicBond start={[1.2, 0, 0]} end={[1.7, 0.4, 0.5]} />
      <HolographicBond start={[1.2, 0, 0]} end={[1.5, -0.6, 0]} />
    </group>
  );
}

/**
 * Molecular structures with holographic/iridescent materials
 * Mario star-inspired rainbow gradient effect
 */
export function MolecularStructures() {
  return (
    <>
      {/* Colorful lighting for holographic effect */}
      <ambientLight intensity={0.6} />

      {/* Multiple colored lights creating rainbow effect */}
      <pointLight position={[5, 5, 5]} intensity={2} color="#00E5FF" />
      <pointLight position={[-5, 5, 5]} intensity={2} color="#FF00E5" />
      <pointLight position={[0, -5, 5]} intensity={2} color="#39FF14" />
      <pointLight position={[5, -5, 5]} intensity={1.5} color="#FFE500" />
      <pointLight position={[-5, -5, 5]} intensity={1.5} color="#6EFFFF" />

      {/* Key supplement molecules with rainbow gradients */}
      <CaffeineMolecule position={[0, 0, -3]} rotationSpeed={0.8} />
      <CreatineMolecule position={[-3.5, 1, -5]} rotationSpeed={1.0} />
      <BetaAlanineMolecule position={[3, -0.5, -4]} rotationSpeed={0.9} />
    </>
  );
}
