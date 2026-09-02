import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

const links = [
  { to: "/", label: "Terminal" },
  { to: "/history", label: "History" },
  { to: "/clubs", label: "Clubs & Societies" },
  { to: "/events", label: "Events" },
  { to: "/opportunities", label: "Opportunities" },
] as const;

export function SiteNav() {
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3">
        <Link to="/" className="font-display flex items-center gap-2 text-sm font-bold">
          <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
          Presently
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-foreground font-semibold" }}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
