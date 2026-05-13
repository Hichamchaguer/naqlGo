import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="bg-surface px-6 py-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] px-6 py-16 text-center shadow-[var(--shadow-elegant)]">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Prêt à transformer votre logistique ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
            Rejoignez NaqlGo aujourd'hui et profitez d'une solution de livraison moderne, sécurisée
            et efficace.
          </p>
          <Button variant="secondary" size="xl" className="mt-8">
            Commencer maintenant
          </Button>
        </div>
      </div>
    </section>
  );
}
