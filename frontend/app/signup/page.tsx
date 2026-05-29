"use client";
import Link from "next/link";
import { useState } from "react";
import { Truck, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
const sideImage = "/assets/signup-side.jpg";
import api from "@/api/axios";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default SignupPage;

type Role = "client" | "transportor";

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("client");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);

    if (e.target.password.value !== e.target.confirmPassword.value) {
      console.log("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
    await api.post("/register", {
      firstName: e.target.Firstname.value,
      lastName: e.target.Lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      role,
    });
    router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Signup error:", error.message);
      } else {
        console.log("Signup error:", error);
      }
    } finally {
      setIsLoading(false);
    }

};
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left brand panel */}
      <aside className="relative hidden overflow-hidden lg:block">
        <img
          src={sideImage}
          alt="NaqlGo logistics fleet at a warehouse"
          className="absolute inset-0 h-full w-full object-cover"
          width={800}
          height={1280}
          loading="lazy"
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
              Elevating Logistics to a Fine Art.
            </h2>
            <p className="text-base text-primary-foreground/85">
              Experience precision tracking, reliable fleet management, and
              seamless shipping across the continent.
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
                Create your account
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Join the NaqlGo ecosystem and start moving.
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
                <Label htmlFor="Firstname">First Name</Label>
                <Input
                  id="Firstname"
                  type="text"
                  className="h-11"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="Lastname">Last Name</Label>
                <Input
                  id="Lastname"
                  type="text"
                  className="h-11"
                  autoComplete="family-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-11"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="h-11 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                <Label htmlFor="confirmPassword">confirme Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    className="h-11 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                  I agree to the{" "}
                  <a href="#terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={isLoading}> 
                {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign In
              </Link>
            </p>

            {/* <div className="mt-8 border-t border-border/60 pt-6">
              <p className="text-center text-xs uppercase tracking-wider text-muted-foreground">
                Or sign up with
              </p>
              <Button onClick={() => {
              window.location.href =
                "http://localhost:3002/auth/google";
            }} variant="google" className="w-full gap-3 py-6 rounded-2xl">
              <GoogleIcon className="w-5 h-5" />
              Continue with Google
            </Button>
            </div> */}
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

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-accent"
    >
      {label}
    </button>
  );
}
