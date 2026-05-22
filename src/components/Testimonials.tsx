"use client";

import { motion } from "framer-motion";

const stories = [
  {
    name: "Triết Học Mác - Lênin",
    quote: "Từ trực quan sinh động đến tư duy trừu tượng, từ tư duy trừu tượng đến thực tiễn - đó là con đường biện chứng của sự nhận thức chân lý, của sự nhận thức hiện thực khách quan.",
    color: "var(--lavender)", rotate: -1.5,
  },
  {
    name: "Triết Học Mác - Lênin",
    quote: "Dứt khoát là không có và không thể có bất kỳ sự khác nhau nào về nguyên tắc giữa hiện tượng và vật tự nó. Chỉ có sự khác nhau giữa cái đã được nhận thức và cái chưa được nhận thức.",
    color: "var(--cream)", rotate: 1,
  },
  {
    name: "Triết Học Mác - Lênin",
    quote: "Thực tiễn mà chúng ta dùng làm tiêu chuẩn trong lý luận về nhận thức, phải bao gồm cả thực tiền của những sự quan sát, những sự phát hiện về thiên văn học",
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
            Trích dẫn của Lenin
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
