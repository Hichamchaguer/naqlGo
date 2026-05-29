import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Paths } from "@/components/site/Paths";
import { Stats } from "@/components/site/Stats";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "NaqlGo — La logistique réinventée",
  description:
    "NaqlGo connecte clients et transporteurs pour une livraison rapide, sécurisée et transparente partout au Maroc.",
  openGraph: {
    title: "NaqlGo — La logistique réinventée",
    description:
      "Plateforme logistique moderne. Suivi en temps réel, devis instantanés et réseau de 10 000+ transporteurs vérifiés.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />
        <Paths />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}