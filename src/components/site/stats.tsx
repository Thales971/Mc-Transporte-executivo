"use client";

import { siteConfig } from "@/lib/site-config";

export function Stats() {
  return (
    <section className="relative border-y border-[#d4af37]/10 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.stats.map((stat, i) => (
            <div key={i} className="text-center sm:text-left relative group">
              <div className="font-display text-4xl sm:text-5xl font-bold text-gold-gradient">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground leading-snug">
                {stat.label}
              </div>
              {/* Divisor dourado */}
              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-[#d4af37]/30 to-transparent last:hidden" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
