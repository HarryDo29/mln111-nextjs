"use client";

import { motion } from "framer-motion";

const thinkers = [
  { year: "1818", name: "Karl Marx", note: "Ra đời tại Trier — đặt nền cho duy vật lịch sử." },
  { year: "1844", name: "Bản thảo kinh tế-triết học", note: "Khái niệm tha hoá lao động." },
  { year: "1848", name: "Tuyên ngôn", note: "Marx & Engels — bóng dáng một thời đại." },
  { year: "1867", name: "Tư bản · Quyển I", note: "Phân tích phương thức sản xuất tư bản." },
  { year: "1908", name: "Lênin · Chủ nghĩa duy vật", note: "Bảo vệ duy vật biện chứng." },
  { year: "1917", name: "Cách mạng Tháng Mười", note: "Triết học bước vào lịch sử." },
];

export function Thinkers() {
  return (
    <section id="thinkers" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">— Timeline · Thinkers</div>
          <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] text-balance">
            Những bộ óc đã <em className="font-italic-display text-primary">nhuộm màu</em><br />một thế kỷ.
          </h2>
        </motion.div>

        <div className="relative">
          {/* central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-14">
            {thinkers.map((t, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative grid md:grid-cols-2 gap-6 items-center ${isLeft ? "" : "md:[&>*:first-child]:order-2"}`}
                >
                  <div className={`md:px-10 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <div className="font-display text-5xl md:text-6xl text-primary leading-none">{t.year}</div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2">Anno</div>
                  </div>
                  <div className={`relative md:px-10 ${isLeft ? "md:text-left" : "md:text-right"}`}>
                    {/* dot */}
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-background border-2 border-gold shadow-soft"
                         style={isLeft ? { left: "-6px" } : { right: "-6px" }} />
                    <div className="bg-card border border-border/70 rounded-3xl p-6 shadow-card hover:shadow-glow transition">
                      <div className="font-display text-2xl mb-1.5">{t.name}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{t.note}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
