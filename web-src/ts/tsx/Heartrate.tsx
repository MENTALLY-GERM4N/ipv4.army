import { createRef } from "tsx-dom";
import { on } from "../lib/event.ts";

export const Heartrate = () => {
	const hr = createRef<HTMLSpanElement>();

	on("heartrate", (rate: string) => {
		if (hr.current?.textContent) {
			hr.current.textContent = rate;
		}
	});

	return (
		<article class="middle-align center-align">
			<div class="padding">
				<h5>
					Heartrate:{" "}
					<span id="heartrate" ref={hr}>
						Inactive
					</span>
				</h5>
			</div>
		</article>
	);
};
