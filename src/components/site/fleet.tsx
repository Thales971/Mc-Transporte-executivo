"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Users, Luggage, Calendar } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";

export function Fleet() {
  const v = siteConfig.vehicle;
  return (
    <motion.section
      id="frota"
      className="relative py-20 sm:py-28 bg-muted/30"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="O Veículo"
          title={
            <>
              Conheça o{" "}
              <span className="text-gold-gradient">{v.model}</span>
            </>
          }
          description="Veículo sedan confortável, limpo e revisado. Equipado para oferecer o melhor em cada trajeto, seja curto ou uma viagem longa."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-center">
          {/* Imagem do carro (usa placeholder elegante por enquanto) */}
          <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/20 shadow-2xl shadow-black/20">
            <Image
              src="https://sfile.chatglm.cn/images-ppt/2079cc9165dc.jpg"
              alt={v.model}
              width={800}
              height={560}
              className="w-full h-[360px] sm:h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 rounded-full border border-[#d4af37]/40 bg-black/70 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#d4af37]">
              {v.category}
            </span>
          </div>

          {/* Detalhes */}
          <div>
            <h3 className="font-display text-3xl font-bold text-foreground">
              {v.model}
            </h3>
            <p className="mt-1 text-muted-foreground">
              {v.year} · {v.category}
            </p>

            {/* Capacidade */}
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-foreground">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#d4af37]" />
                {v.capacity}
              </span>
              <span className="flex items-center gap-2">
                <Luggage className="h-5 w-5 text-[#d4af37]" />
                {v.luggage}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#d4af37]" />
                Disponível 24h
              </span>
            </div>

            {/* Features */}
            <ul className="mt-6 space-y-2.5">
              {v.features.map((feature, fi) => (
                <li
                  key={fi}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37]/15 text-[#d4af37]">
                    <Check className="h-3 w-3" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Pagamento */}
            <div className="mt-6 rounded-lg border border-border bg-card p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Formas de pagamento
              </div>
              <div className="flex flex-wrap gap-2">
                {siteConfig.payment.methods.map((m) => (
                  <span
                    key={m}
                    className="rounded-md border border-[#d4af37]/30 bg-[#d4af37]/5 px-3 py-1.5 text-sm font-semibold text-[#d4af37]"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {siteConfig.payment.pixInfo}
              </p>
            </div>

            {/* CTA */}
            <a
              href={whatsappLink(
                `Olá Milton! Gostaria de reservar uma viagem com o ${v.model}. Pode me enviar o orçamento?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-[#d4af37]/40 bg-[#d4af37]/5 px-6 py-3.5 text-sm font-semibold text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-black"
            >
              Reservar uma viagem
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
