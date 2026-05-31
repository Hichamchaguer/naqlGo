"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import api from "@/api/axios";
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
  status?: "open" | "confirmed" | "closed";
  acceptedBidId?: string | null;
  createdAt: string;
};

type Bid = {
  _id?: string;
  id?: string;
  offerId: string;
  price: number;
  vehicleType: string;
  eta: string;
  message?: string;
  carrierName?: string;
  carrierPhone?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

type OfferWithBids = Offer & { bids: Bid[] };

function DashboardPage() {
  const router = useRouter();
  const [priority, setPriority] = useState<"standard" | "express">("standard");
  const [goodsType, setGoodsType] = useState("industrial");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [offers, setOffers] = useState<OfferWithBids[]>([]);
  const [offersLoading, setOffersLoading] = useState(false);
  const [offersError, setOffersError] = useState<string | null>(null);
  const [offersNotice, setOffersNotice] = useState<string | null>(null);
  const [accessChecked, setAccessChecked] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const weight = String(formData.get("weight") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const origin = String(formData.get("origin") || "").trim();
    const destination = String(formData.get("destination") || "").trim();
    const pickupDate = String(formData.get("pickupDate") || "").trim();
    const contactName = String(formData.get("contactName") || "").trim();
    const contactPhone = String(formData.get("contactPhone") || "").trim();

    if (
      !goodsType ||
      !weight ||
      !description ||
      !origin ||
      !destination ||
      !pickupDate ||
      !contactName ||
      !contactPhone
    ) {
      setSubmitMessage("Merci de renseigner tous les champs pour publier la demande.");
      setIsSubmitting(false);
      return;
    }

    const offer: Omit<Offer, "id" | "createdAt"> = {
      goodsType,
      weight,
      description,
      origin,
      destination,
      pickupDate,
      contactName,
      contactPhone,
      priority,
    };
    try {
      await api.post("/offers", offer);
      form.reset();
      setGoodsType("industrial");
      setPriority("standard");
      setSubmitMessage("Demande publiée. Les transporteurs peuvent la consulter.");
      loadOffers();
    } catch (error) {
      console.error("Erreur lors de la publication:", error);
      setSubmitMessage("Impossible de publier la demande. Réessayez plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadOffers = async () => {
    try {
      setOffersLoading(true);
      const response = await api.get<Offer[]>("/offers");
      const baseOffers = response.data;
      const offersWithBids = await Promise.all(
        baseOffers.map(async (offer) => {
          const offerId = offer._id ?? offer.id;
          if (!offerId) {
            return { ...offer, bids: [] } as OfferWithBids;
          }
          try {
            const bidsResponse = await api.get<Bid[]>(`/offers/${offerId}/bids`);
            const normalizedBids = bidsResponse.data.map((bid) => ({
              ...bid,
              id: bid.id ?? bid._id,
            }));
            return { ...offer, bids: normalizedBids } as OfferWithBids;
          } catch (error) {
            console.error("Erreur lors du chargement des offres:", error);
            return { ...offer, bids: [] } as OfferWithBids;
          }
        })
      );
      const normalizedOffers = offersWithBids.map((offer) => ({
        ...offer,
        id: offer.id ?? offer._id,
      }));
      setOffers(normalizedOffers);
      setOffersError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des offres:", error);
      setOffersError("Impossible de charger les propositions pour le moment.");
    } finally {
      setOffersLoading(false);
    }
  };

  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await api.get<{ role?: string }>("/user");
        if (response.data?.role !== "client") {
          setIsUnauthorized(true);
          router.replace("/notFound");
          return;
        }
        loadOffers();
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);
        setIsUnauthorized(true);
        router.replace("/notFound");
      } finally {
        setAccessChecked(true);
      }
    };

    checkRole();
  }, [router]);

  if (!accessChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Chargement…
      </div>
    );
  }

  if (isUnauthorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Accès refusé</h1>
        <p className="text-sm text-muted-foreground">
          Vous n&apos;êtes pas autorisé à consulter cette page.
        </p>
      </div>
    );
  }

  const visibleOffers: OfferWithBids[] = offers.filter(
    (offer) => offer.status !== "confirmed"
  );

  const handleBidDecision = async (
    offerId: string,
    bidId: string,
    status: "accepted" | "rejected",
    carrierPhone?: string,
    carrierName?: string
  ) => {
    try {
      setOffersLoading(true);
      setOffersNotice(null);
      await api.patch(`/offers/${offerId}/bids/${bidId}`, { status });
      await loadOffers();
      setOffersNotice(
        status === "accepted"
          ? "Proposition acceptée. La demande est confirmée."
          : "Proposition refusée."
      );

      if (status === "accepted" && carrierPhone && typeof window !== "undefined") {
        const digits = carrierPhone.replace(/\D/g, "");
        if (digits.length > 0) {
          const message = `Bonjour ${carrierName || ""}, votre offre a été acceptée. Pouvez-vous confirmer les détails ?`;
          const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
          window.open(url, "_blank", "noopener,noreferrer");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'offre:", error);
      setOffersError("Impossible de mettre à jour la proposition.");
    } finally {
      setOffersLoading(false);
    }
  };

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
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="goods">Type de marchandise</Label>
                      <Select
                        value={goodsType}
                        onValueChange={(value: string) => setGoodsType(value)}
                      >
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
                      <Input
                        id="weight"
                        name="weight"
                        placeholder="ex. 5 000 kg, 120×80×100 cm"
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Label htmlFor="description">Description des objets</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Décrivez les objets que vous souhaitez transmettre..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        Lieu de départ
                      </Label>
                      <Input
                        name="origin"
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
                        name="destination"
                        placeholder="Adresse de destination ou nom de l'établissement"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Date de ramassage souhaitée</Label>
                      <Input id="pickup" name="pickupDate" type="date" />
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

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Nom du contact</Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        placeholder="Ex. Ahmed Benali"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Téléphone du contact</Label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        placeholder="Ex. +212 6 12 34 56 78"
                      />
                    </div>
                  </div>

                  {submitMessage && (
                    <div className="mt-4 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground">
                      {submitMessage}
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                    <p className="max-w-xs text-xs text-muted-foreground">
                      En publiant cette demande, vous acceptez notre Accord Transporteur et nos
                      Conditions de service.
                    </p>
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Publication..." : "Publier la demande"}
                    </Button>
                  </div>
                </form>

                <section className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        Propositions reçues
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Suivez les offres des transporteurs et choisissez la meilleure option.
                      </p>
                    </div>
                    <Button variant="outline" onClick={loadOffers} disabled={offersLoading}>
                      {offersLoading ? "Actualisation..." : "Actualiser"}
                    </Button>
                  </div>

                  {offersLoading && (
                    <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                      Chargement des propositions...
                    </div>
                  )}

                  {offersError && !offersLoading && (
                    <div className="mt-6 rounded-xl border border-dashed border-border bg-destructive/10 p-4 text-sm text-destructive">
                      {offersError}
                    </div>
                  )}

                  {offersNotice && !offersLoading && (
                    <div className="mt-6 rounded-xl border border-border bg-primary-soft p-4 text-sm text-primary">
                      {offersNotice}
                    </div>
                  )}

                  {!offersLoading && !offersError && visibleOffers.length === 0 && (
                    <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                      Aucune proposition en attente pour le moment.
                    </div>
                  )}

                  <div className="mt-6 space-y-6">
                    {visibleOffers.map((offer: OfferWithBids) => {
                      const offerId = offer.id ?? offer._id ?? "";
                      return (
                        <div
                          key={offerId || offer.createdAt}
                          className="rounded-2xl border border-border bg-background p-5"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h4 className="text-lg font-semibold text-foreground">
                                {offer.goodsType}
                              </h4>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {offer.origin} → {offer.destination}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Ramassage: {offer.pickupDate}
                              </p>
                            </div>
                            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                              {offer.status === "confirmed"
                                ? "Confirmée"
                                : "En attente"}
                            </span>
                          </div>

                          <div className="mt-4 space-y-4">
                            {offer.bids.length === 0 && (
                              <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                                Aucun transporteur n&apos;a encore répondu.
                              </div>
                            )}

                            {offer.bids.map((bid: Bid) => {
                              const bidId = bid.id ?? bid._id ?? "";
                              return (
                                <div
                                  key={bidId || bid.createdAt}
                                className="rounded-xl border border-border bg-card p-4"
                                >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-semibold text-foreground">
                                      Offre: {bid.price} MAD · {bid.vehicleType}
                                    </p>
                                      {(bid.carrierName || bid.carrierPhone) && (
                                        <p className="mt-1 text-xs text-muted-foreground">
                                          Transporteur: {bid.carrierName || "-"} · {bid.carrierPhone || "-"}
                                        </p>
                                      )}
                                    <p className="mt-1 text-xs text-muted-foreground">
                                      ETA: {bid.eta}
                                    </p>
                                    {bid.message && (
                                      <p className="mt-2 text-sm text-muted-foreground">
                                        {bid.message}
                                      </p>
                                    )}
                                  </div>
                                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                                    {bid.status === "accepted"
                                      ? "Acceptée"
                                      : bid.status === "rejected"
                                        ? "Refusée"
                                        : "En attente"}
                                  </span>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      if (offerId && bidId) {
                                        handleBidDecision(
                                          offerId,
                                          bidId,
                                          "accepted",
                                          bid.carrierPhone,
                                          bid.carrierName
                                        );
                                      } else {
                                        setOffersError("Impossible de trouver l'identifiant.");
                                      }
                                    }}
                                    disabled={
                                      bid.status !== "pending" || offer.status === "confirmed"
                                    }
                                  >
                                    Accepter
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      if (offerId && bidId) {
                                        handleBidDecision(
                                          offerId,
                                          bidId,
                                          "rejected",
                                          bid.carrierPhone,
                                          bid.carrierName
                                        );
                                      } else {
                                        setOffersError("Impossible de trouver l'identifiant.");
                                      }
                                    }}
                                    disabled={bid.status !== "pending"}
                                  >
                                    Refuser
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Right column widgets */}
                <aside className="space-y-5">
                  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                    <div className="relative h-40 bg-muted">
                      <Image
                        src={globeImg}
                        alt="Aperçu de l’itinéraire"
                        width={768}
                        height={512}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-card backdrop-blur">
                        <MapIcon className="h-3.5 w-3.5 text-primary" />
                        Aperçu d&apos;itinéraire disponible
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
                        <p className="font-semibold text-foreground">Conseil d&apos;expert</p>
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
                Logistique. La précision en mouvement.
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
