import React, { useRef, useEffect, useState } from 'react';
import { Globe, Image, Server, Check } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { shouldReduceMotion, isMobileDevice } from '../utils/deviceDetection';

const Services = () => {
    const containerRef = useRef(null);
    const reduceMotion = shouldReduceMotion();
    const isMobile = isMobileDevice();
    const [activeCard, setActiveCard] = useState(0);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const services = [
        {
            icon: Globe,
            title: "Business Websites & Landing Pages",
            description: "Modern, mobile-friendly websites for real estate promoters, clinics, gyms, CAs, lawyers, influencers, and other small businesses.",
            points: [
                "SEO-ready structure and clean content",
                "Fast loading and mobile responsive",
                "WhatsApp and lead capture forms",
                "Google Search Console and indexing setup"
            ],
            gradient: "from-accent/20 via-green-500/10 to-transparent",
            accentColor: "accent",
            orbColor: "bg-accent/20"
        },
        {
            icon: Image,
            title: "Product Catalogs & Instagram Creatives",
            description: "High-quality digital catalogs and social media creatives that make your brand and products look professional.",
            points: [
                "Product catalog design (like Gokul Oils)",
                "Instagram post & story designs",
                "Clean layout and premium feel",
                "Ready for print or digital use"
            ],
            gradient: "from-blue-500/20 via-blue-400/10 to-transparent",
            accentColor: "blue-400",
            orbColor: "bg-blue-500/20"
        },
        {
            icon: Server,
            title: "Hosting, SEO & Ongoing Support",
            description: "I can host, monitor, and maintain your website, so you don't need to worry about the technical side.",
            points: [
                "Premium hosting (starting from ₹99/month)",
                "Basic SEO and on-page improvements",
                "Google Business Profile support",
                "Small monthly updates and tweaks"
            ],
            gradient: "from-purple-500/20 via-purple-400/10 to-transparent",
            accentColor: "purple-400",
            orbColor: "bg-purple-500/20"
        }
    ];

    // Update active card based on scroll position with smoother transitions
    useEffect(() => {
        const totalCards = services.length;
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            // More granular control - each card gets equal scroll space
            const cardIndex = Math.min(Math.floor(latest * (totalCards + 0.5) * 1.2), totalCards - 1);
            setActiveCard(Math.max(0, cardIndex));
        });

        return () => unsubscribe();
    }, [scrollYProgress, services.length]);

    return (
        <section 
            id="services" 
            ref={containerRef}
            className="relative py-20 md:py-32 bg-gradient-to-b from-secondary/30 via-primary to-secondary/50 overflow-hidden"
            style={{ minHeight: isMobile ? 'auto' : '400vh' }}
        >
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        What Will I Do For You
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Simple, focused services that give your business a real online presence.
                    </p>
                </motion.div>
            </div>

            {/* Apple-Style Stacked Cards Container */}
            <div className={`${isMobile ? 'relative' : 'sticky top-20'} max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div 
                    className="relative min-h-[600px]" 
                    style={{ perspective: isMobile ? 'none' : '2500px' }}
                >
                    {services.map((service, index) => (
                        <AppleStackedCard
                            key={index}
                            service={service}
                            index={index}
                            activeCard={activeCard}
                            totalCards={services.length}
                            isMobile={isMobile}
                            reduceMotion={reduceMotion}
                        />
                    ))}
                </div>

                {/* Progress Indicator - Desktop */}
                {!isMobile && (
                    <div className="flex justify-center gap-3 mt-8">
                        {services.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    index === activeCard 
                                        ? 'w-12 bg-accent' 
                                        : 'w-2 bg-white/30'
                                }`}
                                animate={{
                                    scale: index === activeCard ? 1.2 : 1,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Background Gradient Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className={`absolute top-1/4 -right-20 w-96 h-96 ${services[activeCard]?.orbColor || 'bg-accent/20'} rounded-full blur-3xl`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className={`absolute bottom-1/4 -left-20 w-96 h-96 ${services[activeCard]?.orbColor || 'bg-accent/20'} rounded-full blur-3xl`}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </section>
    );
};

const AppleStackedCard = ({ service, index, activeCard, totalCards, isMobile, reduceMotion }) => {
    const Icon = service.icon;
    const isActive = index === activeCard;
    const isPast = index < activeCard;
    const isFuture = index > activeCard;

    // Apple-style 3D transform calculations
    const getTransform = () => {
        if (isMobile) {
            // Mobile: Simple vertical stack
            return {
                scale: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                z: 0,
                opacity: 1,
                zIndex: index,
            };
        }

        if (isPast) {
            // Cards that have been scrolled past - fly up and away
            return {
                scale: 0.9,
                y: -150,
                rotateX: -15,
                rotateY: 5,
                z: -200,
                opacity: 0,
                zIndex: index,
            };
        }

        if (isActive) {
            // Active card - center stage, full visibility
            return {
                scale: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                z: 0,
                opacity: 1,
                zIndex: totalCards + 10,
            };
        }

        // Future cards - stacked behind with 3D depth
        const offset = index - activeCard;
        const stackSpacing = 30;
        const scaleDecrement = 0.05;
        const rotationY = 3; // Slight angle for depth
        
        return {
            scale: Math.max(0.8, 1 - (offset * scaleDecrement)),
            y: offset * stackSpacing,
            rotateX: offset * 2,
            rotateY: -rotationY * offset,
            z: -100 * offset,
            opacity: Math.max(0.3, 1 - (offset * 0.15)),
            zIndex: totalCards - offset,
        };
    };

    const transform = getTransform();

    return (
        <motion.div
            className={`${isMobile ? 'mb-6' : 'absolute inset-0'} will-change-transform`}
            initial={false}
            animate={reduceMotion ? { 
                ...transform, 
                scale: 1, 
                rotateX: 0, 
                rotateY: 0,
                z: 0 
            } : {
                scale: transform.scale,
                y: transform.y,
                rotateX: transform.rotateX,
                rotateY: transform.rotateY,
                opacity: transform.opacity,
                zIndex: transform.zIndex,
            }}
            style={{
                transformStyle: 'preserve-3d',
                ...(isMobile ? {} : {
                    translateZ: transform.z,
                }),
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 35,
                mass: 0.8,
            }}
        >
            <div 
                className="relative backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.85) 100%)`,
                    boxShadow: isActive 
                        ? '0 30px 90px -20px rgba(0, 0, 0, 0.6), 0 0 80px -10px rgba(0, 255, 135, 0.1)' 
                        : '0 10px 40px -10px rgba(0, 0, 0, 0.4)',
                    transform: isMobile ? 'none' : `translateZ(${transform.z}px)`,
                }}
            >
                {/* Enhanced glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent pointer-events-none" />
                
                {/* Animated border glow - stronger on active card */}
                <div 
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} blur-xl transition-opacity duration-500`}
                    style={{ opacity: isActive ? 0.4 : 0.2 }}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon with enhanced 3D effect */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8">
                        <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 backdrop-blur-sm"
                            animate={reduceMotion ? {} : {
                                rotate: isActive ? [0, 360] : 0,
                            }}
                            transition={{
                                duration: 20,
                                repeat: isActive ? Infinity : 0,
                                ease: "linear"
                            }}
                            style={{
                                boxShadow: isActive ? '0 10px 40px -10px rgba(0, 255, 135, 0.3)' : 'none',
                            }}
                        />
                        <motion.div
                            className="absolute inset-2 rounded-xl bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center"
                            animate={reduceMotion ? {} : {
                                scale: isActive ? [1, 1.05, 1] : 1,
                            }}
                            transition={{
                                duration: 2,
                                repeat: isActive ? Infinity : 0,
                                ease: "easeInOut"
                            }}
                        >
                            <Icon size={isMobile ? 32 : 40} className="text-accent" />
                        </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                        {service.description}
                    </p>

                    {/* Feature Points */}
                    <ul className="space-y-3 md:space-y-4">
                        {service.points.map((point, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ 
                                    opacity: isActive ? 1 : 0.7, 
                                    x: 0 
                                }}
                                transition={{ 
                                    delay: isActive ? idx * 0.1 : 0,
                                    duration: 0.3,
                                }}
                                className="flex items-start gap-3"
                            >
                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                                    <Check size={14} className="text-success" />
                                </div>
                                <span className="text-gray-200 text-sm md:text-base">{point}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Decorative corner gradient - enhanced on active */}
                <div 
                    className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
                    style={{ opacity: isActive ? 0.3 : 0.15 }}
                />
            </div>
        </motion.div>
    );
};

export default Services;
