import { component$ } from "@builder.io/qwik";

import { SiGithub, SiDiscord, SiKofi, SiBuymeacoffee } from "@qwikest/icons/simpleicons";

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
      <li><a href="https://i.wont.stream/github"><SiGithub /></a></li>
      <li><a href="https://i.wont.stream/discord"><SiDiscord /></a></li>
      <li><a href="https://i.wont.stream/kofi"><SiKofi /></a></li>
      <li><a href="https://i.wont.stream/bmac"><SiBuymeacoffee /></a></li>
      </li>
    </ul>
  </div>
</div>
</div>
    </>
  );
});