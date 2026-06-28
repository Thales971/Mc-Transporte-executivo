"use client";

import { Plane, Briefcase, Route, ArrowUpRight, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Briefcase,
  Route,
};

export function Services() {
  return (
    <motion.section
      id="servicos"
      className="relative py-20 sm:py-28 bg-background"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-luxury-grid opacity-30" />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nossos Serviços"
          title={
            <>
              Três modalidades para{" "}
              <span className="text-gold-gradient">atender você</span>
            </>
          }
          description="Atendimento personalizado com o mesmo padrão de qualidade em todos os serviços. Pontualidade, respeito e segurança em cada trajeto."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Briefcase;
            return (
              <article
                key={i}
                className="group relative rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:border-[#d4af37]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d4af37]/5"
              >
                {/* Número discreto */}
                <span className="absolute top-6 right-6 font-display text-5xl font-bold text-foreground/[0.03] group-hover:text-[#d4af37]/10 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Ícone */}
                <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent text-[#d4af37] mb-6 transition-all group-hover:border-[#d4af37]/60 group-hover:shadow-lg group-hover:shadow-[#d4af37]/20">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Link WhatsApp no hover */}
                <a
                  href={whatsappLink(
                    `Olá Milton! Tenho interesse no serviço: ${service.title}. Pode me passar mais informações?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#d4af37] opacity-0 -translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0"
                >
                  Solicitar este serviço
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
