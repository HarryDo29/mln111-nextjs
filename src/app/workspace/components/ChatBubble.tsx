"use client";

import { motion } from "framer-motion";
import type { Message } from "./types";

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-marble border border-white/60 shadow-card flex items-center justify-center shrink-0">
          <span className="font-display italic text-base">A</span>
        </div>
      )}
      <div
        className={`max-w-[78%] px-5 py-3.5 text-[15px] leading-relaxed shadow-card ${
          isUser
            ? "bg-card text-card-foreground rounded-[28px] rounded-br-md border-2"
            : "bg-card border border-white/70 text-card-foreground rounded-[28px] rounded-bl-md"
        }`}
        style={isUser ? { borderColor: "var(--primary)" } : undefined}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
