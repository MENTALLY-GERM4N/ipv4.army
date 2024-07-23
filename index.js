import { serve, file } from "bun";
import { readdirSync } from "fs";

const opts = {
  headers: {
    "Cache-Control": "public, max-age=31536000, immutable",
    "Access-Control-Allow-Origin": "*",
    "Content-Encoding": "gzip",
  },
};

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

  return new Response(Bun.gzipSync(img), opts);
});

const node_modules = [
  ...readdirSync("./node_modules", { recursive: true }).map((f) => {
    return `./node_modules/${f.replaceAll("\\", "/")}`;
  }),
];

node_modules.forEach((fileName) => {
  app.get(fileName.replace(".", ""), async () => {
    return new Response(file(fileName));
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

    if (server.upgrade(req, { data: { path } })) return undefined;

    let cb = app.routes[req.method][path];

    if (cb) return cb(req, server);

    return Response.redirect("https://ipv4.army", 307);
  },

  websocket: {
    async message(ws, message) {
      if (app.routes.ws.message[ws.data.path])
        return app.routes.ws.message[ws.data.path](ws, message);
    },

    async open(ws) {
      if (app.routes.ws.open[ws.data.path])
        return app.routes.ws.open[ws.data.path](ws);
    },

    async close(ws, code, message) {
      if (app.routes.ws.close[ws.data.path])
        return app.routes.ws.close[ws.data.path](ws, code, message);
    },

    async drain(ws) {
      if (app.routes.ws.drain[ws.data.path])
        return app.routes.ws.drain[ws.data.path](ws);
    },
  },

  error() {
    return new Response(null, { status: 500 });
  },
});
