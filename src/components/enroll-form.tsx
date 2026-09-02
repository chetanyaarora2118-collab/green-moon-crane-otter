import { useState, type ReactNode } from "react";
import { Fingerprint, ScanFace, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { CameraView, useCamera } from "@/components/camera-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { captureEnrolmentPhoto, captureFaceTemplate, enrollFingerprint } from "@/lib/biometrics";
import type { Employee } from "@/lib/types";

export function EnrollForm({
  onCreate,
  platformAuth,
}: {
  onCreate: (employee: Omit<Employee, "id" | "createdAt">) => void;
  platformAuth: boolean;
}) {
  const camera = useCamera();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [faceTemplate, setFaceTemplate] = useState<number[] | null>(null);
  const [credentialId, setCredentialId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function captureFace() {
    const video = camera.videoRef.current;
    if (!video) return;
    const template = captureFaceTemplate(video);
    if (!template) {
      toast.error("Couldn't read a face — check the lighting and centre yourself in the oval.");
      return;
    }
    setFaceTemplate(template);
    setPhoto(captureEnrolmentPhoto(video));
    toast.success("Face template captured.");
  }

  async function registerFingerprint() {
    setBusy(true);
    try {
      const id = await enrollFingerprint(crypto.randomUUID(), name || "New member");
      setCredentialId(id);
      toast.success("Fingerprint registered on this device.");
    } catch {
      toast.error("Fingerprint enrolment failed or was cancelled.");
    } finally {
      setBusy(false);
    }
  }

  function enroll() {
    if (!name.trim()) {
      toast.error("Add a name first.");
      return;
    }
    if (!faceTemplate && !credentialId) {
      toast.error("Register at least one biometric — face or fingerprint.");
      return;
    }
    onCreate({
      name: name.trim(),
      role: role.trim() || "Member",
      department: department.trim() || "General",
      photo,
      faceTemplate,
      credentialId,
    });
    toast.success(`${name.trim()} enrolled.`);
    setName("");
    setRole("");
    setDepartment("");
    setPhoto(null);
    setFaceTemplate(null);
    setCredentialId(null);
    camera.stop();
  }

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,320px)_1fr]">
      <div className="space-y-3">
        <CameraView
          videoRef={camera.videoRef}
          active={camera.active}
          starting={camera.starting}
          error={camera.error}
          scanning={false}
          onStart={camera.start}
        />
        <Button variant="secondary" className="w-full" disabled={!camera.active} onClick={captureFace}>
          <ScanFace className="size-4" />
          {faceTemplate ? "Recapture face" : "Capture face template"}
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aarav Mehta" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Team lead" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dept">Department</Label>
            <Input
              id="dept"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Engineering"
            />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <BiometricStatus
            icon={<ScanFace className="size-4" />}
            label="Face template"
            done={!!faceTemplate}
            hint={faceTemplate ? "64-point signature stored" : "Capture from the camera"}
          />
          <BiometricStatus
            icon={<Fingerprint className="size-4" />}
            label="Fingerprint"
            done={!!credentialId}
            hint={
              credentialId
                ? "Device passkey linked"
                : platformAuth
                  ? "Uses your device sensor"
                  : "No sensor found on this device"
            }
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={registerFingerprint} disabled={busy || !platformAuth}>
            <Fingerprint className="size-4" />
            {credentialId ? "Re-register fingerprint" : "Register fingerprint"}
          </Button>
          <Button onClick={enroll}>
            <UserPlus className="size-4" />
            Enroll member
          </Button>
        </div>
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0" />
          Biometrics never leave this device — the face signature and the passkey handle are stored locally in the
          browser.
        </p>
      </div>
    </div>
  );
}

function BiometricStatus({
  icon,
  label,
  done,
  hint,
}: {
  icon: ReactNode;
  label: string;
  done: boolean;
  hint: string;
}) {
  return (
    <div
      className={`rounded-xl border p-3 transition-colors ${
        done ? "border-success/40 bg-success/5" : "border-border bg-surface"
      }`}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className={done ? "text-success" : "text-muted-foreground"}>{icon}</span>
        {label}
        {done && <span className="ml-auto text-xs font-normal text-success">Ready</span>}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
