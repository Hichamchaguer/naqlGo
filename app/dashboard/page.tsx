"use client";

import { useState } from "react";
import {
  ShieldCheck,
  MapPin,
  Flag,
  ArrowUpDown,
  Map as MapIcon,
  Clock,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const globeImg = "/assets/globe-route.jpg";
import { CarrierSidebar } from "@/components/site/CarrierSidebar";

// For Next.js App Router, export the page component as default from this file.

const lastRequests = [
  { id: "ORD-9021", status: "Livré · il y a 2 jours" },
  { id: "ORD-9104", status: "En transit · Aujourd'hui" },
];

function DashboardPage() {
  const [priority, setPriority] = useState<"standard" | "express">("standard");

  return (
    <div className="min-h-screen bg-surface">
      <div className="flex">
        <CarrierSidebar />

        {/* Main */}
        <div className="flex min-h-screen flex-1 flex-col">
          <main className="flex-1 px-6 py-10 lg:px-12">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    Nouvelle demande de transport
                  </h2>
                  <p className="mt-1 text-muted-foreground">
                    Remplissez les détails ci-dessous pour trouver le meilleur transporteur pour
                    votre cargaison.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Assurance standard incluse
                </span>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
                {/* Form card */}
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="goods">Type de marchandise</Label>
                      <Select defaultValue="industrial">
                        <SelectTrigger id="goods">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="industrial">Équipement industriel</SelectItem>
                          <SelectItem value="food">Alimentaire</SelectItem>
                          <SelectItem value="furniture">Mobilier</SelectItem>
                          <SelectItem value="electronics">Électronique</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Poids / Dimensions</Label>
                      <Input id="weight" placeholder="ex. 5 000 kg, 120×80×100 cm" />
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        Lieu de départ
                      </Label>
                      <Input
                        placeholder="Entrez ville, rue ou code d'entrepôt"
                        className="bg-background"
                      />
                    </div>

                    <div className="my-5 flex items-center gap-3">
                      <div className="h-px flex-1 bg-border" />
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-card">
                        <ArrowUpDown className="h-4 w-4" />
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm">
                        <Flag className="h-4 w-4 text-destructive" />
                        Lieu de livraison
                      </Label>
                      <Input
                        placeholder="Adresse de destination ou nom de l'établissement"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Date de ramassage souhaitée</Label>
                      <Input id="pickup" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Priorité du service</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPriority("standard")}
                          className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                            priority === "standard"
                              ? "border-primary bg-primary-soft text-primary"
                              : "border-input bg-background text-foreground hover:bg-muted"
                          }`}
                        >
                          Standard
                        </button>
                        <button
                          type="button"
                          onClick={() => setPriority("express")}
                          className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                            priority === "express"
                              ? "border-primary bg-primary-soft text-primary"
                              : "border-input bg-background text-foreground hover:bg-muted"
                          }`}
                        >
                          Express
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                    <p className="max-w-xs text-xs text-muted-foreground">
                      En publiant cette demande, vous acceptez notre Accord Transporteur et nos
                      Conditions de service.
                    </p>
                    <Button type="submit" size="lg">
                      Publier la demande
                    </Button>
                  </div>
                </form>

                {/* Right column widgets */}
                <aside className="space-y-5">
                  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                    <div className="relative h-40 bg-muted">
                      <img
                        src={globeImg}
                        alt="Aperçu de l'itinéraire"
                        loading="lazy"
                        width={768}
                        height={512}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-card backdrop-blur">
                        <MapIcon className="h-3.5 w-3.5 text-primary" />
                        Aperçu d'itinéraire disponible
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="font-semibold text-foreground">Temps de transit estimé</p>
                      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Calcul en attente de la saisie du lieu
                      </p>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-1/3 rounded-full bg-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-primary-soft p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background text-primary">
                        <Lightbulb className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">Conseil d'expert</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Des dimensions précises aident les transporteurs à optimiser leur espace,
                          ce qui se traduit souvent par des{" "}
                          <span className="font-semibold text-foreground">
                            devis 15–20 % moins chers
                          </span>{" "}
                          pour votre expédition.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Mes dernières demandes
                    </p>
                    <ul className="mt-4 space-y-3">
                      {lastRequests.map((r) => (
                        <li key={r.id}>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between rounded-lg p-2 text-left transition-colors hover:bg-muted"
                          >
                            <div>
                              <p className="text-sm font-semibold text-foreground">{r.id}</p>
                              <p className="text-xs text-muted-foreground">{r.status}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </div>
            </div>
          </main>

          <footer className="border-t border-border bg-background px-6 py-5 lg:px-12">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <p>
                <span className="font-bold text-foreground">NaqlGo</span> · © 2024 NaqlGo
                Logistics. Precision in Motion.
              </p>
              <div className="flex flex-wrap gap-5">
                <a href="#" className="hover:text-foreground">Politique de confidentialité</a>
                <a href="#" className="hover:text-foreground">Conditions de service</a>
                <a href="#" className="hover:text-foreground">Accord Transporteur</a>
                <a href="#" className="hover:text-foreground">Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
