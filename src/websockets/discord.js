import { sig } from "../../iota/dist/index.js";

const ws = new WebSocket("wss://api.lanyard.rest/socket");

const signal = sig({
  discord_status: "offline",
  activities: [],
});

ws.onmessage = ({ data }) => {
  let { op, d } = JSON.parse(data);
  switch (op) {
    case 0: {
      if (d["1273447359417942128"]) {
        d = d["1273447359417942128"];
      }

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

      signal(d);
      break;
    }
    case 1: {
      // Setup Heartbeat
      setInterval(() => {
        ws.send(JSON.stringify({ op: 3 }));
      }, d.heartbeat_interval);
      // Subscribe to user id 1273447359417942128
      ws.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_ids: ["1273447359417942128"],
          },
        })
      );
      break;
    }
  }
};

export default signal;
