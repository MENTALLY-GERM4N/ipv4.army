import https from "node:https";
import fs from "node:fs";

https.get("https://cdn.jsdelivr.net/npm/@material-symbols/font-400@latest/material-symbols-rounded.woff2", async (resp) => {
  resp.pipe(fs.createWriteStream("material-symbols-rounded.woff2"))
})