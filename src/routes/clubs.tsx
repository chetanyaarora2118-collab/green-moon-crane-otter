import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { campusGroups } from "@/lib/campus";

export const Route = createFileRoute("/clubs")({ component: ClubsPage });

function ClubsPage() {
  const [filter, setFilter] = useState<"all" | "club" | "society">("all");
  const groups = useMemo(
    () => (filter === "all" ? campusGroups : campusGroups.filter((group) => group.kind === filter)),
    [filter],
  );

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="Campus directory"
        title="Clubs & societies"
        description="Every registered group, who runs it, when it meets and how many members it tracks through the biometric terminal."
      />
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", "club", "society"] as const).map((kind) => (
            <Button
              key={kind}
              size="sm"
              variant={filter === kind ? "default" : "outline"}
              onClick={() => setFilter(kind)}
              className="capitalize"
            >
              {kind === "all" ? "All groups" : `${kind}s`}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <article key={group.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-base font-semibold">{group.name}</h2>
                <Badge variant={group.kind === "society" ? "secondary" : "default"} className="capitalize">
                  {group.kind}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{group.blurb}</p>
              <dl className="mt-4 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between gap-3">
                  <dt>Category</dt>
                  <dd className="text-foreground">{group.category}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Lead</dt>
                  <dd className="text-foreground">{group.lead}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Meets</dt>
                  <dd className="text-foreground">{group.meets}</dd>
                </div>
              </dl>
              <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary">
                <Users className="size-3.5" /> {group.members} members
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
