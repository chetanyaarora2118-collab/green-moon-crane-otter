import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, Fingerprint, MapPin, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { campusEvents } from "@/lib/campus";

export const Route = createFileRoute("/events")({ component: EventsPage });

function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="What's on"
        title="Campus events"
        description="Sessions hosted by clubs and societies. Events marked biometric take attendance through the Presently terminal at the door."
      />
      <section className="mx-auto max-w-6xl space-y-4 px-5 py-10">
        {campusEvents.map((event) => (
          <article
            key={event.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-card sm:flex sm:items-start sm:gap-6"
          >
            <div className="mb-4 shrink-0 rounded-xl bg-secondary px-4 py-3 text-center sm:mb-0">
              <p className="font-display text-sm font-semibold">{event.date}</p>
              <p className="text-xs text-muted-foreground">{event.time}</p>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-base font-semibold">{event.title}</h2>
                <Badge variant={event.attendance === "biometric" ? "default" : "outline"}>
                  {event.attendance === "biometric" ? (
                    <span className="flex items-center gap-1">
                      <Fingerprint className="size-3" /> Biometric check-in
                    </span>
                  ) : (
                    "Manual roll call"
                  )}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{event.blurb}</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" /> {event.group}
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> {event.venue}
                </li>
                <li className="flex items-center gap-1.5">
                  <Users className="size-3.5" /> {event.seats} seats
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock className="size-3.5" /> Doors 30 min prior
                </li>
              </ul>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
