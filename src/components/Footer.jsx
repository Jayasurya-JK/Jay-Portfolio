import React from 'react';
import { Instagram, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Jay. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                        <Instagram size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                        <Mail size={20} />
                    </a>
                </div>

                <div className="text-center md:text-right">
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                        Built with <Heart size={12} className="text-red-500 fill-red-500" /> and clean code.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
