import { ArrowDownLeft, ArrowUpRight, Fingerprint, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/utils";
import type { AttendanceRecord } from "@/lib/types";

export function AttendanceLog({
  records,
  onClear,
}: {
  records: AttendanceRecord[];
  onClear: () => void;
}) {
  if (records.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
        No check-ins recorded yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Member</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Method</th>
              <th className="px-4 py-3 text-right font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {records.slice(0, 40).map((record) => (
              <tr key={record.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{record.employeeName}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      record.direction === "in"
                        ? "bg-success/12 text-success"
                        : "bg-warning/15 text-warning-foreground"
                    }`}
                  >
                    {record.direction === "in" ? (
                      <ArrowDownLeft className="size-3.5" />
                    ) : (
                      <ArrowUpRight className="size-3.5" />
                    )}
                    Clock {record.direction}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  <span className="inline-flex items-center gap-1.5">
                    {record.method === "face" ? (
                      <ScanFace className="size-3.5" />
                    ) : (
                      <Fingerprint className="size-3.5" />
                    )}
                    {record.method === "face"
                      ? `Face · ${((record.confidence ?? 0) * 100).toFixed(0)}%`
                      : "Fingerprint"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap text-muted-foreground">
                  {formatTime(record.timestamp)}
                  <span className="ml-1 text-xs">{formatDate(record.timestamp)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="ghost" size="sm" onClick={onClear}>
        Clear log
      </Button>
    </div>
  );
}
