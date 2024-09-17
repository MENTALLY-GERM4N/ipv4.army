import { serve, file } from "bun";

serve({
  static: {
    "/index.css": await file("./src/index.css").bytes(),
    "/index.js": await file("./dist/index.js").bytes(),

    "/": await file("./src/index.html").bytes(),

    "/manifest.json": await file("./src/manifest.json").bytes(),
    "/robots.txt": await file("./src/robots.txt").bytes(),
  },
  async fetch(req, server) {
    return Response.redirect("https://ipv4.army", 307);
  },

  error() {
    return new Response(null, { status: 500 });
  },
});
