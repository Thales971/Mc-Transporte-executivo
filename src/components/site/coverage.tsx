"use client";

import { MapPin, Plane, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";

// Pontos no mapa estilizado (coordenadas relativas em % do SVG)
const mapPoints = [
  { x: 30, y: 45, label: "Campinas", isBase: true },
  { x: 22, y: 30, label: "Vinhedo", isBase: false },
  { x: 18, y: 42, label: "Louveira", isBase: false },
  { x: 27, y: 35, label: "Valinhos", isBase: false },
  { x: 38, y: 38, label: "Paulínia", isBase: false },
  { x: 42, y: 22, label: "Itatiba", isBase: false },
  { x: 50, y: 55, label: "Indaiatuba", isBase: false },
  { x: 12, y: 25, label: "Jundiaí", isBase: false },
  { x: 60, y: 70, label: "Itupeva", isBase: false },
];

export function Coverage() {
  return (
    <motion.section
      id="cobertura"
      className="relative py-20 sm:py-28 bg-background overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#d4af37]/8 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Conteúdo */}
          <div className="order-2 lg:order-1">
            <SectionHeading
              align="left"
              eyebrow="Área de Cobertura"
              title={
                <>
                  De Campinas a Vinhedo
                  <br />
                  <span className="text-gold-gradient">e toda a região</span>
                </>
              }
              description="Atendemos toda a região metropolitana de Campinas, com destaque para o corredor Campinas ↔ Vinhedo. Para outros destinos, consulte — viajamos para todos os locais."
            />

            <div className="mt-8 flex flex-wrap gap-2.5">
              {siteConfig.coverageAreas.map((area, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-[#d4af37]/60 hover:text-[#d4af37]"
                >
                  <MapPin className="h-3.5 w-3.5 text-[#d4af37]" />
                  {area}
                </span>
              ))}
            </div>

            {/* Cards de info */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-card p-5">
                <Plane className="h-6 w-6 text-[#d4af37] mb-3" />
                <div className="font-semibold text-foreground">
                  Traslado Aeroportos
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {siteConfig.airports.map((a) => a.code).join(" · ")} com
                  acompanhamento de voo.
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <Clock className="h-6 w-6 text-[#d4af37] mb-3" />
                <div className="font-semibold text-foreground">
                  Disponibilidade 24h
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Atendimento todos os dias, feriados e madrugadas inclusos.
                </div>
              </div>
            </div>
          </div>

          {/* Mapa estilizado */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl border border-[#d4af37]/20 bg-muted/30 overflow-hidden bg-luxury-grid">
              {/* Mapa SVG estilizado da região Campinas-Vinhedo */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* "Rio/estrada" estilizado ligando Campinas a Vinhedo */}
                <path
                  d="M 30 45 Q 25 38 22 30"
                  fill="none"
                  stroke="rgba(212,175,55,0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                {/* Outras conexões a partir de Campinas */}
                {mapPoints
                  .filter((p) => !p.isBase)
                  .map((p, i) => (
                    <line
                      key={i}
                      x1="30"
                      y1="45"
                      x2={p.x}
                      y2={p.y}
                      stroke="rgba(212,175,55,0.15)"
                      strokeWidth="0.8"
                      strokeDasharray="1.5 1.5"
                    />
                  ))}
              </svg>

              {/* Pontos (HTML para melhor controle) */}
              {mapPoints.map((pt, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                >
                  {pt.isBase ? (
                    <div className="relative">
                      <div className="h-4 w-4 rounded-full bg-[#d4af37] shadow-lg shadow-[#d4af37]/50" />
                      <div className="absolute inset-0 h-4 w-4 rounded-full bg-[#d4af37] animate-ping opacity-60" />
                      <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-background/90 border border-[#d4af37]/40 px-2 py-0.5 text-[10px] font-bold text-[#d4af37]">
                        {pt.label}
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#d4af37]/70 transition-transform group-hover:scale-150" />
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {pt.label}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Legenda */}
              <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-[#d4af37]/20 bg-background/80 backdrop-blur-sm p-3">
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <MapPin className="h-3.5 w-3.5 text-[#d4af37]" />
                  <span>
                    Base: <strong>{siteConfig.contact.city}</strong> —
                    Corredor Campinas ↔ Vinhedo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
