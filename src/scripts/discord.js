const theme = document.getElementById("theme");
const username = document.getElementById("username");

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

const handleEvent = (type, payload) => {
  switch (type) {
    case "INIT_STATE":
      discordify(payload["1125315673829154837"]);
      break;
    case "PRESENCE_UPDATE":
      discordify(payload);
      break;
  }
};

const setupHeartbeat = (interval) => {
  const heartbeat = setInterval(() => {
    discord.send(JSON.stringify({ op: 3 }));
  }, interval);

  discord.onclose = () => clearInterval(heartbeat);
};

const discordify = (user = {}) => {
  localStorage.setItem("discordify", JSON.stringify(user));
  theme.href = `./styles/${user?.discord_status || "offline"}.css`;
  username.innerHTML =
    user?.discord_user?.username ||
    `<progress class="circle small"></progress>`;
};

discordify(JSON.parse(localStorage.getItem("discordify")) || {});
