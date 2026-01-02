import { useEffect, useState, useRef } from 'react';
import { isMobileDevice } from '../utils/deviceDetection';

export const useOptimizedScroll = (elementRef) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const isMobile = isMobileDevice();
  const rafId = useRef(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    
    // IntersectionObserver for visibility detection (efficient)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '0px'
      }
    );
    
    observer.observe(element);
    
    // Single RAF loop for scroll progress (only when in view)
    const updateScrollProgress = () => {
      if (!isInView) {
        rafId.current = requestAnimationFrame(updateScrollProgress);
        return;
      }
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Progress: 0 (at bottom) to 1 (at top)
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / windowHeight)
      );
      
      setScrollProgress(progress);
      rafId.current = requestAnimationFrame(updateScrollProgress);
    };
    
    if (isMobile) {
      rafId.current = requestAnimationFrame(updateScrollProgress);
    }
    
    return () => {
      observer.disconnect();
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [elementRef, isMobile, isInView]);
  
  return { scrollProgress, isInView };
};
