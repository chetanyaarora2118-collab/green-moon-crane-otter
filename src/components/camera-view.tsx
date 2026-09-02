import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Camera, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setStarting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }
      setActive(true);
    } catch {
      setError("Camera unavailable. Allow camera access in your browser and try again.");
    } finally {
      setStarting(false);
    }
  }, []);

  useEffect(() => stop, [stop]);

  return { videoRef, active, error, starting, start, stop };
}

export function CameraView({
  videoRef,
  active,
  starting,
  error,
  scanning,
  onStart,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  active: boolean;
  starting: boolean;
  error: string | null;
  scanning: boolean;
  onStart: () => void;
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface">
      <video
        ref={videoRef}
        playsInline
        muted
        className={`h-full w-full scale-x-[-1] object-cover transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      {!active && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
            {starting ? <LoaderCircle className="size-6 animate-spin" /> : <Camera className="size-6" />}
          </div>
          <p className="max-w-[15rem] text-sm text-muted-foreground">
            {error ?? "Turn on the camera to scan a face."}
          </p>
          <Button size="sm" onClick={onStart} disabled={starting}>
            {starting ? "Starting…" : "Enable camera"}
          </Button>
        </div>
      )}
      {active && (
        <>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className={`size-[62%] rounded-[42%] border-2 transition-colors duration-300 ${
                scanning ? "border-primary" : "border-primary/40"
              }`}
            />
          </div>
          <div className="pointer-events-none absolute inset-x-6 top-5 flex justify-between text-[10px] font-medium tracking-[0.2em] text-primary uppercase">
            <span>Live</span>
            <span>{scanning ? "Scanning" : "Ready"}</span>
          </div>
          {scanning && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="animate-scanline h-1/2 w-full bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
