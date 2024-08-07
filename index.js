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

app.get("/api/img", async (req) => {
  const imgReq = await fetch(`https://wsrv.nl/${new URL(req.url).search}`);
  const img = await imgReq.arrayBuffer();

  return new Response(Bun.gzipSync(img), {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
      "Content-Encoding": "gzip",
    },
  });
});

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
