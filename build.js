import pkg from "./package.json";

let html = await Bun.file("./src/index.html").text();

html = html.replace("{{HREF}}", "href");
html = html.replace("{{VERSION}}", pkg.version);

html = html.replace(/scripts\/(.*?)\.js/g, "scripts/$1.min.js");
html = html.replace(/styles\/(.*?)\.css/g, "styles/$1.min.css");

Bun.write("./src/index.html", html);
