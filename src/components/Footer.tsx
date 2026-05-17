export function Footer() {
  return (
    <footer className="relative px-6 py-16 border-t border-border/60">
      <div className="max-w-6xl mx-auto">
        <div className="divider-meander mb-12" />
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-marble flex items-center justify-center shadow-card border border-white/60">
                <span className="font-display italic text-lg leading-none">τ</span>
              </div>
              <div className="font-display text-2xl font-semibold tracking-tight">triết<span className="text-primary italic">·</span>ai</div>
            </div>
            <p className="font-display italic text-2xl text-muted-foreground mt-5 max-w-sm leading-snug">
              "Một sanctuarium dịu dàng cho thế hệ đang đi tìm câu hỏi."
            </p>
            <div className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Made in Hà Nội · MMXXVI
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-3 gap-8 text-sm">
            {[
              { h: "Atelier", l: ["AI Chat", "Flashcard", "Mindmap", "Pomodoro"] },
              { h: "Bibliotheca", l: ["Marx", "Lênin", "Hegel", "Timeline"] },
              { h: "Hỗ trợ", l: ["Liên hệ", "Bảo mật", "Điều khoản", "Discord"] },
            ].map((c) => (
              <div key={c.h}>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">{c.h}</div>
                <ul className="space-y-2.5">
                  {c.l.map((x) => (
                    <li key={x} className="font-display text-lg hover:text-primary transition cursor-pointer">{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <div>© MMXXVI · triết.ai</div>
          <div>Designed with ♡ for Vietnamese students</div>
        </div>
      </div>
    </footer>
  );
}
