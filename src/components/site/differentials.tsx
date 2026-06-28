"use client";

import { Clock, Heart, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";

const iconMap: Record<string, LucideIcon> = {
  Clock,
  Heart,
  ShieldCheck,
};

export function Differentials() {
  return (
    <motion.section
      id="diferenciais"
      className="relative py-20 sm:py-28 bg-muted/30 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Por que escolher o Milton"
          title={
            <>
              Três pilares que guiam{" "}
              <span className="text-gold-gradient">cada trajeto</span>
            </>
          }
          description="Mais do que transportar, o Milton oferece uma experiência baseada em valores que fazem a diferença no seu dia a dia."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.differentials.map((diff, i) => {
            const Icon = iconMap[diff.icon] ?? ShieldCheck;
            return (
              <article
                key={i}
                className="group relative rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:border-[#d4af37]/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#d4af37]/10"
              >
                {/* Ícone grande circular */}
                <div className="mx-auto mb-6 relative inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent text-[#d4af37] transition-all group-hover:border-[#d4af37] group-hover:scale-110">
                  <Icon className="h-9 w-9" />
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {diff.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {diff.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
