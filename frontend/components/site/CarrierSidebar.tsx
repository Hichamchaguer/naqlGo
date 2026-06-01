"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const avatarMarc = "/assets/avatar-marc.jpg";

type CurrentUser = {
  firstName?: string;
  lastName?: string;
  profilePicture?: string | null;
  role?: string;
};


export function CarrierSidebar() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    profilePicture: "",
  });
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const response = await api.get<CurrentUser>("/user");
        if (isMounted) {
          setCurrentUser(response.data);
          setProfileForm({
            firstName: response.data?.firstName ?? "",
            lastName: response.data?.lastName ?? "",
            profilePicture: response.data?.profilePicture ?? "",
          });
        }
      } catch {
        if (isMounted) {
          setCurrentUser(null);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayName = useMemo(() => {
    const first = currentUser?.firstName?.trim();
    const last = currentUser?.lastName?.trim();
    const fullName = [first, last].filter(Boolean).join(" ");
    return fullName || "Utilisateur";
  }, [currentUser]);

  const displayRole = currentUser?.role
    ? currentUser.role === "transportor"
      ? "Transporteur"
      : "Client"
    : "";
  const avatarSrc = currentUser?.profilePicture || avatarMarc;

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSaveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const payload = {
        firstName: profileForm.firstName.trim(),
        lastName: profileForm.lastName.trim(),
        profilePicture: profileForm.profilePicture.trim(),
      };
      const response = await api.put<CurrentUser>("/user", payload);
      setCurrentUser(response.data);
      setSaveMessage("Profil mis à jour.");
      setSettingsOpen(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      setSaveMessage("Impossible de mettre à jour le profil.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-background lg:flex">
      <div className="px-6 py-6">
  <Link href="/" className="block">
          <h1 className="text-lg font-bold tracking-tight text-foreground">NaqlGo Transporteur</h1>
          <p className="text-sm text-muted-foreground">Gestionnaire de flotte</p>
        </Link>
      </div>

      <div className="mt-auto">
        <div className="m-3 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
        <Image
          src={avatarSrc}
          alt={displayName}
          width={40}
          height={40}
          unoptimized
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{displayName}</p>
          <p className="truncate text-xs text-muted-foreground">
            {displayRole || "Utilisateur"}
          </p>
        </div>
        </div>

        <div className="flex flex-col items-start gap-2 px-3 pb-4">
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-full justify-start">
                Paramètres
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle>Paramètres du compte</DialogTitle>
                <DialogDescription>
                  Mettez à jour vos informations personnelles.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={profileForm.firstName}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        firstName: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={profileForm.lastName}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        lastName: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profilePicture">Photo (URL)</Label>
                  <Input
                    id="profilePicture"
                    value={profileForm.profilePicture}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        profilePicture: event.target.value,
                      }))
                    }
                  />
                </div>
                {saveMessage && (
                  <p className="text-sm text-muted-foreground">{saveMessage}</p>
                )}
                <DialogFooter>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </aside>
  );
}

export function CarrierFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-5 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>
          <span className="font-bold text-foreground">NaqlGo</span> · © 2024 NaqlGo Logistique.
          La précision en mouvement.
        </p>
        <div className="flex flex-wrap gap-5">
          <a href="#" className="hover:text-foreground">Politique de confidentialité</a>
          <a href="#" className="hover:text-foreground">Conditions de service</a>
          <a href="#" className="hover:text-foreground">Accord Transporteur</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
