import React, { useEffect, useRef, useState } from 'react';
import { Wallet, Search, Target, LifeBuoy } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Reveal from './Reveal';

const USP = () => {
    const usps = [
        {
            icon: <Wallet size={28} className="text-accent" />,
            title: "Affordable but premium",
            text: "I keep pricing friendly for small businesses while delivering a premium look and feel.",
            gradient: "from-green-500/20 to-emerald-500/5"
        },
        {
            icon: <Search size={28} className="text-accent" />,
            title: "SEO & Google-ready",
            text: "Your website is set up for indexing, basic SEO, and Google Business integration.",
            gradient: "from-blue-500/20 to-cyan-500/5"
        },
        {
            icon: <Target size={28} className="text-accent" />,
            title: "Lead-focused",
            text: "I care about your enquiries and leads, not just nice-looking screens.",
            gradient: "from-purple-500/20 to-pink-500/5"
        },
        {
            icon: <LifeBuoy size={28} className="text-accent" />,
            title: "End-to-end support",
            text: "From hosting to small updates, I make it easy for non-technical business owners.",
            gradient: "from-orange-500/20 to-red-500/5"
        }
    ];

    const [autoplayIndex, setAutoplayIndex] = useState(0);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.3 });

    // Auto-play effect for mobile - only when in view
    useEffect(() => {
        if (!isInView) return;
        
        const interval = setInterval(() => {
            setAutoplayIndex((prev) => (prev + 1) % usps.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [isInView, usps.length]);

    return (
        <section ref={containerRef} className="py-12 md:py-16 relative overflow-hidden">
            {/* Animated background gradient */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-accent/5 via-purple-500/5 to-transparent"
                animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ 
                    duration: 10, 
                    repeat: Infinity,
                    ease: "linear"
                }}
            ></motion.div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Reveal>
                    <div className="mb-10 md:mb-12 text-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
                            Why clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">love</span> working with me
                        </h2>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            Real value, real results, real partnership
                        </p>
                    </div>
                </Reveal>

                {/* Desktop: Grid with Hover Effects | Mobile: Auto-playing Cards */}
                <div className="relative">
                    {/* Mobile: Stacked cards with auto-highlight */}
                    <div className="md:hidden space-y-4">
                        {usps.map((usp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                <motion.div
                                    animate={{
                                        scale: autoplayIndex === index ? 1.02 : 1,
                                        y: autoplayIndex === index ? -4 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`relative rounded-2xl overflow-hidden ${
                                        autoplayIndex === index ? 'shadow-2xl shadow-accent/20' : ''
                                    }`}
                                >
                                    {/* Animated glow for active card */}
                                    <motion.div 
                                        className={`absolute inset-0 bg-gradient-to-br ${usp.gradient}`}
                                        animate={{
                                            opacity: autoplayIndex === index ? 0.8 : 0.3,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    ></motion.div>
                                    
                                    {/* Active indicator */}
                                    <motion.div 
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                                        animate={{
                                            scaleY: autoplayIndex === index ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    ></motion.div>

                                    <div className="relative bg-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-start gap-4">
                                            <motion.div 
                                                className="bg-primary/80 rounded-xl p-3 flex-shrink-0 shadow-lg"
                                                animate={{
                                                    rotate: autoplayIndex === index ? [0, -10, 10, 0] : 0,
                                                }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {usp.icon}
                                            </motion.div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-white mb-2">{usp.title}</h3>
                                                <p className="text-sm text-gray-400 leading-relaxed">
                                                    {usp.text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop: Grid with Hover */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {usps.map((usp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative"
                            >
                                <div className="relative rounded-2xl overflow-hidden h-full">
                                    {/* Gradient background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${usp.gradient} opacity-30 group-hover:opacity-80 transition-opacity duration-500`}></div>
                                    
                                    <div className="relative bg-secondary/50 backdrop-blur-sm border border-white/10 group-hover:border-accent/30 rounded-2xl p-6 h-full transition-all duration-300">
                                        <div className="mb-4 bg-primary/80 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-accent/20 group-hover:scale-110 transition-all duration-300">
                                            {usp.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-accent transition-colors">{usp.title}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {usp.text}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile progress indicator */}
                    <div className="flex md:hidden justify-center gap-2 mt-6" role="tablist" aria-label="USP navigation">
                        {usps.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setAutoplayIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                role="tab"
                                aria-selected={autoplayIndex === index}
                                className={`h-2 rounded-full transition-all ${
                                    autoplayIndex === index 
                                        ? 'w-8 bg-accent' 
                                        : 'w-2 bg-white/20'
                                }`}
                                animate={{
                                    scale: autoplayIndex === index ? 1.2 : 1,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default USP;
