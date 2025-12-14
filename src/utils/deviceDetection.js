/**
 * Utility functions for device detection
 */

export const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
};

export const isLowEndDevice = () => {
    if (typeof window === 'undefined') return false;
    // Check for hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 4;
    // Check for device memory (if available) - experimental API, only in Chromium browsers
    // Falls back to 4GB if not available
    const memory = navigator.deviceMemory || 4;
    
    return cores <= 4 && memory <= 4;
};

export const getDeviceType = () => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
};

export const shouldReduceMotion = () => {
    if (typeof window === 'undefined') return false;
    // Only check user preference for reduced motion
    // Components should use isMobileDevice() separately to adjust animation parameters
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return prefersReducedMotion;
};
