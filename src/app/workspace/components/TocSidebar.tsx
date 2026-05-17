"use client";

import Link from "next/link";
import { ArrowLeft, BookMarked, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Thread } from "./types";

interface TocSidebarProps {
  threads: Thread[];
  activeId: string;
  onJump: (id: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
}

export function TocSidebar({
  threads,
  activeId,
  onJump,
  mobileOpen,
  onClose,
}: TocSidebarProps) {
  return (
    <aside
      style={{ gridColumn: "toc" }}
      className={`
        z-40 bg-background/85 backdrop-blur-xl border-r border-border/60
        flex flex-col md:w-[300px] md:h-screen md:sticky md:top-0
        fixed inset-y-0 left-0 w-[85vw] max-w-[320px]
        transition-transform duration-300 ease-out
        ${mobileOpen ? "translate-x-0 shadow-glow" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Header */}
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Về sanctuary
          </Link>
          <button
            onClick={onClose}
            className="md:hidden w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-marble flex items-center justify-center border border-white/60 shadow-card">
            <BookMarked className="w-4 h-4 text-primary" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold">Mục lục</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground -mt-0.5">
              {threads.length} câu hỏi
            </div>
          </div>
        </div>
      </div>

      {/* Thread list */}
      <ScrollArea className="flex-1 min-h-0">
        <ol className="p-3 space-y-1 relative">
          {/* timeline rail */}
          <div className="absolute left-[1.4rem] top-3 bottom-3 w-px bg-border/70" />
          {threads.map((t, i) => {
            const isActive = t.id === activeId;
            return (
              <li key={t.id} className="relative">
                <button
                  onClick={() => onJump(t.id)}
                  className={`group w-full text-left rounded-2xl pl-9 pr-3 py-2.5 transition-all ${
                    isActive
                      ? "bg-primary/8"
                      : "hover:bg-white/60 opacity-75 hover:opacity-100"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor:
                            "color-mix(in oklab, var(--primary) 10%, transparent)",
                        }
                      : undefined
                  }
                >
                  {/* node dot */}
                  <span
                    className={`absolute left-[1.05rem] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-all ${
                      isActive
                        ? "bg-primary border-primary scale-125"
                        : "bg-background border-border group-hover:border-primary/60"
                    }`}
                  />
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-[10px] font-display tabular-nums ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm leading-snug ${
                        isActive
                          ? "text-foreground font-medium"
                          : "text-foreground/80"
                      }`}
                    >
                      {t.title}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </ScrollArea>

      {/* Footer hint */}
      <div className="p-4 border-t border-border/50 text-[11px] text-muted-foreground font-hand text-sm text-center">
        ✦ cuộn ở khung chính — mục lục sẽ tự đi theo bạn
      </div>
    </aside>
  );
}
