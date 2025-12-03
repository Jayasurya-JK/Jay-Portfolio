import React from 'react';
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="pt-24 pb-8 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left pt-4 md:pt-0">
                <span className="inline-block py-1 px-3 rounded-full bg-secondary border border-white/10 text-accent text-sm font-medium mb-6">
                    Hi, I’m Jay 👋
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                    I build affordable, <span className="text-accent">SEO-ready websites</span> that help your business appear on Google.
                </h1>
                <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto md:mx-0">
                    I work with small businesses, professionals, and local brands to create modern websites, product catalogs, and landing pages that look premium and actually convert – not just look pretty.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-10">
                    <a
                        href="https://wa.me/your-number"
                        className="w-full sm:w-auto px-8 py-3 bg-success hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                    >
                        Let’s talk on WhatsApp <ArrowRight size={18} />
                    </a>
                    <a
                        href="#work"
                        className="w-full sm:w-auto px-8 py-3 bg-secondary hover:bg-slate-800 text-white border border-white/10 font-medium rounded-xl transition-all flex items-center justify-center"
                    >
                        View my work
                    </a>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <Zap size={16} className="text-accent" />
                        <span>Websites + SEO</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <LayoutIcon size={16} className="text-accent" />
                        <span>Product Catalogs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield size={16} className="text-accent" />
                        <span>Premium Support</span>
                    </div>
                </div>
            </div>

            {/* Right Visual */}
            <div className="flex-1 w-full max-w-[280px] md:max-w-full relative mx-auto md:mx-0">
                <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -z-10 w-72 h-72 bg-success/20 rounded-full blur-3xl opacity-30"></div>

                <div className="relative bg-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-32 bg-primary/50 rounded-lg w-full animate-pulse"></div>
                        <div className="flex gap-4">
                            <div className="h-20 bg-primary/50 rounded-lg w-1/2"></div>
                            <div className="h-20 bg-primary/50 rounded-lg w-1/2"></div>
                        </div>
                        <div className="h-4 bg-primary/50 rounded w-3/4"></div>
                        <div className="h-4 bg-primary/50 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Helper component for the icon since Layout isn't exported as LayoutIcon sometimes or just to be safe
const LayoutIcon = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="3" x2="21" y1="9" y2="9" />
        <line x1="9" x2="9" y1="21" y2="9" />
    </svg>
);

export default Hero;
