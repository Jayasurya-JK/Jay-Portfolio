import React, { useState, useEffect } from 'react';
import { Globe, Image, Server, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import { shouldReduceMotion } from '../utils/deviceDetection';

const Services = () => {
    const reduceMotion = shouldReduceMotion();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    const services = [
        {
            icon: <Globe size={32} className="text-accent" />,
            title: "Business Websites & Landing Pages",
            description: "High-converting landing pages, e-commerce stores, and portfolios designed for lead generation. Fully optimized for SEO, mobile capability, and premium performance.",
            points: [
                "Landing Pages, Portfolios & Funnels",
                "E-commerce stores & Lead Generation",
                "SEO-friendly & Mobile-optimized",
                "GSC Indexing & Analytics Setup"
            ]
        },
        {
            icon: <Image size={32} className="text-accent" />,
            title: "Product Catalogs, Logos & Socials",
            description: "Market-ready product catalogs that sell, high-converting Instagram creatives, and professional logo designs. Assets that work for your business.",
            points: [
                "Market-ready Catalogues (Print/Digital)",
                "High-converting Instagram Posts",
                "Logo Design & Brand Identity",
                "Premium Layouts that Sell"
            ]
        },
        {
            icon: <Server size={32} className="text-accent" />,
            title: "Premium Hosting & Growth Support",
            description: "Complete technical management including lightning-fast hosting, 24/7 security monitoring, and strategic SEO updates to keep you growing.",
            points: [
                "High-Speed Secure Hosting",
                "Technical SEO & Performance Tuning",
                "Google Business Growth Strategy",
                "Priority Support & Maintenance"
            ]
        }
    ];

    // Auto-play functionality
    useEffect(() => {
        if (isPaused || reduceMotion) return;

        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % services.length);
        }, 4000); // Change card every 4 seconds

        return () => clearInterval(interval);
    }, [isPaused, services.length, reduceMotion]);

    const navigate = (newDirection) => {
        setDirection(newDirection);
        if (newDirection === 1) {
            setCurrentIndex((prev) => (prev + 1) % services.length);
        } else {
            setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
        }
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,  // Reduced from 200
            opacity: 0,
            scale: 0.98  // Less dramatic scale change
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? -100 : 100,  // Reduced from 200
            opacity: 0,
            scale: 0.98
        })
    };

    return (
        <section id="services" className="py-12 md:py-20 bg-secondary/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="mb-2 md:mb-16 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-4 mx-auto md:mx-0">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-accent text-xs font-bold uppercase tracking-widest">My Expertise</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            What I can <span className="text-accent">do for you</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto md:mx-0 text-lg leading-relaxed">
                            Simple, focused services that give your business a <span className="text-white font-medium">real online presence</span>.
                        </p>
                    </div>
                </Reveal>

                {/* Desktop: Grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: reduceMotion ? 30 : 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ 
                                duration: reduceMotion ? 0.4 : 0.5, 
                                delay: index * 0.1, 
                                ease: [0.43, 0.13, 0.23, 0.96]
                            }}
                            className="bg-secondary border border-white/5 rounded-2xl p-8 hover:border-accent/30 transition-all hover:-translate-y-1 duration-300 flex flex-col h-full"
                        >
                            <div className="bg-primary/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/5">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                                {service.description}
                            </p>
                            <ul className="space-y-3 mt-auto">
                                {service.points.map((point, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ 
                                            duration: 0.6,
                                            delay: index * 0.1 + idx * 0.15,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }}
                                        className="flex items-start gap-3 text-sm text-gray-300"
                                    >
                                        <Check size={16} className="text-success mt-1 flex-shrink-0" />
                                        <span>{point}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: Auto-playing Horizontal Carousel */}
                <div className="md:hidden">
                    <div
                        className="relative perspective-1000"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >
                        {/* Card Container */}
                        <div className="relative h-[500px] flex items-center justify-center mb-2">
                            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={reduceMotion ? {} : slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "tween", duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                                        opacity: { duration: 0.2 },
                                        scale: { duration: 0.2 }
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = Math.abs(offset.x) * velocity.x;
                                        if (swipe < -5000) {  // Reduced from -10000
                                            navigate(1);
                                        } else if (swipe > 5000) {  // Reduced from 10000
                                            navigate(-1);
                                        }
                                    }}
                                    className="absolute w-full bg-secondary/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl carousel-card-mobile"
                                >
                                    {/* Card number badge - Forced Position */}
                                    <div
                                        className="absolute w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center font-bold text-sm z-50"
                                        style={{ top: '24px', right: '24px' }}
                                    >
                                        {currentIndex + 1}
                                    </div>
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="bg-primary/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border border-white/10">
                                            {services[currentIndex].icon}
                                        </div>



                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {services[currentIndex].title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 mb-5 text-sm leading-relaxed">
                                            {services[currentIndex].description}
                                        </p>

                                        {/* Points */}
                                        <ul className="space-y-3">
                                            {services[currentIndex].points.map((point, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ 
                                                        delay: idx * 0.15,
                                                        duration: 0.6,
                                                        ease: [0.25, 0.46, 0.45, 0.94]
                                                    }}
                                                    className="flex items-start gap-3 text-sm text-gray-300"
                                                >
                                                    <Check size={16} className="text-success mt-1 flex-shrink-0" />
                                                    <span>{point}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>




                                </motion.div>
                            </AnimatePresence>
                        </div>



                        {/* Progress Dots */}
                        <div className="flex justify-center gap-2">
                            {services.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={`
                                        h-2 rounded-full transition-all duration-300
                                        ${currentIndex === index
                                            ? 'w-8 bg-accent'
                                            : 'w-2 bg-white/30 hover:bg-white/50'
                                        }
                                    `}
                                    aria-label={`Go to service ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Auto-play indicator */}
                        {!isPaused && !reduceMotion && (
                            <p className="text-center text-xs text-gray-500 mt-8">
                                Swipe to navigate • Auto-playing
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
