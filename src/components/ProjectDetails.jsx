import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Monitor, Smartphone, ChevronLeft, ChevronRight, ExternalLink, Target, Zap, TrendingUp } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id);
    const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile'
    const screenshots = (viewMode === 'desktop' ? project.details?.desktopScreenshots : project.details?.mobileScreenshots) || [];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('challenge');
    const [isHovering, setIsHovering] = useState(false);
    const [isGalleryHovering, setIsGalleryHovering] = useState(false);

    // Auto-rotate tabs
    useEffect(() => {
        if (isHovering) return;
        const interval = setInterval(() => {
            setActiveTab(current => {
                if (current === 'challenge') return 'solution';
                if (current === 'solution') return 'impact';
                return 'challenge';
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [isHovering]);

    // Auto-rotate screenshots
    useEffect(() => {
        if (isGalleryHovering) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isGalleryHovering, screenshots.length]);

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center text-white">Project not found</div>;
    }



    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };

    return (
        <div className="min-h-screen bg-primary pt-2 md:pt-16 pb-8 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="mb-4 md:mb-6">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-2 md:mb-4 min-h-[44px]">
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
                <div className="bg-secondary/30 rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden mb-6 md:mb-10">
                    {/* Toolbar */}
                    <div className="p-3 md:p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
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
                    <div
                        className="relative bg-black/50 p-2 md:p-6 lg:p-8 flex items-center justify-center min-h-[300px] md:min-h-[500px] lg:min-h-[600px]"
                        onMouseEnter={() => setIsGalleryHovering(true)}
                        onMouseLeave={() => setIsGalleryHovering(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={viewMode + currentImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                drag={viewMode === 'mobile' ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = Math.abs(offset.x) * velocity.x;
                                    if (offset.x > 50 || swipe > 500) {
                                        prevImage();
                                    } else if (offset.x < -50 || swipe < -500) {
                                        nextImage();
                                    }
                                }}
                                className={`relative ${viewMode === 'mobile' ? 'max-w-[280px] sm:max-w-[320px] md:max-w-[360px] cursor-grab active:cursor-grabbing' : 'w-full max-w-7xl'}`}
                            >
                                {screenshots.length > 0 ? (
                                    viewMode === 'desktop' ? (
                                        // Desktop Browser Frame
                                        <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full">
                                            {/* Browser Chrome */}
                                            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-2 md:p-3 border-b border-gray-700 flex items-center gap-2 md:gap-4">
                                                <div className="flex gap-1.5 md:gap-2">
                                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                                                </div>
                                                <div className="flex-1 bg-[#1a1a1a] rounded-full px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs text-gray-500 font-mono text-center truncate">
                                                    {project.domain || "project-demo.com"}
                                                </div>
                                            </div>
                                            {/* Image Content */}
                                            <div className="bg-gray-900">
                                                <img
                                                    src={screenshots[currentImageIndex]}
                                                    alt={`Desktop Screenshot ${currentImageIndex + 1}`}
                                                    className="w-full h-auto block"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        // Mobile Phone Frame - Sleeker Design
                                        <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] md:border-[12px] rounded-[2rem] md:rounded-[2.5rem] h-[450px] w-[225px] sm:h-[520px] sm:w-[260px] md:h-[600px] md:w-[300px] shadow-xl flex-shrink-0">
                                            {/* Notch / Dynamic Island */}
                                            <div className="w-[80px] md:w-[100px] h-[18px] md:h-[24px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>

                                            {/* Side Buttons */}
                                            <div className="h-[28px] md:h-[36px] w-[2px] md:w-[3px] bg-gray-800 absolute -start-[8px] md:-start-[12px] top-[80px] md:top-[124px] rounded-s-lg"></div>
                                            <div className="h-[28px] md:h-[36px] w-[2px] md:w-[3px] bg-gray-800 absolute -start-[8px] md:-start-[12px] top-[115px] md:top-[168px] rounded-s-lg"></div>
                                            <div className="h-[40px] md:h-[52px] w-[2px] md:w-[3px] bg-gray-800 absolute -end-[8px] md:-end-[12px] top-[100px] md:top-[142px] rounded-e-lg"></div>

                                            {/* Inner Screen */}
                                            <div className="rounded-[calc(2rem-8px)] md:rounded-[calc(2.5rem-12px)] overflow-hidden w-full h-full bg-black flex flex-col relative z-10">
                                                {/* Status Bar / Safe Area */}
                                                <div className="h-[24px] w-full bg-black flex items-center justify-between px-5 md:px-6 z-20 shrink-0">
                                                    <div className="text-[9px] md:text-[10px] text-white font-medium pl-2">9:41</div>
                                                    <div className="flex gap-1 pr-2">
                                                        <div className="w-2.5 h-2.5 bg-white rounded-full opacity-20"></div>
                                                        <div className="w-2.5 h-2.5 bg-white rounded-full opacity-20"></div>
                                                        <div className="w-3.5 h-2.5 bg-white rounded-[2px]"></div>
                                                    </div>
                                                </div>
                                                <div className="flex-1 w-full relative bg-white overflow-hidden rounded-b-[calc(2rem-8px)] md:rounded-b-[calc(2.5rem-12px)]">
                                                    <img
                                                        src={screenshots[currentImageIndex]}
                                                        alt={`Mobile Screenshot ${currentImageIndex + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Home Indicator */}
                                                <div className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 w-20 md:w-28 h-1 bg-white/90 rounded-full backdrop-blur-md z-30 shadow-sm"></div>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="p-12 md:p-20 text-center text-gray-500 text-sm md:text-base">No screenshots available</div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {screenshots.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all z-40"
                                >
                                    <ChevronLeft size={20} className="md:w-7 md:h-7" strokeWidth={2} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all z-40"
                                >
                                    <ChevronRight size={20} className="md:w-7 md:h-7" strokeWidth={2} />
                                </button>
                            </>
                        )}

                        {/* Dots Indicator */}
                        {screenshots.length > 1 && (
                            <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                                {screenshots.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-6 md:w-8 h-1.5 md:h-2' : 'bg-white/20 hover:bg-white/40 w-1.5 md:w-2 h-1.5 md:h-2'}`}
                                        aria-label={`Go to screenshot ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Tech Tags and Details Grid */}
                <div className="space-y-8 md:space-y-12">
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {project.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/30 rounded-xl text-sm text-gray-300 font-medium transition-all cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Interactive Details Tabs */}
                    <div className="max-w-4xl mx-auto">
                        {/* Tab Navigation */}
                        <div
                            className="flex justify-between w-full md:w-auto md:justify-center md:gap-16 mb-8 md:mb-12 border-b border-white/5 pb-4 px-2 md:px-0"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <button
                                onClick={() => setActiveTab('challenge')}
                                className="group relative flex flex-col items-center gap-2 md:gap-3 outline-none flex-1 md:flex-none"
                            >
                                <motion.div
                                    className={`p-2.5 md:p-3 rounded-2xl transition-colors duration-300 ${activeTab === 'challenge' ? 'text-red-500 bg-red-500/10' : 'text-gray-500 group-hover:text-gray-300'}`}
                                    animate={activeTab === 'challenge' ? { rotate: [0, -10, 10, 0], scale: 1.1 } : { scale: 1 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    <Target size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
                                </motion.div>
                                <span className={`text-[10px] md:text-sm font-medium tracking-widest transition-colors ${activeTab === 'challenge' ? 'text-white' : 'text-gray-600'}`}>CHALLENGE</span>
                                {activeTab === 'challenge' && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute -bottom-[17px] w-full md:w-[120%] h-[2px] bg-red-500"
                                    />
                                )}
                            </button>

                            <button
                                onClick={() => setActiveTab('solution')}
                                className="group relative flex flex-col items-center gap-2 md:gap-3 outline-none flex-1 md:flex-none"
                            >
                                <motion.div
                                    className={`p-2.5 md:p-3 rounded-2xl transition-colors duration-300 ${activeTab === 'solution' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500 group-hover:text-gray-300'}`}
                                    animate={activeTab === 'solution' ? { y: [0, -4, 0], scale: 1.1 } : { scale: 1 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    <Zap size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
                                </motion.div>
                                <span className={`text-[10px] md:text-sm font-medium tracking-widest transition-colors ${activeTab === 'solution' ? 'text-white' : 'text-gray-600'}`}>SOLUTION</span>
                                {activeTab === 'solution' && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute -bottom-[17px] w-full md:w-[120%] h-[2px] bg-blue-500"
                                    />
                                )}
                            </button>

                            <button
                                onClick={() => setActiveTab('impact')}
                                className="group relative flex flex-col items-center gap-2 md:gap-3 outline-none flex-1 md:flex-none"
                            >
                                <motion.div
                                    className={`p-2.5 md:p-3 rounded-2xl transition-colors duration-300 ${activeTab === 'impact' ? 'text-green-500 bg-green-500/10' : 'text-gray-500 group-hover:text-gray-300'}`}
                                    animate={activeTab === 'impact' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    <TrendingUp size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
                                </motion.div>
                                <span className={`text-[10px] md:text-sm font-medium tracking-widest transition-colors ${activeTab === 'impact' ? 'text-white' : 'text-gray-600'}`}>IMPACT</span>
                                {activeTab === 'impact' && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute -bottom-[17px] w-full md:w-[120%] h-[2px] bg-green-500"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'challenge' && (
                                <motion.div
                                    key="challenge"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-red-500/5 p-5 md:p-10 rounded-3xl border border-red-500/20 text-left relative overflow-hidden"
                                >
                                    <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                                        <Target size={120} className="text-red-500 md:w-[200px] md:h-[200px]" />
                                    </div>
                                    <Target className="w-8 h-8 md:w-12 md:h-12 text-red-500 mb-4 md:mb-6" />
                                    <h3 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 uppercase tracking-wider">The Challenge</h3>
                                    <p className="text-sm md:text-lg text-gray-200 leading-relaxed relative z-10">
                                        {project.details?.challenge || "Addressing complex user needs through intuitive design."}
                                    </p>
                                </motion.div>
                            )}

                            {activeTab === 'solution' && (
                                <motion.div
                                    key="solution"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-blue-500/5 p-5 md:p-10 rounded-3xl border border-blue-500/20 text-left relative overflow-hidden"
                                >
                                    <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                                        <Zap size={120} className="text-blue-500 md:w-[200px] md:h-[200px]" />
                                    </div>
                                    <Zap className="w-8 h-8 md:w-12 md:h-12 text-blue-500 mb-4 md:mb-6" />
                                    <h3 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 uppercase tracking-wider">The Solution</h3>
                                    <p className="text-sm md:text-lg text-gray-200 leading-relaxed relative z-10">
                                        {project.details?.solution || "Implementing robust, scalable technologies."}
                                    </p>
                                </motion.div>
                            )}

                            {activeTab === 'impact' && (
                                <motion.div
                                    key="impact"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-green-500/5 p-5 md:p-10 rounded-3xl border border-green-500/20 text-left relative overflow-hidden"
                                >
                                    <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                                        <TrendingUp size={120} className="text-green-500 md:w-[200px] md:h-[200px]" />
                                    </div>
                                    <TrendingUp className="w-8 h-8 md:w-12 md:h-12 text-green-500 mb-4 md:mb-6" />
                                    <h3 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 uppercase tracking-wider">The Impact</h3>
                                    <p className="text-sm md:text-lg text-gray-200 leading-relaxed relative z-10">
                                        {project.details?.impact || "Optimizing performance and driving conversion."}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Key Features List */}
                    <div className="bg-secondary/20 p-6 md:p-8 rounded-2xl border border-white/5">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Key Features</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {project.details?.features?.map((feature, idx) => (
                                <div key={idx} className="flex flex-col gap-2">
                                    <h4 className="text-accent font-medium text-lg">{feature.title}</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
