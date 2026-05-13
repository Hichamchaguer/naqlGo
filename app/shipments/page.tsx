// Converted from tanstack router to Next.js App Router page
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Flag,
  Truck,
  Package,
  Snowflake,
  Wrench,
  BellPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CarrierSidebar, CarrierFooter } from "@/components/site/CarrierSidebar";

// Head meta handled inside pages via Next metadata or <Head> where needed

type Shipment = {
  id: string;
  title: string;
  ref: string;
  tag: { label: string; tone: "standard" | "urgent" | "oversize" };
  price: string;
  unit: string;
  icon: typeof Package;
  from: { city: string; date: string };
  to: { city: string; date: string };
  distance: string;
  meta: { label: string; value: string }[];
};

const shipments: Shipment[] = [
  {
    id: "FR-9012",
    title: "Electronics - Batch #492",
    ref: "FR-9012",
    tag: { label: "STANDARD", tone: "standard" },
    price: "€1,250.00",
    unit: "Flat Rate",
    icon: Package,
    from: { city: "Paris, FR", date: "Mar 12, 08:00 AM" },
    to: { city: "Lyon, FR", date: "Mar 12, 05:30 PM" },
    distance: "450 KM",
    meta: [
      { label: "WEIGHT", value: "2.4 Tons" },
      { label: "VOLUME", value: "12 m³" },
    ],
  },
  {
    id: "FR-8841",
    title: "Perishables - Fresh Produce",
    ref: "FR-8841",
    tag: { label: "URGENT", tone: "urgent" },
    price: "€840.00",
    unit: "Per Pallet",
    icon: Snowflake,
    from: { city: "Bordeaux, FR", date: "Mar 13, 06:00 AM" },
    to: { city: "Nantes, FR", date: "Mar 13, 03:00 PM" },
    distance: "580 KM",
    meta: [
      { label: "TEMP", value: "-2°C to +4°C" },
      { label: "PALLETS", value: "8 Units" },
    ],
  },
  {
    id: "FR-7721",
    title: "Industrial Machinery Parts",
    ref: "FR-7721",
    tag: { label: "OVERSIZE", tone: "oversize" },
    price: "€2,900.00",
    unit: "Contract",
    icon: Wrench,
    from: { city: "Marseille, FR", date: "Mar 15, 10:00 AM" },
    to: { city: "Strasbourg, FR", date: "Mar 16, 09:00 AM" },
    distance: "780 KM",
    meta: [
      { label: "WEIGHT", value: "14.5 Tons" },
      { label: "LENGTH", value: "6.2 Meters" },
    ],
  },
];

const tagStyles: Record<Shipment["tag"]["tone"], string> = {
  standard: "bg-primary-soft text-primary",
  urgent: "bg-orange-100 text-orange-700",
  oversize: "bg-accent text-accent-foreground",
};

function ShipmentCard({ s }: { s: Shipment }) {
  const Icon = s.icon;
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold leading-tight text-foreground">{s.title}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wide ${tagStyles[s.tag.tone]}`}
                >
                  {s.tag.label}
                </span>
                <span className="text-xs text-muted-foreground">Ref: {s.ref}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-primary">{s.price}</p>
              <p className="text-xs text-muted-foreground">{s.unit}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {s.from.city}
          </p>
          <p className="mt-1 pl-5 text-xs text-muted-foreground">{s.from.date}</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <Truck className="h-4 w-4" />
          <span className="text-[10px] font-medium tracking-wide">{s.distance}</span>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-1.5 text-sm font-semibold text-foreground">
            {s.to.city}
            <Flag className="h-4 w-4 text-destructive" />
          </p>
          <p className="mt-1 pr-5 text-xs text-muted-foreground">{s.to.date}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4">
        <div className="flex gap-6">
          {s.meta.map((m) => (
            <div key={m.label}>
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                {m.label}
              </p>
              <p className="text-sm font-semibold text-foreground">{m.value}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Voir détails
          </Button>
          <Button size="sm">Accepter</Button>
        </div>
      </div>
    </article>
  );
}

function ShipmentsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="flex">
        <CarrierSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <main className="flex-1 px-6 py-10 lg:px-12">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    Available Shipments
                  </h2>
                  <p className="mt-1 text-muted-foreground">
                    Real-time marketplace for new carrier opportunities.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search route, cargo..."
                      className="h-10 w-64 bg-background pl-9"
                    />
                  </div>
                  <Button variant="outline" size="lg" className="h-10">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {shipments.map((s) => (
                  <ShipmentCard key={s.id} s={s} />
                ))}

                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-primary-soft/40 p-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background text-primary shadow-[var(--shadow-card)]">
                    <BellPlus className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-base font-semibold text-foreground">
                    Set up Route Alerts
                  </p>
                  <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                    Get notified immediately when new shipments match your favorite routes.
                  </p>
                  <Button variant="outline" className="mt-5 bg-background">
                    Configure Alerts
                  </Button>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <div className="inline-flex items-center gap-3 rounded-full bg-muted px-4 py-2 text-xs text-muted-foreground">
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-background"
                    aria-label="Précédent"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-medium text-foreground">3 / 3</span>
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-background"
                    aria-label="Suivant"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </main>

          <CarrierFooter />
        </div>
      </div>
    </div>
  );
}

export default ShipmentsPage;
