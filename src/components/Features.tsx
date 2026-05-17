"use client";

import { motion } from "framer-motion";
import { MessageCircle, BookOpen, Brain, NotebookPen, Timer, Music, Bookmark, Sparkles } from "lucide-react";

const features = [
  { num: "01", icon: MessageCircle, title: "Đối thoại Socratic", desc: "AI giảng triết bằng tiếng Việt như một người thầy ngồi cạnh bạn." },
  { num: "02", icon: BookOpen, title: "Lược ký bài học", desc: "Tóm tắt chương sách thành ghi chú nghệ thuật, dễ thấm." },
  { num: "03", icon: Brain, title: "Flashcard cẩm thạch", desc: "Thẻ ôn tập cá nhân hoá theo trí nhớ và nhịp học của bạn." },
  { num: "04", icon: NotebookPen, title: "Sổ tay viết tay", desc: "Highlight, sticky note và mood journal trong một không gian." },
  { num: "05", icon: Timer, title: "Pomodoro Olympus", desc: "Bộ đếm tập trung với chuông gió và nhịp thở dịu nhẹ." },
  { num: "06", icon: Music, title: "Âm thanh nguyện đường", desc: "Lo-fi, mưa, lửa cháy — chọn không gian âm thanh của bạn." },
  { num: "07", icon: Bookmark, title: "Thư viện Alexandria", desc: "Lưu trích dẫn, đoạn văn, khái niệm yêu thích vào kho riêng." },
  { num: "08", icon: Sparkles, title: "Lộ trình thi cử", desc: "AI dự đoán câu hỏi và sắp lịch ôn cho từng tuần học." },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-12 gap-8 items-end mb-16"
        >
          <div className="md:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">— Atelier · 08 chambers</div>
            <h2 className="font-display text-5xl md:text-6xl font-medium leading-[1.05] text-balance">
              Tám căn phòng cho<br />
              <em className="font-italic-display text-primary">một tâm trí đang lớn</em>.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-muted-foreground leading-relaxed">
              Mỗi tính năng được điêu khắc như một bức tượng — riêng biệt, có hơi thở,
              nhưng cùng đứng trong một thánh đường.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 rounded-3xl overflow-hidden border border-border/60">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group bg-card p-7 hover:bg-gradient-marble transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="text-[10px] tracking-[0.3em] text-muted-foreground">{f.num}</div>
                <div className="w-10 h-10 rounded-full bg-background border border-border/80 flex items-center justify-center group-hover:rotate-12 group-hover:bg-gradient-gold group-hover:border-gold/50 transition-all duration-500">
                  <f.icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-display text-2xl leading-tight mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
