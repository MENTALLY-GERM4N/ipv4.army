import { on } from "./ts/lib/event.js";
import "./ts/sse/index.js";
import "./ts/lib/1.js";

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

const elements = {
	avatar: document.getElementById("avatar") as HTMLImageElement,
	img: document.getElementById("img"),
	link: document.getElementById("link"),
	blur: document.getElementById("blur"),
	music: document.getElementById("music"),
	heartrate: document.getElementById("heartrate"),
};

function updateAvatarBorder(avatar: HTMLImageElement, discordStatus: string) {
	avatar.style.border = `solid var(--${discordStatus})`;
}

function updateTidalElements(activity: Activity) {
	const { img, link, blur, music } = elements;

	if (img) {
		img.setAttribute(
			"style",
			`background: center / contain no-repeat url(https://wsrv.nl/?output=webp&q=1&url=${activity.tidal.albumArtUrl})`,
		);
	}
	if (link) {
		link.setAttribute(
			"href",
			`https://tidal.com/browse/track/${activity.tidal.trackId}/u`,
		);
	}

	if (blur) {
		blur.classList.add("small-blur");
	}

	if (music) {
		music.textContent = `${activity.tidal.song.replace(
			/\s?[\(\[].*?[\)\]]/g,
			"",
		)} ${activity.tidal.artist} ${
			activity.tidal.album.replace("on ", "") !== activity.tidal.song
				? activity.tidal.album
				: ""
		}`;
		music.style.filter = `drop-shadow(1px 1px 10px ${activity.tidal.color})`;
	}
}

function resetTidalElements() {
	const { blur, music } = elements;

	if (blur) {
		blur.classList.remove("small-blur");
	}

	if (music) {
		music.textContent = "Not listening to anything.";
	}
}

on("discord", (activity: Activity) => {
	const { avatar } = elements;
	if (avatar) {
		updateAvatarBorder(avatar, activity.discordStatus);
	}

	if (activity.listeningToTidal) {
		updateTidalElements(activity);
	} else {
		resetTidalElements();
	}
});

on("heartrate", (rate: string) => {
	const { heartrate } = elements;
	if (heartrate) {
		heartrate.textContent = rate.toString();
	}
});
