let pfp = document.getElementById("pfp");
let musicInt = document.getElementById("musicInt");
let art = document.getElementById("art");

document.querySelectorAll("i").forEach(async (icon) => {
  let svg = await fetch(
    `./node_modules/@material-symbols/svg-400/rounded/${icon.innerText}-fill.svg`
  );

  icon.innerHTML = await svg.text();
});

const discord = new WebSocket(
  `${location.protocol.replace("http", "ws")}//${location.host}/api/ws`
);

discord.onmessage = async ({ data }) => {
  data = JSON.parse(data);

  pfp.src = `/api/img?url=https://cdn.discordapp.com/avatars/1125315673829154837/${data.user.avatar}.webp&w=96&h=96&output=webp`;

  let TIDAL = data.activities.filter((act) => {
    return act.application_id == "1130698654987067493";
  })[0];

  if (TIDAL) {
    if (TIDAL.assets.large_image.startsWith("mp:external/")) {
      art.src = `/api/img?url=https://media.discordapp.net/external/${TIDAL.assets.large_image.replace(
        "mp:external/",
        ""
      )}&w=96&h=96&output=webp`;
    }
    musicInt.style.display = "";
  } else {
    musicInt.style.display = "none";
  }
};
