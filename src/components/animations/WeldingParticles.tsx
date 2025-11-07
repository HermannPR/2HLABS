import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number; // velocity X
  vy: number; // velocity Y
  life: number; // 0-1
  color: string;
  size: number;
}

interface WeldingParticlesProps {
  weldX: number;
  weldY: number;
  color1: string;
  color2: string;
  isActive: boolean;
  width: number;
  height: number;
  spawnRate?: number; // Particles per frame
  gravity?: number;
}

/**
 * Canvas-based particle system for welding sparks
 * Particles spawn at weld point, burst upward, then fall with gravity
 */
export function WeldingParticles({
  weldX,
  weldY,
  color1,
  color2,
  isActive,
  width,
  height,
  spawnRate = 0.3,
  gravity = 0.15,
}: WeldingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Convert hex color to RGB for current weld position
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 255, b: 255 };
  };

  // Determine current color based on weld position (blend between color1 and color2)
  const getCurrentColor = () => {
    const distance = (weldX + weldY) / (width + height); // Approximate position 0-1

    if (distance < 0.5) {
      return color1; // Left half
    } else {
      return color2; // Right half
    }
  };

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    const particles = particlesRef.current;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Spawn new particles at weld point
      if (Math.random() < spawnRate) {
        const currentColor = getCurrentColor();
        const rgb = hexToRgb(currentColor);

        // Spawn 2-4 particles at once for burst effect
        const burstCount = Math.floor(Math.random() * 3) + 2;

        for (let i = 0; i < burstCount; i++) {
          particles.push({
            x: weldX,
            y: weldY,
            vx: (Math.random() - 0.5) * 2, // Random horizontal velocity
            vy: -Math.random() * 3 - 1, // Initial upward burst (negative Y)
            life: 1,
            color: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            size: Math.random() * 2 + 1,
          });
        }
      }

      // Update and render particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply physics
        p.vy += gravity; // Gravity pulls down
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015; // Fade out

        // Remove dead particles
        if (p.life <= 0 || p.y > height + 20) {
          particles.splice(i, 1);
          continue;
        }

        // Render particle with glow
        ctx.save();

        // Outer glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        // Particle core
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Colored glow layer
        ctx.shadowBlur = 5;
        ctx.fillStyle = p.color.replace('rgb', 'rgba').replace(')', `, ${p.life * 0.8})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      particlesRef.current = []; // Clear particles on unmount
    };
  }, [isActive, weldX, weldY, width, height, color1, color2, spawnRate, gravity]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width, height }}
    />
  );
}
