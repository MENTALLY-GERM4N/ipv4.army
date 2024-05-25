Bun.serve({
  async fetch(req, server) {
    const url = new URL(req.url);
    const method = req.method;

    if (method == "GET") {
      let file,
        headers = {};

      if (url.pathname == "/") {
        file = Bun.file("./src/index.html");
      } else {
        file = Bun.file(`./src${url.pathname}`);
      }

      if (await file.exists()) {
        headers["content-type"] = file.type;
        file = await file.text();
      } else {
        return new Response("404", { status: 404 });
      }

      if (req.headers.get("accept-encoding").includes("gzip")) {
        headers["content-encoding"] = "gzip";
        file = Bun.gzipSync(file);
      }
      return new Response(file, {
        headers,
      });
    }

    return new Response((await fetch("https://http.cat/images/418.jpg")).body, {
      status: 418,
    });
  },
});
