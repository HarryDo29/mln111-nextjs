"use client";

import { motion } from "framer-motion";

export function ProcessingAnswer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-3 justify-start"
    >
      <div className="w-9 h-9 rounded-full bg-gradient-marble border border-white/60 shadow-card flex items-center justify-center shrink-0">
        <span className="font-display italic text-base">A</span>
      </div>
      <div
        className="processing-shimmer relative overflow-hidden rounded-[28px] rounded-bl-md px-5 py-3.5 shadow-card border-2"
        style={{
          borderColor: "color-mix(in oklab, var(--primary) 40%, transparent)",
        }}
      >
        <div className="relative flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <span className="text-sm font-display italic text-foreground/80">
            Bot đang chuẩn bị nội dung...
          </span>
        </div>
      </div>
    </motion.div>
  );
}
