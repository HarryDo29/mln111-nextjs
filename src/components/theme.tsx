import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId = "athena" | "apollo" | "plato" | "sage" | "rose";

export const themes: { id: ThemeId; name: string; subtitle: string; swatch: string[] }[] = [
  { id: "athena", name: "Athena", subtitle: "Lavender wisdom", swatch: ["#e9e3f3", "#d4c4ec", "#d6b97a"] },
  { id: "apollo", name: "Apollo", subtitle: "Golden hour", swatch: ["#f5ead0", "#e8c98a", "#d6a25a"] },
  { id: "plato", name: "Plato Night", subtitle: "Quiet dusk", swatch: ["#dfe3f2", "#b8c1e0", "#7c89bd"] },
  { id: "sage", name: "Sage Garden", subtitle: "Olive grove", swatch: ["#e3ead7", "#bdcfa3", "#8aa572"] },
  { id: "rose", name: "Renaissance", subtitle: "Dusty rose", swatch: ["#f3dcd9", "#e6b8b4", "#c98a85"] },
];

const ThemeCtx = createContext<{ theme: ThemeId; setTheme: (t: ThemeId) => void }>({
  theme: "athena",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("athena");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && window.localStorage.getItem("triet-theme")) as ThemeId | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") window.localStorage.setItem("triet-theme", theme);
  }, [theme]);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
