"use client";

import Image from "next/image";
import { BadgeCheck, Car, MapPin, MessageCircle, CreditCard } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";

export function AboutMilton() {
  return (
    <section id="milton" className="relative py-20 sm:py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-luxury-grid opacity-30" />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Foto do Milton */}
          <div className="relative order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl shadow-black/20">
              <Image
                src="/milton.jpg"
                alt={`${siteConfig.driverName} — ${siteConfig.driverRole}`}
                width={640}
                height={720}
                className="w-full h-[480px] sm:h-[560px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Card flutuante de nome */}
            <div className="absolute -bottom-6 left-4 sm:left-8 rounded-xl border border-[#d4af37]/30 bg-background/95 backdrop-blur-md p-5 shadow-xl max-w-[280px]">
              <div className="flex items-center gap-2 text-[#d4af37] mb-1">
                <BadgeCheck className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Motorista Profissional
                </span>
              </div>
              <div className="font-display text-2xl font-bold text-foreground">
                {siteConfig.driverName}
              </div>
              <div className="text-sm text-muted-foreground">
                {siteConfig.driverRole} · {siteConfig.contact.city}
              </div>
            </div>

            {/* Selo de experiência */}
            <div className="absolute -top-4 -right-4 hidden sm:flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#d4af37] bg-background text-center shadow-lg shadow-[#d4af37]/20">
              <div>
                <div className="font-display text-2xl font-bold text-gold-gradient leading-none">
                  8+
                </div>
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">
                  Anos de
                  <br />
                  experiência
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="order-2">
            <SectionHeading
              align="left"
              eyebrow="Conheça o Milton"
              title={
                <>
                  Seu motorista{" "}
                  <span className="text-gold-gradient">de confiança</span> na
                  região
                </>
              }
              description="Mais do que um motorista, um parceiro de viagem. Com anos de experiência em transporte executivo, o Milton combina pontualidade, respeito e segurança para oferecer uma experiência de deslocamento verdadeiramente diferenciada."
            />

            {/* Texto */}
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Sou o <strong className="text-foreground">Milton Cesar</strong>,
                motorista executivo dedicado a oferecer um transporte seguro,
                pontual e confortável para cada cliente. Atendo toda a região de
                Campinas e Vinhedo, com viagens para todos os locais —
                aeroportos, compromissos corporativos, viagens intermunicipais e
                muito mais.
              </p>
              <p>
                No meu <strong className="text-foreground">Hyundai HB20S</strong>,
                você encontra conforto, limpeza e um ambiente agradável. Cada
                trajeto é planejado com cuidado para que você chegue ao destino
                tranquilo e no horário. Aceito <strong className="text-foreground">Pix e dinheiro</strong> para
                sua comodidade.
              </p>
            </div>

            {/* Quick facts */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Car className="h-5 w-5 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Veículo
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {siteConfig.vehicle.model} · {siteConfig.vehicle.capacity}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <CreditCard className="h-5 w-5 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Pagamento
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {siteConfig.payment.methods.join(" · ")}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <MapPin className="h-5 w-5 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Base
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {siteConfig.contact.city}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <MessageCircle className="h-5 w-5 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    WhatsApp
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {siteConfig.contact.whatsappDisplay}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href={whatsappLink(
                "Olá Milton! Vi seu site e gostaria de conversar sobre uma viagem."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#d4af37] to-[#c9a227] px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-[#d4af37]/25 transition-all hover:shadow-[#d4af37]/50 hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" />
              Falar com o Milton agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
