import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mctransporte.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MC Transporte Executivo | Milton Cesar — Motorista Particular",
    template: "%s | MC Transporte Executivo",
  },
  description:
    "Transporte executivo e viagens personalizadas com o motorista Milton Cesar. HB20S, pontualidade, respeito e segurança. Aeroportos, executivo e viagens intermunicipais. Pix e dinheiro. 24h via WhatsApp: (19) 99172-6000.",
  keywords: [
    "Milton Cesar",
    "MC Transporte Executivo",
    "motorista particular Campinas",
    "transporte executivo Vinhedo",
    "traslado aeroporto",
    "viagens intermunicipais",
    "carro com motorista",
  ],
  authors: [{ name: "Milton Cesar" }],
  icons: {
    icon: "/logo-mc-icon.svg",
  },
  openGraph: {
    title: "MC Transporte Executivo | Milton Cesar",
    description:
      "Transporte executivo com pontualidade, respeito e segurança. 24h via WhatsApp.",
    siteName: "MC Transporte Executivo",
    type: "website",
    locale: "pt_BR",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MC Transporte Executivo — Milton Cesar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MC Transporte Executivo",
    description: "Motorista Milton Cesar — pontualidade, respeito e segurança.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Evita flash de tema incorreto antes da hidratação */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {/* JSON-LD (LocalBusiness) para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "MC Transporte Executivo",
              description:
                "Transporte executivo e viagens personalizadas com o motorista Milton Cesar. HB20S, pontualidade, respeito e segurança.",
              url: siteUrl,
              telephone: "+5519991726000",
              areaServed: ["Campinas", "Vinhedo", "Valinhos", "Jundiaí", "Itatiba", "Louveira", "Paulínia", "Indaiatuba", "Itupeva"],
              sameAs: [siteConfig.contact.linkedin],
            }),
          }}
        />
        {/* Skip link para acessibilidade */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-[#d4af37] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          Pular para o conteúdo
        </a>

        <ThemeProvider>
          <main id="main-content" role="main">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
