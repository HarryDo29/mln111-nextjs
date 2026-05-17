"use client";

import { motion } from "framer-motion";

const stories = [
  {
    name: "Minh Anh", role: "K22 · KHXH&NV",
    quote: "Lần đầu mình thấy học triết... đẹp như đi xem triển lãm. Athena theme là chân ái.",
    color: "var(--lavender)", rotate: -1.5,
  },
  {
    name: "Quang Huy", role: "K23 · Bách Khoa",
    quote: "Mindmap cẩm thạch của triết.ai cứu mình mùa thi. Mình nhớ bài qua màu sắc và bố cục.",
    color: "var(--cream)", rotate: 1,
  },
  {
    name: "Thảo Vy", role: "K22 · Kinh Tế",
    quote: "Pomodoro + nhạc nguyện đường + AI giảng giải = không gian học mơ ước của mình.",
    color: "var(--rose)", rotate: -1,
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">— Voices · Anno MMXXVI</div>
          <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] text-balance">
            Hơn 2.000 sinh viên<br />
            đã <em className="font-italic-display text-primary">yêu</em> triết học.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, rotate: s.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ rotate: 0, y: -8 }}
              className="rounded-3xl p-8 shadow-card hover:shadow-glow transition-all border border-white/40"
              style={{ background: s.color }}
            >
              <div className="font-display text-4xl text-foreground/30 leading-none">"</div>
              <p className="font-display italic text-2xl leading-snug text-foreground/85 mt-2">
                {s.quote}
              </p>
              <div className="mt-8 pt-5 border-t border-foreground/15">
                <div className="font-medium text-sm">{s.name}</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/60 mt-1">{s.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
