"use client";

import { ArrowRight, MessageCircle, Star, ShieldCheck, Clock, Heart } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <img
          src="https://sfile.chatglm.cn/images-ppt/2079cc9165dc.jpg"
          alt="Sedan executivo de luxo"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        {/* Overlays para legibilidade (sempre escuro, independente do tema) */}
        <div className="absolute inset-0 hero-overlay-dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* Textura luxo */}
      <div className="absolute inset-0 bg-luxury-grid opacity-40" />

      {/* Conteúdo (sempre texto branco sobre a imagem escura) */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-3xl text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-1.5 mb-7 backdrop-blur-sm animate-fade-up">
            <span className="flex h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#d4af37]">
              {siteConfig.availability}
            </span>
          </div>

          {/* Título */}
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            MC Transporte
            <br />
            <span className="text-gold-gradient">Executivo</span>
          </h1>

          {/* Subtítulo */}
          <p
            className="mt-6 text-base sm:text-lg text-neutral-200 max-w-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {siteConfig.shortDescription}
          </p>

          {/* Pilares: pontualidade, respeito, segurança */}
          <div
            className="mt-7 flex flex-wrap gap-x-6 gap-y-3 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            <span className="flex items-center gap-2 text-sm text-neutral-200">
              <Clock className="h-4 w-4 text-[#d4af37]" /> Pontualidade
            </span>
            <span className="flex items-center gap-2 text-sm text-neutral-200">
              <Heart className="h-4 w-4 text-[#d4af37]" /> Respeito
            </span>
            <span className="flex items-center gap-2 text-sm text-neutral-200">
              <ShieldCheck className="h-4 w-4 text-[#d4af37]" /> Segurança
            </span>
          </div>

          {/* Avaliação */}
          <div
            className="mt-7 flex items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#d4af37] text-[#d4af37]" />
              ))}
            </div>
            <span className="text-sm text-neutral-300">
              <strong>5.0</strong> · Clientes satisfeitos
            </span>
          </div>

          {/* CTAs */}
          <div
            className="mt-9 flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href={whatsappLink(
                "Olá Milton! Vim pelo site e gostaria de solicitar um orçamento para transporte."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#d4af37] to-[#c9a227] px-7 py-4 text-base font-semibold text-black shadow-xl shadow-[#d4af37]/30 transition-all hover:shadow-[#d4af37]/60 hover:brightness-110"
            >
              <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
              Reservar pelo WhatsApp
            </a>
            <a
              href="#milton"
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-[#d4af37]/40 bg-white/5 backdrop-blur-sm px-7 py-4 text-base font-semibold text-white transition-all hover:bg-[#d4af37]/10 hover:border-[#d4af37]/70"
            >
              Conheça o Milton
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Quick info */}
          <div
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-300 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="flex items-center gap-2">
              <span className="text-[#d4af37]">●</span> Aeroportos VCP · GRU · CGH
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#d4af37]">●</span> Veículo: {siteConfig.vehicle.model}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#d4af37]">●</span> Aceita {siteConfig.payment.methods.join(" e ")}
            </span>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-neutral-500">
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <div className="h-10 w-px bg-gradient-to-b from-[#d4af37] to-transparent" />
      </div>
    </section>
  );
}
