"use client";

import { Star, Quote } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative py-20 sm:py-28 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-luxury-grid opacity-30" />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Depoimentos"
          title={
            <>
              A confiança de quem{" "}
              <span className="text-gold-gradient">já viajou conosco</span>
            </>
          }
          description="A excelência no atendimento se reflete nas avaliações dos nossos clientes. Veja o que dizem sobre a experiência ELITE."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.testimonials.map((testimonial, i) => (
            <article
              key={i}
              className="relative rounded-xl border border-[#2a2a2a] bg-[#141414] p-7 transition-all hover:border-[#d4af37]/40 hover:bg-[#1a1a1a]"
            >
              {/* Ícone de aspas */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-[#d4af37]/10" />

              {/* Estrelas */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-[#d4af37] text-[#d4af37]"
                  />
                ))}
              </div>

              {/* Texto */}
              <p className="relative text-neutral-300 leading-relaxed text-[15px]">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Autor */}
              <div className="mt-6 pt-5 border-t border-[#2a2a2a] flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#a8842a] text-black font-display font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
