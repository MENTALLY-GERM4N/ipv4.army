import { serve, file } from "bun";

serve({
  fetch: async (req, server) => {
    const path = new URL(req.url);
    return new Response(
      file(`.${path.pathname == "/" ? "/index.html" : path.pathname}`)
    );
  },
});
