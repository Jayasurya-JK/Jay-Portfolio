import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import Reveal from './Reveal';

const DeviceMockup = ({ type, src, alt }) => {
    if (type === 'mobile') {
        return (
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[6px] md:border-[8px] rounded-[2rem] md:rounded-[2.5rem] h-[220px] w-[120px] md:h-[300px] md:w-[160px] shadow-xl flex-shrink-0">
                <div className="w-[60px] md:w-[80px] h-[8px] md:h-[10px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[15px] md:h-[20px] w-[2px] bg-gray-800 absolute -left-[8px] md:-left-[10px] top-[50px] md:top-[70px] rounded-l-lg"></div>
                <div className="h-[15px] md:h-[20px] w-[2px] bg-gray-800 absolute -left-[8px] md:-left-[10px] top-[80px] md:top-[100px] rounded-l-lg"></div>
                <div className="h-[25px] md:h-[35px] w-[2px] bg-gray-800 absolute -right-[8px] md:-right-[10px] top-[60px] md:top-[80px] rounded-r-lg"></div>
                <div className="rounded-[1.5rem] md:rounded-[2rem] overflow-hidden w-full h-full bg-white">
                    <img src={src} alt={alt} className="w-full h-full object-cover" />
                </div>
            </div>
        );
    }
    return (
        <div className="relative mx-auto border-gray-800 bg-gray-800 border-[6px] md:border-[8px] rounded-t-xl h-[160px] w-[260px] sm:w-[320px] md:w-[380px] md:h-[200px] shadow-xl flex-shrink-0">
            <div className="rounded-lg overflow-hidden h-full w-full bg-white">
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-[16px] md:-bottom-[20px] left-1/2 -translate-x-1/2 w-[120%] h-[10px] md:h-[12px] bg-gray-700 rounded-b-xl shadow-lg flex justify-center">
                <div className="w-[15%] h-full bg-gray-600 rounded-b-xl"></div>
            </div>
        </div>
    );
};

const FeaturedWork = () => {
    return (
        <section id="work" className="py-12 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="mb-8 md:mb-16 flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Selected work</h2>
                            <p className="text-gray-400">
                                Real projects that drive business results.
                            </p>
                        </div>
                        {/* Mobile Swipe Hint */}
                        <div className="md:hidden text-accent text-sm font-medium animate-pulse flex items-center gap-2">
                            Swipe to explore <ArrowRight size={16} />
                        </div>
                    </div>
                </Reveal>

                {/* Mobile: Horizontal Scroll Snap | Desktop: Vertical Stack */}
                <div className="flex md:block overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:space-y-16 scrollbar-hide">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 75 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                            className="min-w-[85vw] md:min-w-full snap-center group relative bg-secondary rounded-3xl overflow-hidden border border-white/10 hover:border-accent/30 transition-all"
                        >
                            {/* Abstract Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            <div className="relative p-6 md:p-10 flex flex-col lg:flex-row gap-8 md:gap-12 items-center h-full">

                                {/* Content Side */}
                                <div className="flex-1 w-full">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                            <img src={project.logo} alt={`${project.title} Logo`} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-3xl font-bold text-white">{project.title}</h3>
                                            <p className="text-accent text-xs md:text-sm font-medium uppercase tracking-wide">{project.subtitle}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-lg line-clamp-3 md:line-clamp-none">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-primary/60 border border-white/10 rounded-full text-[10px] md:text-sm text-gray-300 flex items-center gap-1">
                                                {tag === "Solar Calculator" && <span className="text-accent">★</span>}
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <Link
                                            to={`/project/${project.id}`}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-xl hover:bg-accent/90 transition-all text-sm md:text-base"
                                        >
                                            Deep Dive <ArrowRight size={18} />
                                        </Link>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all text-sm md:text-base"
                                        >
                                            Live Site <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>

                                {/* Visual Side (Device Mockups) */}
                                <div className="flex-1 w-full flex items-center justify-center lg:justify-end relative min-h-[250px] md:min-h-[400px]">
                                    {/* Background Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-3xl rounded-full"></div>

                                    {project.desktopImage && (
                                        <div className="relative z-10 transform translate-x-4 translate-y-4 md:translate-x-0 md:translate-y-0 scale-90 md:scale-100 origin-center">
                                            <DeviceMockup type="desktop" src={project.desktopImage} alt={`${project.title} Desktop`} />
                                        </div>
                                    )}

                                    {project.mobileImage && (
                                        <div className={`relative z-20 transform ${project.desktopImage ? '-translate-x-8 translate-y-10 md:-translate-x-24 md:translate-y-12' : ''} scale-90 md:scale-100 origin-center`}>
                                            <DeviceMockup type="mobile" src={project.mobileImage} alt={`${project.title} Mobile`} />
                                        </div>
                                    )}
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center p-8 bg-secondary/30 rounded-2xl border border-white/5 border-dashed mt-8">
                    <p className="text-gray-400">
                        Coming soon: ready-made website templates for CAs, lawyers, clinics, gyms, real estate promoters, and more.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;
