import { serve, file } from "bun";

import "./build.js";

const listeners = new Set();

function sendSSEMessage(controller, data) {
  controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
}

let initData = {
  heartrate: {
    hr: 0,
  },
  discord: {
    activities: [],
    listening_to_tidal: false,
    tidal: {
      color: "",
      track_id: "",
      song: "",
      artist: "",
      album_art_url: "",
      album: "",
    },
  },
};

const hyperate = new WebSocket( // Yes, this can be hardcoded.
  "wss://app.hyperate.io/socket/websocket?token=wv39nM6iyrNJulvpmMQrimYPIXy2dVrYRjkuHpbRapKT2VSh65ngDGHdCdCtmEN9"
);

hyperate.onopen = () => {
  hyperate.send(
    JSON.stringify({
      topic: `hr:0BCA`,
      event: "phx_join",
      payload: {},
      ref: 0,
    })
  );

  setInterval(() => {
    hyperate.send(
      JSON.stringify({
        topic: "phoenix",
        event: "heartbeat",
        payload: {},
        ref: 0,
      })
    );
  }, 15000);
};

hyperate.onmessage = ({ data }) => {
  let { event, payload } = JSON.parse(data);
  switch (event) {
    case "hr_update": {
      initData.heartrate = payload;
      for (const listener of listeners) {
        sendSSEMessage(listener, { type: "heartrate", data: payload.hr });
      }
      break;
    }
  }
};

const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

lanyard.onmessage = ({ data }) => {
  let { op, d } = JSON.parse(data);
  switch (op) {
    case 0: {
      const tidalData = d.activities.filter((act) => {
        return act.application_id == "1130698654987067493";
      })[0];

      d.listening_to_tidal = typeof tidalData == "object";

      d.tidal = {
        color: tidalData?.assets?.small_text.split("|")[0],
        track_id: tidalData?.assets?.small_text.split("|")[1],
        song: tidalData?.name,
        artist: tidalData?.details,
        album_art_url:
          "https://" + tidalData?.assets?.large_image.split("https/")[1],
        album: tidalData?.assets?.large_text,
      };

      initData.discord = d;
      for (const listener of listeners) {
        sendSSEMessage(listener, { type: "discord", data: d });
      }
      break;
    }
    case 1: {
      // Setup Heartbeat
      setInterval(() => {
        lanyard.send(JSON.stringify({ op: 3 }));
      }, d.heartbeat_interval);
      // Subscribe to user id 1273447359417942128
      lanyard.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: "1273447359417942128",
          },
        })
      );
      break;
    }
  }
};

function sse(req) {
  const { signal } = req;
  return new Response(
    new ReadableStream({
      start(controller) {
        listeners.add(controller);
        sendSSEMessage(controller, {
          type: "heartrate",
          data: initData.heartrate.hr,
        });
        sendSSEMessage(controller, { type: "discord", data: initData.discord });

        signal.onabort = () => {
          listeners.delete(controller);
          controller.close();
        };
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );
}

serve({
  static: {
    "/index.css": new Response(await file("./dist/index.css").bytes(), {
      headers: {
        "Content-Type": "text/css; charset=utf-8",
      },
    }),
    "/index.css.map": new Response(await file("./dist/index.css.map").bytes(), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
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
  },
  async fetch(req) {
    if (new URL(req.url).pathname === "/sse") {
      return sse(req);
    }

    if (new URL(req.url).pathname === "/sse-listener") {
      return new Response(await file("./src/sse-listener.html").bytes(), {
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
