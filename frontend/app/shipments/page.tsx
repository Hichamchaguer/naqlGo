"use client";

// Converted from tanstack router to Next.js App Router page
import { useEffect, useState } from "react";
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
import api from "@/api/axios";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

type Offer = {
  _id?: string;
  id?: string;
  goodsType: string;
  weight: string;
  description: string;
  origin: string;
  destination: string;
  pickupDate: string;
  contactName: string;
  contactPhone: string;
  priority: "standard" | "express";
  createdAt: string;
};

type BidPayload = {
  price: number;
  vehicleType: string;
  eta: string;
  message: string;
  carrierName: string;
  carrierPhone: string;
};



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
                <span className="text-xs text-muted-foreground">Ref:dd {s.ref}</span>
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

function OfferCard({ offer }: { offer: Offer }) {
  const offerId = offer._id ?? offer.id ?? "";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  const [bidMessage, setBidMessage] = useState<string | null>(null);

  const handleBidSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBidMessage(null);
    const form = event.currentTarget;

    if (!offerId) {
      setBidMessage("Offre invalide. Veuillez réessayer.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const priceValue = String(formData.get("price") || "").trim();
    const vehicleType = String(formData.get("vehicleType") || "").trim();
    const eta = String(formData.get("eta") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const carrierName = String(formData.get("carrierName") || "").trim();
    const carrierPhone = String(formData.get("carrierPhone") || "").trim();

    if (!priceValue || !vehicleType || !eta || !carrierName || !carrierPhone) {
      setBidMessage(
        "Merci de renseigner le prix, le véhicule, l&apos;ETA et le contact."
      );
      return;
    }

    const payload: BidPayload = {
      price: Number(priceValue),
      vehicleType,
      eta,
      message,
      carrierName,
      carrierPhone,
    };

    if (Number.isNaN(payload.price)) {
      setBidMessage("Le prix doit être un nombre valide.");
      return;
    }

    try {
      setIsSubmittingBid(true);
      await api.post(`/offers/${offerId}/bids`, payload);
      setBidMessage("Offre envoyée au client.");
      if (form) {
        form.reset();
      }
    } catch (error) {
  console.error("Erreur lors de l'envoi de l'offre:", error);
  setBidMessage("Impossible d&apos;envoyer l&apos;offre pour le moment.");
    } finally {
      setIsSubmittingBid(false);
    }
  };
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Package className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold leading-tight text-foreground">
                {offer.goodsType}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-primary-soft px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary">
                  NOUVELLE DEMANDE
                </span>
                <span className="text-xs text-muted-foreground">Ref: {offerId}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">Priorité</p>
              <p className="text-xs text-muted-foreground">
                {offer.priority === "express" ? "Express" : "Standard"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
        {offer.description}
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {offer.origin}
          </p>
          <p className="mt-1 pl-5 text-xs text-muted-foreground">Ramassage: {offer.pickupDate}</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <Truck className="h-4 w-4" />
          <span className="text-[10px] font-medium tracking-wide">Client</span>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-1.5 text-sm font-semibold text-foreground">
            {offer.destination}
            <Flag className="h-4 w-4 text-destructive" />
          </p>
          <p className="mt-1 pr-5 text-xs text-muted-foreground">Poids: {offer.weight}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>Publiée le {new Date(offer.createdAt).toLocaleDateString("fr-FR")}</p>
          <p>
            Contact: {offer.contactName} · {offer.contactPhone}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Voir détails
          </Button>
          <Button size="sm" onClick={() => setIsDialogOpen(true)}>
            Proposer une offre
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Proposer une offre</DialogTitle>
            <DialogDescription>
              Indiquez votre prix et les détails de livraison pour ce client.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleBidSubmit}>
            <div className="space-y-2">
              <Label htmlFor={`price-${offerId}`}>Prix proposé</Label>
              <Input id={`price-${offerId}`} name="price" placeholder="Ex. 1500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`vehicleType-${offerId}`}>Type de véhicule</Label>
              <Input
                id={`vehicleType-${offerId}`}
                name="vehicleType"
                placeholder="Ex. Camion 12T, Fourgon frigorifique"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`eta-${offerId}`}>ETA / délai estimé</Label>
              <Input id={`eta-${offerId}`} name="eta" placeholder="Ex. 2 jours" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`message-${offerId}`}>Message au client</Label>
              <Textarea
                id={`message-${offerId}`}
                name="message"
                placeholder="Ajoutez un message (optionnel)"
                className="min-h-[96px]"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`carrierName-${offerId}`}>Votre nom</Label>
                <Input
                  id={`carrierName-${offerId}`}
                  name="carrierName"
                  placeholder="Ex. Karim El Idrissi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`carrierPhone-${offerId}`}>Votre téléphone</Label>
                <Input
                  id={`carrierPhone-${offerId}`}
                  name="carrierPhone"
                  placeholder="Ex. +212 6 12 34 56 78"
                />
              </div>
            </div>

            {bidMessage && (
              <div className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground">
                {bidMessage}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmittingBid}>
                {isSubmittingBid ? "Envoi..." : "Envoyer l&apos;offre"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </article>
  );
}

function ShipmentsPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);
  const [offersError, setOffersError] = useState<string | null>(null);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const response = await api.get<Offer[]>("/offers");
        setOffers(response.data);
        setOffersError(null);
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
        setOffersError("Impossible de charger les offres pour le moment.");
      } finally {
        setIsLoadingOffers(false);
      }
    };

    loadOffers();
  }, []);

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

              {isLoadingOffers && (
                <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-sm text-muted-foreground">
                  Chargement des demandes clients...
                </div>
              )}

              {offersError && !isLoadingOffers && (
                <div className="mt-8 rounded-2xl border border-dashed border-border bg-destructive/10 p-6 text-sm text-destructive">
                  {offersError}
                </div>
              )}

              {!offersError && !isLoadingOffers && offers.length > 0 && (
                <section className="mt-8">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Demandes clients</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Offres publiées récemment par les clients.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    {offers.map((offer) => (
                      <OfferCard key={offer._id ?? offer.id ?? offer.createdAt} offer={offer} />
                    ))}
                  </div>
                </section>
              )}


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
