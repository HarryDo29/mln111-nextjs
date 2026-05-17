"use client";

import { motion } from "framer-motion";

const float = (delay: number, y: number) => ({
  animate: { y: [0, -y, 0], rotate: [0, 5, -3, 0] },
  transition: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut" as const, delay },
});

export function FloatingDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        {...float(0, 18)}
        className="absolute top-[15%] left-[8%] w-20 h-20 rounded-3xl bg-gradient-sunset shadow-glow rotate-12"
      />
      <motion.div
        {...float(1.2, 14)}
        className="absolute top-[25%] right-[10%] w-16 h-16 rounded-full"
        style={{ background: "var(--pastel-blue)", boxShadow: "var(--shadow-glow)" }}
      />
      <motion.div
        {...float(0.6, 22)}
        className="absolute bottom-[18%] left-[12%] w-14 h-14 rounded-2xl"
        style={{ background: "var(--pastel-purple)", boxShadow: "var(--shadow-soft)" }}
      />
      <motion.div
        {...float(2, 12)}
        className="absolute top-[55%] right-[18%] w-10 h-10 rounded-full"
        style={{ background: "var(--pastel-pink)", boxShadow: "var(--shadow-soft)" }}
      />
      <motion.div
        {...float(1.6, 20)}
        className="absolute bottom-[28%] right-[6%] w-24 h-24 rounded-[40%] rotate-12"
        style={{ background: "var(--pastel-mint)", opacity: 0.7 }}
      />
      {/* sparkle */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-[40%] left-[45%] text-3xl"
      >✦</motion.div>
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        className="absolute top-[20%] left-[50%] text-2xl text-primary"
      >✿</motion.div>
    </div>
  );
}
