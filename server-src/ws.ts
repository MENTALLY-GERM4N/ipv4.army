import type { ServerWebSocket } from "bun";
import { initData } from "./initData.ts";

const sockets = new Set<ServerWebSocket<unknown>>();

export const send = async (data: { type: string; data: string | object }) => {
	for (const socket of sockets) {
		socket.send(JSON.stringify(data));
	}
};

export const onOpen = async (ws: ServerWebSocket<unknown>) => {
	sockets.add(ws);

	send({
		type: "heartrate",
		data: initData.heartrate.hr,
	});
	send({ type: "discord", data: initData.discord });
};

export const onClose = async (ws: ServerWebSocket<unknown>) => {
	sockets.delete(ws);
};
