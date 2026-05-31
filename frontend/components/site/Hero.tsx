import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
const warehouseHero = "/assets/warehouse-hero.jpg";
const avatar1 = "/assets/avatar-1.jpg";
const avatar2 = "/assets/avatar-2.jpg";
const avatar3 = "/assets/avatar-3.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[image:var(--gradient-hero)]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2">
        <div className="space-y-6">

          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              NaqlGo
            </span>
            <span className="text-foreground"> : La </span>
            <br className="hidden sm:block" />
            logistique réinventée.
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            Une plateforme qui connecte clients et transporteurs pour livrer vos marchandises
            facilement et rapidement. Gagnez en transparence et en efficacité.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button variant="hero" size="xl">
              Commencer maintenant
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[avatar1, avatar2, avatar3].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Transporteur NaqlGo ${i + 1}`}
                  width={36}
                  height={36}
                  loading="lazy"
                  className="h-9 w-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">10+ </span>
              transporteurs font confiance à NaqlGo
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)]">
            <Image
              src={warehouseHero}
              alt="Entrepôt logistique moderne avec rayonnages organisés"
              width={1280}
              height={896}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
