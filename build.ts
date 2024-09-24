import postcssPurge from "@fullhuman/postcss-purgecss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcss from "postcss";
import postcssImport from "postcss-import";

import { $, build, file, write } from "bun";

try {
	await $`rm -rf ./dist`;
} catch (_) {}

let html = await file("./src/index.html").text();

const js = await build({
	entrypoints: ["./src/index.tsx"],
	format: "esm",
	minify: true,
});
if (!js.success) {
	console.error(js.logs);
	process.exit(1);
}

html = html.replace(
	`<script src="./index.tsx"></script>`,
	`<script>${await js.outputs[0].text()}</script>`,
);

const postCss = postcss([
	autoprefixer(),
	postcssImport(),
	postcssPurge({
		content: ["./src/index.html", "./dist/index.js"],
	}),
	cssnano({ preset: "default" }),
]);
const { css } = await postCss.process(await file("./src/index.css").text(), {
	from: "./src/index.css",
	to: "./dist/index.css",
});

html = html.replace(
	`<link href="./index.css" rel="stylesheet" />`,
	`<style>${css}</style>`,
);

await write("./dist/index.html", html);
