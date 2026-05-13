import Link from "next/link";
import { useState } from "react";
import { Truck, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
const sideImage = "/assets/signup-side.jpg";

export default SignupPage;

type Role = "client" | "carrier";

function SignupPage() {
  const [role, setRole] = useState<Role>("client");
  const [showPassword, setShowPassword] = useState(false);

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
                active={role === "carrier"}
                onClick={() => setRole("carrier")}
                icon={<Truck className="h-5 w-5" />}
                label="Transporteur"
              />
            </div>

            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => e.preventDefault()}
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

              <Button type="submit" size="lg" className="h-12 w-full text-base">
                Create Account
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
              <div className="mt-4 grid grid-cols-2 gap-3 col-span-2 flex justify-center">
                  <SocialButton label="Google" />
              </div>
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
