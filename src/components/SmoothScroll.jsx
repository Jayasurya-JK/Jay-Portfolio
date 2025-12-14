import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css'; // Sometimes needed for auto-setup, but we are doing manual raf
import { isMobileDevice, isTouchDevice } from '../utils/deviceDetection';

const SmoothScroll = () => {
    useEffect(() => {
        // Disable smooth scroll on mobile/touch devices for better native scrolling
        if (isMobileDevice() || isTouchDevice()) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease
            direction: 'vertical', // vertical scroll
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
};

export default SmoothScroll;
