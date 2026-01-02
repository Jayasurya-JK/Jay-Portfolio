import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Monitor, Smartphone, ChevronLeft, ChevronRight, ExternalLink, Target, Zap, TrendingUp } from 'lucide-react';
import { projects } from '../data/projects';
import Reveal from './Reveal';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id);
    const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile'
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('challenge');
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [showSwipeHint, setShowSwipeHint] = useState(true);

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center text-white">Project not found</div>;
    }

    const screenshots = (viewMode === 'desktop' ? project.details?.desktopScreenshots : project.details?.mobileScreenshots) || [];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
        setShowSwipeHint(false);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
        setShowSwipeHint(false);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            // Swiped left
            nextImage();
        }
        if (touchStart - touchEnd < -50) {
            // Swiped right
            prevImage();
        }
    };

    return (
        <div className="min-h-screen bg-primary pt-4 md:pt-24 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
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
                    <div 
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className="relative bg-black/50 p-2 sm:p-4 md:p-8 lg:p-12 flex items-center justify-center min-h-[400px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[650px] overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={viewMode + currentImageIndex}
                                initial={{ opacity: 0, scale: 0.92, rotateY: -10 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 1.05, rotateY: 10 }}
                                transition={{ 
                                    duration: 0.5, 
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                                className={`relative ${viewMode === 'mobile' ? 'max-w-[280px] sm:max-w-[320px] md:max-w-[360px]' : 'w-full max-w-5xl'}`}
                            >
                                {screenshots.length > 0 ? (
                                    viewMode === 'desktop' ? (
                                        // 3D Laptop Mockup
                                        <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-5xl mx-auto" style={{ perspective: '2000px' }}>
                                            <div className="relative transition-transform duration-500 ease-out hover:scale-[1.02]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-5deg)' }}>
                                                {/* Laptop Base */}
                                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[105%] h-3 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-xl" style={{ transform: 'translateZ(-10px) rotateX(85deg)' }}></div>
                                                
                                                {/* Screen Container */}
                                                <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-3 shadow-2xl border-[3px] border-gray-700">
                                                    {/* Camera Notch */}
                                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-lg flex items-center justify-center z-20">
                                                        <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                                                    </div>
                                                    
                                                    {/* Screen Bezel */}
                                                    <div className="relative bg-black rounded-xl overflow-hidden border-4 border-gray-950">
                                                        {/* Browser Chrome */}
                                                        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-3 border-b border-gray-700 flex items-center gap-4">
                                                            <div className="flex gap-2">
                                                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                            </div>
                                                            <div className="flex-1 bg-[#1a1a1a] rounded-full px-4 py-1.5 text-xs text-gray-500 font-mono text-center truncate">
                                                                {project.domain || "project-demo.com"}
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Screen Content with Reflection */}
                                                        <div className="relative bg-gray-900">
                                                            <img
                                                                src={screenshots[currentImageIndex]}
                                                                alt={`Desktop Screenshot ${currentImageIndex + 1}`}
                                                                className="w-full h-auto block relative z-0"
                                                            />
                                                            {/* Screen Glare Overlay */}
                                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Floating Shadow */}
                                            <div className="absolute inset-0 bg-black/40 blur-3xl -z-10 translate-y-8 scale-90"></div>
                                        </div>
                                    ) : (
                                        // iPhone 15 Pro Mockup
                                        <div className="relative mx-auto w-[280px] sm:w-[320px] md:w-[360px]">
                                            {/* Phone Body with gradient */}
                                            <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[3rem] p-2 shadow-2xl border-[3px] border-gray-700 transition-transform duration-300 hover:scale-105">
                                                
                                                {/* Dynamic Island */}
                                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20 flex items-center justify-center border border-gray-950">
                                                    <div className="w-3 h-3 bg-purple-500/40 rounded-full animate-pulse"></div>
                                                </div>
                                                
                                                {/* Screen Container */}
                                                <div className="relative bg-black rounded-[2.5rem] overflow-hidden border-4 border-gray-950">
                                                    
                                                    {/* Screen Reflection Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-10"></div>
                                                    
                                                    {/* Screenshot */}
                                                    <img
                                                        src={screenshots[currentImageIndex]}
                                                        alt={`Mobile Screenshot ${currentImageIndex + 1}`}
                                                        className="w-full h-auto block relative z-0"
                                                    />
                                                    
                                                    {/* Home Indicator */}
                                                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-10"></div>
                                                </div>
                                                
                                                {/* Side Buttons - Volume */}
                                                <div className="absolute -left-[3px] top-20 w-[3px] h-12 bg-gray-700 rounded-r-sm"></div>
                                                <div className="absolute -left-[3px] top-36 w-[3px] h-8 bg-gray-700 rounded-r-sm"></div>
                                                
                                                {/* Side Button - Power */}
                                                <div className="absolute -right-[3px] top-28 w-[3px] h-16 bg-gray-700 rounded-l-sm"></div>
                                            </div>
                                            
                                            {/* Floating Shadow */}
                                            <div className="absolute inset-0 bg-black/30 blur-2xl -z-10 translate-y-8 scale-95"></div>
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
                                    onClick={prevImage}
                                    className="absolute left-1 sm:left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 min-w-[48px] min-h-[48px] bg-black/60 hover:bg-accent/90 backdrop-blur-md text-white hover:text-primary rounded-full transition-all duration-300 border border-white/10 hover:border-accent/50 flex items-center justify-center hover:scale-110 active:scale-95 shadow-lg hover:shadow-accent/30 group"
                                    aria-label="Previous screenshot"
                                >
                                    <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-1 sm:right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 min-w-[48px] min-h-[48px] bg-black/60 hover:bg-accent/90 backdrop-blur-md text-white hover:text-primary rounded-full transition-all duration-300 border border-white/10 hover:border-accent/50 flex items-center justify-center hover:scale-110 active:scale-95 shadow-lg hover:shadow-accent/30 group"
                                    aria-label="Next screenshot"
                                >
                                    <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
                                </button>
                            </>
                        )}

                        {/* Dash Indicators */}
                        {screenshots.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
                                {screenshots.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-accent w-8 md:w-12 h-1 md:h-1.5' : 'bg-white/30 hover:bg-white/50 w-6 md:w-8 h-1 md:h-1.5'}`}
                                        style={{ minWidth: idx === currentImageIndex ? '32px' : '24px', minHeight: '44px', padding: '21px 0' }}
                                        aria-label={`Go to screenshot ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Swipe Hint Indicator */}
                        <AnimatePresence>
                            {showSwipeHint && screenshots.length > 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute bottom-20 right-4 md:hidden flex items-center gap-2 text-white/50 text-sm bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm pointer-events-none"
                                    onAnimationComplete={() => {
                                        setTimeout(() => setShowSwipeHint(false), 3000);
                                    }}
                                >
                                    <span>Swipe</span>
                                    <ChevronRight size={16} className="animate-pulse" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Tech Tags and Details Grid */}
                <div className="space-y-8 md:space-y-12">
                    {/* Tech Tags */}
                    <Reveal>
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
                    </Reveal>

                    {/* Interactive Details Tabs */}
                    <div className="max-w-4xl mx-auto">
                        {/* Tab Navigation */}
                        <div className="flex justify-center gap-8 mb-8">
                            <button
                                onClick={() => setActiveTab('challenge')}
                                className={`flex flex-col items-center gap-2 group transition-all ${activeTab === 'challenge' ? 'scale-110' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
                            >
                                <div className={`p-4 rounded-full transition-all ${activeTab === 'challenge' ? 'bg-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-white/5 text-gray-400'}`}>
                                    <Target size={28} />
                                </div>
                                <span className={`text-sm font-medium tracking-wide ${activeTab === 'challenge' ? 'text-red-500' : 'text-gray-500'}`}>CHALLENGE</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('solution')}
                                className={`flex flex-col items-center gap-2 group transition-all ${activeTab === 'solution' ? 'scale-110' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
                            >
                                <div className={`p-4 rounded-full transition-all ${activeTab === 'solution' ? 'bg-blue-500/20 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 text-gray-400'}`}>
                                    <Zap size={28} />
                                </div>
                                <span className={`text-sm font-medium tracking-wide ${activeTab === 'solution' ? 'text-blue-500' : 'text-gray-500'}`}>SOLUTION</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('impact')}
                                className={`flex flex-col items-center gap-2 group transition-all ${activeTab === 'impact' ? 'scale-110' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
                            >
                                <div className={`p-4 rounded-full transition-all ${activeTab === 'impact' ? 'bg-green-500/20 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-gray-400'}`}>
                                    <TrendingUp size={28} />
                                </div>
                                <span className={`text-sm font-medium tracking-wide ${activeTab === 'impact' ? 'text-green-500' : 'text-gray-500'}`}>IMPACT</span>
                            </button>
                        </div>

                        {/* Tab Content */}
                        <Reveal>
                            <AnimatePresence mode="wait">
                                {activeTab === 'challenge' && (
                                    <motion.div
                                        key="challenge"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-red-500/5 p-8 md:p-10 rounded-3xl border border-red-500/20 text-left relative overflow-hidden"
                                    >
                                        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                                            <Target size={200} className="text-red-500" />
                                        </div>
                                        <Target className="w-12 h-12 text-red-500 mb-6" />
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-wider">The Challenge</h3>
                                        <p className="text-gray-200 text-lg leading-relaxed relative z-10">
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
                                        className="bg-blue-500/5 p-8 md:p-10 rounded-3xl border border-blue-500/20 text-left relative overflow-hidden"
                                    >
                                        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                                            <Zap size={200} className="text-blue-500" />
                                        </div>
                                        <Zap className="w-12 h-12 text-blue-500 mb-6" />
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-wider">The Solution</h3>
                                        <p className="text-gray-200 text-lg leading-relaxed relative z-10">
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
                                        className="bg-green-500/5 p-8 md:p-10 rounded-3xl border border-green-500/20 text-left relative overflow-hidden"
                                    >
                                        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                                            <TrendingUp size={200} className="text-green-500" />
                                        </div>
                                        <TrendingUp className="w-12 h-12 text-green-500 mb-6" />
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-wider">The Impact</h3>
                                        <p className="text-gray-200 text-lg leading-relaxed relative z-10">
                                            {project.details?.impact || "Optimizing performance and driving conversion."}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Reveal>
                    </div>

                    {/* Key Features List */}
                    <Reveal delay={0.4}>
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
                    </Reveal>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
