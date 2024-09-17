import { serve, file } from "bun";

import "./build.js";

const staticRoutes = {
  "/index.css": new Response(await file("./src/index.css").bytes(), {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
    },
  }),
  "/index.ts": new Response(await file("./dist/index.js").bytes(), {
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
    },
  }),

  "/index.js.map": new Response(await file("./dist/index.js.map").bytes(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  }),

  "/": new Response(await file("./src/index.html").bytes(), {
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
};

serve({
  static: staticRoutes,
  async fetch(req) {
    /*
    const { pathname } = new URL(req.url);
    if (staticRoutes[pathname]) {
      return staticRoutes[pathname];
    }*/

    return Response.redirect("/", 307);
  },

  error() {
    return new Response(null, { status: 500 });
  },
});
