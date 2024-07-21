const { readdirSync } = require("fs")

console.log(readdirSync("./node_modules", { recursive: true }).map((f) => {return `./src/${f.replaceAll("\\", "/")}`}))