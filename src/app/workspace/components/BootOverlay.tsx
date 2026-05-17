"use client";

import { motion, AnimatePresence } from "framer-motion";

interface BootOverlayProps {
  show: boolean;
}

export function BootOverlay({ show }: BootOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--primary) 14%, var(--background)) 0%, var(--background) 70%)",
          }}
        >
          <div className="flex flex-col items-center gap-7">
            {/* Branded spinner: dual ring around brand monogram */}
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: "var(--primary)",
                  borderRightColor:
                    "color-mix(in oklab, var(--primary) 40%, transparent)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-transparent"
                style={{
                  borderBottomColor: "var(--accent)",
                  borderLeftColor:
                    "color-mix(in oklab, var(--accent) 40%, transparent)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-marble border border-white/70 shadow-card flex items-center justify-center">
                  <span className="font-display italic text-2xl leading-none text-foreground">
                    τ
                  </span>
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="text-center space-y-1.5">
              <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                triết · ai · sanctuary
              </div>
              <div className="font-display italic text-2xl text-foreground/90">
                Đang mở phòng học của bạn...
              </div>
              <div className="font-hand text-base text-muted-foreground">
                Athena đang sắp xếp lại sổ tay ✨
              </div>
            </div>

            {/* Skeleton bars */}
            <div className="flex flex-col gap-2 w-64 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2.5 rounded-full processing-shimmer"
                  initial={{ opacity: 0, width: "40%" }}
                  animate={{ opacity: 1, width: ["55%", "92%", "70%"][i] }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
