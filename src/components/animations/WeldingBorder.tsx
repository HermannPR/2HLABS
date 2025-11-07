import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { WeldingParticles } from './WeldingParticles';

// Animation states for welding effect
type WeldingState = 'STARTUP' | 'IGNITION' | 'ACCELERATION' | 'RUNNING';

interface WeldingBorderProps {
  color1: string;
  color2: string;
  isActive: boolean;
  width: number;
  height: number;
  glowIntensity?: number;
  speed?: number;
}

/**
 * Animated welding border effect with dual colors
 * Creates a neon outline with a moving "weld point" that travels the perimeter
 * Border follows rounded corners and colors move along the edge
 * 
 * Animation Sequence:
 * 1. STARTUP: Show full border with both colors (0.5s)
 * 2. IGNITION: Flicker/flash 4-6 times with varying intensity (1.5s)
 * 3. ACCELERATION: Progressive speed-up from slow to target (2s)
 * 4. RUNNING: Normal operation with realistic imperfections
 */
export function WeldingBorder({
  color1,
  color2,
  isActive,
  width,
  height,
  glowIntensity = 0.8,
  speed = 4,
}: WeldingBorderProps) {
  const [weldPosition, setWeldPosition] = useState(0);
  const [animationState, setAnimationState] = useState<WeldingState>('STARTUP');
  const [currentIntensity, setCurrentIntensity] = useState(1);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [isFlickering, setIsFlickering] = useState(false);
  const startTimeRef = useRef<number>(0);
  const lastFailureRef = useRef<number>(0);
  
  const borderRadius = 16; // Match rounded-2xl (1rem = 16px)

  // Calculate perimeter points for weld position with rounded corners
  const getWeldCoordinates = (progress: number) => {
    const strokeOffset = 2;
    const offset = strokeOffset / 2;
    const w = width - strokeOffset;
    const h = height - strokeOffset;
    
    // Approximate perimeter with rounded corners
    const straightWidth = w - 2 * borderRadius;
    const straightHeight = h - 2 * borderRadius;
    const cornerLength = (Math.PI * borderRadius) / 2; // Quarter circle
    const perimeter = 2 * (straightWidth + straightHeight) + 4 * cornerLength;
    const distance = progress * perimeter;

    let accumulated = 0;

    // Top edge (left to right, starting after top-left corner)
    if (distance < straightWidth) {
      return { x: borderRadius + offset + distance, y: offset };
    }
    accumulated += straightWidth;

    // Top-right corner
    if (distance < accumulated + cornerLength) {
      const angle = ((distance - accumulated) / cornerLength) * (Math.PI / 2);
      return {
        x: w - borderRadius + borderRadius * Math.sin(angle),
        y: borderRadius + offset - borderRadius * Math.cos(angle),
      };
    }
    accumulated += cornerLength;

    // Right edge (top to bottom)
    if (distance < accumulated + straightHeight) {
      return { x: w, y: borderRadius + offset + (distance - accumulated) };
    }
    accumulated += straightHeight;

    // Bottom-right corner
    if (distance < accumulated + cornerLength) {
      const angle = ((distance - accumulated) / cornerLength) * (Math.PI / 2);
      return {
        x: w - borderRadius + borderRadius * Math.cos(angle),
        y: h - borderRadius + borderRadius * Math.sin(angle),
      };
    }
    accumulated += cornerLength;

    // Bottom edge (right to left)
    if (distance < accumulated + straightWidth) {
      return { x: w - borderRadius - (distance - accumulated), y: h };
    }
    accumulated += straightWidth;

    // Bottom-left corner
    if (distance < accumulated + cornerLength) {
      const angle = ((distance - accumulated) / cornerLength) * (Math.PI / 2);
      return {
        x: borderRadius + offset - borderRadius * Math.sin(angle),
        y: h - borderRadius + borderRadius * Math.cos(angle),
      };
    }
    accumulated += cornerLength;

    // Left edge (bottom to top)
    if (distance < accumulated + straightHeight) {
      return { x: offset, y: h - borderRadius - (distance - accumulated) };
    }
    accumulated += straightHeight;

    // Top-left corner
    const angle = ((distance - accumulated) / cornerLength) * (Math.PI / 2);
    return {
      x: borderRadius + offset - borderRadius * Math.cos(angle),
      y: borderRadius + offset - borderRadius * Math.sin(angle),
    };
  };

  const weldCoords = getWeldCoordinates(weldPosition);

  // State machine for welding animation sequence
  useEffect(() => {
    if (!isActive) {
      // Reset to STARTUP when inactive
      setAnimationState('STARTUP');
      setWeldPosition(0);
      setCurrentSpeed(0);
      setCurrentIntensity(1);
      startTimeRef.current = 0;
      return;
    }

    if (startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }

    const elapsed = (Date.now() - startTimeRef.current) / 1000;

    // STARTUP: Show full border (0-0.5s)
    if (elapsed < 0.5) {
      setAnimationState('STARTUP');
      setCurrentIntensity(1);
      return;
    }

    // IGNITION: Flicker 4-6 times (0.5-2s)
    if (elapsed < 2) {
      setAnimationState('IGNITION');
      const flickerTime = (elapsed - 0.5) / 1.5;
      const flickerPhase = (flickerTime * 5) % 1;
      
      // Random intensity on each flicker
      if (flickerPhase < 0.3) {
        setCurrentIntensity(0.3 + Math.random() * 0.7);
        setIsFlickering(true);
      } else if (flickerPhase < 0.5) {
        setCurrentIntensity(0.2); // Keep minimum visibility during off phase
        setIsFlickering(false);
      } else {
        setCurrentIntensity(0.8 + Math.random() * 0.2);
        setIsFlickering(true);
      }
      return;
    }

    // ACCELERATION: Progressive speed-up (2-4s)
    if (elapsed < 4) {
      setAnimationState('ACCELERATION');
      const accelProgress = (elapsed - 2) / 2;
      // Ease-in-out curve
      const easedProgress = accelProgress < 0.5
        ? 2 * accelProgress * accelProgress
        : 1 - Math.pow(-2 * accelProgress + 2, 2) / 2;
      setCurrentSpeed(easedProgress * speed);
      setCurrentIntensity(0.6 + easedProgress * 0.4);
      setIsFlickering(false);
      return;
    }

    // RUNNING: Normal operation with random failures
    setAnimationState('RUNNING');
    setCurrentSpeed(speed);
    
    // Random intensity drops/failures every 2-5 seconds
    const timeSinceLastFailure = elapsed - lastFailureRef.current;
    if (timeSinceLastFailure > 2 + Math.random() * 3) {
      lastFailureRef.current = elapsed;
      // Brief failure
      setCurrentIntensity(0.4 + Math.random() * 0.3);
      setIsFlickering(true);
      setTimeout(() => {
        setCurrentIntensity(glowIntensity);
        setIsFlickering(false);
      }, 100 + Math.random() * 200);
    } else if (!isFlickering) {
      setCurrentIntensity(glowIntensity);
    }
  }, [isActive, speed, glowIntensity, isFlickering]);

  // Animate weld position based on current speed
  useEffect(() => {
    if (!isActive || animationState === 'STARTUP' || animationState === 'IGNITION') return;

    let animationFrame: number;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      
      if (currentSpeed > 0) {
        setWeldPosition((prev) => (prev + delta / currentSpeed) % 1);
      }
      
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, currentSpeed, animationState]);


  if (!isActive) return null;

  // Create rounded rectangle path - adjusted for stroke width to align with card edge
  const createRoundedRectPath = () => {
    const r = borderRadius;
    const strokeOffset = 2; // Half of strokeWidth (4px / 2) to center the stroke on the edge
    const w = width - strokeOffset;
    const h = height - strokeOffset;
    const offset = strokeOffset / 2;
    
    return `
      M ${r + offset} ${offset}
      L ${w - r} ${offset}
      Q ${w} ${offset} ${w} ${r + offset}
      L ${w} ${h - r}
      Q ${w} ${h} ${w - r} ${h}
      L ${r + offset} ${h}
      Q ${offset} ${h} ${offset} ${h - r}
      L ${offset} ${r + offset}
      Q ${offset} ${offset} ${r + offset} ${offset}
      Z
    `;
  };

  return (
    <div 
      className="absolute inset-0 pointer-events-none rounded-2xl" 
      style={{ 
        overflow: 'visible',
      }}
    >
      <svg
        className="absolute inset-0"
        width={width}
        height={height}
        style={{ overflow: 'visible' }}
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          {/* Glow filters for neon effect */}
          <filter id={`neon-glow-1-${color1.replace('#', '')}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`neon-glow-2-${color2.replace('#', '')}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="weld-glow" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for dual colors */}
          <linearGradient id={`border-gradient-${color1.replace('#', '')}-${color2.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="50%" stopColor={color1} />
            <stop offset="50%" stopColor={color2} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>

          {/* Animated gradient that rotates colors along the path */}
          <linearGradient id={`animated-gradient-${color1.replace('#', '')}-${color2.replace('#', '')}`}>
            <stop offset="0%" stopColor={color1}>
              <animate
                attributeName="offset"
                values="0;1;0"
                dur={`${speed}s`}
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="25%" stopColor={color2}>
              <animate
                attributeName="offset"
                values="0.25;1;0.25"
                dur={`${speed}s`}
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor={color1}>
              <animate
                attributeName="offset"
                values="0.5;1;0.5"
                dur={`${speed}s`}
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="75%" stopColor={color2}>
              <animate
                attributeName="offset"
                values="0.75;1;0.75"
                dur={`${speed}s`}
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor={color1}>
              <animate
                attributeName="offset"
                values="1;1;1"
                dur={`${speed}s`}
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        {/* Animated dual-color border with rounded corners */}
        <path
          d={createRoundedRectPath()}
          fill="none"
          stroke={
            animationState === 'STARTUP' || animationState === 'IGNITION'
              ? `url(#border-gradient-${color1.replace('#', '')}-${color2.replace('#', '')})`
              : `url(#animated-gradient-${color1.replace('#', '')}-${color2.replace('#', '')})`
          }
          strokeWidth="4"
          filter={`url(#neon-glow-1-${color1.replace('#', '')})`}
          opacity={Math.max(0.5, currentIntensity)} // Minimum 0.5 opacity for visibility
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Moving weld point (bright spot) - visible during all active states */}
        {(animationState === 'IGNITION' || animationState === 'ACCELERATION' || animationState === 'RUNNING') && (
          <motion.g
            animate={{
              x: weldCoords.x,
              y: weldCoords.y,
              scale: isFlickering ? [1, 1.5, 1] : 1,
            }}
            transition={{
              x: { duration: 0.05, ease: 'linear' },
              y: { duration: 0.05, ease: 'linear' },
              scale: { duration: 0.15, ease: 'easeInOut' },
            }}
          >
            {/* Outer glow - larger and more visible */}
            <circle
              cx="0"
              cy="0"
              r="25"
              fill="white"
              opacity={Math.max(0.5, currentIntensity * 0.7)}
              filter="url(#weld-glow)"
            />

            {/* Middle glow */}
            <circle
              cx="0"
              cy="0"
              r="15"
              fill="white"
              opacity={Math.max(0.7, currentIntensity * 0.9)}
              filter="url(#weld-glow)"
            />

            {/* Core bright spot */}
            <circle
              cx="0"
              cy="0"
              r="8"
              fill="white"
              opacity={1}
              filter="url(#weld-glow)"
            />
            
            {/* Super bright test spot - always visible */}
            <circle
              cx="0"
              cy="0"
              r="4"
              fill="#FFE500"
              opacity={1}
            />
          </motion.g>
        )}

        {/* Trail effect behind weld point */}
        {(animationState === 'IGNITION' || animationState === 'ACCELERATION' || animationState === 'RUNNING') && (
          <motion.circle
            cx={weldCoords.x}
            cy={weldCoords.y}
            r="12"
            fill="white"
            opacity={Math.max(0.3, currentIntensity * 0.4)}
            filter="url(#weld-glow)"
          />
        )}
      </svg>

      {/* Particle system - more active during IGNITION and failures */}
      {(animationState === 'IGNITION' || animationState === 'ACCELERATION' || animationState === 'RUNNING') && (
        <WeldingParticles
          weldX={weldCoords.x}
          weldY={weldCoords.y}
          color1={color1}
          color2={color2}
          isActive={isActive && currentIntensity > 0.2}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}
