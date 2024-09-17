import { serve, file } from "bun";

serve({
  static: {
    "/index.css": new Response(await file("./src/index.css").bytes(), {
      headers: {
        "Content-Type": "text/css; charset=utf-8",
      },
    }),
    "/index.js": new Response(await file("./dist/index.js").bytes(), {
      headers: {
        "Content-Type": "text/javascript; charset=utf-8",
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
  },
  async fetch(req, server) {
    return Response.redirect("https://ipv4.army", 307);
  },

  error() {
    return new Response(null, { status: 500 });
  },
});
