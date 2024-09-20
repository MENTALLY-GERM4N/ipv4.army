import { serve, file } from "bun";

import "./build.ts";

import { setup } from "./server-src/export.ts";

serve({
	static: {
		"/index.css.map": new Response(
			await file("./web-dist/index.css.map").bytes(),
			{
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			},
		),

		"/index.js.map": new Response(
			await file("./web-dist/index.js.map").bytes(),
			{
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			},
		),

		"/": new Response(await file("./web-dist/index.html").bytes(), {
			headers: {
				"Content-Type": "text/html; charset=utf-8",
			},
		}),

		"/manifest.json": new Response(
			await file("./web-src/manifest.json").bytes(),
			{
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			},
		),
		"/robots.txt": new Response(await file("./web-src/robots.txt").bytes(), {
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		}),
	},
	async fetch(req) {
		if (new URL(req.url).pathname === "/sse") {
			return setup(req);
		}

		return new Response("Not Found", { status: 404 });
	},

	error() {
		return new Response(null, { status: 500 });
	},
});
