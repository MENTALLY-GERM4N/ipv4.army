import "tsx-dom-types";

declare module "tsx-dom-types" {
	interface SVGAttributes {
		d?: string; // Removable after a new tsx-dom release
	}
}

declare global {
	interface SVGElement {
		xmlns?: string;
	}
	interface SVGPathElement {
		d?: string;
	}
}

export const Footer = () => {
	return (
		<nav class="bottom">
			<a
				aria-label="GitHub Link"
				href="https://github.com/wont-stream"
				rel="noopener noreferrer"
				target="_blank"
			>
				<i>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
					>
						<path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
					</svg>
				</i>
				<div>GitHub</div>
			</a>
		</nav>
	);
};
