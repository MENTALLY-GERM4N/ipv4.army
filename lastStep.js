import fs from "fs";

{
  let file = fs.readFileSync("./dist/index.html").toString();

  file = file.replaceAll(`.js"`, `.min.js"`);
  file = file.replaceAll(`.css"`, `.min.css"`);
  file = file.replaceAll(
    `/build/q`,
    `https://cdn.jsdelivr.net/npm/wont.stream@0.0.38/build/q"`
  );
  file = file.replaceAll(`service-worker.min.js"`, `service-worker.js"`);

  fs.writeFileSync("./dist/index.html", file);
}
{
  let file = fs.readFileSync("./dist/service-worker.js").toString();

  file = file.replaceAll(`.js"`, `.min.js"`);
  file = file.replaceAll(`.css"`, `.min.css"`);

  fs.writeFileSync("./dist/service-worker.js", file);
}
