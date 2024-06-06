import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
  const data = useSignal({
    discord_user: { username: "Loading" },
    discord_status: "offline",
  });

  useVisibleTask$(() => {
    const discord = new WebSocket("wss://lanyardapi.aspy.dev/socket");

    discord.onmessage = ({ data }) => {
      data = JSON.parse(data);

      switch (data.op) {
        case 0:
          handleEvent(data.t, data.d);
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

    const handleEvent = (type: string, payload: any) => {
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
        `dark ${data?.value?.discord_status}`
      );

      localStorage.setItem("discordify", JSON.stringify(data.value));
    };

    const setupHeartbeat = (interval: number) => {
      const heartbeat = setInterval(() => {
        discord.send(JSON.stringify({ op: 3 }));
      }, interval);

      discord.onclose = () => clearInterval(heartbeat);
    };
    // @ts-ignore
    handleEvent("INIT_STATE", JSON.parse(localStorage.getItem("discordify")));
  });

  return (
    <>
      <nav class="top">
        <a
          class="primary circle extra"
          href="https://i.wont.stream/discord"
          aria-label="Discord Server"
        >
          <button class="primary circle extra" aria-label="Profile Picture">
            <img
              class="responsive"
              src="https://lanyardapi.aspy.dev/1125315673829154837.webp"
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
