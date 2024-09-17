import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import postcssPurge from "@fullhuman/postcss-purgecss";
import cssnano from "cssnano";

await Bun.build({
  entrypoints: ["./src/index.js"],
  outdir: "./dist",
  format: "esm",
  splitting: true,
  minify: true,
  sourcemap: "linked",
});

postcss([
  autoprefixer(),
  postcssImport(),
  postcssPurge({
    content: ["./src/index.html", "./dist/index.js"],
  }),
  cssnano({ preset: "default", discardComments: { removeAll: true } }),
])
  .process(await Bun.file("./src/index.css").text(), {
    from: "./src/index.css",
    to: "./dist/index.css",
    map: { inline: false },
  })
  .then((result) => {
    Bun.write("./dist/index.css", result.css);
    Bun.write("./dist/index.css.map", result.map);
  });
