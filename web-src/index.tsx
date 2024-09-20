import "tsx-dom";
import "./ts/sse/index.js";
import "./ts/lib/1.js";
import { App } from "./ts/tsx/App.tsx";

declare global {
	type Activity = {
		discordStatus: string;
		listeningToTidal: boolean;
		tidal: {
			color: string;
			trackId: string;
			song: string;
			artist: string;
			albumArtUrl: string;
			album: string;
		};
	};
}

document.body.appendChild(<App />);
