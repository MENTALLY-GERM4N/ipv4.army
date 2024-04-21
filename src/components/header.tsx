import { component$ } from "@builder.io/qwik";

import GitHub from "~/components/github.svg?jsx"
import Twitch from "~/components/twitch.svg?jsx"
import Discord from "~/components/discord.svg?jsx"
import KoFi from "~/components/kofi.svg?jsx"
import BuyMeACoffee from "~/components/buymeacoffee.svg?jsx"

export default component$(() => {
  return (
    <>
<div class="fixed w-full z-50">
<div class="navbar bg-base-300">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="/">wont.stream</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li>
      <li><a aria-label="GitHub" href="https://i.wont.stream/github"><GitHub style={{ width: "1rem", fill: "currentColor" }} /></a></li>
      <li><a aria-label="Twitch" href="https://i.wont.stream/twitch"><Twitch style={{ width: "1rem", fill: "currentColor" }} /></a></li>
      <li><a aria-label="Discord" href="https://i.wont.stream/discord"><Discord style={{ width: "1rem", fill: "currentColor" }} /></a></li>
      <li><a aria-label="KoFi" href="https://i.wont.stream/kofi"><KoFi style={{ width: "1rem", fill: "currentColor" }} /></a></li>
      <li><a aria-label="Buy Me A Coffee" href="https://i.wont.stream/bmac"><BuyMeACoffee style={{ width: "1rem", fill: "currentColor" }} /></a></li>
      </li>
    </ul>
  </div>
</div>
</div>
    </>
  );
});