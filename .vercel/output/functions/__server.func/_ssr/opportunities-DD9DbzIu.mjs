import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as MapPin, h as Building2, m as CalendarClock, t as Wallet } from "../_libs/lucide-react.mjs";
import { t as SiteNav } from "./utils-BYe7GtRE.mjs";
import { n as PageHero, t as Badge } from "./badge-CboYDJUq.mjs";
import { t as Button } from "./button-C9gvMxFJ.mjs";
import { r as opportunities } from "./campus-BeoZG_Ax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunities-DD9DbzIu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var filters = [
	"All",
	"Internship",
	"Research",
	"Competition",
	"Volunteer",
	"Scholarship"
];
function OpportunitiesPage() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const items = (0, import_react.useMemo)(() => filter === "All" ? opportunities : opportunities.filter((item) => item.type === filter), [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				eyebrow: "Grow further",
				title: "Opportunities",
				description: "Internships, research assistantships, competitions, scholarships and volunteering shared by clubs, departments and alumni."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 py-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex flex-wrap gap-2",
					children: filters.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: filter === kind ? "default" : "outline",
						onClick: () => setFilter(kind),
						children: kind
					}, kind))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-border bg-card p-5 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-base font-semibold",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: item.type
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: item.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }),
											" ",
											item.org
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
											" ",
											item.location
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-3.5" }),
											" ",
											item.stipend
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-1.5 font-medium text-primary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5" }),
											" Apply by ",
											item.deadline
										]
									})
								]
							})
						]
					}, item.id))
				})]
			})
		]
	});
}
//#endregion
export { OpportunitiesPage as component };
