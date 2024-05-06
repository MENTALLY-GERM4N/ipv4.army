import "./root.js";
import "@material/web/iconbutton/filled-tonal-icon-button";
import "@material/web/icon/icon";

const app = document.getElementById("app");

const links = [
  {
    name: "GitHub",
    href: "https://i.wont.stream/github",
    icon: "code",
  },
  {
    name: "Twitch",
    href: "https://i.wont.stream/twitch",
    icon: "cast",
  },
  {
    name: "Discord Server",
    href: "https://i.wont.stream/discord",
    icon: "chat",
  },
  {
    name: "Reviews",
    href: "/reviews",
    icon: "reviews",
  },
];

let dom = "";

dom += '<div class="links">';
links.forEach((link) => {
  dom += `<md-filled-tonal-icon-button type="a" href="${link.href}" aria-label="${link.name}"/>
    <md-icon>${link.icon}</md-icon>
  </md-filled-tonal-icon-button>`;
});
dom += "<div \\>";

app.innerHTML += dom;
