await Bun.build({
    entrypoints: ["./src/index.js", "./src/reviews.js"],
    outdir: "./dist",
    target: "browser",
    splitting: true,
    sourcemap: "external",
    minify: true
})