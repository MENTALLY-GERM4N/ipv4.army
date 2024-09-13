import { serve, file } from "bun";
import { readdirSync } from "fs";

const app = {
  routes: {
    GET: {},
  },

  get: async (pathName, func) => {
    app.routes.GET[pathName] = await func;
  },
};

const src = [
  ...readdirSync("./src", { recursive: true }).map((f) => {
    return `./src/${f.replaceAll("\\", "/")}`;
  }),
];

src.forEach((fileName) => {
  app.get(
    fileName.replace("./src/", "/").replace("index.html", ""),
    async () => {
      return new Response(file(fileName));
    }
  );
});

serve({
  async fetch(req, server) {
    const path = new URL(req.url).pathname;

    let cb = app.routes[req.method][path];

    if (cb) return cb(req, server);

    return Response.redirect("https://ipv4.army", 307);
  },

  error() {
    return new Response(null, { status: 500 });
  },
});
