import { createRef } from "tsx-dom";
import { on } from "../lib/event.ts";

export const Tidal = () => {
	const img = createRef<HTMLDivElement>();
	const blur = createRef<HTMLElement>();
	const link = createRef<HTMLAnchorElement>();
	const music = createRef<HTMLHeadingElement>();

	on("discord", (activity: Activity) => {
		if (img.current && blur.current && link.current && music.current) {
			if (activity.listeningToTidal) {
				img.current.style.background = `center / contain no-repeat url(https://wsrv.nl/?output=webp&q=1&url=${activity.tidal.albumArtUrl})`;
				blur.current.classList.add("small-blur");
				link.current.href = `https://tidal.com/browse/track/${activity.tidal.trackId}/u`;
				music.current.textContent = `${activity.tidal.song.replace(
					/\s?[\(\[].*?[\)\]]/g,
					"",
				)} by ${activity.tidal.artist}`;
				music.current.style.filter = `drop-shadow(1px 1px 10px ${activity.tidal.color})`;
			} else {
				blur.current.classList.remove("small-blur");
				link.current.href = "/#";
				music.current.textContent = "Not listening to anything.";
				music.current.style.filter = "";
			}
		}
	});

	return (
		<div style="border-radius: 0.75rem" ref={img}>
			<article class="middle-align center-align" ref={blur}>
				<div class="padding">
					<a href="/#" ref={link}>
						<h5 ref={music}>Not listening to anything.</h5>
					</a>
				</div>
			</article>
		</div>
	);
};
