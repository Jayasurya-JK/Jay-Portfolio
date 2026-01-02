import React from 'react';
import { motion } from 'framer-motion';

const RollingText = ({ text, className = "", height = "2rem" }) => {
    return (
        <div className={`relative overflow-hidden flex ${className}`} style={{ height }}>
            {text.split("").map((letter, index) => (
                <RollingLetter key={index} letter={letter} index={index} height={height} />
            ))}
        </div>
    );
};

const RollingLetter = ({ letter, index, height }) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-start leading-none"
            animate={{ y: ["0%", "-50%"] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: [0.76, 0, 0.24, 1], // Custom bezier for premium feel
                repeatDelay: 1, // Pause between loops
                delay: index * 0.05, // Stagger effect
            }}
            style={{ height: "200%" }} // Double height to hold both copies
        >
            <span className="flex items-center justify-center" style={{ height: "50%" }}>
                {letter === " " ? "\u00A0" : letter}
            </span>
            <span className="flex items-center justify-center text-amber-400" style={{ height: "50%" }}>
                {letter === " " ? "\u00A0" : letter}
            </span>
        </motion.div>
    );
};

export default RollingText;
