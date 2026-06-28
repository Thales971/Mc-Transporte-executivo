"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setTooltipOpen(true), 1500);
    const t2 = setTimeout(() => setTooltipOpen(false), 8000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [visible]);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-50 flex items-center gap-3 transition-all duration-500",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      {/* Tooltip / balão */}
      <div
        className={cn(
          "relative hidden sm:block max-w-[220px] rounded-xl border border-[#d4af37]/30 bg-card px-4 py-3 shadow-xl transition-all duration-300",
          tooltipOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        )}
      >
        <button
          onClick={() => setTooltipOpen(false)}
          className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
          aria-label="Fechar"
        >
          <X className="h-3 w-3" />
        </button>
        <p className="text-sm text-foreground">
          Precisa de um transporte agora?
        </p>
        <p className="mt-0.5 text-xs text-[#d4af37] font-medium">
          Fale com o Milton no WhatsApp 👉
        </p>
      </div>

      {/* Botão */}
      <a
        href={whatsappLink(
          "Olá Milton! Vim pelo site e gostaria de mais informações sobre transporte."
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com o Milton no WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-all hover:scale-110"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle className="relative h-7 w-7" />
        {/* Badge de "online" */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="absolute inset-0 rounded-full bg-[#d4af37] animate-pulse" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-background bg-[#d4af37]" />
        </span>
      </a>
    </div>
  );
}
