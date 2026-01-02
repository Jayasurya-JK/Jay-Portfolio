import React, { useState, useEffect } from 'react';
import { Phone, PenTool, Code, Rocket, Search, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import { isMobileDevice, shouldReduceMotion } from '../utils/deviceDetection';

const Process = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const isMobile = isMobileDevice();
    const reduceMotion = shouldReduceMotion();

    const steps = [
        {
            number: "01",
            icon: <Search size={24} />,
            title: "Discovery & Strategy",
            description: "We start with a deep dive into your business goals. I listen to your needs, understand your audience, and map out a strategy that ensures your website actually converts.",
            color: "border-blue-500 text-blue-500 shadow-blue-500/50"
        },
        {
            number: "02",
            icon: <PenTool size={24} />,
            title: "Design & Content",
            description: "I create a visual direction that matches your brand personality. We finalize the copy and layout before writing a single line of code, so you know exactly what you're getting.",
            color: "border-orange-500 text-orange-500 shadow-orange-500/50"
        },
        {
            number: "03",
            icon: <Code size={24} />,
            title: "Development",
            description: "I build your site using modern, fast technologies. No bloated templates—just clean, SEO-friendly code that loads instantly and works perfectly on mobile.",
            color: "border-green-500 text-green-500 shadow-green-500/50"
        },
        {
            number: "04",
            icon: <Rocket size={24} />,
            title: "Launch & Growth",
            description: "We go live! But it doesn't stop there. I set up Google Search Console, analytics, and ensure your site is ready to rank. I'm always here for updates.",
            color: "border-purple-500 text-purple-500 shadow-purple-500/50"
        },
        {
            number: "05",
            icon: <Settings size={24} />,
            title: "Support & Maintenance",
            description: "I don't just disappear after launch. I provide ongoing support, security updates, and performance monitoring to keep your site running smoothly.",
            color: "border-cyan-500 text-cyan-500 shadow-cyan-500/50"
        }
    ];

    // Helper to get positive modulo
    const getStepIndex = (index) => {
        return ((index % steps.length) + steps.length) % steps.length;
    };

    // Auto-play logic
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setActiveIndex((prev) => prev + 1);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // Swipe Logic (Pan)
    const swipeConfidenceThreshold = 50;

    const handlePanEnd = (e, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (Math.abs(offset) > swipeConfidenceThreshold || Math.abs(velocity) > 500) {
            if (offset < 0) {
                setActiveIndex((prev) => prev + 1);
            } else {
                setActiveIndex((prev) => prev - 1);
            }
        }
    };

    // Spacing for the carousel items (degrees)
    const spacing = 35;

    // Calculate current step data
    const currentStepIndex = getStepIndex(activeIndex);
    const currentStep = steps[currentStepIndex];

    return (
        <section id="process" className="pt-12 pb-12 md:pt-20 md:pb-20 bg-primary relative overflow-hidden min-h-0 flex flex-col justify-start">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                {/* Header */}
                <Reveal>
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">How we work together</h2>
                        <p className="text-sm sm:text-base text-gray-400">Our proven process for delivering results.</p>
                    </div>
                </Reveal>

                {/* Active Content Display */}
                <div className="relative h-[240px] sm:h-[220px] md:h-[180px] max-w-2xl mx-auto text-center mb-1 md:mb-4 px-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.43, 0.13, 0.23, 0.96]
                            }}
                            className="absolute inset-0 flex flex-col items-center"
                        >
                            <div className="text-accent font-mono text-base sm:text-lg md:text-xl mb-2">Step {currentStep.number}</div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 px-4">
                                {currentStep.title}
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed px-4 md:px-0">
                                {currentStep.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Rotating Wheel Container */}
                <motion.div
                    className="relative w-full h-[200px] sm:h-[220px] md:h-[360px] flex justify-center mt-1 sm:mt-4 md:mt-8 overflow-visible touch-pan-y"
                    onMouseEnter={() => !isMobile && setIsAutoPlaying(false)}
                    onMouseLeave={() => !isMobile && setIsAutoPlaying(true)}
                    onPanEnd={handlePanEnd}
                >
                    {/* Static Semi-Circle Track (The "Hill") */}
                    <div className="absolute top-10 w-[280px] h-[140px] sm:w-[320px] sm:h-[160px] md:w-[600px] md:h-[300px] rounded-t-full border-t-2 border-l-2 border-r-2 border-b-0 border-dashed border-white/10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                    {/* Icons Container */}
                    <motion.div
                        className="absolute top-10 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[600px] md:h-[600px] rounded-full flex items-center justify-center pointer-events-none"
                        animate={{ rotate: -90 - (activeIndex * spacing) }}
                        transition={reduceMotion ? { duration: 0.3 } : {
                            type: "tween",
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                    >
                        {steps.map((step, index) => {
                            // Calculate effective index to keep icons clustered around the active index
                            // This ensures they wrap around the bottom (hidden area) instead of flying across the top
                            const length = steps.length;
                            const offset = Math.round((activeIndex - index) / length) * length;
                            const effectiveIndex = index + offset;
                            const angle = effectiveIndex * spacing;

                            // Check if this specific instance is the active one
                            const isActive = getStepIndex(activeIndex) === index;

                            return (
                                <div
                                    key={index}
                                    className="absolute flex items-center justify-center pointer-events-auto"
                                    style={{
                                        transform: `rotate(${angle}deg) translate(var(--wheel-radius))`,
                                    }}
                                >
                                    <div
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Calculate the nearest target index to minimize rotation
                                            const diff = effectiveIndex - activeIndex;
                                            setActiveIndex(activeIndex + diff);
                                        }}
                                    >
                                        {/* Counter-rotate icon to keep it upright relative to screen */}
                                        <motion.div
                                            className={`rounded-full flex items-center justify-center border-4 transition-all duration-300 relative ${isActive
                                                ? `w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ${step.color} shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-110 sm:scale-125 z-30`
                                                : 'w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-white/10 text-gray-500 hover:border-white/30 grayscale bg-gray-900 z-10'
                                                }`}
                                            // We need to counter-rotate by the TOTAL rotation (container + item)
                                            // Container is at: -90 - (activeIndex * spacing)
                                            // Item is at: angle = effectiveIndex * spacing
                                            // Total angle = -90 - (activeIndex * spacing) + (effectiveIndex * spacing)
                                            //             = -90 + (effectiveIndex - activeIndex) * spacing
                                            // So we rotate by NEGATIVE of that.
                                            animate={{ rotate: -(-90 + (effectiveIndex - activeIndex) * spacing) }}
                                            transition={reduceMotion ? { duration: 0.3 } : {
                                                type: "tween",
                                                duration: 0.3,
                                                ease: [0.25, 0.1, 0.25, 1]
                                            }}
                                        >
                                            {React.cloneElement(step.icon, { size: isActive ? 24 : 20, className: 'sm:w-5 sm:h-5 md:w-6 md:h-6' })}
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* CSS Variables for Radius */}
                <style>{`
                    :root {
                        --wheel-radius: 140px;
                    }
                    @media (min-width: 640px) {
                        :root {
                            --wheel-radius: 160px;
                        }
                    }
                    @media (min-width: 768px) {
                        :root {
                            --wheel-radius: 300px;
                        }
                    }
                `}</style>
            </div>
        </section>
    );
};

export default Process;
