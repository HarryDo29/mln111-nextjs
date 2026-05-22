"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* floating decor */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[4%] w-24 md:w-32 opacity-70 pointer-events-none select-none"
      >
        <Image src="/images/column.png" alt="" width={128} height={400} className="w-full h-auto" />
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-[6%] w-40 h-40 rounded-full border border-gold/40 pointer-events-none"
        style={{ background: "radial-gradient(circle, transparent 65%, var(--gold) 65.5%, transparent 67%)" }}
      />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-7"
          >
            <span className="w-8 h-px bg-gold/60" />
            Vol. I — Anno MMXXVI
            <span className="w-8 h-px bg-gold/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[48px] md:text-[78px] leading-[0.95] font-medium text-balance"
          >
            <em className="font-italic-display text-primary">Triết học</em> cho thế<br />
            hệ đang tìm cách<br />
            hiểu thế giới.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            triết.ai là không gian học triết Mác — Lênin lấy cảm hứng từ những hiên đá Hy Lạp,
            nơi AI giảng giải nhẹ nhàng, sổ tay viết tay và những bức tượng cẩm thạch
            cùng bạn đi qua từng khái niệm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-9 flex flex-wrap gap-3 items-center"
          >
            <Link
              href="/workspace"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm font-medium hover:scale-[1.03] transition shadow-glow"
            >
              Mở phòng học của tôi
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
            <button className="rounded-full glass px-7 py-4 text-sm font-medium hover:bg-white/80 transition">
              Khám phá <em className="font-italic-display">Athena</em> ✦
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center gap-5 text-xs text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {["#e9e3f3", "#f5ead0", "#dfe3f2", "#e3ead7"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-background shadow-sm" style={{ background: c }} />
              ))}
            </div>
            <div>
              <div className="font-medium text-foreground/80">2.481 sinh viên</div>
              <div className="opacity-70">đang học cùng nhau hôm nay</div>
            </div>
            <div className="hidden md:block h-8 w-px bg-border" />
            <div className="hidden md:block">
              <div className="font-medium text-foreground/80">★ ★ ★ ★ ★</div>
              <div className="opacity-70">&quot;Như một bài thơ về triết học&quot;</div>
            </div>
          </motion.div>
        </div>

        {/* Hero statue */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:col-span-5 relative"
        >
          <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-gradient-marble shadow-glow border border-white/70">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/images/hero-statue.png"
                alt="Greek philosopher bust"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            {/* corner ornaments */}
            <div className="absolute top-4 left-4 text-xs tracking-[0.3em] uppercase text-foreground/60">N°.01</div>
            <div className="absolute top-4 right-4 text-xs italic text-foreground/60 font-display">Sophia</div>
            <div className="absolute bottom-5 left-0 right-0 px-6">
              <div className="divider-meander mb-3" />
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">Marble Study · 2026</div>
                  <div className="font-display italic text-2xl mt-1">&quot;Philosophy of Marxism - Leninism&quot;</div>
                </div>
              </div>
            </div>
          </div>

          {/* floating chat card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -left-6 md:-left-16 top-16 w-56 glass rounded-3xl p-4 shadow-soft"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground">AI · Athena</span>
            </div>
            <p className="text-sm leading-snug">Để mình kể bạn nghe về <em className="font-italic-display text-primary">phép biện chứng</em> qua một ly trà chiều nhé...</p>
          </motion.div>

          {/* sticky note */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 6 }}
            transition={{ delay: 1.1 }}
            className="absolute -bottom-4 -right-4 md:-right-10 w-44 p-4 rounded-2xl shadow-card"
            style={{ background: "var(--cream)" }}
          >
            <p className="font-hand text-lg leading-tight text-foreground/80">
              hôm nay học về<br /><span className="text-primary">lý luận nhận thức &amp; </span> ♡
            </p>
            <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-foreground/50">— sổ tay của Linh</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
