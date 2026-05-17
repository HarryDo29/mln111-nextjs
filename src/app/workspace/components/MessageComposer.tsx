"use client";

import { Send } from "lucide-react";

interface MessageComposerProps {
  input: string;
  isThinking: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function MessageComposer({
  input,
  isThinking,
  onChange,
  onSend,
}: MessageComposerProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="px-4 md:px-10 pb-5 pt-3 border-t border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="max-w-3xl mx-auto">
        <div className="glass rounded-3xl p-2 pl-5 flex items-center gap-3 shadow-soft border border-white/60">
          <input
            value={input}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Hỏi Athena một câu mới — sẽ được nối vào cuối dòng thời gian..."
            className="flex-1 bg-transparent text-[15px] py-3 placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={onSend}
            disabled={!input.trim() || isThinking}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium disabled:opacity-40 hover:scale-[1.03] transition shadow-card"
          >
            Gửi <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-[11px] text-muted-foreground text-center mt-2 font-hand text-sm">
          ✨ một dòng cuộn duy nhất — câu hỏi mới luôn nằm ở dưới cùng
        </div>
      </div>
    </div>
  );
}
