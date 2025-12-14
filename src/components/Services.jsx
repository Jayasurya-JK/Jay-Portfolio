import React, { useRef, useEffect, useState } from 'react';
import { Globe, Image, Server, Check } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
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

    // Update active card based on scroll position
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            const cardIndex = Math.min(Math.floor(latest * services.length * 1.5), services.length - 1);
            setActiveCard(Math.max(0, cardIndex));
        });

        return () => unsubscribe();
    }, [scrollYProgress, services.length]);

    return (
        <section 
            id="services" 
            ref={containerRef}
            className="relative py-20 md:py-32 bg-gradient-to-b from-secondary/30 via-primary to-secondary/50 overflow-hidden"
            style={{ minHeight: isMobile ? 'auto' : '300vh' }}
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
                        What I can do for you
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Simple, focused services that give your business a real online presence.
                    </p>
                </motion.div>
            </div>

            {/* Stacked Cards Container */}
            <div className={`${isMobile ? 'relative' : 'sticky top-20'} max-w-5xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className="relative" style={{ perspective: isMobile ? 'none' : '2000px' }}>
                    {services.map((service, index) => (
                        <StackedCard
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

                {/* Progress Indicator */}
                {!isMobile && (
                    <div className="flex justify-center gap-3 mt-8">
                        {services.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${
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
                    className={`absolute top-1/4 -right-20 w-96 h-96 ${services[activeCard]?.orbColor} rounded-full blur-3xl`}
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
                    className={`absolute bottom-1/4 -left-20 w-96 h-96 ${services[activeCard]?.orbColor} rounded-full blur-3xl`}
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

const StackedCard = ({ service, index, activeCard, totalCards, isMobile, reduceMotion }) => {
    const Icon = service.icon;
    const isActive = index === activeCard;
    const isPast = index < activeCard;

    // Calculate transform values based on card position
    const getTransform = () => {
        if (isMobile) {
            // Mobile: Simple stack without scroll animation
            return {
                scale: 1,
                y: 0,
                rotateX: 0,
                opacity: 1,
                zIndex: index,
            };
        }

        if (isPast) {
            // Cards that have been scrolled past
            return {
                scale: 1.05,
                y: -100,
                rotateX: 10,
                opacity: 0,
                zIndex: index,
            };
        }

        if (isActive) {
            // Active card in front
            return {
                scale: 1,
                y: 0,
                rotateX: 0,
                opacity: 1,
                zIndex: totalCards + index,
            };
        }

        // Future cards stacked behind
        const offset = index - activeCard;
        return {
            scale: 1 - (offset * 0.05),
            y: offset * (isMobile ? 20 : 40),
            rotateX: 0,
            opacity: 1 - (offset * 0.2),
            zIndex: totalCards - offset,
        };
    };

    const transform = getTransform();
    const springConfig = { stiffness: 300, damping: 30 };

    return (
        <motion.div
            className={`${isMobile ? 'mb-6' : 'absolute inset-0'} will-change-transform`}
            initial={false}
            animate={reduceMotion ? { ...transform, scale: 1, rotateX: 0 } : transform}
            transition={{
                type: "spring",
                ...springConfig,
            }}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            <div 
                className={`relative backdrop-blur-xl bg-gradient-to-br ${service.gradient} border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden`}
                style={{
                    background: `linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(26, 26, 46, 0.7) 100%)`,
                }}
            >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                
                {/* Animated border glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-20 blur-xl`} />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon with orbital ring */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8">
                        <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 backdrop-blur-sm"
                            animate={reduceMotion ? {} : {
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        <motion.div
                            className="absolute inset-2 rounded-xl bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center"
                            animate={reduceMotion ? {} : {
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
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
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
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

                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            </div>
        </motion.div>
    );
};

export default Services;
