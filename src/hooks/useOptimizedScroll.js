import { useEffect, useState, useRef, useCallback } from 'react';
import { isMobileDevice } from '../utils/deviceDetection';

export const useOptimizedScroll = (elementRef) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const isMobile = isMobileDevice();
  const rafId = useRef(null);
  const isInViewRef = useRef(false);
  
  // Update scroll progress in RAF loop
  const updateScrollProgress = useCallback(() => {
    if (!isInViewRef.current || !elementRef.current) {
      return; // Stop RAF loop when not in view
    }
    
    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Progress: 0 (at bottom) to 1 (at top)
    const progress = Math.max(
      0,
      Math.min(1, (windowHeight - rect.top) / windowHeight)
    );
    
    setScrollProgress(progress);
    rafId.current = requestAnimationFrame(updateScrollProgress);
  }, [elementRef]);
  
  useEffect(() => {
    if (!elementRef.current || !isMobile) return;
    
    const element = elementRef.current;
    
    // IntersectionObserver for visibility detection (efficient)
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        isInViewRef.current = inView;
        
        // Start RAF loop when element comes into view
        if (inView && !rafId.current) {
          rafId.current = requestAnimationFrame(updateScrollProgress);
        }
        // Cancel RAF loop when element goes out of view
        else if (!inView && rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
      },
      { 
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
        rootMargin: '0px'
      }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [elementRef, isMobile, updateScrollProgress]);
  
  return { scrollProgress, isInView };
};
