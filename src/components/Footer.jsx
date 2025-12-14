import React from 'react';
import { Instagram, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary border-t border-white/5 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                <div className="text-center md:text-left order-2 md:order-1">
                    <p className="text-gray-400 text-xs sm:text-sm">
                        © {new Date().getFullYear()} Jay. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-4 md:gap-6 order-1 md:order-2">
                    <a href="#" className="text-gray-400 hover:text-accent transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                        <Instagram size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-accent transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                        <Linkedin size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-accent transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                        <Mail size={20} />
                    </a>
                </div>

                <div className="text-center md:text-right order-3">
                    <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
                        Built with <Heart size={12} className="text-red-500 fill-red-500" /> and clean code.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
