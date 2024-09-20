import { initData } from "./initData.ts";
import Socket from "./socket.ts";
import listeners from "./listeners.ts";
import { send } from "./sse.ts";

const ws = new Socket(
	// Yes, this can be hardcoded.
	"wss://app.hyperate.io/socket/websocket?token=wv39nM6iyrNJulvpmMQrimYPIXy2dVrYRjkuHpbRapKT2VSh65ngDGHdCdCtmEN9",
);

let hrTimeout: ReturnType<typeof setTimeout>;

const setHRInterval = () => {
	hrTimeout = setTimeout(() => {
		initData.heartrate = { hr: "Inactive" };
		for (const listener of listeners) {
			send(listener, { type: "heartrate", data: "Inactive" });
		}
	}, 6000);
};

ws.onopen = () => {
	ws.send(
		JSON.stringify({
			topic: "hr:0BCA",
			event: "phx_join",
			payload: {},
			ref: 0,
		}),
	);

	setInterval(() => {
		ws.send(
			JSON.stringify({
				topic: "phoenix",
				event: "heartbeat",
				payload: {},
				ref: 0,
			}),
		);
	}, 10000);

	setHRInterval();
};

ws.onmessage = ({ data }) => {
	const { event, payload } = JSON.parse(data);
	switch (event) {
		case "hr_update": {
			initData.heartrate = payload;
			clearTimeout(hrTimeout);
			setHRInterval();
			for (const listener of listeners) {
				send(listener, { type: "heartrate", data: payload.hr });
			}
			break;
		}
		default: {
			break;
		}
	}
};
