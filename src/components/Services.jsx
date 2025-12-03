import React from 'react';
import { Globe, Image, Server, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
    const services = [
        {
            icon: <Globe size={32} className="text-accent" />,
            title: "Business Websites & Landing Pages",
            description: "Modern, mobile-friendly websites for real estate promoters, clinics, gyms, CAs, lawyers, influencers, and other small businesses.",
            points: [
                "SEO-ready structure and clean content",
                "Fast loading and mobile responsive",
                "WhatsApp and lead capture forms",
                "Google Search Console and indexing setup"
            ]
        },
        {
            icon: <Image size={32} className="text-accent" />,
            title: "Product Catalogs & Instagram Creatives",
            description: "High-quality digital catalogs and social media creatives that make your brand and products look professional.",
            points: [
                "Product catalog design (like Gokul Oils)",
                "Instagram post & story designs",
                "Clean layout and premium feel",
                "Ready for print or digital use"
            ]
        },
        {
            icon: <Server size={32} className="text-accent" />,
            title: "Hosting, SEO & Ongoing Support",
            description: "I can host, monitor, and maintain your website, so you don’t need to worry about the technical side.",
            points: [
                "Premium hosting (starting from ₹99/month)",
                "Basic SEO and on-page improvements",
                "Google Business Profile support",
                "Small monthly updates and tweaks"
            ]
        }
    ];

    return (
        <section id="services" className="py-12 md:py-20 bg-secondary/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 md:mb-16 flex justify-between items-end">
                    <div className="text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What I can do for you</h2>
                        <p className="text-gray-400 max-w-2xl">
                            Simple, focused services that give your business a real online presence.
                        </p>
                    </div>
                    {/* Mobile Swipe Hint */}
                    <div className="md:hidden text-accent text-sm font-medium animate-pulse flex items-center gap-2 mb-1">
                        Swipe <ArrowRight size={16} />
                    </div>
                </div>

                {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 scrollbar-hide">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="min-w-[85vw] md:min-w-0 snap-center bg-secondary border border-white/5 rounded-2xl p-6 md:p-8 hover:border-accent/30 transition-all hover:-translate-y-1 duration-300 flex flex-col h-full"
                        >
                            <div className="bg-primary/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/5">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                                {service.description}
                            </p>
                            <ul className="space-y-3 mt-auto">
                                {service.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check size={16} className="text-success mt-1 flex-shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
