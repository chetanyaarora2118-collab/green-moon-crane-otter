import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as ArrowDownLeft, a as Trash2, d as Clock, f as Camera, g as ArrowUpRight, l as LoaderCircle, n as Users, o as ShieldCheck, r as UserPlus, s as ScanFace, u as Fingerprint } from "../_libs/lucide-react.mjs";
import { i as formatTime, n as cn, r as formatDate, t as SiteNav } from "./utils-BYe7GtRE.mjs";
import { t as Button } from "./button-C9gvMxFJ.mjs";
import { n as useAttendance, t as isOnSite } from "./attendance-store-BJ_zLtyq.mjs";
import { t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-_qSKOhFH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AttendanceLog({ records, onClear }) {
	if (records.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground",
		children: "No check-ins recorded yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-2xl border border-border bg-card shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface text-left text-xs tracking-wide text-muted-foreground uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Member"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Event"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "hidden px-4 py-3 font-medium sm:table-cell",
							children: "Method"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "Time"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: records.slice(0, 40).map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium",
							children: record.employeeName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${record.direction === "in" ? "bg-success/12 text-success" : "bg-warning/15 text-warning-foreground"}`,
								children: [
									record.direction === "in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" }),
									"Clock ",
									record.direction
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "hidden px-4 py-3 text-muted-foreground sm:table-cell",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [record.method === "face" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "size-3.5" }), record.method === "face" ? `Face · ${((record.confidence ?? 0) * 100).toFixed(0)}%` : "Fingerprint"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3 text-right whitespace-nowrap text-muted-foreground",
							children: [formatTime(record.timestamp), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-xs",
								children: formatDate(record.timestamp)
							})]
						})
					]
				}, record.id)) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "sm",
			onClick: onClear,
			children: "Clear log"
		})]
	});
}
function useCamera() {
	const videoRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const [active, setActive] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [starting, setStarting] = (0, import_react.useState)(false);
	const stop = (0, import_react.useCallback)(() => {
		streamRef.current?.getTracks().forEach((track) => track.stop());
		streamRef.current = null;
		if (videoRef.current) videoRef.current.srcObject = null;
		setActive(false);
	}, []);
	const start = (0, import_react.useCallback)(async () => {
		setError(null);
		setStarting(true);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: "user",
					width: { ideal: 640 },
					height: { ideal: 480 }
				},
				audio: false
			});
			streamRef.current = stream;
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play().catch(() => void 0);
			}
			setActive(true);
		} catch {
			setError("Camera unavailable. Allow camera access in your browser and try again.");
		} finally {
			setStarting(false);
		}
	}, []);
	(0, import_react.useEffect)(() => stop, [stop]);
	return {
		videoRef,
		active,
		error,
		starting,
		start,
		stop
	};
}
function CameraView({ videoRef, active, starting, error, scanning, onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				playsInline: true,
				muted: true,
				className: `h-full w-full scale-x-[-1] object-cover transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`
			}),
			!active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground",
						children: starting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-[15rem] text-sm text-muted-foreground",
						children: error ?? "Turn on the camera to scan a face."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: onStart,
						disabled: starting,
						children: starting ? "Starting…" : "Enable camera"
					})
				]
			}),
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `size-[62%] rounded-[42%] border-2 transition-colors duration-300 ${scanning ? "border-primary" : "border-primary/40"}` })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none absolute inset-x-6 top-5 flex justify-between text-[10px] font-medium tracking-[0.2em] text-primary uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: scanning ? "Scanning" : "Ready" })]
				}),
				scanning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-scanline h-1/2 w-full bg-gradient-to-b from-transparent via-primary/25 to-transparent" })
				})
			] })
		]
	});
}
var FACE_MATCH_THRESHOLD = .86;
async function hasPlatformAuthenticator() {
	if (typeof window === "undefined" || !window.PublicKeyCredential) return false;
	try {
		return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
	} catch {
		return false;
	}
}
function randomChallenge() {
	const bytes = /* @__PURE__ */ new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return bytes;
}
function bufferToBase64Url(buffer) {
	const bytes = new Uint8Array(buffer);
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function base64UrlToBuffer(value) {
	const padded = value.replace(/-/g, "+").replace(/_/g, "/");
	const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes.buffer;
}
async function enrollFingerprint(userId, displayName) {
	const credential = await navigator.credentials.create({ publicKey: {
		challenge: randomChallenge(),
		rp: { name: "Presently Attendance" },
		user: {
			id: new TextEncoder().encode(userId),
			name: displayName,
			displayName
		},
		pubKeyCredParams: [{
			type: "public-key",
			alg: -7
		}, {
			type: "public-key",
			alg: -257
		}],
		authenticatorSelection: {
			authenticatorAttachment: "platform",
			userVerification: "required",
			residentKey: "preferred"
		},
		timeout: 6e4,
		attestation: "none"
	} });
	if (!credential) throw new Error("Fingerprint enrolment was cancelled.");
	return bufferToBase64Url(credential.rawId);
}
async function verifyFingerprint(credentialIds) {
	const assertion = await navigator.credentials.get({ publicKey: {
		challenge: randomChallenge(),
		allowCredentials: credentialIds.map((id) => ({
			type: "public-key",
			id: base64UrlToBuffer(id)
		})),
		userVerification: "required",
		timeout: 6e4
	} });
	if (!assertion) throw new Error("No fingerprint was recognised.");
	return bufferToBase64Url(assertion.rawId);
}
/** 8×8 luminance signature, z-normalised. Returns null if the frame is too flat. */
function captureFaceTemplate(video) {
	const width = video.videoWidth;
	const height = video.videoHeight;
	if (!width || !height) return null;
	const size = Math.min(width, height) * .7;
	const sx = (width - size) / 2;
	const sy = (height - size) / 2;
	const canvas = document.createElement("canvas");
	canvas.width = 8;
	canvas.height = 8;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	ctx.drawImage(video, sx, sy, size, size, 0, 0, 8, 8);
	const { data } = ctx.getImageData(0, 0, 8, 8);
	const pixels = [];
	for (let i = 0; i < data.length; i += 4) pixels.push((.299 * data[i] + .587 * data[i + 1] + .114 * data[i + 2]) / 255);
	const mean = pixels.reduce((sum, value) => sum + value, 0) / pixels.length;
	const variance = pixels.reduce((sum, value) => sum + (value - mean) ** 2, 0) / pixels.length;
	const std = Math.sqrt(variance) || 1e-6;
	if (std < .02) return null;
	return pixels.map((value) => (value - mean) / std);
}
function captureEnrolmentPhoto(video, size = 320) {
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
	return canvas.toDataURL("image/jpeg", .8);
}
/** Cosine similarity mapped to 0–1. */
function faceSimilarity(a, b) {
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
function isFaceMatch(score) {
	return score >= FACE_MATCH_THRESHOLD;
}
function CheckInPanel({ employees, platformAuth, onMatch }) {
	const camera = useCamera();
	const [scanning, setScanning] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(null);
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
		let best = null;
		for (const employee of employees) {
			if (!employee.faceTemplate) continue;
			const score = faceSimilarity(template, employee.faceTemplate);
			if (!best || score > best.score) best = {
				employee,
				score
			};
		}
		setScanning(false);
		if (!best || !isFaceMatch(best.score)) {
			toast.error("Face not recognised. Try again or enroll this person.");
			return;
		}
		const record = onMatch(best.employee, "face", best.score);
		setLast({
			record,
			employee: best.employee
		});
		toast.success(`${best.employee.name} clocked ${record.direction}.`);
	}
	async function scanFingerprint() {
		const ids = employees.map((employee) => employee.credentialId).filter((id) => !!id);
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
			setLast({
				record,
				employee
			});
			toast.success(`${employee.name} clocked ${record.direction}.`);
		} catch {
			toast.error("Fingerprint check failed or was cancelled.");
		} finally {
			setScanning(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 md:grid-cols-[minmax(0,320px)_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraView, {
			videoRef: camera.videoRef,
			active: camera.active,
			starting: camera.starting,
			error: camera.error,
			scanning,
			onStart: camera.start
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: "w-full justify-start",
						disabled: !camera.active || scanning,
						onClick: scanFace,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "size-5" }), scanning ? "Matching face…" : "Scan face to clock in / out"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						variant: "outline",
						className: "w-full justify-start",
						disabled: scanning || !platformAuth,
						onClick: scanFingerprint,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "size-5" }), "Use fingerprint instead"]
					}),
					!platformAuth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "This device has no fingerprint sensor available to the browser — face scanning still works."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `rounded-2xl border p-5 transition-colors ${last ? "border-success/40 bg-success/5" : "border-dashed border-border bg-surface"}`,
				children: last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [last.employee.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: last.employee.photo,
						alt: `${last.employee.name} enrolment photo`,
						className: "size-14 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-14 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-foreground",
						children: last.employee.name.charAt(0)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold",
						children: last.employee.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Clocked ",
							last.record.direction,
							" at",
							" ",
							new Date(last.record.timestamp).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit"
							}),
							last.record.method === "face" && last.record.confidence ? ` · ${(last.record.confidence * 100).toFixed(1)}% match` : " · fingerprint verified"
						]
					})] })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Last verification will appear here with the matched member, method and confidence score."
				})
			})]
		})]
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
	...props
}));
Label.displayName = Root.displayName;
function EnrollForm({ onCreate, platformAuth }) {
	const camera = useCamera();
	const [name, setName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [faceTemplate, setFaceTemplate] = (0, import_react.useState)(null);
	const [credentialId, setCredentialId] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
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
			credentialId
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 md:grid-cols-[minmax(0,320px)_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraView, {
				videoRef: camera.videoRef,
				active: camera.active,
				starting: camera.starting,
				error: camera.error,
				scanning: false,
				onStart: camera.start
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				className: "w-full",
				disabled: !camera.active,
				onClick: captureFace,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "size-4" }), faceTemplate ? "Recapture face" : "Capture face template"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Aarav Mehta"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "role",
								children: "Role"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "role",
								value: role,
								onChange: (e) => setRole(e.target.value),
								placeholder: "Team lead"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "dept",
								children: "Department"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "dept",
								value: department,
								onChange: (e) => setDepartment(e.target.value),
								placeholder: "Engineering"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BiometricStatus, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "size-4" }),
						label: "Face template",
						done: !!faceTemplate,
						hint: faceTemplate ? "64-point signature stored" : "Capture from the camera"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BiometricStatus, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "size-4" }),
						label: "Fingerprint",
						done: !!credentialId,
						hint: credentialId ? "Device passkey linked" : platformAuth ? "Uses your device sensor" : "No sensor found on this device"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: registerFingerprint,
						disabled: busy || !platformAuth,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "size-4" }), credentialId ? "Re-register fingerprint" : "Register fingerprint"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: enroll,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), "Enroll member"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-start gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-3.5 shrink-0" }), "Biometrics never leave this device — the face signature and the passkey handle are stored locally in the browser."]
				})
			]
		})]
	});
}
function BiometricStatus({ icon, label, done, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl border p-3 transition-colors ${done ? "border-success/40 bg-success/5" : "border-border bg-surface"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm font-medium",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: done ? "text-success" : "text-muted-foreground",
					children: icon
				}),
				label,
				done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto text-xs font-normal text-success",
					children: "Ready"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: hint
		})]
	});
}
function Roster({ employees, records, onRemove }) {
	if (employees.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground",
		children: "No one enrolled yet. Head to Enroll to register your first member."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3 sm:grid-cols-2",
		children: employees.map((employee) => {
			const onSite = isOnSite(records, employee.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card",
				children: [
					employee.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: employee.photo,
						alt: `${employee.name} enrolment photo`,
						className: "size-12 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-12 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground",
						children: employee.name.charAt(0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: employee.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									employee.role,
									" · ",
									employee.department
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-center gap-2 text-muted-foreground",
								children: [
									employee.faceTemplate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "size-3.5 text-primary" }),
									employee.credentialId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "size-3.5 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase ${onSite ? "bg-success/12 text-success" : "bg-muted text-muted-foreground"}`,
										children: onSite ? "On site" : "Away"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": `Remove ${employee.name}`,
						onClick: () => onRemove(employee.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})
				]
			}, employee.id);
		})
	});
}
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-auto min-h-9 flex-wrap items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function Home() {
	const attendance = useAttendance();
	const [platformAuth, setPlatformAuth] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hasPlatformAuthenticator().then(setPlatformAuth);
	}, []);
	const onSite = (0, import_react.useMemo)(() => attendance.employees.filter((employee) => isOnSite(attendance.records, employee.id)).length, [attendance.employees, attendance.records]);
	const eventsToday = (0, import_react.useMemo)(() => attendance.records.filter((record) => new Date(record.timestamp).toDateString() === (/* @__PURE__ */ new Date()).toDateString()).length, [attendance.records]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border bg-gradient-brand",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-10 text-primary-foreground sm:py-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
								className: "size-3.5",
								"aria-hidden": "true"
							}), " On-device biometrics"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 max-w-2xl text-3xl font-semibold sm:text-5xl",
							children: "Attendance that recognises your team"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-sm/relaxed opacity-90 sm:text-base",
							children: "Presently clocks people in and out with a face scan or a fingerprint from the device sensor. No badges, no sign-in sheets."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid max-w-2xl gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
									label: "Enrolled",
									value: attendance.employees.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "size-4" }),
									label: "On site now",
									value: onSite
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
									label: "Events today",
									value: eventsToday
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-5 py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "checkin",
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "checkin",
								className: "gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "size-4" }), " Check in"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "enroll",
								children: "Enroll"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "roster",
								children: "Roster"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "log",
								children: "Log"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "checkin",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Biometric terminal",
								description: "Centre a face in the oval and scan, or verify with the device fingerprint sensor.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckInPanel, {
									employees: attendance.employees,
									platformAuth,
									onMatch: attendance.logAttendance
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "enroll",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Enroll a member",
								description: "Capture a face template, register a fingerprint, or both.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnrollForm, {
									onCreate: attendance.addEmployee,
									platformAuth
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "roster",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Roster",
								description: "Everyone enrolled and their current status.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roster, {
									employees: attendance.employees,
									records: attendance.records,
									onRemove: attendance.removeEmployee
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "log",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Attendance log",
								description: "Every verified clock in and clock out.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendanceLog, {
									records: attendance.records,
									onClear: attendance.clearRecords
								})
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border py-8 text-center text-xs text-muted-foreground",
				children: "Presently · face templates and passkeys stay on this device"
			})
		]
	});
}
function Stat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-white/12 px-4 py-3 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-xs opacity-85",
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display mt-1 text-2xl font-semibold tabular-nums",
			children: value
		})]
	});
}
function Panel({ title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-5 shadow-card sm:p-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 mb-6 text-sm text-muted-foreground",
				children: description
			}),
			children
		]
	});
}
//#endregion
export { Home as component };
