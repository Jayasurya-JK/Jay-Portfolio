import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Monitor, Smartphone, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';

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
        <div className="min-h-screen bg-primary pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.title}</h1>
                            <p className="text-xl text-accent">{project.subtitle}</p>
                        </div>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-xl hover:bg-accent/90 transition-all self-start md:self-auto"
                        >
                            Visit Live Site <ExternalLink size={18} />
                        </a>
                    </div>
                </div>

                {/* View Toggle & Gallery */}
                <div className="bg-secondary/30 rounded-3xl border border-white/5 overflow-hidden mb-12">
                    {/* Toolbar */}
                    <div className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h3 className="text-lg font-medium text-white">Project Gallery</h3>

                        {/* Toggle Switch */}
                        <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 relative">
                            <motion.div
                                className="absolute top-1 bottom-1 bg-white/10 rounded-lg"
                                layoutId="toggleHighlight"
                                initial={false}
                                animate={{
                                    x: viewMode === 'desktop' ? 0 : '100%',
                                    width: '50%'
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button
                                onClick={() => { setViewMode('desktop'); setCurrentImageIndex(0); }}
                                className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'desktop' ? 'text-white' : 'text-gray-400'}`}
                            >
                                <Monitor size={16} /> Desktop
                            </button>
                            <button
                                onClick={() => { setViewMode('mobile'); setCurrentImageIndex(0); }}
                                className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'mobile' ? 'text-white' : 'text-gray-400'}`}
                            >
                                <Smartphone size={16} /> Mobile
                            </button>
                        </div>
                    </div>

                    {/* Image Display */}
                    <div className="relative bg-black/50 p-4 md:p-12 flex items-center justify-center min-h-[400px] md:min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={viewMode + currentImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className={`relative shadow-2xl rounded-lg overflow-hidden border border-white/10 ${viewMode === 'mobile' ? 'max-w-[300px]' : 'w-full max-w-5xl'}`}
                            >
                                {screenshots.length > 0 ? (
                                    <img
                                        src={screenshots[currentImageIndex]}
                                        alt={`Screenshot ${currentImageIndex + 1}`}
                                        className="w-full h-auto"
                                    />
                                ) : (
                                    <div className="p-20 text-center text-gray-500">No screenshots available</div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {screenshots.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-accent text-white hover:text-primary rounded-full backdrop-blur-sm transition-all border border-white/10"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-accent text-white hover:text-primary rounded-full backdrop-blur-sm transition-all border border-white/10"
                                >
                                    <ChevronRight size={24} />
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
                                        className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-accent w-6' : 'bg-white/30 hover:bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Deep Dive Content */}
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {project.details.challenge}
                            </p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">The Solution</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {project.details.solution}
                            </p>
                        </section>
                    </div>

                    <div className="bg-secondary/20 p-6 rounded-2xl border border-white/5 h-fit">
                        <h3 className="text-xl font-bold text-white mb-6">Key Features</h3>
                        <ul className="space-y-6">
                            {project.details.features.map((feature, idx) => (
                                <li key={idx}>
                                    <h4 className="text-accent font-medium mb-1">{feature.title}</h4>
                                    <p className="text-sm text-gray-400">{feature.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
