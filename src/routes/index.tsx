import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Fingerprint, ScanFace, ShieldCheck, Users } from "lucide-react";
import { AttendanceLog } from "@/components/attendance-log";
import { CheckInPanel } from "@/components/check-in-panel";
import { EnrollForm } from "@/components/enroll-form";
import { Roster } from "@/components/roster";
import { SiteNav } from "@/components/site-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isOnSite, useAttendance } from "@/lib/attendance-store";
import { hasPlatformAuthenticator } from "@/lib/biometrics";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const attendance = useAttendance();
  const [platformAuth, setPlatformAuth] = useState(false);

  useEffect(() => {
    hasPlatformAuthenticator().then(setPlatformAuth);
  }, []);

  const onSite = useMemo(
    () => attendance.employees.filter((employee) => isOnSite(attendance.records, employee.id)).length,
    [attendance.employees, attendance.records],
  );
  const eventsToday = useMemo(
    () => attendance.records.filter((record) => new Date(record.timestamp).toDateString() === new Date().toDateString()).length,
    [attendance.records],
  );

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <header className="border-b border-border bg-gradient-brand">
        <div className="mx-auto max-w-6xl px-5 py-10 text-primary-foreground sm:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide uppercase">
            <ShieldCheck className="size-3.5" aria-hidden="true" /> On-device biometrics
          </span>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-5xl">Attendance that recognises your team</h1>
          <p className="mt-3 max-w-xl text-sm/relaxed opacity-90 sm:text-base">
            Presently clocks people in and out with a face scan or a fingerprint from the device sensor. No badges, no
            sign-in sheets.
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            <Stat icon={<Users className="size-4" />} label="Enrolled" value={attendance.employees.length} />
            <Stat icon={<ScanFace className="size-4" />} label="On site now" value={onSite} />
            <Stat icon={<Clock className="size-4" />} label="Events today" value={eventsToday} />
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-5 py-10">
        <Tabs defaultValue="checkin" className="space-y-6">
          <TabsList>
            <TabsTrigger value="checkin" className="gap-1.5">
              <Fingerprint className="size-4" /> Check in
            </TabsTrigger>
            <TabsTrigger value="enroll">Enroll</TabsTrigger>
            <TabsTrigger value="roster">Roster</TabsTrigger>
            <TabsTrigger value="log">Log</TabsTrigger>
          </TabsList>
          <TabsContent value="checkin">
            <Panel
              title="Biometric terminal"
              description="Centre a face in the oval and scan, or verify with the device fingerprint sensor."
            >
              <CheckInPanel
                employees={attendance.employees}
                platformAuth={platformAuth}
                onMatch={attendance.logAttendance}
              />
            </Panel>
          </TabsContent>
          <TabsContent value="enroll">
            <Panel title="Enroll a member" description="Capture a face template, register a fingerprint, or both.">
              <EnrollForm onCreate={attendance.addEmployee} platformAuth={platformAuth} />
            </Panel>
          </TabsContent>
          <TabsContent value="roster">
            <Panel title="Roster" description="Everyone enrolled and their current status.">
              <Roster
                employees={attendance.employees}
                records={attendance.records}
                onRemove={attendance.removeEmployee}
              />
            </Panel>
          </TabsContent>
          <TabsContent value="log">
            <Panel title="Attendance log" description="Every verified clock in and clock out.">
              <AttendanceLog records={attendance.records} onClear={attendance.clearRecords} />
            </Panel>
          </TabsContent>
        </Tabs>
      </section>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Presently · face templates and passkeys stay on this device
      </footer>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/12 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-xs opacity-85">
        {icon}
        {label}
      </div>
      <p className="font-display mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function Panel({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card sm:p-7">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
