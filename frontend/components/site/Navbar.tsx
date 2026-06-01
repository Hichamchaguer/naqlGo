import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Truck className="h-4 w-4" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">NaqlGo</span>
        </Link>


        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/login">Connexion</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Inscription</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
