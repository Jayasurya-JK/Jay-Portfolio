import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { shouldReduceMotion } from "../utils/deviceDetection";

const Reveal = ({ children, width = "100%", delay = 0.25, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
    const reduceMotion = shouldReduceMotion();

    return (
        <div ref={ref} className={className} style={{ width, position: 'relative' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: reduceMotion ? 30 : 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ 
                    duration: reduceMotion ? 0.4 : 0.8, 
                    delay, 
                    ease: [0.21, 0.47, 0.32, 0.98] 
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Reveal;
