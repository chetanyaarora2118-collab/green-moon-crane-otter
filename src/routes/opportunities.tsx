import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, CalendarClock, MapPin, Wallet } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { opportunities } from "@/lib/campus";

export const Route = createFileRoute("/opportunities")({ component: OpportunitiesPage });

const filters = ["All", "Internship", "Research", "Competition", "Volunteer", "Scholarship"] as const;

function OpportunitiesPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = useMemo(
    () => (filter === "All" ? opportunities : opportunities.filter((item) => item.type === filter)),
    [filter],
  );

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="Grow further"
        title="Opportunities"
        description="Internships, research assistantships, competitions, scholarships and volunteering shared by clubs, departments and alumni."
      />
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((kind) => (
            <Button key={kind} size="sm" variant={filter === kind ? "default" : "outline"} onClick={() => setFilter(kind)}>
              {kind}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-base font-semibold">{item.title}</h2>
                <Badge variant="secondary">{item.type}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{item.blurb}</p>
              <ul className="mt-4 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
                <li className="flex items-center gap-1.5">
                  <Building2 className="size-3.5" /> {item.org}
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> {item.location}
                </li>
                <li className="flex items-center gap-1.5">
                  <Wallet className="size-3.5" /> {item.stipend}
                </li>
                <li className="flex items-center gap-1.5 font-medium text-primary">
                  <CalendarClock className="size-3.5" /> Apply by {item.deadline}
                </li>
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
