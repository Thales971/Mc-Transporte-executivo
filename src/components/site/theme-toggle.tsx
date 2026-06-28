"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] transition-all hover:bg-[#d4af37]/15 hover:border-[#d4af37]/60",
        className
      )}
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px] transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="h-[18px] w-[18px] transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}
