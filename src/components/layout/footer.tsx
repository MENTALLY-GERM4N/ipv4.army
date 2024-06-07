import { component$ } from "@builder.io/qwik";

import {
  MatCodeRound,
  MatForumRound,
  MatSmartDisplayRound,
  MatLocalCafeRound,
  MatPaymentsRound,
} from "@qwikest/icons/material";

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
          <i>
            <MatCodeRound />
          </i>
          <div>GitHub</div>
        </a>
        <a
          href="https://i.wont.stream/discrd"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i>
            <MatForumRound />
          </i>
          <div>Discord</div>
        </a>
        <a
          href="https://i.wont.stream/twitch"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i>
            <MatSmartDisplayRound />
          </i>
          <div>Twitch</div>
        </a>
        <a
          href="https://i.wont.stream/kofi"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i>
            <MatLocalCafeRound />
          </i>
          <div>Ko-Fi</div>
        </a>
        <a
          href="https://i.wont.stream/libre"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          <i>
            <MatPaymentsRound />
          </i>
          <div>Liberapay</div>
        </a>
      </nav>
    </>
  );
});
