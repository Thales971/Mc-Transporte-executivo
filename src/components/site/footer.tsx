"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";

// Brand icons removed from lucide-react v1.x — using inline SVGs
function Instagram({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Facebook({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Linkedin({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import { siteConfig, whatsappLink, emailLink } from "@/lib/site-config";

const footerLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#milton", label: "Conheça o Milton" },
  { href: "#personalizado", label: "Viagens Personalizadas" },
  { href: "#frota", label: "Veículo" },
  { href: "#cobertura", label: "Cobertura" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="relative bg-muted/30 border-t border-[#d4af37]/15">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-mc-icon.svg"
                alt="MC Transporte Executivo"
                width={48}
                height={48}
              />
              <div className="leading-tight">
                <span className="block font-display text-lg font-bold tracking-wide text-foreground">
                  MC <span className="text-gold-gradient">Transporte</span>
                </span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                  Executivo · {siteConfig.driverName}
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm text-muted-foreground leading-relaxed">
              {siteConfig.shortDescription}
            </p>

            {/* Pagamento */}
            <div className="mt-5 flex items-center gap-2 flex-wrap">
              <CreditCard className="h-4 w-4 text-[#d4af37]" />
              <span className="text-xs text-muted-foreground">Aceita:</span>
              {siteConfig.payment.methods.map((m) => (
                <span
                  key={m}
                  className="rounded border border-[#d4af37]/30 bg-[#d4af37]/5 px-2 py-0.5 text-xs font-semibold text-[#d4af37]"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={whatsappLink("Olá Milton! Vim pelo site.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-[#d4af37]/30 text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-black"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-[#d4af37]/30 text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-black"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-[#d4af37]/30 text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-black"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-[#d4af37]/30 text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-black"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-[#d4af37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-[#d4af37]"
                >
                  <MessageCircle className="h-4 w-4 text-[#d4af37] shrink-0" />
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${siteConfig.contact.whatsappNumber}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-[#d4af37]"
                >
                  <Phone className="h-4 w-4 text-[#d4af37] shrink-0" />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-[#d4af37]"
                >
                  <Linkedin className="h-4 w-4 text-[#d4af37] shrink-0" />
                  LinkedIn · Milton Cesar
                </a>
              </li>
              <li>
                <a
                  href={emailLink()}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-[#d4af37] break-all"
                >
                  <Mail className="h-4 w-4 text-[#d4af37] shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-[#d4af37] shrink-0" />
                {siteConfig.contact.city}
              </li>
            </ul>
          </div>
        </div>

        {/* Base */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.brandFull}. Todos os
            direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            {siteConfig.availability}
          </p>
        </div>
      </div>
    </footer>
  );
}
