const fs = require("node:fs");

fs.watch(
  __dirname,
  {
    recursive: true,
  },
  async (e, file) => {
    if (file.startsWith("src\\")) {
      build();
      console.log(`Rebuilt ${file}`);
    }
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
