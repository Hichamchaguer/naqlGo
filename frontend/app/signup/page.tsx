"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Truck, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
const sideImage = "/assets/signup-side.jpg";
import api from "@/api/axios";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { SessionRedirect } from "@/components/site/SessionRedirect";

export default SignupPage;

type Role = "client" | "transportor";

function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("client");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = String(formData.get("password") || "").trim();
    const confirmPassword = String(formData.get("confirmPassword") || "").trim();
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (password !== confirmPassword) {
      console.log("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }
    try {
      await api.post("/register", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role,
      });
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Erreur d'inscription:", error.message);
      } else {
        console.log("Erreur d'inscription:", error);
      }
    } finally {
      setIsLoading(false);
    }

};
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <SessionRedirect />
      {/* Left brand panel */}
      <aside className="relative hidden overflow-hidden lg:block">
        <Image
          src={sideImage}
          alt="Flotte logistique NaqlGo dans un entrepôt"
          className="absolute inset-0 h-full w-full object-cover"
          width={800}
          height={1280}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/80" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/15 backdrop-blur">
              <Truck className="h-4 w-4" />
            </span>
            <span className="text-lg font-bold tracking-tight">NaqlGo</span>
          </Link>

          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-semibold leading-tight">
              La logistique élevée au rang d&apos;art.
            </h2>
            <p className="text-base text-primary-foreground/85">
              Suivez vos expéditions avec précision, gérez votre flotte en toute
              fiabilité et expédiez partout sur le continent.
            </p>
          </div>
        </div>
      </aside>

      {/* Right form panel */}
      <main className="flex flex-col bg-background">
        <header className="flex items-center justify-between border-b border-border/60 px-6 py-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Truck className="h-4 w-4" />
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              NaqlGo
            </span>
          </Link>
          <a
            href="#support"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Support
          </a>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Créez votre compte
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Rejoignez l&apos;écosystème NaqlGo et lancez-vous.
              </p>
            </div>

            {/* Role toggle */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <RoleCard
                active={role === "client"}
                onClick={() => setRole("client")}
                icon={<User className="h-5 w-5" />}
                label="Client"
              />
              <RoleCard
                active={role === "transportor"}
                onClick={() => setRole("transportor")}
                icon={<Truck className="h-5 w-5" />}
                label="Transporteur"
              />
            </div>

            <form
              className="mt-6 space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="h-11"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="h-11"
                  autoComplete="family-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="h-11"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="h-11 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    className="h-11 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-foreground">
                <Checkbox id="terms" className="mt-0.5" />
                <span className="text-muted-foreground">
                  J&apos;accepte les{" "}
                  <a href="#terms" className="text-primary hover:underline">
                    conditions d&apos;utilisation
                  </a>{" "}
                  et la{" "}
                  <a href="#privacy" className="text-primary hover:underline">
                    politique de confidentialité
                  </a>
                  .
                </span>
              </label>

              <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={isLoading}> 
                {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Création du compte...
                </>
              ) : (
                "S&apos;inscrire"
              )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Connexion
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function RoleCard({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-medium transition-all ${
        active
          ? "border-primary bg-primary/5 text-foreground shadow-sm"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      <span className={active ? "text-primary" : "text-muted-foreground"}>
        {icon}
      </span>
      {label}
    </button>
  );
}
