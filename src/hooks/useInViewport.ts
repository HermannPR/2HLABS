import { useEffect, useState, type RefObject } from 'react';

interface UseInViewportOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook to detect if an element is in the viewport using Intersection Observer
 * Used for performance optimization - only animate cards that are visible
 */
export function useInViewport(
  ref: RefObject<Element | null>,
  options: UseInViewportOptions = {}
) {
  const { threshold = 0.1, rootMargin = '100px' } = options;
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin]);

  return isInViewport;
}
