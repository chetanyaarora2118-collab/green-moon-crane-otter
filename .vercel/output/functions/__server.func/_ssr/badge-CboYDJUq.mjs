import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./utils-BYe7GtRE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-CboYDJUq.js
var import_jsx_runtime = require_jsx_runtime();
function PageHero({ eyebrow, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-border bg-gradient-brand",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 py-10 text-primary-foreground sm:py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide uppercase",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm/relaxed opacity-90",
					children: description
				})
			]
		})
	});
}
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		outline: "text-foreground",
		success: "border-transparent bg-success/12 text-success"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { PageHero as n, Badge as t };
