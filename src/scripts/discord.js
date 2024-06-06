const theme = document.getElementById("theme");
const username = document.getElementById("username");

const discord = new WebSocket("wss://lanyardapi.aspy.dev/socket");

discord.onmessage = async ({ data }) => {
  data = JSON.parse(data);

  switch (data.op) {
    case 0:
      switch (data.t) {
        case "INIT_STATE":
          await discordify(data.d["1125315673829154837"]);
          break;
        case "PRESENCE_UPDATE":
          await discordify(data.d);
          break;
      }
      break;

    case 1:
      setInterval(() => {
        discord.send(JSON.stringify({ op: 3 }));
      }, data.d.heartbeat_interval);

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

const discordify = async (user) => {
  localStorage.setItem("discordify", JSON.stringify(user));

  theme.href = `./styles/${user?.discord_status}.css`;

  username.innerText = user?.discord_user?.username;
};

discordify(JSON.parse(localStorage.getItem("discordify")) || {});
