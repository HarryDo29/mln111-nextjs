"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Sparkles, BookMarked, X, ListTree } from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = { id: string; role: "user" | "ai"; content: string };
type Thread = { id: string; title: string; messages: Message[] };

const SEED: Thread[] = [
  {
    id: "t1",
    title: "Bản chất của thực tại",
    messages: [
      {
        id: "t1-q",
        role: "user",
        content: "Thực tại có tồn tại độc lập với nhận thức của con người không?",
      },
      {
        id: "t1-a",
        role: "ai",
        content:
          "Đây là câu hỏi trung tâm của nhận thức luận. Chủ nghĩa duy vật cho rằng thực tại tồn tại khách quan, độc lập với ý thức; trong khi chủ nghĩa duy tâm lại nhấn mạnh vai trò của nhận thức trong việc cấu thành thế giới.",
      },
    ],
  },
  {
    id: "t2",
    title: "Tự do và tất yếu",
    messages: [
      {
        id: "t2-q",
        role: "user",
        content: "Con người có thực sự tự do hay mọi thứ đều bị quyết định bởi hoàn cảnh?",
      },
      {
        id: "t2-a",
        role: "ai",
        content:
          "Triết học nhìn nhận tự do không phải là không có ràng buộc, mà là nhận thức được cái tất yếu và hành động phù hợp với nó. Tự do nằm trong sự hiểu biết và làm chủ điều kiện của mình.",
      },
    ],
  },
  {
    id: "t3",
    title: "Ý thức và vật chất",
    messages: [
      {
        id: "t3-q",
        role: "user",
        content: "Ý thức là sản phẩm của bộ não hay có tồn tại độc lập?",
      },
      {
        id: "t3-a",
        role: "ai",
        content:
          "Theo quan điểm duy vật, ý thức là sản phẩm của bộ não và phản ánh thế giới vật chất. Tuy nhiên, nhiều trường phái khác vẫn tranh luận về khả năng tồn tại độc lập của ý thức.",
      },
    ],
  },
  {
    id: "t4",
    title: "Ý nghĩa cuộc sống",
    messages: [
      {
        id: "t4-q",
        role: "user",
        content: "Cuộc sống có ý nghĩa sẵn hay con người phải tự tạo ra ý nghĩa?",
      },
      {
        id: "t4-a",
        role: "ai",
        content:
          "Chủ nghĩa hiện sinh cho rằng cuộc sống không có ý nghĩa sẵn — chính con người thông qua lựa chọn và hành động của mình tạo ra ý nghĩa cho tồn tại của mình.",
      },
    ],
  },
  {
    id: "t5",
    title: "Nhận thức chân lý",
    messages: [
      {
        id: "t5-q",
        role: "user",
        content: "Làm sao để biết một điều gì đó là chân lý?",
      },
      {
        id: "t5-a",
        role: "ai",
        content:
          "Trong triết học, chân lý thường được kiểm chứng qua thực tiễn. Một nhận thức được coi là chân lý khi nó phản ánh đúng hiện thực và được kiểm nghiệm qua hành động thực tế.",
      },
    ],
  },
];

