import { Truck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Truck className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">NaqlGo</p>
            <p className="text-xs text-muted-foreground">© 2026 NaqlGo Logistics. Transport in motion.</p>
          </div>
        </div>

        <ul className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <li><a href="#" className="transition-colors hover:text-primary">Privacy Policy</a></li>
          <li><a href="#" className="transition-colors hover:text-primary">Terms of Service</a></li>
          <li><a href="#" className="transition-colors hover:text-primary">Carrier Agreement</a></li>
          <li><a href="#" className="transition-colors hover:text-primary">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
