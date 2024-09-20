import initData from "./initData.ts";
import Socket from "./socket.ts";
import listeners from "./listeners.ts";
import { send } from "./sse.ts";

const ws = new Socket("wss://api.lanyard.rest/socket");

ws.onmessage = ({ data }) => {
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

			delete d.listening_to_spotify;
			delete d.spotify;

			initData.discord = d;
			for (const listener of listeners) {
				send(listener, { type: "discord", data: d });
			}
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
						subscribe_to_id: "1273447359417942128",
					},
				}),
			);
			break;
		}
	}
};
