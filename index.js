import { serve, file } from "bun";
import {readdirSync} from "fs"
import { defaultTransformers } from "@lilybird/transformers";
import { createClient, Intents } from "lilybird";
import { minify } from "uglify-js";
import CleanCSS from "clean-css";

const clients = [];
let userData = {
  user: {},
  status: "offline",
  client_status: {},
  broadcast: null,
  activities: [],
};
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
    HEAD: {},
    POST: {},
    PUT: {},
    DELETE: {},
    CONNECT: {},
    OPTIONS: {},
    TRACE: {},
    PATCH: {},
    ws: {
      message: {},
      open: {},
      close: {},
      drain: {},
    },
  },

  get: async (pathName, func) => {
    app.routes.GET[pathName] = await func;
  },

  head: async (pathName, func) => {
    app.routes.HEAD[pathName] = await func;
  },

  post: async (pathName, func) => {
    app.routes.POST[pathName] = await func;
  },

  put: async (pathName, func) => {
    app.routes.PUT[pathName] = await func;
  },

  delete: async (pathName, func) => {
    app.routes.DELETE[pathName] = await func;
  },

  connect: async (pathName, func) => {
    app.routes.CONNECT[pathName] = await func;
  },

  options: async (pathName, func) => {
    app.routes.OPTIONS[pathName] = await func;
  },

  trace: async (pathName, func) => {
    app.routes.TRACE[pathName] = await func;
  },

  patch: async (pathName, func) => {
    app.routes.PATCH[pathName] = await func;
  },

  ws: {
    message: async (pathName, func) => {
      app.routes.ws.message[pathName] = await func;
    },

    open: async (pathName, func) => {
      app.routes.ws.open[pathName] = await func;
    },

    close: async (pathName, func) => {
      app.routes.ws.close[pathName] = await func;
    },

    drain: async (pathName, func) => {
      app.routes.ws.drain[pathName] = await func;
    },
  },
};

app.ws.open("/api/ws", async (ws) =>  {
  clients.push(ws);
  ws.send(JSON.stringify(userData));
})

app.ws.close("/api/ws", async (ws) =>  {
  clients.pop(ws);
})

app.get("/api/img", async (req, server) =>  {
  const imgReq = await fetch(`https://wsrv.nl/${new URL(req.url).search}`)
  const img = await imgReq.arrayBuffer()
  
  return new Response(Bun.gzipSync(img), opts);
})

const node_modules = [
  ...readdirSync("./node_modules", { recursive: true }).map((f) => {return `./node_modules/${f.replaceAll("\\", "/")}`})
]

node_modules.forEach(fileName =>  {
  app.get(fileName.replace(".", ""), async (req, server) =>  {
    return new Response(file(fileName))
  })
})

const src = [
  ...readdirSync("./src", { recursive: true }).map((f) => {return `./src/${f.replaceAll("\\", "/")}`})
]

src.forEach(fileName =>  {
  app.get(fileName.replace("./src/", "/").replace("index.html", ""), async (req, server) =>  {
    console.log(fileName)
    return new Response(file(fileName))
  })
})

await createClient({
  token: process.env.TOKEN,
  intents: [Intents.GUILD_MEMBERS, Intents.GUILD_PRESENCES],
  transformers: defaultTransformers,
  listeners: {
    ready: async (client) => {
      console.log(`Logged in as ${client.user.username}`);

      userData.user = await client.rest.getUser(process.env.USERID);
    },
    presenceUpdate: async (_, data) => {
      if (data.user.id !== process.env.USERID) return;

      delete data.guild_id;
      delete data.user;

      Object.assign(userData, data);

      return await sendWebSocketMessage();
    },
    guildMemberUpdate: async (client) => {
      userData.user = await client?.rest?.getUser(process.env.USERID);

      return await sendWebSocketMessage();
    },
  },
});

const sendWebSocketMessage = async () => {
  const sendPromises = clients.map((ws) => {
    return ws.send(JSON.stringify(userData));
  });

  return await Promise.all(sendPromises);
};


const server = Bun.serve({
  async fetch(req, server) {
    const path = new URL(req.url).pathname;

    if (server.upgrade(req, { data: { path } })) return undefined;

    let cb = app.routes[req.method][path]

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