import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as MapPin, d as Clock, n as Users, p as CalendarDays, u as Fingerprint } from "../_libs/lucide-react.mjs";
import { t as SiteNav } from "./utils-BYe7GtRE.mjs";
import { n as PageHero, t as Badge } from "./badge-CboYDJUq.mjs";
import { t as campusEvents } from "./campus-BeoZG_Ax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-DOvdre57.js
var import_jsx_runtime = require_jsx_runtime();
function EventsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				eyebrow: "What's on",
				title: "Campus events",
				description: "Sessions hosted by clubs and societies. Events marked biometric take attendance through the Presently terminal at the door."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl space-y-4 px-5 py-10",
				children: campusEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-border bg-card p-5 shadow-card sm:flex sm:items-start sm:gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 shrink-0 rounded-xl bg-secondary px-4 py-3 text-center sm:mb-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold",
							children: event.date
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: event.time
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-base font-semibold",
									children: event.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: event.attendance === "biometric" ? "default" : "outline",
									children: event.attendance === "biometric" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "size-3" }), " Biometric check-in"]
									}) : "Manual roll call"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: event.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5" }),
											" ",
											event.group
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
											" ",
											event.venue
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
											" ",
											event.seats,
											" seats"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), " Doors 30 min prior"]
									})
								]
							})
						]
					})]
				}, event.id))
			})
		]
	});
}
//#endregion
export { EventsPage as component };
