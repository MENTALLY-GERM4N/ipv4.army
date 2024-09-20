import { Socket } from "../../../server-src/socket.js";
import { emit } from "../lib/event.js";

const socket = new Socket(
	`ws${location.protocol === "https:" ? "s" : ""}://${location.host}/_ws`,
);

socket.onmessage = (event) => {
	const { type, data } = JSON.parse(event.data);

	emit(type, data);
};
