import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as ScanFace, u as Fingerprint } from "../_libs/lucide-react.mjs";
import { i as formatTime, t as SiteNav } from "./utils-BYe7GtRE.mjs";
import { n as PageHero, t as Badge } from "./badge-CboYDJUq.mjs";
import { n as useAttendance } from "./attendance-store-BJ_zLtyq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-ZEuz0Wfe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const { records } = useAttendance();
	const days = (0, import_react.useMemo)(() => {
		const byDay = /* @__PURE__ */ new Map();
		for (const record of records) {
			const key = new Date(record.timestamp).toDateString();
			const list = byDay.get(key);
			if (list) list.push(record);
			else byDay.set(key, [record]);
		}
		return [...byDay.entries()].sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).map(([day, punches]) => {
			const byPerson = /* @__PURE__ */ new Map();
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
					if (inn && out) hours += (out.timestamp - inn.timestamp) / 36e5;
				}
				return {
					id,
					name: ordered[0].employeeName,
					first: ordered[0].timestamp,
					last: ordered[ordered.length - 1].timestamp,
					hours,
					punches: ordered.length,
					methods: [...new Set(ordered.map((item) => item.method))]
				};
			});
			return {
				day,
				label: new Date(day).toLocaleDateString([], {
					weekday: "long",
					month: "short",
					day: "numeric",
					year: "numeric"
				}),
				people: people.sort((a, b) => a.first - b.first)
			};
		});
	}, [records]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				eyebrow: "Archive",
				title: "Past attendance history",
				description: "Every previous day of check-ins, summarised per member with first in, last out and total hours on site."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl space-y-6 px-5 py-10",
				children: days.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground",
					children: "No attendance recorded yet. Check someone in at the terminal and their history will build up here."
				}) : days.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-border bg-card shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold",
							children: group.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								group.people.length,
								" member",
								group.people.length === 1 ? "" : "s",
								" ·",
								" ",
								group.people.reduce((sum, person) => sum + person.punches, 0),
								" punches"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: group.people.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: person.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"In ",
										formatTime(person.first),
										" · Out ",
										formatTime(person.last),
										person.punches % 2 === 1 ? " (still open)" : ""
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [person.methods.map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "gap-1",
									children: [method === "face" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanFace, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "size-3" }), method]
								}, method)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-sm font-semibold tabular-nums",
									children: [person.hours.toFixed(1), "h"]
								})]
							})]
						}, person.id))
					})]
				}, group.day))
			})
		]
	});
}
//#endregion
export { HistoryPage as component };
