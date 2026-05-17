"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-marble rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-glow border border-white/60"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-8 w-40 opacity-40 pointer-events-none"
          >
            <Image src="/images/column.png" alt="" width={160} height={500} loading="lazy" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute -bottom-6 -right-8 w-40 opacity-40 pointer-events-none scale-x-[-1]"
          >
            <Image src="/images/column.png" alt="" width={160} height={500} loading="lazy" />
          </motion.div>

          <div className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-5">— Sanctuarium</div>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-[1] text-balance">
            Bước vào không gian<br />
            <em className="font-italic-display text-primary">triết học của riêng bạn</em>.
          </h2>
          <p className="mt-7 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Miễn phí cho sinh viên Việt Nam. Chọn một aesthetic theme,
            đặt tên cho căn phòng của bạn — và để Athena đồng hành.
          </p>
          <button className="group mt-10 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-9 py-4 text-sm font-medium hover:scale-105 transition shadow-glow">
            Tạo sanctuary của tôi
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </button>
          <div className="mt-6 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Không cần thẻ tín dụng · 5 themes có sẵn
          </div>
        </motion.div>
      </div>
    </section>
  );
}
