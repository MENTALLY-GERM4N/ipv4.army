import lightningcss from 'bun-lightningcss'
import fs from "node:fs";
import "./build/getFont";

await Bun.build({
  entrypoints: ["./src/index.js", "./src/reviews.js"],
  outdir: "./dist",
  target: "browser",
  splitting: true,
  minify: true,
  plugins: [lightningcss({
    minify: true
  })],
});
