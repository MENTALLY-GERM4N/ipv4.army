import { component$, useSignal, useOnWindow, $ } from "@builder.io/qwik";
// @ts-ignore
import ui from "beercss/dist/cdn/beer.min.js";
import materialDynamicColors from "material-dynamic-colors";

const statusColors = {
  online: "#4caf50",
  idle: "#ffeb3b",
  dnd: "#f44336",
  offline: "#9e9e9e",
};

export default component$(() => {
  const discordData = useSignal({
    discord_user: {
      username: "Loading",
      avatar: "0320dba13e6f6d7360ba90a23b3e2e34",
    },
    discord_status: "offline",
    activities: [],
  });

  const musicData = useSignal({
    assets: {
      large_image: "",
    },
    details: "",
    state: "",
  });

  useOnWindow(
    "load",
    $(async () => {
      // @ts-ignore
      window.materialDynamicColors = materialDynamicColors;

      await ui("theme", statusColors["offline"]);

      const discord = new WebSocket("wss://string.ipv6.army/");

      discord.onmessage = async ({ data }) => {
        return await handleEvent(JSON.parse(data));
      };

      const handleEvent = async (data: any) => {
        discordData.value = data;

        let appleMusic = data.activities.filter((act: any) => {
          // @ts-ignore
          return act.application_id == "842112189618978897";
        });
        if (appleMusic.length > 0) {
          appleMusic = appleMusic[0];

          // @ts-ignore
          if (appleMusic.assets.large_image.startsWith("mp:external/")) {
            // @ts-ignore
            appleMusic.assets.large_image = `https://image-proxy.wont-stream.workers.dev/?-https://media.discordapp.net/external/${appleMusic.assets.large_image.replace("mp:external/", "")}&w=96&h=96`;
          } else {
            const reqParam = encodeURIComponent(
              // @ts-ignore
              `${appleMusic.details} ${appleMusicassets.large_text} ${appleMusic.state}`
            )
              .replace(/"/g, "%27")
              .replace(/"/g, "%22");
            // @ts-ignore
            appleMusic.assets.large_image = `https://album-art.wont-stream.workers.dev/?-${reqParam}`;
          }

          // @ts-ignore
          await ui("theme", appleMusic.assets.large_image);
          // @ts-ignore
          musicData.value = appleMusic;
          console.log(appleMusic);
        } else {
          // @ts-ignore
          await ui("theme", statusColors[data.status]);
        }
      };

      const data = await fetch("https://string.ipv4.army/");
      handleEvent(await data.json());
    })
  );

  return (
    <>
      <nav class="top">
        {discordData.value.activities.filter((act) => {
          // @ts-ignore
          return act.application_id == "842112189618978897";
        }).length > 0 ? (
          <>
            <a
              class="primary circle extra"
              href="https://www.last.fm/user/wont-stream"
              aria-label="Music"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              target="_blank"
            >
              <button class="primary circle extra" aria-label="Profile Picture">
                <img
                  class="responsive"
                  src={musicData.value.assets.large_image}
                  width="56"
                  height="56"
                  alt="Album Art"
                />
                <div class="tooltip bottom">
                  <span>
                    {musicData.value.details} by {musicData.value.state}
                  </span>
                </div>
              </button>
            </a>
          </>
        ) : (
          <>
            <a
              class="primary circle extra"
              href="https://i.wont.stream/discord"
              aria-label="Discord Server"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              target="_blank"
            >
              <button class="primary circle extra" aria-label="Profile Picture">
                <img
                  class="responsive"
                  src={
                    "https://image-proxy.wont-stream.workers.dev/?-https://cdn.discordapp.com/avatars/1125315673829154837/" +
                    discordData.value.discord_user.avatar +
                    ".webp?size=96"
                  }
                  width="56"
                  height="56"
                  alt="Profile Picture"
                />
                <div class="tooltip bottom">
                  <span>{discordData.value.discord_user.username}</span>
                </div>
              </button>
            </a>
          </>
        )}
      </nav>
    </>
  );
});
