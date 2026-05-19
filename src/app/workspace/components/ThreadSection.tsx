"use client";

import type { Thread } from "./types";
import { ChatBubble } from "./ChatBubble";

interface ThreadSectionProps {
  thread: Thread;
  index: number;
  isActive: boolean;
  registerSection: (id: string, el: HTMLElement | null) => void;
}

export function ThreadSection({
  thread,
  index,
  isActive,
  registerSection,
}: ThreadSectionProps) {
  return (
    <section
      ref={(el) => registerSection(thread.id, el)}
      data-thread-id={thread.id}
      className="scroll-mt-6 space-y-4"
      id={`thread-${thread.id}`}
    >
      {/* Section header / anchor label */}
      <div className="flex items-center gap-3">
        <div
          className={`text-[10px] tracking-[0.3em] uppercase font-display transition-colors ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`}
        >
          §{String(index + 1).padStart(2, "00")}
        </div>
        <div
          className="h-px flex-1 transition-colors"
          style={{
            background: isActive
              ? "color-mix(in oklab, var(--primary) 50%, transparent)"
              : "var(--border)",
          }}
        />
      </div>

      {thread.messages.map((m) => (
        <ChatBubble key={m.id} message={m} />
      ))}
    </section>
  );
}
