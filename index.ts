import { file, serve } from "bun";

import "./build.ts";

import { onOpen, onClose } from "./server-src/export.ts";

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
	async fetch(req, server) {
		const { pathname } = new URL(req.url);

		if (pathname === "/_ws" && server.upgrade(req)) {
			return;
		}

		return new Response("Not Found", { status: 404 });
	},

	websocket: {
		open(ws) {
			return onOpen(ws);
		},
		close(ws) {
			return onClose(ws);
		},
		message() {
			return;
		},
		drain() {
			return;
		},
	},

	error() {
		return new Response(null, { status: 500 });
	},
});
