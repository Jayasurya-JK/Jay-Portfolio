import React, { useEffect, useState, useMemo, useRef } from 'react';
import { ArrowRight, Sparkles, Code2, Palette, TrendingUp } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Typewriter from 'typewriter-effect';
import gsap from 'gsap';
import { isMobileDevice, isTouchDevice, shouldReduceMotion } from '../utils/deviceDetection';

const FloatingElement = ({ children, delay = 0, duration = 3 }) => {
    const reduceMotion = shouldReduceMotion();
    const isMobile = useMemo(() => isMobileDevice(), []);
    
    if (reduceMotion) {
        return <div className="inline-block">{children}</div>;
    }

    // Lighter animation for mobile, full animation for desktop
    return (
        <motion.div
            className="inline-block"
            animate={{
                y: isMobile ? [0, -10, 0] : [0, -20, 0],
                rotate: isMobile ? [0, 2, -2, 0] : [0, 5, -5, 0],
            }}
            transition={{
                duration: isMobile ? duration * 0.7 : duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {children}
        </motion.div>
    );
};

const MagneticButton = ({ children, href, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const isTouch = isTouchDevice();
    const isMobile = useMemo(() => isMobileDevice(), []);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        // Disable magnetic effect on touch devices and mobile
        if (isTouch || isMobile || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * 0.3);
        y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        if (isTouch || isMobile) return;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            className={className}
            style={(isTouch || isMobile) ? {} : { x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={(isTouch || isMobile) ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.a>
    );
};

const HeroNew = () => {
    const [init, setInit] = useState(false);
    const heroRef = useRef(null);
    const cursorRef = useRef(null);
    const isMobile = useMemo(() => isMobileDevice(), []);
    const isTouch = isTouchDevice();

    // Custom cursor effect - Desktop only
    useEffect(() => {
        if (isMobile || isTouch) return;

        const moveCursor = (e) => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [isMobile, isTouch]);

    // Particles initialization
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: isMobile ? 30 : 120,
            interactivity: {
                detect_on: "canvas",
                events: {
                    onHover: {
                        enable: !isMobile,
                        mode: "grab",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onTouch: {
                        enable: isMobile,
                        mode: ["grab", "bubble"],
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: isMobile ? 100 : 120,
                        links: {
                            opacity: 0.3
                        }
                    },
                    push: {
                        quantity: 2,
                    },
                    bubble: {
                        distance: 200,
                        size: 6,
                        duration: 2,
                    }
                },
            },
            particles: {
                color: {
                    value: "#00FF87",
                },
                links: {
                    color: "#00FF87",
                    distance: 120,
                    enable: true,
                    opacity: 0.25,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: isMobile ? 0.8 : 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: isMobile ? 30 : 45,
                },
                opacity: {
                    value: 0.5,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                    }
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
                life: {
                    duration: {
                        value: 1.5
                    },
                    count: 1
                },
            },
            detectRetina: true,
            fullScreen: { enable: false },
        }),
        [isMobile],
    );

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary via-primary/95 to-secondary"
        >
            {/* Custom Cursor - Desktop Only */}
            <div
                ref={cursorRef}
                className="hidden lg:block fixed w-8 h-8 rounded-full border-2 border-accent/50 pointer-events-none z-50 mix-blend-difference"
                style={{ transform: 'translate(-50%, -50%)' }}
            />

            {/* Particles Background - Reduced on mobile for performance */}
            {init && (
                <div className="absolute inset-0 z-0">
                    <Particles
                        id="hero-particles"
                        options={particlesOptions}
                        className="w-full h-full opacity-50 md:opacity-100"
                    />
                </div>
            )}

            {/* Gradient Orbs - Optimized for mobile */}
            <div className="absolute top-1/4 -right-10 md:-right-20 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -left-10 md:-left-20 w-64 md:w-96 h-64 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
                <div className="text-center space-y-6 md:space-y-8 max-w-full overflow-hidden">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex w-full max-w-full justify-center px-2"
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 rounded-full backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-accent animate-pulse flex-shrink-0" />
                            <span className="text-accent font-semibold text-sm tracking-wide whitespace-nowrap">Available for Projects</span>
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-4 md:space-y-6 w-full max-w-full overflow-hidden"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight tracking-tight px-2 w-full break-words">
                            <span className="block">Crafting Digital</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-400 to-accent animate-gradient-x">
                                <Typewriter
                                    options={{
                                        strings: ['Experiences', 'Masterpieces', 'Solutions', 'Innovations'],
                                        autoStart: true,
                                        loop: true,
                                        deleteSpeed: 50,
                                        delay: 80,
                                    }}
                                />
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 w-full"
                    >
                        I transform ideas into stunning, high-performance websites that{' '}
                        <span className="text-white font-semibold">captivate</span>,{' '}
                        <span className="text-white font-semibold">convert</span>, and{' '}
                        <span className="text-white font-semibold">dominate</span> search rankings.
                    </motion.p>

                    {/* Feature Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap items-center justify-center gap-3 md:gap-4 px-2 w-full max-w-full overflow-visible relative z-20"
                    >
                        {[
                            { icon: Code2, text: 'Modern Development', color: 'from-blue-500/20 to-blue-500/5 border-blue-500/30' },
                            { icon: Palette, text: 'Premium Design', color: 'from-purple-500/20 to-purple-500/5 border-purple-500/30' },
                            { icon: TrendingUp, text: 'SEO Optimized', color: 'from-green-500/20 to-green-500/5 border-green-500/30' },
                        ].map((item, index) => (
                            <FloatingElement key={index} delay={index * 0.2} duration={3 + index}>
                                <div className={`relative z-10 flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 bg-gradient-to-r ${item.color} border rounded-full backdrop-blur-sm whitespace-nowrap`}>
                                    <item.icon className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" />
                                    <span className="text-white text-xs md:text-sm font-medium">{item.text}</span>
                                </div>
                            </FloatingElement>
                        ))}
                    </motion.div>

                    {/* CTA Buttons - Mobile optimized with min 44px touch target */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 pt-8 w-full max-w-full px-4 sm:px-0"
                    >
                        <MagneticButton
                            href="#work"
                            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 min-h-[56px] bg-gradient-to-r from-accent to-green-400 text-primary font-bold text-base sm:text-lg rounded-2xl overflow-hidden shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 w-full sm:w-auto max-w-full"
                        >
                            <span className="relative z-10">View My Work</span>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </MagneticButton>

                        <MagneticButton
                            href="#contact"
                            className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 min-h-[56px] bg-white/5 hover:bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-accent/50 text-white font-semibold text-base sm:text-lg rounded-2xl transition-all duration-300 w-full sm:w-auto max-w-full"
                        >
                            <span>Let's Talk</span>
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.div>
                        </MagneticButton>
                    </motion.div>

                    {/* Trusted By Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="pt-16 space-y-4"
                    >
                        <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold">
                            Trusted by Industry Leaders
                        </p>
                        <div className="relative overflow-hidden max-w-4xl mx-auto">
                            <div className="flex gap-12 animate-marquee whitespace-nowrap">
                                {[
                                    'TechCorp', 'DesignHub', 'StartupX', 'InnovateLab', 'BrandForge',
                                    'TechCorp', 'DesignHub', 'StartupX', 'InnovateLab', 'BrandForge'
                                ].map((brand, i) => (
                                    <span
                                        key={i}
                                        className="text-2xl font-bold text-white/20 hover:text-white/40 transition-colors uppercase tracking-wider"
                                    >
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <span className="text-xs uppercase tracking-widest text-gray-500">Scroll to Explore</span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-2 bg-accent rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>

        </section>
    );
};

export default HeroNew;
