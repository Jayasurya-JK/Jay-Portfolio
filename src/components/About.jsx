import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

const About = () => {
    const features = [
        "Load fast",
        "Easy to use",
        "Optimized for Google search",
        "Convert visitors into leads"
    ];

    return (
        <section id="about" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Mobile-First: Photo First */}
                <div className="flex flex-col items-center">
                    {/* Profile Section - Centered on Mobile */}
                    <Reveal>
                        <motion.div 
                            className="mb-8 md:mb-12 flex flex-col items-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            {/* Modern Profile Photo */}
                            <div className="relative mb-6">
                                <motion.div 
                                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl bg-gradient-to-br from-accent via-yellow-400 to-orange-500 p-1 shadow-2xl"
                                    animate={{ 
                                        rotate: [0, 5, 0, -5, 0],
                                    }}
                                    transition={{ 
                                        duration: 5, 
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center relative overflow-hidden">
                                        <motion.div 
                                            className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent"
                                            animate={{ 
                                                opacity: [0.3, 0.6, 0.3],
                                            }}
                                            transition={{ 
                                                duration: 3, 
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        ></motion.div>
                                        <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white relative z-10">J</span>
                                    </div>
                                </motion.div>
                                {/* Floating badge */}
                                <motion.div 
                                    className="absolute -bottom-2 -right-2 bg-accent text-primary px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                                    animate={{ 
                                        y: [0, -5, 0],
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <Sparkles className="w-3 h-3" />
                                    Available
                                </motion.div>
                            </div>
                            
                            <div className="text-center">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Jay</h3>
                                <p className="text-sm sm:text-base text-accent font-medium">Freelance Web Developer & SEO</p>
                            </div>
                        </motion.div>
                    </Reveal>

                    {/* Content - Full Width, Modern Typography */}
                    <Reveal delay={0.1}>
                        <div className="max-w-3xl mx-auto text-center mb-8">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                                Who is Jay?
                            </h2>
                            <p className="text-lg sm:text-xl md:text-2xl text-accent font-semibold mb-8">
                                A developer who understands both design and business.
                            </p>
                        </div>
                    </Reveal>

                    {/* Story - Modern Card Style with Gradient */}
                    <Reveal delay={0.2}>
                        <motion.div 
                            className="max-w-4xl mx-auto mb-10"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-purple-500/20 to-blue-500/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity rounded-3xl"></div>
                                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10">
                                    <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                                        I'm Jay, a freelance web developer focused on helping small businesses and professionals look real and trustworthy online.
                                    </p>
                                    
                                    {/* Features Grid - Modern Pills */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                        {features.map((feature, index) => (
                                            <motion.div 
                                                key={index}
                                                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-accent/30 transition-all"
                                                initial={{ x: -20, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                                                <span className="text-sm sm:text-base text-white font-medium">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-6">
                                        I've worked on projects like <span className="text-white font-semibold">Surya's Solar</span> (business website) and <span className="text-white font-semibold">Gokul Oils</span> (product catalog and social media creatives), and I'm building a set of templates for CAs, lawyers, clinics, gyms, real estate promoters, and more.
                                    </p>
                                    
                                    <div className="pt-4 border-t border-white/10">
                                        <p className="text-base sm:text-lg md:text-xl font-semibold text-white text-center">
                                            My goal is simple: make it easy and affordable for you to have a professional online presence.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
