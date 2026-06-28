"use client";

import {
  Thermometer,
  Music,
  Coffee,
  Map,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";

const iconMap: Record<string, LucideIcon> = {
  Thermometer,
  Music,
  Coffee,
  Map,
};

export function Personalized() {
  const p = siteConfig.personalized;
  return (
    <section
      id="personalizado"
      className="relative py-20 sm:py-28 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-luxury-grid opacity-30" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#d4af37]/8 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={p.title}
          title={
            <>
              Sua viagem do{" "}
              <span className="text-gold-gradient">seu jeito</span>
            </>
          }
          description={p.description}
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {p.options.map((opt, i) => {
            const Icon = iconMap[opt.icon] ?? Thermometer;
            return (
              <article
                key={i}
                className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-[#d4af37]/40 hover:-translate-y-1"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent text-[#d4af37] mb-5 transition-all group-hover:scale-110 group-hover:border-[#d4af37]/60">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {opt.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {opt.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* CTA de personalização */}
        <div className="mt-12 rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/5 to-transparent p-8 sm:p-10 text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Quer personalizar sua viagem?
          </h3>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Fale com o Milton e descreva exatamente como quer sua viagem.
            Temperatura, música, paradas, roteiro — tudo do seu jeito.
          </p>
          <a
            href={whatsappLink(
              "Olá Milton! Gostaria de personalizar uma viagem. Pode me atender?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#d4af37] to-[#c9a227] px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-[#d4af37]/25 transition-all hover:shadow-[#d4af37]/50 hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            Personalizar minha viagem
          </a>
        </div>
      </div>
    </section>
  );
}