export function WorkspaceClient() {
  return (
    <ThemeProvider>
      <Workspace />
    </ThemeProvider>
  );
}

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

  const registerSection = useCallback((id: string, el: HTMLElement | null) => {
    if (!el) sectionRefs.current.delete(id);
    else sectionRefs.current.set(id, el);
  }, []);

  /* Initial overlay — fades out only after every history section has
     mounted into the DOM, so the user lands on a fully ready stream. */
  useEffect(() => {
    if (!booting) return;
    let raf = 0;
    const start = performance.now();
    const check = () => {
      const ready = SEED.every((t) => sectionRefs.current.has(t.id));
      const elapsed = performance.now() - start;
      if (ready && elapsed > 700) {
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
        // trigger when section's top crosses ~30% from the top of stream
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
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
    window.setTimeout(() => {
      userScrollLockRef.current = false;
    }, 700);
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
    // scroll to new question
    requestAnimationFrame(() => {
      userScrollLockRef.current = true;
      sectionRefs.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      window.setTimeout(() => (userScrollLockRef.current = false), 700);
    });
    setTimeout(() => {
      setThreads((ts) =>
        ts.map((t) =>
          t.id === id
            ? {
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
            : t,
        ),
      );
      setIsThinking(false);
    }, 1700);
  }

  const totalMessages = useMemo(
    () => threads.reduce((n, t) => n + t.messages.length, 0),
    [threads],
  );

  return (
    <>
      <BootOverlay show={booting} />
      <div
        className="min-h-screen w-full md:h-screen md:overflow-hidden relative"
        style={{
          display: "grid",
          gridTemplateColumns: "[toc] auto [stream] 1fr",
        }}
      >
        {/* TOC sidebar — desktop in grid; mobile slides in */}
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
          <div className="px-4 md:px-10 pb-5 pt-3 border-t border-border/40 bg-background/70 backdrop-blur-xl">
            <div className="max-w-3xl mx-auto">
              <div className="glass rounded-3xl p-2 pl-5 flex items-center gap-3 shadow-soft border border-white/60">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())
                  }
                  placeholder="Hỏi Athena một câu mới — sẽ được nối vào cuối dòng thời gian..."
                  className="flex-1 bg-transparent text-[15px] py-3 placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={send}
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

/* --------------------------- TOC Sidebar --------------------------- */

function TocSidebar({
  threads,
  activeId,
  onJump,
  mobileOpen,
  onClose,
}: {
  threads: Thread[];
  activeId: string;
  onJump: (id: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
}) {
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
                    isActive ? "bg-primary/8" : "hover:bg-white/60 opacity-75 hover:opacity-100"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: "color-mix(in oklab, var(--primary) 10%, transparent)",
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
                        isActive ? "text-foreground font-medium" : "text-foreground/80"
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

      <div className="p-4 border-t border-border/50 text-[11px] text-muted-foreground font-hand text-sm text-center">
        ✦ cuộn ở khung chính — mục lục sẽ tự đi theo bạn
      </div>
    </aside>
  );
}

/* --------------------------- Thread section --------------------------- */

function ThreadSection({
  thread,
  index,
  isActive,
  registerSection,
}: {
  thread: Thread;
  index: number;
  isActive: boolean;
  registerSection: (id: string, el: HTMLElement | null) => void;
}) {
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
          §{String(index + 1).padStart(2, "0")}
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

/* --------------------------- Chat bubble --------------------------- */

function ChatBubble({ message }: { message: Message }) {
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

/* --------------------------- Processing answer --------------------------- */

function ProcessingAnswer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-3 justify-start"
    >
      <div className="w-9 h-9 rounded-full bg-gradient-marble border border-white/60 shadow-card flex items-center justify-center shrink-0">
        <span className="font-display italic text-base">A</span>
      </div>
      <div
        className="processing-shimmer relative overflow-hidden rounded-[28px] rounded-bl-md px-5 py-3.5 shadow-card border-2"
        style={{
          borderColor: "color-mix(in oklab, var(--primary) 40%, transparent)",
        }}
      >
        <div className="relative flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
          <span className="text-sm font-display italic text-foreground/80">
            Bot đang chuẩn bị nội dung...
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* --------------------------- Boot overlay --------------------------- */

function BootOverlay({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--primary) 14%, var(--background)) 0%, var(--background) 70%)",
          }}
        >
          <div className="flex flex-col items-center gap-7">
            {/* Branded spinner: dual ring around brand monogram */}
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: "var(--primary)",
                  borderRightColor: "color-mix(in oklab, var(--primary) 40%, transparent)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-transparent"
                style={{
                  borderBottomColor: "var(--accent)",
                  borderLeftColor: "color-mix(in oklab, var(--accent) 40%, transparent)",
                }}
                animate={{ rotate: -360 }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-marble border border-white/70 shadow-card flex items-center justify-center">
                  <span className="font-display italic text-2xl leading-none text-foreground">
                    τ
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-1.5">
              <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                triết · ai · sanctuary
              </div>
              <div className="font-display italic text-2xl text-foreground/90">
                Đang mở phòng học của bạn...
              </div>
              <div className="font-hand text-base text-muted-foreground">
                Athena đang sắp xếp lại sổ tay ✨
              </div>
            </div>

            {/* Skeleton hint of the timeline being prepared */}
            <div className="flex flex-col gap-2 w-64 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2.5 rounded-full processing-shimmer"
                  initial={{ opacity: 0, width: "40%" }}
                  animate={{
                    opacity: 1,
                    width: ["55%", "92%", "70%"][i],
                  }}
                  transition={{
                    delay: 0.2 + i * 0.12,
                    duration: 0.6,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
