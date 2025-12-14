import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight, Zap, Shield, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Typewriter from 'typewriter-effect';

const Hero = () => {
    const [init, setInit] = useState(false);

    // Initialize particles once
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // Particles config
    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: { // Enuearth style: connected lines
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 130, // Reduced distance for less calculations
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 2, // Slightly smoother speed
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 40, // Reduced count (Optimization)
                },
                opacity: {
                    value: 0.6,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 2, max: 4 },
                },
            },
            detectRetina: true,
            fullScreen: { enable: false }, // Contained in section
        }),
        [],
    );

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-col relative overflow-hidden">

            {/* Particles Background - Absolute Positioned */}
            {init && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Particles
                        id="tsparticles"
                        particlesLoaded={particlesLoaded}
                        options={options}
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* Ambient Background Glow (Subtler now with particles) */}
            <div className="absolute top-[-10%] right-[-5%] -z-10 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] -z-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] opacity-20"></div>

            {/* Center Content */}
            <div className="flex-1 text-center z-10 max-w-4xl mx-auto">
                <Reveal width="100%">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-secondary/80 border border-white/5 text-accent text-sm font-medium mb-6 backdrop-blur-md shadow-sm">
                        Hi, I’m Jay 👋
                    </span>
                </Reveal>

                <Reveal width="100%" delay={0.35}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8 tracking-tight max-w-5xl mx-auto flex flex-col items-center justify-center gap-2 sm:gap-4 px-4">
                        <span className="text-center">I build affordable,</span>

                        {/* Typewriter Effect - Responsive Container */}
                        <div className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-200 min-h-[1.2em] w-full flex items-center justify-center px-2">
                            <Typewriter
                                options={{
                                    strings: ['SEO-ready websites', 'Modern Landing Pages', 'Digital Catalogs'],
                                    autoStart: true,
                                    loop: true,
                                    deleteSpeed: 50,
                                    delay: 60,
                                    wrapperClassName: "typewriter-wrapper leading-tight text-center",
                                    cursorClassName: "text-accent ml-1",
                                }}
                            />
                        </div>

                        <span className="text-center px-2">that help your business appear on Google.</span>
                    </h1>
                </Reveal>

                <Reveal width="100%" delay={0.45}>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light px-4">
                        I work with small businesses, professionals, and local brands to create modern websites, product catalogs, and landing pages that look premium and actually convert.
                    </p>
                </Reveal>

                <Reveal width="100%" delay={0.55}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://wa.me/your-number"
                            className="w-full sm:w-auto px-8 py-4 bg-success hover:bg-green-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 group relative z-20 cursor-pointer" // Added z-index and cursor
                        >
                            Let’s talk on WhatsApp <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        {/* Logo Marquee Section */}
                        <div className="relative flex flex-col items-center sm:items-start group">

                            {/* Decorative Arrow (Desktop: Points from Btn to Logos) */}
                            <div className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2 w-16 h-12 text-white/30 z-0 pointer-events-none">
                                <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rotate-12">
                                    <path d="M0 25 C 20 25, 50 25, 80 40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                                    <path d="M75 35 L 85 42 L 78 48" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                            </div>

                            <a
                                href="#work"
                                className="relative flex flex-col justify-center w-full sm:w-auto max-w-[300px] overflow-hidden py-2 px-4 group/marquee cursor-pointer"
                            >
                                <span className="text-xs text-muted/60 font-light uppercase tracking-widest mb-2 text-center sm:text-left pl-1">Trusted by 10+ Brands</span>

                                {/* Moving Marquee Track - Plain Text */}
                                <div className="flex gap-8 whitespace-nowrap animate-marquee items-center mask-image-linear-gradient">
                                    {[
                                        "Samsung", "OneCard", "Wondershare", "Google",
                                        "Spotify", "Amazon", "Netflix", "Adobe"
                                    ].map((brand, i) => (
                                        <span key={i} className="text-lg font-bold text-white/40 uppercase tracking-wider hover:text-white/80 transition-colors">
                                            {brand}
                                        </span>
                                    ))}
                                    {/* Duplicate for seamless loop */}
                                    {[
                                        "Samsung", "OneCard", "Wondershare", "Google",
                                        "Spotify", "Amazon", "Netflix", "Adobe"
                                    ].map((brand, i) => (
                                        <span key={`dup-${i}`} className="text-lg font-bold text-white/40 uppercase tracking-wider hover:text-white/80 transition-colors">
                                            {brand}
                                        </span>
                                    ))}
                                </div>
                            </a>
                        </div>
                    </div>
                </Reveal>

                <Reveal width="100%" delay={0.65}>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-gray-400">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-full bg-accent/10">
                                <Zap size={18} className="text-accent" />
                            </div>
                            <span>Websites + SEO</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-full bg-accent/10">
                                <Layout size={18} className="text-accent" />
                            </div>
                            <span>Product Catalogs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-full bg-accent/10">
                                <Shield size={18} className="text-accent" />
                            </div>
                            <span>Premium Support</span>
                        </div>
                    </div>
                </Reveal>
            </div>


        </section>
    );
};

export default Hero;
