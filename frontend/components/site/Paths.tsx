import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Check } from "lucide-react";

const clientFeatures = [
  "Devis instantanés",
  "Paiement sécurisé",
  "Support client 24/7",
];

const carrierFeatures = [
  "Planification intelligente",
  "Facturation automatique",
  "Large réseau de clients",
];

export function Paths() {
  return (
    <section id="solutions" className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Choisissez votre parcours
          </h2>
          <p className="mt-3 text-muted-foreground">
            Une expérience sur mesure que vous soyez une entreprise cherchant à expédier ou un
            professionnel de la route.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PathCard
            icon={<ShoppingCart className="h-5 w-5" />}
            title="Je suis un Client"
            description="Expédiez vos marchandises partout. Accédez à des milliers de transporteurs vérifiés et suivez vos colis en temps réel."
            features={clientFeatures}
            cta="S'inscrire comme Client"
            variant="outline"
          />
          <PathCard
            icon={<Truck className="h-5 w-5" />}
            title="Je suis un Transporteur"
            description="Optimisez vos trajets. Trouvez des chargements quotidiens, augmentez vos revenus et gérez votre flotte facilement."
            features={carrierFeatures}
            cta="Devenir Partenaire Transporteur"
            variant="default"
          />
        </div>
      </div>
    </section>
  );
}

function PathCard({
  icon,
  title,
  description,
  features,
  cta,
  variant,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  cta: string;
  variant: "default" | "outline";
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-elegant)]">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary-soft opacity-50 transition-transform group-hover:scale-110" />
      <div className="relative">
        <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </span>
        <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>

        <ul className="mt-6 space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Check className="h-3 w-3" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Button variant={variant} size="lg" className="mt-8 w-full">
          {cta}
        </Button>
      </div>
    </div>
  );
}
