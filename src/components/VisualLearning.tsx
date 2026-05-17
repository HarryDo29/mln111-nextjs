"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function VisualLearning() {
  return (
    <section id="visual" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] bg-gradient-marble border border-white/60 shadow-soft p-8 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/athena.png"
                  alt="Athena bust"
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </motion.div>
              {/* orbit ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-dashed border-foreground/15"
              />
              {/* concept tags floating */}
              {[
                { top: "10%", left: "8%", label: "Vận động" },
                { top: "20%", right: "6%", label: "Mâu thuẫn" },
                { bottom: "22%", left: "4%", label: "Lượng" },
                { bottom: "12%", right: "10%", label: "Chất" },
              ].map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="absolute glass rounded-full px-3 py-1.5 text-xs font-medium shadow-soft"
                  style={tag as React.CSSProperties}
                >
                  {tag.label}
                </motion.div>
              ))}
              <div className="absolute top-5 left-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">Plate II</div>
              <div className="absolute bottom-5 right-6 font-display italic text-foreground/60">Athena</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7"
          >
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">— Visual memory</div>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] text-balance">
              Khái niệm trừu tượng,<br />
              <em className="font-italic-display text-primary">kể bằng hình ảnh</em>.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
              Duy vật biện chứng, mâu thuẫn, lượng – chất... AI vẽ chúng thành mindmap cẩm thạch,
              timeline có hồn và những thẻ ký ức mang sắc pastel để bạn nhớ lâu gấp ba lần.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { k: "Mindmap", v: "12 mẫu", c: "var(--lavender)" },
                { k: "Timeline", v: "1818 → 1924", c: "var(--gold)" },
                { k: "Memory cards", v: "240+ thẻ", c: "var(--rose)" },
              ].map((s) => (
                <div key={s.k} className="bg-card rounded-2xl border border-border/70 p-5 shadow-card">
                  <div className="w-8 h-8 rounded-lg shadow-soft mb-3" style={{ background: s.c }} />
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.k}</div>
                  <div className="font-display text-xl mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
