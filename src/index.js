import "./material-dynamic-colors.min.js";

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

const toCss = (data) => {
  let style = "";
  for (let i = 0, keys = Object.keys(data), n = keys.length; i < n; i++) {
    const key = keys[i];
    const value = data[key];
    const kebabCase = key
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
      .toLowerCase();
    style += "--" + kebabCase + ":" + value + ";";
  }
  return style;
};

const ui = async (src) => {
  const theme = await globalThis.materialDynamicColors(src);
  document.body.setAttribute("style", toCss(theme.dark));
};

const handleEvent = async (data) => {
  pfp.src = `/img?url=https://cdn.discordapp.com/avatars/1125315673829154837/${data.user.avatar}.webp&w=96&h=96&output=webp`;

  let TIDAL = data.activities.filter((act) => {
    return act.application_id == "1130698654987067493";
  });
  if (TIDAL.length > 0) {
    TIDAL = TIDAL[0];

    if (TIDAL.assets.large_image.startsWith("mp:external/")) {
      TIDAL.assets.large_image = `/img?url=https://media.discordapp.net/external/${TIDAL.assets.large_image.replace(
        "mp:external/",
        ""
      )}&w=96&h=96&output=webp`;
    }
    art.src = TIDAL.assets.large_image;
    await ui(TIDAL.assets.large_image);
    musicInt.style.display = "";
  } else {
    await ui(statusColors[data.status]);
    musicInt.style.display = "none";
  }
};

handleEvent({ DISCORD_USER_DATE: {} });

document.querySelectorAll("i").forEach(async (icon) => {
  let svg = await fetch(
    `./node_modules/@material-symbols/svg-400/rounded/${icon.innerText}-fill.svg`
  );

  icon.innerHTML = await svg.text();
});

document.addEventListener("click", () => {
  new Audio("audio/click.mp3").play();
});

let canRun = true;

document.addEventListener("scroll", () => {
  if (!canRun) return;

  new Audio("audio/scroll.mp3").play();

  canRun = false;
  setTimeout(() => (canRun = true), 200);
});
