import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BYe7GtRE.js
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		to: "/",
		label: "Terminal"
	},
	{
		to: "/history",
		label: "History"
	},
	{
		to: "/clubs",
		label: "Clubs & Societies"
	},
	{
		to: "/events",
		label: "Events"
	},
	{
		to: "/opportunities",
		label: "Opportunities"
	}
];
function SiteNav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "font-display flex items-center gap-2 text-sm font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
					className: "size-4 text-primary",
					"aria-hidden": "true"
				}), "Presently"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground",
				children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					activeOptions: { exact: link.to === "/" },
					activeProps: { className: "text-foreground font-semibold" },
					className: "transition-colors hover:text-foreground",
					children: link.label
				}, link.to))
			})]
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatTime(ts) {
	return new Date(ts).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function formatDate(ts) {
	return new Date(ts).toLocaleDateString([], {
		month: "short",
		day: "numeric"
	});
}
function newId() {
	return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
//#endregion
export { newId as a, formatTime as i, cn as n, formatDate as r, SiteNav as t };
