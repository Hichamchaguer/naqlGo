import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Truck,
  MessageSquare,
  FileText,
  Settings,
} from "lucide-react";
const avatarMarc = "/assets/avatar-marc.jpg";

const navItems = [
  { label: "Tableau de bord", icon: LayoutGrid, to: "/dashboard" as const },
  { label: "Expéditions", icon: Truck, to: "/shipments" as const },
  { label: "Messages", icon: MessageSquare, to: "/dashboard" as const },
  { label: "Documents", icon: FileText, to: "/dashboard" as const },
  { label: "Paramètres", icon: Settings, to: "/dashboard" as const },
];

export function CarrierSidebar() {
  const pathname = usePathname() || "/";

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-background lg:flex">
      <div className="px-6 py-6">
  <Link href="/" className="block">
          <h1 className="text-lg font-bold tracking-tight text-foreground">NaqlGo Carrier</h1>
          <p className="text-sm text-muted-foreground">Gestionnaire de flotte</p>
        </Link>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <li key={item.label}>
                <Link
                  href={item.to}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="m-3 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
        <img
          src={avatarMarc}
          alt="Marc Lefebvre"
          loading="lazy"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">Marc Lefebvre</p>
          <p className="truncate text-xs text-muted-foreground">Logistics Dir.</p>
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
          <span className="font-bold text-foreground">NaqlGo</span> · © 2024 NaqlGo Logistics.
          Precision in Motion.
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
