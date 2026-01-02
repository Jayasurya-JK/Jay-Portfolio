import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { projects } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice, shouldReduceMotion } from '../utils/deviceDetection';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = ({ project, index }) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = isMobileDevice();
    const reduceMotion = shouldReduceMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    // Desktop: Use Framer Motion transforms (works well with Lenis)
    const scaleTransform = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.8, 1]);

    // Mobile: Use optimized scroll hook
    const { scrollProgress: mobileScrollProgress, isInView } = useOptimizedScroll(containerRef);

    // Calculate mobile values from scroll progress
    const mobileScale = isMobile ? 0.8 + (mobileScrollProgress * 0.2) : 1;
    const mobileOpacity = isMobile ? 0.5 + (mobileScrollProgress * 0.5) : 1;

    // Final values: desktop uses Framer Motion, mobile uses optimized hook
    const scale = reduceMotion ? 1 : (isMobile ? mobileScale : scaleTransform);
    const opacity = reduceMotion ? 1 : (isMobile ? mobileOpacity : opacityTransform);



    useEffect(() => {
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            // Parallax effect for images
            if (!isMobile) {
                // Desktop: Full GSAP parallax with scrub
                gsap.to(imageRef.current, {
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5
                    }
                });
            } else {
                // Mobile: Lightweight parallax using translate3d (GPU-accelerated)
                gsap.to(imageRef.current, {
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1, // Slower scrub for mobile (less aggressive)
                    }
                });
            }

            // Stagger animation for content
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(contentRef.current.querySelectorAll('.reveal-item'), {
                y: isMobile ? 30 : 60,
                opacity: 0,
                duration: isMobile ? 0.5 : 0.8,
                stagger: isMobile ? 0.08 : 0.12,
                ease: "power2.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isMobile, reduceMotion]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={containerRef}
            style={{
                scale: scale,
                opacity: opacity,
                willChange: isMobile ? 'transform, opacity' : 'auto'
            }}
            className={`relative sticky top-0 min-h-screen md:h-screen flex items-center justify-center py-4 md:py-20 px-4 sm:px-6 md:px-8 ${isMobile && isInView ? 'mobile-in-view' : ''}`}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
            {/* Ambient Background Glow - Static on mobile for performance */}
            <div 
                className={`absolute inset-0 bg-gradient-to-br ${project.color} ${isMobile ? 'opacity-5' : 'opacity-10'} blur-3xl pointer-events-none`} 
                style={{ 
                    transform: 'translateZ(0)',
                    willChange: isMobile ? 'auto' : 'opacity'
                }}
            ></div>



            <div className={`max-w-7xl w-full mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 lg:gap-28 items-center relative z-10`}>

                {/* Visual Section with 3D Depth */}
                <motion.div
                    className="flex-1 relative group z-20"
                >
                    {/* Floating Index Number */}
                    <div className="absolute -top-20 left-0 md:-top-16 md:left-0 text-[60px] md:text-[120px] lg:text-[200px] font-black text-white/20 select-none pointer-events-none z-10">
                        {String(index + 1).padStart(2, '0')}
                    </div>


                    {/* Main Visual Container */}
                    <div className="relative">
                        {/* Glow Effect */}
                        <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-3xl pointer-events-none`} style={{ transform: 'translateZ(0)' }}></div>

                        {/* Device Mockup Container */}
                        <div className="relative" ref={imageRef} style={{ transform: 'translateZ(0)' }}>
                            {project.desktopImage && (
                                <motion.div
                                    initial={isMobile ? {} : { rotateY: -15, rotateX: 5 }}
                                    whileHover={isMobile ? {} : { rotateY: 0, rotateX: 0, scale: 1.02 }}
                                    transition={{ 
                                        duration: 0.5, 
                                        ease: [0.43, 0.13, 0.23, 0.96]
                                    }}
                                    className="relative perspective-1000"
                                >
                                    {/* Desktop Browser Chrome */}
                                    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl p-3 border border-gray-700 shadow-2xl">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            </div>
                                            {/* Browser Address Bar */}
                                            <div className="ml-4 bg-[#1a1a1a] rounded-full px-4 py-0.5 md:py-1 text-[8px] md:text-[10px] text-gray-500 flex-1 text-center font-mono">
                                                {project.domain || "project-demo.com"}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Desktop Image */}
                                    <div className="overflow-hidden rounded-b-2xl shadow-2xl border-x border-b border-gray-700">
                                        <img
                                            src={project.desktopImage}
                                            alt={`${project.title} Desktop`}
                                            className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Mobile Mockup - Floating */}
                            {project.mobileImage && (
                                <motion.div
                                    initial={isMobile ? {} : { y: 20 }}
                                    animate={isMobile ? {} : { y: isHovered ? 0 : 20 }}
                                    transition={{ 
                                        duration: 0.5,
                                        ease: [0.43, 0.13, 0.23, 0.96]
                                    }}
                                    className={`absolute ${project.desktopImage ? '-bottom-6 -right-4 sm:-bottom-10 sm:-right-10 md:-bottom-16 md:-right-20' : 'top-0 left-1/2 -translate-x-1/2'} z-20`}
                                >
                                    <div className="relative">
                                        {/* Phone Frame */}
                                        <div className="w-32 sm:w-40 md:w-48 lg:w-56 bg-gray-900 rounded-[1rem] md:rounded-[2rem] p-1.5 md:p-2 shadow-2xl border-[4px] md:border-4 border-gray-800">
                                            <div className="w-full bg-gray-800 rounded-[0.85rem] md:rounded-[1.8rem] overflow-hidden relative">
                                                {/* Screen */}
                                                <img
                                                    src={project.mobileImage}
                                                    alt={`${project.title} Mobile`}
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        </div>
                                        {/* Floating Shadow */}
                                        <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 md:h-8 bg-black/30 blur-xl rounded-full"></div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Decorative Elements - Disabled on mobile for performance */}
                        {!isMobile && (
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl pointer-events-none"
                                style={{ transform: 'translateZ(0)' }}
                            ></motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Content Section - Story Driven */}
                <div ref={contentRef} className="flex-1 space-y-4 md:space-y-6 lg:space-y-8 w-full">
                    {/* Logo & Title */}
                    <div className="reveal-item">
                        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-2 md:p-3 flex items-center justify-center overflow-hidden flex-shrink-0">
                                <img src={project.logo} alt={`${project.title} Logo`} className="w-full h-full object-contain" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight break-words">
                                    {project.title}
                                </h3>
                                <p className="text-accent text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider mt-1">
                                    {project.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Role Badge */}
                    <div className="reveal-item">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 rounded-full">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-white text-sm font-medium">{project.role}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="reveal-item text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed">
                        {project.description}
                    </p>



                    {/* CTA Buttons - Mobile optimized */}
                    <div className="reveal-item flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
                        <Link
                            to={`/project/${project.id}`}
                            className="group/btn relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-gradient-to-r from-accent to-accent/80 text-primary font-bold text-sm sm:text-base rounded-2xl overflow-hidden shadow-lg shadow-accent/20 hover:shadow-2xl hover:shadow-accent/40 transition-all w-full sm:w-auto"
                        >
                            <span className="relative z-10">View Case Study</span>
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                        </Link>
                        {project.link !== '#' && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-2xl text-white font-semibold text-sm sm:text-base transition-all w-full sm:w-auto"
                            >
                                <span>Live Site</span>
                                <ExternalLink className="w-5 h-5 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const FeaturedWorkNew = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.section-title', {
                scrollTrigger: {
                    trigger: '.section-title',
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={sectionRef} className="relative pt-20 pb-10 overflow-hidden bg-gradient-to-b from-primary via-primary to-secondary">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                    transform: 'translateZ(0)'
                }}></div>
            </div>

            {/* Section Header */}
            <div className="section-title max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-2 md:mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                        duration: 0.5,
                        ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    className="text-center space-y-3 md:space-y-4"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white">
                        Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">Works</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto px-4">
                        Real projects. Real impact. Real results.
                    </p>
                </motion.div>
            </div>

            {/* Projects Showcase */}
            <div className="relative">
                {projects.map((project, index) => (
                    <ProjectShowcase key={project.id} project={project} index={index} />
                ))}
            </div>


        </section>
    );
};

export default FeaturedWorkNew;
