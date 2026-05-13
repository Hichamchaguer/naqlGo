const stats = [
  { value: "50k+", label: "Livraisons" },
  { value: "98%", label: "Satisfaction" },
  { value: "120+", label: "Villes" },
  { value: "1.2M", label: "Kms parcourus" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-background py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="bg-[image:var(--gradient-primary)] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              {s.value}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
