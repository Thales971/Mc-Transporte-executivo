import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Services } from "@/components/site/services";
import { AboutMilton } from "@/components/site/about-milton";
import { Differentials } from "@/components/site/differentials";
import { Personalized } from "@/components/site/personalized";
import { Fleet } from "@/components/site/fleet";
import { Coverage } from "@/components/site/coverage";
import { Reviews } from "@/components/site/reviews";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Services />
        <AboutMilton />
        <Differentials />
        <Personalized />
        <Fleet />
        <Coverage />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
