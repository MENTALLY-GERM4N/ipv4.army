import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <nav class="bottom">
        <a href="https://i.wont.stream/github">
          <i>code</i>
          <div>GitHub</div>
        </a>
        <a href="https://i.wont.stream/discrd">
          <i>forum</i>
          <div>Discord</div>
        </a>
        <a href="https://i.wont.stream/twitch">
          <i>smart_display</i>
          <div>Twitch</div>
        </a>
        <a href="https://i.wont.stream/kofi">
          <i>local_cafe</i>
          <div>Ko-Fi</div>
        </a>
        <a href="https://i.wont.stream/libre">
          <i>payments</i>
          <div>Liberapay</div>
        </a>
      </nav>
    </>
  );
});
