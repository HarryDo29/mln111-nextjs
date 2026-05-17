"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ListTree } from "lucide-react";
import { ThemeProvider } from "@/components/theme";
import {
  BootOverlay,
  MessageComposer,
  ProcessingAnswer,
  ThreadSection,
  TocSidebar,
  type Thread,
  SEED,
} from "./components";

/* ------------------------------------------------------------------ */
/*  Root export — wraps Workspace in ThemeProvider                     */
/* ------------------------------------------------------------------ */
export function WorkspaceClient() {
  return (
    <ThemeProvider>
      <Workspace />
    </ThemeProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Workspace — owns all state & scroll logic                          */
/* ------------------------------------------------------------------ */
function Workspace() {
  const [threads, setThreads] = useState<Thread[]>(SEED);
  const [activeId, setActiveId] = useState<string>(SEED[0].id);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [booting, setBooting] = useState(true);

  const streamRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const userScrollLockRef = useRef(false);

  /** Register/unregister a thread section DOM node for scroll tracking */
  const registerSection = useCallback((id: string, el: HTMLElement | null) => {
    if (!el) sectionRefs.current.delete(id);
    else sectionRefs.current.set(id, el);
  }, []);

  /* Boot overlay: wait until all seed sections are in the DOM */
  useEffect(() => {
    if (!booting) return;
    let raf = 0;
    const start = performance.now();
    const check = () => {
      const ready = SEED.every((t) => sectionRefs.current.has(t.id));
      if (ready && performance.now() - start > 700) {
        setBooting(false);
        return;
      }
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, [booting]);

  /* Intersection Observer: highlight TOC item as user scrolls */
  useEffect(() => {
    const root = streamRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (userScrollLockRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).dataset.threadId;
          if (id && id !== activeId) setActiveId(id);
        }
      },
      {
        root,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threads.length, activeId]);

  function jumpTo(id: string) {
    setActiveId(id);
    setTocOpen(false);
    const el = sectionRefs.current.get(id);
    if (!el) return;
    userScrollLockRef.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => (userScrollLockRef.current = false), 700);
  }

  function send() {
    const text = input.trim();
    if (!text || isThinking) return;

    const id = `t-${Date.now()}`;
    const newThread: Thread = {
      id,
      title: text.length > 60 ? text.slice(0, 58) + "…" : text,
      messages: [{ id: `${id}-q`, role: "user", content: text }],
    };

    setThreads((ts) => [...ts, newThread]);
    setInput("");
    setIsThinking(true);

    // Scroll to the new question once it mounts
    requestAnimationFrame(() => {
      userScrollLockRef.current = true;
      sectionRefs.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      window.setTimeout(() => (userScrollLockRef.current = false), 700);
    });

    // Simulate AI response
    setTimeout(() => {
      setThreads((ts) =>
        ts.map((t) =>
          t.id !== id
            ? t
            : {
                ...t,
                messages: [
                  ...t.messages,
                  {
                    id: `${id}-a`,
                    role: "ai",
                    content:
                      "Câu hỏi rất hay ✨ Mình sẽ chia nhỏ vấn đề: trước hết hãy nhìn vào bản chất khái niệm, sau đó liên hệ với một ví dụ thực tiễn gần gũi với bạn — như cách một thói quen nhỏ cũng có thể tạo nên thay đổi về chất.",
                  },
                ],
              }
        )
      );
      setIsThinking(false);
    }, 1700);
  }

  const totalMessages = useMemo(
    () => threads.reduce((n, t) => n + t.messages.length, 0),
    [threads]
  );

  return (
    <>
      <BootOverlay show={booting} />

      <div
        className="min-h-screen w-full md:h-screen md:overflow-hidden relative"
        style={{ display: "grid", gridTemplateColumns: "[toc] auto [stream] 1fr" }}
      >
        {/* TOC sidebar */}
        <TocSidebar
          threads={threads}
          activeId={activeId}
          onJump={jumpTo}
          mobileOpen={tocOpen}
          onClose={() => setTocOpen(false)}
        />

        {/* Mobile backdrop */}
        <AnimatePresence>
          {tocOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTocOpen(false)}
              className="md:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30"
              aria-label="Đóng mục lục"
            />
          )}
        </AnimatePresence>

        {/* Main stream */}
        <section
          style={{ gridColumn: "stream" }}
          className="flex flex-col min-w-0 md:h-screen relative"
        >
          {/* Stream header */}
          <header className="px-5 md:px-10 py-4 md:py-5 border-b border-border/50 bg-background/60 backdrop-blur-xl flex items-center justify-between gap-3 sticky top-0 z-10">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Athena · dòng thời gian học tập
              </div>
              <h1 className="font-display text-xl md:text-3xl mt-0.5 truncate">
                Phòng học của Linh
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              {totalMessages} đoạn hội thoại
            </div>
          </header>

          {/* Thread stream */}
          <div ref={streamRef} className="flex-1 min-h-0 overflow-y-auto stream-smooth">
            <div className="px-4 md:px-12 py-10 max-w-3xl mx-auto w-full space-y-14">
              {threads.map((t, idx) => (
                <ThreadSection
                  key={t.id}
                  thread={t}
                  index={idx}
                  isActive={t.id === activeId}
                  registerSection={registerSection}
                />
              ))}
              {isThinking && <ProcessingAnswer />}
              <div className="h-32" />
            </div>
          </div>

          {/* Composer */}
          <MessageComposer
            input={input}
            isThinking={isThinking}
            onChange={setInput}
            onSend={send}
          />

          {/* Mobile floating TOC button */}
          <button
            onClick={() => setTocOpen(true)}
            className="md:hidden fixed bottom-24 right-5 z-20 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium shadow-glow hover:scale-[1.04] transition"
          >
            <ListTree className="w-4 h-4" />
            Mục lục
          </button>
        </section>
      </div>
    </>
  );
}
