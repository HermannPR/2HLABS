import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface AtomProps {
  position: [number, number, number];
  size?: number;
}

/**
 * Atom with specific 2HLABS gradient (yellow→magenta→cyan like logo)
 */
function GradientAtom({ position, size = 0.3 }: AtomProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create the exact gradient shader matching the 2HLABS logo
  const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        // Exact colors from 2HLABS logo
        vec3 yellow = vec3(1.0, 0.95, 0.3);    // #FFE500
        vec3 magenta = vec3(1.0, 0.0, 0.9);    // #FF00E5
        vec3 cyan = vec3(0.0, 0.9, 1.0);       // #00E5FF

        // Create gradient from yellow→magenta→cyan based on UV
        vec3 color;
        if (vUv.y < 0.5) {
          // Bottom half: yellow to magenta
          color = mix(yellow, magenta, vUv.y * 2.0);
        } else {
          // Top half: magenta to cyan
          color = mix(magenta, cyan, (vUv.y - 0.5) * 2.0);
        }

        // Add white highlight glow on edges (like the logo)
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 4.0);
        vec3 highlight = vec3(1.0, 1.0, 1.0) * fresnel * 0.8;

        // Add animated shimmer
        float shimmer = sin(vUv.y * 10.0 + time * 3.0) * 0.1 + 0.9;
        color *= shimmer;

        // Final color with highlight
        vec3 finalColor = color + highlight;

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
 * Bond with same gradient as atoms
 */
function GradientBond({ start, end }: BondProps) {
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
        // Same gradient: yellow→magenta→cyan
        vec3 yellow = vec3(1.0, 0.95, 0.3);
        vec3 magenta = vec3(1.0, 0.0, 0.9);
        vec3 cyan = vec3(0.0, 0.9, 1.0);

        vec3 color;
        float t = vUv.x + sin(time * 2.0) * 0.1; // Animated flow

        if (t < 0.5) {
          color = mix(yellow, magenta, t * 2.0);
        } else {
          color = mix(magenta, cyan, (t - 0.5) * 2.0);
        }

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
 * Caffeine molecule with 2HLABS gradient
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
      {/* Carbon ring structure */}
      <GradientAtom position={[0, 0, 0]} size={0.28} />
      <GradientAtom position={[0.6, 0.4, 0]} size={0.28} />
      <GradientAtom position={[1.2, 0, 0]} size={0.28} />
      <GradientAtom position={[1.2, -0.8, 0]} size={0.28} />
      <GradientAtom position={[0.6, -1.2, 0]} size={0.28} />
      <GradientAtom position={[0, -0.8, 0]} size={0.28} />

      {/* Nitrogen atoms */}
      <GradientAtom position={[0.3, 0.8, 0.5]} size={0.32} />
      <GradientAtom position={[0.9, -1.2, 0.5]} size={0.32} />

      {/* Oxygen atoms */}
      <GradientAtom position={[1.8, 0.2, 0]} size={0.3} />
      <GradientAtom position={[-0.3, -1.2, 0.5]} size={0.3} />

      {/* Bonds */}
      <GradientBond start={[0, 0, 0]} end={[0.6, 0.4, 0]} />
      <GradientBond start={[0.6, 0.4, 0]} end={[1.2, 0, 0]} />
      <GradientBond start={[1.2, 0, 0]} end={[1.2, -0.8, 0]} />
      <GradientBond start={[1.2, -0.8, 0]} end={[0.6, -1.2, 0]} />
      <GradientBond start={[0.6, -1.2, 0]} end={[0, -0.8, 0]} />
      <GradientBond start={[0, -0.8, 0]} end={[0, 0, 0]} />
      <GradientBond start={[0.6, 0.4, 0]} end={[0.3, 0.8, 0.5]} />
      <GradientBond start={[1.2, 0, 0]} end={[1.8, 0.2, 0]} />
    </group>
  );
}

/**
 * Creatine molecule
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
      <GradientAtom position={[0, 0, 0]} size={0.28} />
      <GradientAtom position={[0.7, 0, 0]} size={0.28} />
      <GradientAtom position={[1.1, 0.6, 0]} size={0.28} />
      <GradientAtom position={[0.3, 0.7, 0]} size={0.32} />
      <GradientAtom position={[1.5, 0.9, 0.5]} size={0.32} />
      <GradientAtom position={[-0.5, 0.3, 0.5]} size={0.3} />

      <GradientBond start={[0, 0, 0]} end={[0.7, 0, 0]} />
      <GradientBond start={[0.7, 0, 0]} end={[1.1, 0.6, 0]} />
      <GradientBond start={[0, 0, 0]} end={[0.3, 0.7, 0]} />
      <GradientBond start={[1.1, 0.6, 0]} end={[1.5, 0.9, 0.5]} />
      <GradientBond start={[0, 0, 0]} end={[-0.5, 0.3, 0.5]} />
    </group>
  );
}

/**
 * Beta-Alanine molecule
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
      <GradientAtom position={[0, 0, 0]} size={0.28} />
      <GradientAtom position={[0.6, 0.5, 0]} size={0.28} />
      <GradientAtom position={[1.2, 0, 0]} size={0.28} />
      <GradientAtom position={[0, 0.8, 0.4]} size={0.32} />
      <GradientAtom position={[1.7, 0.4, 0.5]} size={0.3} />
      <GradientAtom position={[1.5, -0.6, 0]} size={0.3} />

      <GradientBond start={[0, 0, 0]} end={[0.6, 0.5, 0]} />
      <GradientBond start={[0.6, 0.5, 0]} end={[1.2, 0, 0]} />
      <GradientBond start={[0, 0, 0]} end={[0, 0.8, 0.4]} />
      <GradientBond start={[1.2, 0, 0]} end={[1.7, 0.4, 0.5]} />
      <GradientBond start={[1.2, 0, 0]} end={[1.5, -0.6, 0]} />
    </group>
  );
}

/**
 * Molecular structures with exact 2HLABS brand gradient
 * Yellow → Magenta → Cyan with white highlight glow
 */
export function MolecularStructures() {
  return (
    <>
      {/* Bright white lighting to enhance gradient visibility */}
      <ambientLight intensity={0.8} />

      {/* Key light */}
      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />

      {/* Fill lights with brand colors */}
      <pointLight position={[-5, 5, 5]} intensity={1.5} color="#FFE500" />
      <pointLight position={[5, -5, 5]} intensity={1.5} color="#FF00E5" />
      <pointLight position={[-5, -5, 5]} intensity={1.5} color="#00E5FF" />

      {/* Molecules with unified gradient */}
      <CaffeineMolecule position={[0, 0, -3]} rotationSpeed={0.8} />
      <CreatineMolecule position={[-3.5, 1, -5]} rotationSpeed={1.0} />
      <BetaAlanineMolecule position={[3, -0.5, -4]} rotationSpeed={0.9} />
    </>
  );
}
