import postcssPurge from "@fullhuman/postcss-purgecss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcss from "postcss";
import postcssImport from "postcss-import";

import { $, build, file, write } from "bun";

await $`rm -rf ./dist`;

const js = await build({
	entrypoints: ["./src/index.tsx"],
	outdir: "./dist",
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
		content: ["./src/index.html", "./dist/index.js"],
	}),
	cssnano({ preset: "default" }),
])
	.process(await file("./src/index.css").text(), {
		from: "./src/index.css",
		to: "./dist/index.css",
	})
	.then((result) => {
		write("./dist/index.css", result.css);
	});

let html = await file("./src/index.html").text();
html = html.replace(
	`<link href="./index.css" rel="stylesheet" />`,
	`<style>${await file("./dist/index.css").text()}</style>`,
);
html = html.replace(
	`<script src="./index.tsx"></script>`,
	`<script>${await file("./dist/index.js").text()}</script>`,
);

await write("./dist/index.html", html);
