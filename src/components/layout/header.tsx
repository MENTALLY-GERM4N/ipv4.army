import { component$, useSignal, useOnDocument, $ } from "@builder.io/qwik";

export default component$(() => {
  const data = useSignal({
    discord_user: { username: "Loading", avatar: "" },
    discord_status: "offline",
  });

  useOnDocument(
    "DOMContentLoaded",
    $(async () => {
      const discord = new WebSocket("wss://lanyardapi.aspy.dev/socket");

      discord.onmessage = async ({ data }) => {
        data = JSON.parse(data);

        switch (data.op) {
          case 0:
            await handleEvent(data.t, data.d);
            break;

          case 1:
            setupHeartbeat(data.d.heartbeat_interval);
            await discord.send(
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

        document.body.setAttribute(
          "class",
          `dark ${data.value.discord_status}`
        );
      };

      const setupHeartbeat = (interval: number) => {
        const heartbeat = setInterval(async () => {
          discord.send(JSON.stringify({ op: 3 }));
        }, interval);

        discord.onclose = () => clearInterval(heartbeat);
      };
    })
  );

  return (
    <>
      <nav class="top">
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
                "https://cdn.discordapp.com/avatars/1125315673829154837/" +
                data.value.discord_user.avatar
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
      </nav>
    </>
  );
});
