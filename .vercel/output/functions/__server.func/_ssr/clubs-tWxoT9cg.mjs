import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Users } from "../_libs/lucide-react.mjs";
import { t as SiteNav } from "./utils-BYe7GtRE.mjs";
import { n as PageHero, t as Badge } from "./badge-CboYDJUq.mjs";
import { t as Button } from "./button-C9gvMxFJ.mjs";
import { n as campusGroups } from "./campus-BeoZG_Ax.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clubs-tWxoT9cg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClubsPage() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const groups = (0, import_react.useMemo)(() => filter === "all" ? campusGroups : campusGroups.filter((group) => group.kind === filter), [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				eyebrow: "Campus directory",
				title: "Clubs & societies",
				description: "Every registered group, who runs it, when it meets and how many members it tracks through the biometric terminal."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 py-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex flex-wrap gap-2",
					children: [
						"all",
						"club",
						"society"
					].map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: filter === kind ? "default" : "outline",
						onClick: () => setFilter(kind),
						className: "capitalize",
						children: kind === "all" ? "All groups" : `${kind}s`
					}, kind))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-border bg-card p-5 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-base font-semibold",
									children: group.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: group.kind === "society" ? "secondary" : "default",
									className: "capitalize",
									children: group.kind
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: group.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 space-y-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-foreground",
											children: group.category
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Lead" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-foreground",
											children: group.lead
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Meets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-foreground",
											children: group.meets
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 flex items-center gap-1.5 text-xs font-medium text-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
									" ",
									group.members,
									" members"
								]
							})
						]
					}, group.id))
				})]
			})
		]
	});
}
//#endregion
export { ClubsPage as component };
