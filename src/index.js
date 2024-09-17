import { html, attrs } from "../iota/dist/index.js";
import activity from "./websockets/discord.js";
import heartrate from "./websockets/heartrate.js";
import "./1.js";

document
  .getElementById("pfp")
  .append(
    attrs(
      html`<img
        class="small-width small-height circle"
        width="192px"
        height="192px"
      />`,
      "style",
      () => `border: solid var(--${activity().discord_status})`,
      "src",
      "https://wsrv.nl/?output=webp&q=1&url=https://avatars.githubusercontent.com/u/143244075"
    )
  );

document
  .getElementById("heartrate")
  .append(html`<span>${() => heartrate()}</span>`);

document.getElementById("music").append(
  html`<span
    >${() => {
      let { listening_to_tidal, tidal } = activity();

      if (listening_to_tidal) {
        document
          .getElementById("img")
          .setAttribute(
            "style",
            `background: center / contain no-repeat url(https://wsrv.nl/?output=webp&q=1&url=${tidal.album_art_url})`
          );
        document.getElementById(
          "link"
        ).href = `https://tidal.com/browse/track/${tidal.track_id}/u`;
        document.getElementById("blur").classList.add("small-blur");
        return attrs(
          html`<span>
            ${tidal.song.replace(/\s?[\(\[].*?[\)\]]/g, "").trim()}
            ${tidal.artist}
            ${tidal.album.replace("on ", "") !== tidal.song
              ? tidal.album
              : ""}</span
          >`,
          "style",
          () => `filter: drop-shadow(1px 1px 10px ${tidal.color});`
        );
      } else {
        document.getElementById("blur").classList.remove("small-blur");
        return "Not listening to anything.";
      }
    }}</span
  >`
);
