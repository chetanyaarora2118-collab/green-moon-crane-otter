import { useState } from "react";
import { Fingerprint, ScanFace } from "lucide-react";
import { toast } from "sonner";
import { CameraView, useCamera } from "@/components/camera-view";
import { Button } from "@/components/ui/button";
import {
  captureFaceTemplate,
  faceSimilarity,
  isFaceMatch,
  verifyFingerprint,
} from "@/lib/biometrics";
import type { AttendanceRecord, Employee } from "@/lib/types";

type LastMatch = { record: AttendanceRecord; employee: Employee };

export function CheckInPanel({
  employees,
  platformAuth,
  onMatch,
}: {
  employees: Employee[];
  platformAuth: boolean;
  onMatch: (employee: Employee, method: "face" | "fingerprint", confidence: number) => AttendanceRecord;
}) {
  const camera = useCamera();
  const [scanning, setScanning] = useState(false);
  const [last, setLast] = useState<LastMatch | null>(null);

  async function scanFace() {
    const video = camera.videoRef.current;
    if (!video) return;
    setScanning(true);
    setLast(null);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const template = captureFaceTemplate(video);
    if (!template) {
      setScanning(false);
      toast.error("No face detected in the frame.");
      return;
    }
    let best: { employee: Employee; score: number } | null = null;
    for (const employee of employees) {
      if (!employee.faceTemplate) continue;
      const score = faceSimilarity(template, employee.faceTemplate);
      if (!best || score > best.score) best = { employee, score };
    }
    setScanning(false);
    if (!best || !isFaceMatch(best.score)) {
      toast.error("Face not recognised. Try again or enroll this person.");
      return;
    }
    const record = onMatch(best.employee, "face", best.score);
    setLast({ record, employee: best.employee });
    toast.success(`${best.employee.name} clocked ${record.direction}.`);
  }

  async function scanFingerprint() {
    const ids = employees.map((employee) => employee.credentialId).filter((id): id is string => !!id);
    if (ids.length === 0) {
      toast.error("No fingerprints enrolled yet.");
      return;
    }
    setScanning(true);
    setLast(null);
    try {
      const matchedId = await verifyFingerprint(ids);
      const employee = employees.find((item) => item.credentialId === matchedId);
      if (!employee) {
        toast.error("Fingerprint not linked to any member.");
        return;
      }
      const record = onMatch(employee, "fingerprint", 1);
      setLast({ record, employee });
      toast.success(`${employee.name} clocked ${record.direction}.`);
    } catch {
      toast.error("Fingerprint check failed or was cancelled.");
    } finally {
      setScanning(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,320px)_1fr]">
      <CameraView
        videoRef={camera.videoRef}
        active={camera.active}
        starting={camera.starting}
        error={camera.error}
        scanning={scanning}
        onStart={camera.start}
      />
      <div className="flex flex-col justify-between gap-6">
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full justify-start"
            disabled={!camera.active || scanning}
            onClick={scanFace}
          >
            <ScanFace className="size-5" />
            {scanning ? "Matching face…" : "Scan face to clock in / out"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full justify-start"
            disabled={scanning || !platformAuth}
            onClick={scanFingerprint}
          >
            <Fingerprint className="size-5" />
            Use fingerprint instead
          </Button>
          {!platformAuth && (
            <p className="text-xs text-muted-foreground">
              This device has no fingerprint sensor available to the browser — face scanning still works.
            </p>
          )}
        </div>
        <div
          className={`rounded-2xl border p-5 transition-colors ${
            last ? "border-success/40 bg-success/5" : "border-dashed border-border bg-surface"
          }`}
        >
          {last ? (
            <div className="flex items-center gap-4">
              {last.employee.photo ? (
                <img
                  src={last.employee.photo}
                  alt={`${last.employee.name} enrolment photo`}
                  className="size-14 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-14 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-foreground">
                  {last.employee.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-display text-lg font-semibold">{last.employee.name}</p>
                <p className="text-sm text-muted-foreground">
                  Clocked {last.record.direction} at{" "}
                  {new Date(last.record.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {last.record.method === "face" && last.record.confidence
                    ? ` · ${(last.record.confidence * 100).toFixed(1)}% match`
                    : " · fingerprint verified"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Last verification will appear here with the matched member, method and confidence score.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
