"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[min(95%,1180px)]"
    >
      <div className="glass rounded-full pl-6 pr-3 py-2.5 flex items-center justify-between shadow-soft">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-marble flex items-center justify-center shadow-card border border-white/60">
            <span className="font-display italic text-lg leading-none">τ</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold tracking-tight">triết<span className="text-primary italic">·</span>ai</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground -mt-0.5">sanctuarium</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Atelier</a>
          <a href="#visual" className="hover:text-foreground transition">Visual Memory</a>
          <a href="#thinkers" className="hover:text-foreground transition">Thinkers</a>
          <a href="#stories" className="hover:text-foreground transition">Voices</a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Link href="/workspace" className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-[13px] font-medium hover:scale-[1.03] transition shadow-card">
            Vào sanctuary
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
