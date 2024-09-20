import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import postcssPurge from "@fullhuman/postcss-purgecss";
import cssnano from "cssnano";

await Bun.build({
	entrypoints: ["./web-src/index.js"],
	outdir: "./web-dist",
	format: "esm",
	splitting: true,
	minify: true,
	sourcemap: "linked",
});

await postcss([
	autoprefixer(),
	postcssImport(),
	postcssPurge({
		content: ["./web-src/index.html", "./web-dist/index.js"],
	}),
	cssnano({ preset: "default" }),
])
	.process(await Bun.file("./web-src/index.css").text(), {
		from: "./web-src/index.css",
		to: "./web-dist/index.css",
		map: { inline: false },
	})
	.then((result) => {
		Bun.write("./web-dist/index.css", result.css);
		Bun.write("./web-dist/index.css.map", result.map.toString());
	});

let html = await Bun.file("./web-src/index.html").text();
html = html.replace(
	`<link href="./index.css" rel="stylesheet" />`,
	`<style>${await Bun.file("./web-dist/index.css").text()}</style>`,
);
html = html.replace(
	`<script src="./index.ts"></script>`,
	`<script>${await Bun.file("./web-dist/index.js").text()}</script>`,
);

Bun.write("./web-dist/index.html", html);
