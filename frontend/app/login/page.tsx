"use client";

// Converted from tanstack router to Next.js App Router page
import Link from "next/link";
import { Truck, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import api from "@/api/axios";
import { AxiosError } from "axios";
import { SessionRedirect } from "@/components/site/SessionRedirect";

export default LoginPage;

function LoginPage() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();
    console.log("Tentative de connexion avec:", email, password);

    if (!email || !password) {
      console.log("Email et mot de passe requis");
      setIsLoading(false);
      return;
    }
    try {

      const response = await api.post("/login", {
        email,
        password,
      });
      console.log("Connexion réussie:", response.data.user.role);
      if (response.data.user.role === "client") {
        router.push("/dashboard");
      } else {
        router.push("/shipments");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erreur axios:", error.message);
      } else {
        console.log("Erreur de connexion:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--muted)/0.3)]">
      {/* <SessionRedirect /> */}
      {/* Top bar */}
      <header className="border-b border-border/60 bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Truck className="h-4 w-4" />
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              NaqlGo
            </span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center bg-gradient-to-b from-muted/40 via-background to-muted/40 px-6 py-16">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border/60 bg-card p-10 shadow-[var(--shadow-elegant)]">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Bon retour
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Accédez à votre tableau de bord logistique
              </p>
            </div>

            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="h-11 pl-9"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="h-11 pl-9"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <Checkbox id="remember" />
                  <span>Rester connecté</span>
                </label>
                <a
                  href="#forgot"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={isLoading}>
                {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connexion...
                </>
              ) : (
                "Connexion"
              )}
              </Button>
            </form>

            <div className="mt-8 border-t border-border/60 pt-6 text-center text-sm text-muted-foreground">
              Vous navez pas de compte ?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Inscrivez-vous
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© 2024 NaqlGo Technologies Logistiques. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-primary">Politique de confidentialité</a>
            <a href="#terms" className="hover:text-primary">Conditions de service</a>
            <a href="#cookies" className="hover:text-primary">Politique des cookies</a>
            <a href="#contact" className="hover:text-primary">Contacter le support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
