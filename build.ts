import postcssPurge from "@fullhuman/postcss-purgecss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcss from "postcss";
import postcssImport from "postcss-import";

import { $, build, file, write } from "bun";

await $`rm -rf ./web-dist`;

const js = await build({
	entrypoints: ["./web-src/index.tsx"],
	outdir: "./web-dist",
	format: "esm",
	minify: true,
});
if (!js.success) {
	console.error(js.logs);
	process.exit(1);
}

await postcss([
	autoprefixer(),
	postcssImport(),
	postcssPurge({
		content: ["./web-src/index.html", "./web-dist/index.js"],
	}),
	cssnano({ preset: "default" }),
])
	.process(await file("./web-src/index.css").text(), {
		from: "./web-src/index.css",
		to: "./web-dist/index.css",
	})
	.then((result) => {
		write("./web-dist/index.css", result.css);
	});

let html = await file("./web-src/index.html").text();
html = html.replace(
	`<link href="./index.css" rel="stylesheet" />`,
	`<style>${await file("./web-dist/index.css").text()}</style>`,
);
html = html.replace(
	`<script src="./index.tsx"></script>`,
	`<script>${await file("./web-dist/index.js").text()}</script>`,
);

await write("./web-dist/index.html", html);
