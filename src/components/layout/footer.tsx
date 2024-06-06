import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <nav class="bottom">
        <a
          href="https://i.wont.stream/github"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i>code</i>
          <div>GitHub</div>
        </a>
        <a
          href="https://i.wont.stream/discrd"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i>forum</i>
          <div>Discord</div>
        </a>
        <a
          href="https://i.wont.stream/twitch"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i>smart_display</i>
          <div>Twitch</div>
        </a>
        <a
          href="https://i.wont.stream/kofi"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i>local_cafe</i>
          <div>Ko-Fi</div>
        </a>
        <a
          href="https://i.wont.stream/libre"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i>payments</i>
          <div>Liberapay</div>
        </a>
      </nav>
    </>
  );
});
