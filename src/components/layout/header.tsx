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
  const data = useSignal({
    discord_user: {
      username: "Loading",
      avatar: "0320dba13e6f6d7360ba90a23b3e2e34",
    },
    discord_status: "offline",
    activities: [],
  });

  const music = useSignal({
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

      const discord = new WebSocket("wss://lanyardapi.aspy.dev/socket");

      discord.onmessage = async ({ data }) => {
        data = JSON.parse(data);

        switch (data.op) {
          case 0:
            await handleEvent(data.t, data.d);
            break;

          case 1:
            setupHeartbeat(data.d.heartbeat_interval);
            discord.send(
              JSON.stringify({
                op: 2,
                d: {
                  subscribe_to_ids: ["1125315673829154837"],
                },
              })
            );
            break;
        }
      };

      const handleEvent = async (type: string, payload: any) => {
        switch (type) {
          case "INIT_STATE":
            data.value = payload["1125315673829154837"];
            break;
          case "PRESENCE_UPDATE":
            data.value = payload;
            break;
        }

        let appleMusic = data.value.activities.filter((act) => {
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
          music.value = appleMusic;
          console.log(appleMusic);
        } else {
          // @ts-ignore
          await ui("theme", statusColors[data.value.discord_status]);
        }
      };

      const setupHeartbeat = (interval: number) => {
        const heartbeat = setInterval(async () => {
          discord.send(JSON.stringify({ op: 3 }));
        }, interval);

        discord.onclose = () => clearInterval(heartbeat);
      };

      handleEvent(
        "PRESENCE_UPDATE",
        (
          await (
            await fetch(
              "https://lanyardapi.aspy.dev/v1/users/1125315673829154837"
            )
          ).json()
        ).data
      );
    })
  );

  return (
    <>
      <nav class="top">
        {data.value.activities.filter((act) => {
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
                  src={music.value.assets.large_image}
                  width="56"
                  height="56"
                  alt="Album Art"
                />
                <div class="tooltip bottom">
                  <span>
                    {music.value.details} by {music.value.state}
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
                    data.value.discord_user.avatar +
                    ".webp?size=96"
                  }
                  width="56"
                  height="56"
                  alt="Profile Picture"
                />
                <div class="tooltip bottom">
                  <span>{data.value.discord_user.username}</span>
                </div>
              </button>
            </a>
          </>
        )}
      </nav>
    </>
  );
});
