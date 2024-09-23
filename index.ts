import { file, serve } from "bun";

import "./build.ts";

serve({
	static: {
		"/": new Response(await file("./dist/index.html").bytes(), {
			headers: {
				"Content-Type": "text/html; charset=utf-8",
			},
		}),

		"/manifest.json": new Response(await file("./src/manifest.json").bytes(), {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		}),
		"/robots.txt": new Response(await file("./src/robots.txt").bytes(), {
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		}),
	},
	async fetch(req, server) {
		const { pathname } = new URL(req.url);

		// Static doesn't work right on windows?
		if (process.env.ISDEV === "true" && pathname === "/") {
			return new Response(await file("./dist/index.html").bytes(), {
				headers: {
					"Content-Type": "text/html; charset=utf-8",
				},
			});
		}

		return new Response("Not Found", { status: 404 });
	},

	error() {
		return new Response(null, { status: 500 });
	},
});
