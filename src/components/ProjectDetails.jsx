import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Monitor, Smartphone, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import Reveal from './Reveal';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id);
    const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile'
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center text-white">Project not found</div>;
    }

    const screenshots = viewMode === 'desktop' ? project.details.desktopScreenshots : project.details.mobileScreenshots;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };

    return (
        <div className="min-h-screen bg-primary pt-20 md:pt-24 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 md:mb-6 min-h-[44px]">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                        <div className="min-w-0">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 break-words">{project.title}</h1>
                            <p className="text-base sm:text-lg md:text-xl text-accent">{project.subtitle}</p>
                        </div>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-accent text-primary font-bold rounded-xl hover:bg-accent/90 transition-all self-start md:self-auto flex-shrink-0"
                        >
                            <span className="whitespace-nowrap">Visit Live Site</span> <ExternalLink size={18} />
                        </a>
                    </div>
                </div>

                {/* View Toggle & Gallery */}
                <div className="bg-secondary/30 rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden mb-8 md:mb-12">
                    {/* Toolbar */}
                    <div className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h3 className="text-base md:text-lg font-medium text-white">Project Gallery</h3>

                        {/* Toggle Switch */}
                        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 relative w-full sm:w-auto">
                            <motion.div
                                className="absolute top-1 bottom-1 bg-white/10 rounded-lg"
                                layoutId="toggleHighlight"
                                initial={false}
                                animate={{
                                    left: viewMode === 'desktop' ? '0.25rem' : 'calc(50% + 0.125rem)',
                                    right: viewMode === 'desktop' ? 'calc(50% + 0.125rem)' : '0.25rem'
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button
                                onClick={() => { setViewMode('desktop'); setCurrentImageIndex(0); }}
                                className={`relative z-10 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-initial ${viewMode === 'desktop' ? 'text-white' : 'text-gray-400'}`}
                            >
                                <Monitor size={16} /> <span>Desktop</span>
                            </button>
                            <button
                                onClick={() => { setViewMode('mobile'); setCurrentImageIndex(0); }}
                                className={`relative z-10 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-initial ${viewMode === 'mobile' ? 'text-white' : 'text-gray-400'}`}
                            >
                                <Smartphone size={16} /> <span>Mobile</span>
                            </button>
                        </div>
                    </div>

                    {/* Image Display */}
                    <div className="relative bg-black/50 p-4 md:p-8 lg:p-12 flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={viewMode + currentImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className={`relative shadow-2xl rounded-lg overflow-hidden border border-white/10 ${viewMode === 'mobile' ? 'max-w-[200px] sm:max-w-[250px] md:max-w-[300px]' : 'w-full max-w-5xl'}`}
                            >
                                {screenshots.length > 0 ? (
                                    <img
                                        src={screenshots[currentImageIndex]}
                                        alt={`Screenshot ${currentImageIndex + 1}`}
                                        className="w-full h-auto"
                                    />
                                ) : (
                                    <div className="p-12 md:p-20 text-center text-gray-500 text-sm md:text-base">No screenshots available</div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {screenshots.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 min-w-[44px] min-h-[44px] bg-black/50 hover:bg-accent text-white hover:text-primary rounded-full backdrop-blur-sm transition-all border border-white/10 flex items-center justify-center"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 min-w-[44px] min-h-[44px] bg-black/50 hover:bg-accent text-white hover:text-primary rounded-full backdrop-blur-sm transition-all border border-white/10 flex items-center justify-center"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}

                        {/* Dots Indicator */}
                        {screenshots.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {screenshots.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`rounded-full transition-all min-w-[24px] min-h-[24px] flex items-center justify-center ${idx === currentImageIndex ? 'bg-accent w-6 h-2' : 'bg-white/30 hover:bg-white/50 w-2 h-2'}`}
                                        aria-label={`Go to screenshot ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Deep Dive Content */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                    <div className="md:col-span-2 space-y-6 md:space-y-8">
                        <Reveal>
                            <section>
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">The Challenge</h2>
                                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                                    {project.details.challenge}
                                </p>
                            </section>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <section>
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">The Solution</h2>
                                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                                    {project.details.solution}
                                </p>
                            </section>
                        </Reveal>
                    </div>

                    <Reveal delay={0.4}>
                        <div className="bg-secondary/20 p-5 md:p-6 rounded-xl md:rounded-2xl border border-white/5 h-fit">
                            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Key Features</h3>
                            <ul className="space-y-4 md:space-y-6">
                                {project.details.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <h4 className="text-accent font-medium mb-1 text-sm md:text-base">{feature.title}</h4>
                                        <p className="text-xs md:text-sm text-gray-400">{feature.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
