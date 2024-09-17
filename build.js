await Bun.build({
  entrypoints: ["./iota/src/index.ts"],
  outdir: "./iota/dist",
  format: "esm",
  splitting: true,
  minify: true,
});

await Bun.build({
  entrypoints: ["./src/index.js"],
  outdir: "./dist",
  format: "esm",
  splitting: true,
  minify: true,
});
