import { initData } from "./initData.ts";
import { listeners } from "./listeners.ts";

export function send(
	controller: ReadableStreamDefaultController,
	data: { type: string; data: string | object },
) {
	controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
}

export async function setup(req: Request) {
	const { signal } = req;
	return new Response(
		new ReadableStream({
			start(controller) {
				listeners.add(controller);
				send(controller, {
					type: "heartrate",
					data: initData.heartrate.hr,
				});
				send(controller, { type: "discord", data: initData.discord });

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
				connection: "keep-alive",
				"X-Accel-Buffering": "no",
				"transfer-encoding": "identity",
			},
		},
	);
}
