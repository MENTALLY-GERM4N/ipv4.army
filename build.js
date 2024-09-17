await Bun.build({
  entrypoints: ["./src/index.js"],
  outdir: "./dist",
  format: "esm",
  splitting: true,
  minify: true,
  sourcemap: "linked",
});
