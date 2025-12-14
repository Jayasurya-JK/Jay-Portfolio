import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles, Target, Zap, TrendingUp } from 'lucide-react';
import { projects } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileDevice, shouldReduceMotion } from '../utils/deviceDetection';

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
        offset: ["start end", "end start"]
    });

    // Disable heavy scroll animations when motion should be reduced
    const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.8, 1, 0.8]);

    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

    useEffect(() => {
        // Disable heavy GSAP animations on mobile
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            // Parallax effect for images - desktop only
            if (!isMobile) {
                gsap.to(imageRef.current, {
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
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
                stagger: isMobile ? 0.08 : 0.15,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isMobile, reduceMotion]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity }}
            className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden"
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
            {/* Ambient Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 blur-3xl`}></div>

            <div className={`max-w-7xl w-full mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 lg:gap-20 items-center relative z-10`}>

                {/* Visual Section with 3D Depth */}
                <motion.div
                    style={reduceMotion ? {} : { y: smoothY, scale: smoothScale }}
                    className="flex-1 relative group"
                >
                    {/* Floating Index Number */}
                    <div className="absolute -top-6 -left-4 md:-top-10 md:-left-10 text-[60px] md:text-[120px] lg:text-[200px] font-black text-white/5 select-none pointer-events-none z-0">
                        {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Main Visual Container */}
                    <div className="relative">
                        {/* Glow Effect */}
                        <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-3xl`}></div>

                        {/* Device Mockup Container */}
                        <div className="relative" ref={imageRef}>
                            {project.desktopImage && (
                                <motion.div
                                    initial={isMobile ? {} : { rotateY: -15, rotateX: 5 }}
                                    whileHover={isMobile ? {} : { rotateY: 0, rotateX: 0, scale: 1.02 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
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
                                            <div className="flex-1 bg-gray-700/50 rounded-md px-3 py-1 text-xs text-gray-400 ml-4">
                                                {project.link !== '#' ? new URL(project.link).hostname : 'project-demo.com'}
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
                                    transition={{ duration: 0.6 }}
                                    className={`absolute ${project.desktopImage ? '-bottom-6 -right-4 sm:-bottom-10 sm:-right-10 md:-bottom-16 md:-right-20' : 'top-0 left-1/2 -translate-x-1/2'} z-20`}
                                >
                                    <div className="relative">
                                        {/* Phone Frame */}
                                        <div className="w-32 sm:w-40 md:w-48 lg:w-56 bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-1.5 md:p-2 shadow-2xl border-2 md:border-4 border-gray-800">
                                            <div className="w-full bg-gray-800 rounded-[1.75rem] md:rounded-[2rem] overflow-hidden relative">
                                                {/* Notch */}
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 md:h-6 bg-gray-900 rounded-b-2xl z-10"></div>
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
                                className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl"
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

                    {/* Challenge, Solution, Impact Grid */}
                    <div className="reveal-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                        <div className="group/card bg-gradient-to-br from-red-500/10 to-transparent p-4 md:p-6 rounded-xl md:rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all">
                            <Target className="w-6 h-6 md:w-8 md:h-8 text-red-400 mb-2 md:mb-3" />
                            <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1 md:mb-2">Challenge</h4>
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                                {project.details?.challenge?.substring(0, 80) || "Complex market positioning"}...
                            </p>
                        </div>
                        <div className="group/card bg-gradient-to-br from-blue-500/10 to-transparent p-4 md:p-6 rounded-xl md:rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all">
                            <Zap className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-2 md:mb-3" />
                            <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1 md:mb-2">Solution</h4>
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                                {project.details?.solution?.substring(0, 80) || "Custom interactive features"}...
                            </p>
                        </div>
                        <div className="group/card bg-gradient-to-br from-green-500/10 to-transparent p-4 md:p-6 rounded-xl md:rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all sm:col-span-2 md:col-span-1">
                            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-400 mb-2 md:mb-3" />
                            <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1 md:mb-2">Impact</h4>
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                                Enhanced user engagement and conversions
                            </p>
                        </div>
                    </div>

                    {/* Tech Tags */}
                    <div className="reveal-item flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/30 rounded-xl text-sm text-gray-300 font-medium transition-all cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

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
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-b from-primary via-primary to-secondary">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            {/* Section Header */}
            <div className="section-title max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12 md:mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
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

            {/* Coming Soon Teaser */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto mt-20 px-4"
            >
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-500/20 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-secondary/80 to-primary/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                        <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            More Coming Soon
                        </h3>
                        <p className="text-gray-300 text-lg">
                            Ready-made website templates for CAs, lawyers, clinics, gyms, real estate promoters, and more.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default FeaturedWorkNew;
