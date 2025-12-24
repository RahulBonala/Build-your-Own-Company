'use client';

import { useBuilderStore } from '@/store/builderStore';
import { Brick } from './Brick';
import { AnimatePresence, motion } from 'framer-motion';

export const ThreeDBox = () => {
    const selections = useBuilderStore((state) => state.selections);

    // Stacking order: Design (Bottom) -> Database -> Testing -> Marketing (Top)
    // We render them in specific order.

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1000px]">
            {/* The Glass Container 
          Values optimized to fit 4 bricks perfectly without gap @ 64px height each
          4 * 64px = 256px internal content + padding.
          Height reduced to 280px to be tight.
      */}
            <motion.div
                className="relative w-64 h-[280px] bg-white/5 border border-white/20 rounded-lg flex flex-col-reverse justify-start p-2 shadow-[0_0_50px_rgba(102,252,241,0.1)] backdrop-blur-sm transform-style-3d rotate-x-6 gap-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotateX: 10 }}
                transition={{ duration: 1 }}
            >
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-lg" />

                {/* Floor */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-cyber-cyan/30 blur-md transform translate-y-1" />

                <AnimatePresence mode="popLayout">
                    {/* Render bricks from bottom up */}
                    {selections.design && (
                        <Brick key="design" category="design" type={selections.design} index={1} />
                    )}
                    {selections.database && (
                        <Brick key="database" category="database" type={selections.database} index={2} />
                    )}
                    {selections.testing && (
                        <Brick key="testing" category="testing" type={selections.testing} index={3} />
                    )}
                    {selections.marketing && (
                        <Brick key="marketing" category="marketing" type={selections.marketing} index={4} />
                    )}
                </AnimatePresence>

                {/* Empty State / Placeholder */}
                {!selections.design && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-sm uppercase tracking-widest text-center px-4">
                        Waiting for foundation
                    </div>
                )}

            </motion.div>

            {/* Pedestal Shadow */}
            <div className="absolute bottom-24 w-64 h-12 bg-black/50 blur-xl rounded-full transform rotate-x-[60deg]" />
        </div>
    );
};
