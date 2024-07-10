import { serve, file } from "bun";
import { defaultTransformers } from "@lilybird/transformers";
import { createClient, Intents } from "lilybird";
import { minify } from "uglify-js";
import CleanCSS from "clean-css";
import albumArt from "./albumArt.js";

const clients = [];
let userData = {
  user: {},
  status: "offline",
  client_status: {},
  broadcast: null,
  activities: [],
};

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

const opts = {
  headers: {
    "Cache-Control": "public, max-age=31536000, immutable",
    "Access-Control-Allow-Origin": "*",
    "Content-Encoding": "gzip",
  },
};

const defaultImage =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
serve({
  fetch: async (req, server) => {
    const path = new URL(req.url);

    let params = "";
    const url = path.searchParams.get("url");
    const w = path.searchParams.get("w");
    const h = path.searchParams.get("h");
    const output = path.searchParams.get("output");
    if (w) params += `&w=${w}`;
    if (h) params += `&h=${h}`;
    if (output) params += `&w=${output}`;

    if (path.pathname == "/ws" && server.upgrade(req)) {
      return;
    }

    if (path.pathname == "/img") {
      if (url) {
        let fetchResp = await fetch(`https://wsrv.nl/?url=${url}${params}`);
        let buffer = await fetchResp.arrayBuffer();
        return new Response(Bun.gzipSync(buffer), opts);
      } else {
        let buffer = Uint8Array.from(atob(defaultImage), (c) =>
          c.charCodeAt(0)
        );
        resp = new Response(Bun.gzipSync(buffer), opts);
      }
    }

    if (path.pathname == "/albumArt") {
      let fetchResp = await fetch(
        `https://wsrv.nl/?url=${await albumArt(
          path.searchParams.get("q") || ""
        )}${params}`
      );
      let buffer = await fetchResp.arrayBuffer();
      return new Response(Bun.gzipSync(buffer), opts);
    }

    if (path.pathname.startsWith("/audio/")) {
      return new Response(file(`./src/${path.pathname}`));
    }

    const fileRes = file(
      `./${path.pathname.startsWith("/node_modules/") ? "" : "src"}${
        path.pathname == "/" ? "/index.html" : path.pathname
      }`
    );

    if (!(await fileRes.exists())) {
      return Response.redirect("/", 301);
    }

    let text = await fileRes.text();

    text = text.replace("{ DISCORD_USER_DATE: {} }", JSON.stringify(userData));

    let cache = true;

    if (fileRes.type.includes("javascript")) {
      text = minify(text).code;
    }

    if (fileRes.type.includes("css")) {
      text = new CleanCSS().minify(text).styles;
    }

    if (path.pathname.startsWith("/node_modules/")) {
      cache = false;
    }

    return new Response(Bun.gzipSync(text), {
      headers: {
        "Content-Type": fileRes.type,
        "Content-Encoding": "gzip",
        ...(cache ? opts.headers : {}),
      },
    });
  },
  websocket: {
    open: async (ws) => {
      clients.push(ws);
      ws.send(JSON.stringify(userData));
    },
    close: async (ws) => clients.pop(ws),
  },
  //port: 3002,
});
