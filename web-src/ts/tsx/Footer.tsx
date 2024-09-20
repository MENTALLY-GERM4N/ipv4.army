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
				<button class="border small-round" type="button">
					GitHub
				</button>
			</a>
		</nav>
	);
};
