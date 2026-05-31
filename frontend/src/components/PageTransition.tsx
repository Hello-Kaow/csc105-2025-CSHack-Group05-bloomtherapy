import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PageTransitionProps = {
    children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
    return (
        <div className="relative min-h-screen bg-[#eef5ec] overflow-hidden">
            {/* Soft green glow */}
            <motion.div
                className="fixed left-1/2 top-1/2 z-[1] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a8c4af]/25 blur-3xl pointer-events-none"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1.25, opacity: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                    duration: 0.55,
                    ease: "easeOut",
                }}
            />

            {/* Page content */}
            <motion.div
                className="relative z-10"
                initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.99,
                    filter: "blur(6px)",
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                }}
                exit={{
                    opacity: 0,
                    y: -6,
                    scale: 0.995,
                    filter: "blur(4px)",
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}