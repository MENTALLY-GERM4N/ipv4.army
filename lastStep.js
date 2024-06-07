import fs from "fs";

{
  let file = fs.readFileSync("./dist/index.html").toString();

  file = file.replaceAll(`.js"`, `.min.js"`);
  file = file.replaceAll(`service-worker.min.js"`, `service-worker.js"`);

  fs.writeFileSync("./dist/index.html", file);
}
{
  let file = fs.readFileSync("./dist/service-worker.js").toString();

  file = file.replaceAll(`.js"`, `.min.js"`);

  fs.writeFileSync("./dist/service-worker.js", file);
}
