import React from 'react';
import { Zap, TrendingUp, Search, Target, Code, Palette, MousePointerClick, Layout } from 'lucide-react';
import Reveal from './Reveal';

const About = () => {
    // Typing Effect State
    // Typing Effect State
    const [text, setText] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [loopNum, setLoopNum] = React.useState(0);
    const [typingSpeed, setTypingSpeed] = React.useState(150);

    const toRotate = [
        "Best lawyer near me",
        "Organic wood pressed oil shop",
        "Best CA near me",
        "ENT specialist near me"
    ];

    React.useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % toRotate.length;
            const fullText = toRotate[i];

            setText(current => {
                if (isDeleting) {
                    return fullText.substring(0, current.length - 1);
                } else {
                    return fullText.substring(0, current.length + 1);
                }
            });

            // Dynamic Speed Logic
            let nextSpeed = 150; // Normal typing speed

            if (isDeleting) {
                nextSpeed = 30; // Fast deleting speed
            }

            if (!isDeleting && text === fullText) {
                // Finished Typing - Long Pause before Delete
                nextSpeed = 2000;
                setIsDeleting(true);
            } else if (isDeleting && text === '') {
                // Finished Deleting - Pause before Next Word
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                nextSpeed = 500;
            }

            setTypingSpeed(nextSpeed);
        };

        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <section id="about" className="py-20 md:py-32 bg-primary relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">

                    {/* Left: The "Hook" & Value Prop */}
                    <div className="md:col-span-7">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-wider uppercase mb-6">
                                <Zap size={14} /> Only High-Performance Work
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
                                I don't just build websites. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">
                                    I build digital assets.
                                </span>
                            </h2>

                            <div className="space-y-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
                                <p className="font-light">
                                    <span className="text-white font-medium">95% of websites fail</span> because they are treated as expenses, not investments. They look pretty but do nothing for the bottom line.
                                </p>
                                <p>
                                    I bridge the gap between <strong className="text-white">technical excellence</strong> and <strong className="text-white">business strategy</strong>.
                                </p>
                                <p>
                                    When you onboard me, you're not getting a pixel-pusher. You're getting a partner who cares about your
                                    <span className="inline-flex items-center gap-1 mx-1 text-accent font-bold"><TrendingUp size={16} /> ROI</span>,
                                    your <span className="inline-flex items-center gap-1 mx-1 text-accent font-bold"><Search size={16} /> Visibility</span>,
                                    and your <span className="inline-flex items-center gap-1 mx-1 text-accent font-bold"><Target size={16} /> Growth</span>.
                                </p>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <div className="flex flex-col px-6 py-4 bg-secondary/30 border-l-2 border-accent rounded-r-xl">
                                    <span className="text-3xl font-bold text-white">3+</span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">Years Exp</span>
                                </div>
                                <div className="flex flex-col px-6 py-4 bg-secondary/30 border-l-2 border-blue-500 rounded-r-xl">
                                    <span className="text-3xl font-bold text-white">100%</span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">Delivery Rate</span>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: Profile Photo with Particle Portal Effect */}
                    <div className="md:col-span-5 relative flex flex-col items-center md:items-end gap-6 md:gap-4 md:pt-0">

                        {/* Particle Portal Profile Photo */}
                        <div className="relative z-20">
                            <Reveal delay={0.1}>
                                <div className="relative w-64 h-64">
                                    {/* Animated Rotating Ring */}
                                    <div className="absolute inset-0 rounded-full border border-accent/20 scale-110 animate-spin" style={{ animationDuration: '20s' }}></div>

                                    {/* Geometric Portal Lines (Background) */}
                                    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200">
                                        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-accent" />
                                        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-white" />
                                        <line x1="100" y1="10" x2="100" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                                        <line x1="100" y1="160" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                                        <line x1="10" y1="100" x2="40" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-white" />
                                        <line x1="160" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-white" />
                                    </svg>

                                    {/* Orbiting Particles - Animated */}
                                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s' }}>
                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent/60 shadow-lg shadow-accent/50"></div>
                                    </div>
                                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
                                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-yellow-300/50 shadow-lg shadow-yellow-300/50"></div>
                                    </div>
                                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '18s' }}>
                                        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-1 h-1 rounded-full bg-white/40 shadow-sm shadow-white/40"></div>
                                    </div>
                                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '14s', animationDirection: 'reverse' }}>
                                        <div className="absolute top-1/2 right-8 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/50 shadow-lg shadow-accent/50"></div>
                                    </div>

                                    {/* Main Profile Circle with Gradient Border */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
                                        {/* Holographic Gradient Border */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-yellow-300 to-white opacity-30 blur-sm"></div>
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent via-transparent to-white opacity-20"></div>

                                        {/* Photo Container */}
                                        <div className="absolute inset-1 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:border-accent/50">
                                            <div className="w-full h-full bg-white flex items-center justify-center relative">
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10"></div>
                                                <img
                                                    src="/images/Profile Pic/jay.png"
                                                    alt="Jay - Web Developer"
                                                    className="w-full h-full object-cover object-top relative z-0"
                                                />
                                            </div>
                                        </div>

                                        {/* Subtle Glow Beneath */}
                                        <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl -z-10"></div>
                                    </div>

                                    {/* Glassmorphic Info Overlay - REMOVED */}
                                </div>
                            </Reveal>
                        </div>

                        {/* Philosophy Card */}
                        <Reveal delay={0.3}>


                            <div className="relative z-10 w-full max-w-md bg-gradient-to-b from-blue-950/40 to-slate-950/90 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl hover:border-accent/30 transition-all duration-500 group -mt-20 md:-mt-32 flex flex-col items-center text-center">

                                <div className="space-y-8 pt-12 relative z-10 w-full">
                                    {/* Quote Section */}
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h5 className="text-gray-500 font-mono text-[10px] tracking-[0.3em] mb-6 uppercase">My Philosophy</h5>
                                        <blockquote className="text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight">
                                            I don't find opportunities.<br />
                                            I <span className="text-accent">create</span> them<span className="animate-pulse text-accent">_</span>
                                        </blockquote>
                                    </div>

                                    {/* Footer Profile - Upgraded Visuals */}
                                    <div className="pt-8 w-full">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="relative">
                                                <h4 className="text-3xl font-black text-white tracking-tighter">
                                                    JAY<span className="text-accent">.</span>
                                                </h4>
                                            </div>
                                            <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-mono tracking-widest uppercase mb-1">
                                                Web Developer & SEO Specialist
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Abstract Glow behind card */}
                            <div className="absolute -inset-4 bg-accent/20 rounded-[2rem] blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        </Reveal>
                    </div>

                </div>

                {/* HIGH-END VISION SECTION: The Digital Journey */}
                <div className="mt-32 relative">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <Reveal>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">The <span className="text-accent">Truth</span></h2>
                            <p className="text-gray-400 max-w-xl mx-auto text-lg">Most business owners think a website is a digital business card. <span className="text-white font-bold">They are wrong.</span></p>
                        </Reveal>
                    </div>

                    <div className="max-w-5xl mx-auto relative px-4">

                        {/* Step 1: The Context */}
                        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center mb-16 md:mb-24 relative">
                            {/* Central Line (Desktop) */}
                            <div className="hidden md:block absolute top-[50%] left-1/2 w-px h-[calc(100%+6rem)] bg-gradient-to-b from-transparent via-accent/30 to-accent/30 -translate-x-1/2 -z-10"></div>

                            {/* Left Content */}
                            <div className="md:text-right pl-12 md:pl-0 relative order-2 md:order-1">
                                <Reveal delay={0.1}>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">1. The New Reality</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        When a potential client needs a <span className="text-white font-medium">Doctor</span>, <span className="text-white font-medium">Lawyer</span>, or <span className="text-white font-medium">Service</span>, they don't look at billboards.
                                    </p>
                                    <div className="mt-3 inline-flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm w-full max-w-[250px] md:w-auto md:max-w-none md:min-w-[300px]">
                                        <Search size={16} className="text-accent shrink-0" />
                                        <span className="text-accent font-bold text-xs md:text-sm truncate">"{text}<span className="animate-pulse">|</span>"</span>
                                    </div>
                                </Reveal>
                            </div>

                            {/* Center Node */}
                            <div className="absolute left-0 top-0 w-10 md:static md:w-16 flex justify-center order-1 md:order-2 h-full md:h-auto">
                                {/* Mobile Line */}
                                <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 w-px h-[calc(100%+4rem)] bg-accent/30"></div>

                                <div className="relative z-10 w-10 h-10 md:w-16 md:h-16 rounded-full bg-black border-2 md:border-4 border-accent shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center justify-center group">
                                    <div className="absolute inset-0 rounded-full border border-accent/50 animate-ping opacity-20"></div>
                                    <Search size={20} className="text-accent md:w-8 md:h-8" />
                                </div>
                            </div>

                            {/* Right Empty */}
                            <div className="hidden md:block order-3"></div>
                        </div>

                        {/* Step 2: The Conflict */}
                        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center mb-16 md:mb-24 relative">
                            {/* Line Continuing */}
                            <div className="hidden md:block absolute top-0 left-1/2 w-px h-[calc(100%+6rem)] bg-accent/30 -translate-x-1/2 -z-10"></div>

                            {/* Left Empty */}
                            <div className="hidden md:block order-1"></div>

                            {/* Center Node */}
                            <div className="absolute left-0 top-0 w-10 md:static md:w-16 flex justify-center order-1 md:order-2 h-full md:h-auto">
                                {/* Mobile Line */}
                                <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-px h-[calc(100%+4rem)] bg-blue-500/30"></div>

                                <div className="relative z-10 w-10 h-10 md:w-16 md:h-16 rounded-full bg-black border-2 md:border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center">
                                    <Zap size={20} className="text-blue-500 md:w-8 md:h-8" />
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="md:text-left pl-12 md:pl-0 relative order-2 md:order-3">
                                <Reveal delay={0.2}>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">2. The Gatekeeper</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Google filters out the noise. It only recommends businesses that prove their <span className="text-blue-400 font-bold">Authority</span>.
                                    </p>
                                    <div className="mt-2 text-blue-400/80 text-xs font-mono tracking-wide">
                                        &lt;Algorithm_Approved /&gt;
                                    </div>
                                </Reveal>
                            </div>
                        </div>

                        {/* Step 3: The Result */}
                        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center relative">
                            {/* Line Ending */}
                            <div className="hidden md:block absolute top-0 left-1/2 w-px h-1/2 bg-gradient-to-b from-accent/30 to-transparent -translate-x-1/2 -z-10"></div>

                            {/* Left Content */}
                            <div className="md:text-right pl-12 md:pl-0 relative order-2 md:order-1">
                                <Reveal delay={0.3}>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">3. The Conversion</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Traffic means nothing without trust. My designs turn visitors into <span className="text-green-500 font-bold">paying clients</span>.
                                    </p>
                                    <div className="mt-3 inline-flex items-center gap-2 text-green-400 font-bold text-lg">
                                        <TrendingUp size={20} />
                                        <span>Visitor → Customer</span>
                                    </div>
                                </Reveal>
                            </div>

                            {/* Center Node */}
                            <div className="absolute left-0 top-0 w-10 md:static md:w-16 flex justify-center order-1 md:order-2 h-full md:h-auto">
                                <div className="relative z-10 w-10 h-10 md:w-16 md:h-16 rounded-full bg-black border-2 md:border-4 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center">
                                    <Target size={20} className="text-green-500 md:w-8 md:h-8" />
                                </div>
                            </div>

                            {/* Right Empty */}
                            <div className="hidden md:block order-3"></div>
                        </div>

                        {/* Final Statement - Cinematic Typography */}
                        <div className="mt-24 md:mt-48 text-center relative z-10 px-4">
                            <Reveal delay={0.4}>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-accent/5 blur-[80px] md:blur-[100px] rounded-full pointer-events-none -z-10"></div>

                                <h4 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-tight tracking-tight">
                                    &ldquo;I don't sell code.<br />
                                    <span className="relative inline-block mt-2">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent animate-pulse">I sell Market Dominance.&rdquo;</span>
                                        {/* Underline decoration */}
                                        <svg className="absolute -bottom-1 md:-bottom-2 w-full h-2 md:h-3 text-accent hidden md:block" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
                                        </svg>
                                    </span>
                                </h4>

                                <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-gray-400 text-base md:text-xl font-medium">
                                    <div className="hidden md:block h-px w-8 bg-gray-600"></div>
                                    <p className="text-center">Your competitors are fighting for second place.</p>
                                    <div className="hidden md:block h-px w-8 bg-gray-600"></div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
