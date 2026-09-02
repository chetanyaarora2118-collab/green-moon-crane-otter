const FACE_MATCH_THRESHOLD = 0.86;

export async function hasPlatformAuthenticator() {
  if (typeof window === "undefined" || !window.PublicKeyCredential) return false;
  try {
    return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}

function randomChallenge() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytes;
}

function bufferToBase64Url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBuffer(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export async function enrollFingerprint(userId: string, displayName: string) {
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: randomChallenge(),
      rp: { name: "Presently Attendance" },
      user: {
        id: new TextEncoder().encode(userId),
        name: displayName,
        displayName,
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
        residentKey: "preferred",
      },
      timeout: 60_000,
      attestation: "none",
    },
  });
  if (!credential) throw new Error("Fingerprint enrolment was cancelled.");
  return bufferToBase64Url((credential as PublicKeyCredential).rawId);
}

export async function verifyFingerprint(credentialIds: string[]) {
  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge: randomChallenge(),
      allowCredentials: credentialIds.map((id) => ({
        type: "public-key" as const,
        id: base64UrlToBuffer(id),
      })),
      userVerification: "required",
      timeout: 60_000,
    },
  });
  if (!assertion) throw new Error("No fingerprint was recognised.");
  return bufferToBase64Url((assertion as PublicKeyCredential).rawId);
}

/** 8×8 luminance signature, z-normalised. Returns null if the frame is too flat. */
export function captureFaceTemplate(video: HTMLVideoElement): number[] | null {
  const width = video.videoWidth;
  const height = video.videoHeight;
  if (!width || !height) return null;
  const size = Math.min(width, height) * 0.7;
  const sx = (width - size) / 2;
  const sy = (height - size) / 2;
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 8;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(video, sx, sy, size, size, 0, 0, 8, 8);
  const { data } = ctx.getImageData(0, 0, 8, 8);
  const pixels: number[] = [];
  for (let i = 0; i < data.length; i += 4) {
    pixels.push((0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255);
  }
  const mean = pixels.reduce((sum, value) => sum + value, 0) / pixels.length;
  const variance = pixels.reduce((sum, value) => sum + (value - mean) ** 2, 0) / pixels.length;
  const std = Math.sqrt(variance) || 1e-6;
  if (std < 0.02) return null;
  return pixels.map((value) => (value - mean) / std);
}

export function captureEnrolmentPhoto(video: HTMLVideoElement, size = 320) {
  const width = video.videoWidth;
  const height = video.videoHeight;
  if (!width || !height) return null;
  const crop = Math.min(width, height);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.translate(size, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, (width - crop) / 2, (height - crop) / 2, crop, crop, 0, 0, size, size);
  return canvas.toDataURL("image/jpeg", 0.8);
}

/** Cosine similarity mapped to 0–1. */
export function faceSimilarity(a: number[], b: number[]) {
  if (a.length !== b.length) return 0;
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] ** 2;
    magB += b[i] ** 2;
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB) || 1e-6;
  return (dot / denom + 1) / 2;
}

export function isFaceMatch(score: number) {
  return score >= FACE_MATCH_THRESHOLD;
}
