const fs = require("node:fs/promises");
const https = require("node:https")

https.get("https://cdn.jsdelivr.net/npm/@material-symbols/font-400@latest/material-symbols-rounded.woff2", async (resp) => {
  resp.pipe(await fs.createWriteStream("material-symbols-rounded.woff2"))
})

fs.watch(
  __dirname,
  {
    recursive: true,
  },
  async (e, file) => {
    if (file.startsWith("dist/")) return;
    build();
  }
);

const build = async () => {
  return await Bun.build({
    entrypoints: ["./src/index.js", "./src/reviews.js"],
    outdir: "./dist",
    target: "browser",
    splitting: true,
  });
};

build();
