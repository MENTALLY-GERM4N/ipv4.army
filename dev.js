import lightningcss from 'bun-lightningcss'
import fs from "node:fs";
import "./build/getFont";

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
    plugins: [lightningcss()],
  });
};

build();
