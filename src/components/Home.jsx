import React from 'react';
import Navbar from './Navbar';
import HeroNew from './HeroNew';
import Services from './Services';
import FeaturedWorkNew from './FeaturedWorkNew';
import Process from './Process';
import USP from './USP';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {
    return (
        <div className="bg-primary min-h-screen font-sans text-gray-100 selection:bg-accent selection:text-primary overflow-x-hidden">
            <Navbar />
            <main>
                <HeroNew />
                <Services />
                <FeaturedWorkNew />
                <Process />
                <USP />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
