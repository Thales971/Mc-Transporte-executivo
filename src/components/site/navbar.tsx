"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#milton", label: "Conheça o Milton" },
  { href: "#personalizado", label: "Viagens Personalizadas" },
  { href: "#frota", label: "Veículo" },
  { href: "#cobertura", label: "Cobertura" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-[#d4af37]/15 py-2.5"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo MC */}
          <Link href="#topo" className="flex items-center gap-3 group">
            <Image
              src="/logo-mc-icon.svg"
              alt="MC Transporte Executivo"
              width={44}
              height={44}
              className="transition-transform group-hover:scale-105"
            />
            <div className="leading-tight">
              <span className="block font-display text-lg font-bold tracking-wide">
                MC
                <span className="text-gold-gradient ml-1">Transporte</span>
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Executivo · {siteConfig.driverName}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-[#d4af37] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[#d4af37] after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden xl:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`tel:+${siteConfig.contact.whatsappNumber}`}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#d4af37] transition-colors"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.contact.phoneDisplay}
            </a>
            <a
              href={whatsappLink("Olá Milton! Gostaria de solicitar um orçamento para transporte executivo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#d4af37] to-[#c9a227] px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-[#d4af37]/25 transition-all hover:shadow-[#d4af37]/50 hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
              Reservar agora
            </a>
          </div>

          {/* Mobile/tablet actions */}
          <div className="flex xl:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#d4af37]/30 text-[#d4af37]"
              aria-label="Abrir menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "xl:hidden overflow-hidden transition-all duration-500 bg-background/95 backdrop-blur-xl border-t border-[#d4af37]/10",
          open ? "max-h-[40rem] mt-2" : "max-h-0"
        )}
      >
        <nav className="container mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-3 text-base font-medium text-muted-foreground hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink("Olá Milton! Gostaria de solicitar um orçamento para transporte executivo.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#d4af37] to-[#c9a227] px-5 py-3 text-base font-semibold text-black"
          >
            <MessageCircle className="h-5 w-5" />
            Reservar pelo WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
