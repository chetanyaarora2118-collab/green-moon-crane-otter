import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Fingerprint, ScanFace } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { useAttendance } from "@/lib/attendance-store";
import { formatTime } from "@/lib/utils";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  const { records } = useAttendance();
  const days = useMemo(() => {
    const byDay = new Map<string, typeof records>();
    for (const record of records) {
      const key = new Date(record.timestamp).toDateString();
      const list = byDay.get(key);
      if (list) list.push(record);
      else byDay.set(key, [record]);
    }
    return [...byDay.entries()]
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .map(([day, punches]) => {
        const byPerson = new Map<string, typeof punches>();
        for (const punch of punches) {
          const list = byPerson.get(punch.employeeId);
          if (list) list.push(punch);
          else byPerson.set(punch.employeeId, [punch]);
        }
        const people = [...byPerson.entries()].map(([id, list]) => {
          const ordered = [...list].sort((a, b) => a.timestamp - b.timestamp);
          let hours = 0;
          for (let i = 0; i < ordered.length - 1; i += 2) {
            const inn = ordered[i];
            const out = ordered[i + 1];
            if (inn && out) hours += (out.timestamp - inn.timestamp) / 3_600_000;
          }
          return {
            id,
            name: ordered[0].employeeName,
            first: ordered[0].timestamp,
            last: ordered[ordered.length - 1].timestamp,
            hours,
            punches: ordered.length,
            methods: [...new Set(ordered.map((item) => item.method))],
          };
        });
        return {
          day,
          label: new Date(day).toLocaleDateString([], {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          people: people.sort((a, b) => a.first - b.first),
        };
      });
  }, [records]);

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="Archive"
        title="Past attendance history"
        description="Every previous day of check-ins, summarised per member with first in, last out and total hours on site."
      />
      <section className="mx-auto max-w-6xl space-y-6 px-5 py-10">
        {days.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No attendance recorded yet. Check someone in at the terminal and their history will build up here.
          </p>
        ) : (
          days.map((group) => (
            <article key={group.day} className="rounded-2xl border border-border bg-card shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
                <h2 className="font-display text-base font-semibold">{group.label}</h2>
                <span className="text-xs text-muted-foreground">
                  {group.people.length} member{group.people.length === 1 ? "" : "s"} ·{" "}
                  {group.people.reduce((sum, person) => sum + person.punches, 0)} punches
                </span>
              </div>
              <div className="divide-y divide-border">
                {group.people.map((person) => (
                  <div key={person.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm">
                    <div className="min-w-0">
                      <p className="font-medium">{person.name}</p>
                      <p className="text-xs text-muted-foreground">
                        In {formatTime(person.first)} · Out {formatTime(person.last)}
                        {person.punches % 2 === 1 ? " (still open)" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {person.methods.map((method) => (
                        <Badge key={method} variant="outline" className="gap-1">
                          {method === "face" ? <ScanFace className="size-3" /> : <Fingerprint className="size-3" />}
                          {method}
                        </Badge>
                      ))}
                      <span className="font-display text-sm font-semibold tabular-nums">{person.hours.toFixed(1)}h</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
