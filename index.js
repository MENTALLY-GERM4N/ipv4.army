import { serve, file } from "bun";
import { defaultTransformers } from "@lilybird/transformers";
import { createClient, Intents } from "lilybird";
import albumArt from "./albumArt.js";

import die from "./die.js";

import { randomUUID } from "node:crypto";
import { EventEmitter } from "node:events";

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
  },
};

const defaultImage =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const sseEvents = new EventEmitter();

const sse = (data) => {
  sseEvents.emit(
    "sse",
    `id: ${randomUUID()}\ndata: ${JSON.stringify(data)}\n\n`
  );
};

let counter = 0;
setInterval(() => {
  sse({ payload: { date: Date.now(), times: counter++ } });
});

serve({
  fetch: async (req, server) => {
    const path = new URL(req.url);

    // :)
    if (path.pathname == "/.env") {
      return new Response(
        new ReadableStream({
          start(controller) {
            const send = async () => {
              controller.enqueue(await die(performance.now().toString()));
            };

            setInterval(send);
          },
        }),
        {
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no",
          },
        }
      );
    }

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
    } else if (path.pathname == "/img") {
      if (url) {
        let fetchResp = await fetch(`https://wsrv.nl/?url=${url}${params}`);
        let buffer = await fetchResp.arrayBuffer();
        return new Response(buffer, opts);
      } else {
        let buffer = Uint8Array.from(atob(defaultImage), (c) =>
          c.charCodeAt(0)
        );
        resp = new Response(buffer, opts);
      }
    } else if (path.pathname == "/albumArt") {
      let fetchResp = await fetch(
        `https://wsrv.nl/?url=${await albumArt(
          path.searchParams.get("q") || ""
        )}${params}`
      );
      let buffer = await fetchResp.arrayBuffer();
      return new Response(buffer, opts);
    }

    const fileRes = file(
      `.${path.pathname == "/" ? "/index.html" : path.pathname}`
    );

    let text = await fileRes.text();

    text = text.replace("{ DISCORD_USER_DATE: {} }", JSON.stringify(userData));

    return new Response(text, {
      headers: {
        "content-type": fileRes.type,
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
});
