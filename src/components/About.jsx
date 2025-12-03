import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Who is Jay?</h2>
                        <p className="text-accent font-medium mb-6">A developer who understands both design and business.</p>

                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                I’m Jay, a freelance web developer focused on helping small businesses and professionals look real and trustworthy online.
                            </p>
                            <p>
                                I create websites that:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2 text-gray-300">
                                <li>load fast,</li>
                                <li>are easy to use,</li>
                                <li>are optimized for Google search,</li>
                                <li>and help convert visitors into enquiries or leads.</li>
                            </ul>
                            <p>
                                I’ve worked on projects like Surya’s Solar (business website) and Gokul Oils (product catalog and social media creatives), and I’m building a set of templates for CAs, lawyers, clinics, gyms, real estate promoters, and more.
                            </p>
                            <p className="font-medium text-white pt-2">
                                My goal is simple: make it easy and affordable for you to have a professional online presence.
                            </p>
                        </div>
                    </div>

                    {/* Right Avatar */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-secondary to-primary border-4 border-accent/20 flex items-center justify-center shadow-2xl mb-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="text-6xl font-bold text-white">J</span>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white">Jay</h3>
                            <p className="text-sm text-gray-400">Freelance Web Developer & SEO</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
