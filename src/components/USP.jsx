import React from 'react';
import { Wallet, Search, Target, LifeBuoy, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

const USP = () => {
    const usps = [
        {
            icon: <Wallet size={24} className="text-accent" />,
            title: "Affordable but premium",
            text: "I keep pricing friendly for small businesses while delivering a premium look and feel."
        },
        {
            icon: <Search size={24} className="text-accent" />,
            title: "SEO & Google-ready",
            text: "Your website is set up for indexing, basic SEO, and Google Business integration."
        },
        {
            icon: <Target size={24} className="text-accent" />,
            title: "Lead-focused",
            text: "I care about your enquiries and leads, not just nice-looking screens."
        },
        {
            icon: <LifeBuoy size={24} className="text-accent" />,
            title: "End-to-end support",
            text: "From hosting to small updates, I make it easy for non-technical business owners."
        }
    ];

    return (
        <section className="py-8 md:py-12 bg-primary border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="mb-8 md:mb-10 flex justify-between items-end">
                        <div className="text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">Why clients like working with me</h2>
                        </div>
                        {/* Mobile Swipe Hint */}
                        <div className="md:hidden text-accent text-xs font-medium animate-pulse flex items-center gap-1 mb-1">
                            Swipe <ArrowRight size={14} />
                        </div>
                    </div>
                </Reveal>

                {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 scrollbar-hide">
                    {usps.map((usp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                            className="min-w-[70vw] md:min-w-0 snap-center bg-secondary/50 p-6 rounded-xl border border-white/5 hover:bg-secondary transition-colors"
                        >
                            <div className="mb-4 bg-primary w-10 h-10 rounded-lg flex items-center justify-center border border-white/5">
                                {usp.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{usp.title}</h3>
                            <p className="text-sm text-gray-400">
                                {usp.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default USP;
