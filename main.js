import ui from "./node_modules/beercss/dist/cdn/beer.js";
import "./node_modules/material-dynamic-colors/dist/cdn/material-dynamic-colors.min.js";

let pfp = document.getElementById("pfp");
let musicInt = document.getElementById("musicInt");
let art = document.getElementById("art");

const statusColors = {
  online: "#4caf50",
  idle: "#ffeb3b",
  dnd: "#f44336",
  offline: "#9e9e9e",
};

const discord = new WebSocket(
  `${location.protocol.replace("http", "ws")}//${location.host}/ws`
);

discord.onmessage = async ({ data }) => {
  return await handleEvent(JSON.parse(data));
};

const handleEvent = async (data) => {
  pfp.src = `/img?url=https://cdn.discordapp.com/avatars/1125315673829154837/${data.user.avatar}.webp&w=96&h=96&output=webp`;

  let appleMusic = data.activities.filter((act) => {
    return act.application_id == "842112189618978897";
  });
  if (appleMusic.length > 0) {
    appleMusic = appleMusic[0];

    if (appleMusic.assets.large_image.startsWith("mp:external/")) {
      appleMusic.assets.large_image = `/img?url=https://media.discordapp.net/external/${appleMusic.assets.large_image.replace(
        "mp:external/",
        ""
      )}&w=96&h=96&output=webp`;
    } else {
      const reqParam = encodeURIComponent(
        `${appleMusic.details} ${appleMusicassets.large_text} ${appleMusic.state}`
      )
        .replace(/"/g, "%27")
        .replace(/"/g, "%22");
      appleMusic.assets.large_image = `/albumArt?q=${reqParam}&w=96&h=96&output=webp`;
    }

    art.src = appleMusic.assets.large_image;
    await ui("theme", appleMusic.assets.large_image);
    musicInt.style.display = "";
  } else {
    await ui("theme", statusColors[data.status]);
    musicInt.style.display = "none";
  }
};

handleEvent({ DISCORD_USER_DATE: {} });
