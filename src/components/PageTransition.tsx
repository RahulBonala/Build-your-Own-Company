'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(8px)',
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
    },
    exit: {
        opacity: 0,
        y: -20,
        filter: 'blur(8px)',
    },
};

export default function PageTransition({ children }: PageTransitionProps) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
