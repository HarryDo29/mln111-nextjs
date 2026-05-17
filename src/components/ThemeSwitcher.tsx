import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { themes, useTheme } from "./theme";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full glass w-10 h-10 flex items-center justify-center hover:scale-105 transition shadow-card"
        aria-label="Đổi theme"
      >
        <Palette className="w-4 h-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-12 w-72 glass rounded-3xl p-4 shadow-glow z-50"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 px-2">
              Aesthetic Themes
            </div>
            <div className="space-y-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTheme(t.id); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-white/60 transition text-left"
                >
                  <div className="flex -space-x-1.5">
                    {t.swatch.map((c, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-base leading-tight">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.subtitle}</div>
                  </div>
                  {theme === t.id && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
