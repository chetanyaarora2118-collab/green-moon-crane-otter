import { Fingerprint, ScanFace, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isOnSite } from "@/lib/attendance-store";
import type { AttendanceRecord, Employee } from "@/lib/types";

export function Roster({
  employees,
  records,
  onRemove,
}: {
  employees: Employee[];
  records: AttendanceRecord[];
  onRemove: (id: string) => void;
}) {
  if (employees.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
        No one enrolled yet. Head to Enroll to register your first member.
      </p>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {employees.map((employee) => {
        const onSite = isOnSite(records, employee.id);
        return (
          <li
            key={employee.id}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
          >
            {employee.photo ? (
              <img
                src={employee.photo}
                alt={`${employee.name} enrolment photo`}
                className="size-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-12 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground">
                {employee.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{employee.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {employee.role} · {employee.department}
              </p>
              <div className="mt-1.5 flex items-center gap-2 text-muted-foreground">
                {employee.faceTemplate && <ScanFace className="size-3.5 text-primary" />}
                {employee.credentialId && <Fingerprint className="size-3.5 text-primary" />}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase ${
                    onSite ? "bg-success/12 text-success" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {onSite ? "On site" : "Away"}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" aria-label={`Remove ${employee.name}`} onClick={() => onRemove(employee.id)}>
              <Trash2 className="size-4" />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
