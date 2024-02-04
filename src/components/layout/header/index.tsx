import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { CastIcon, GithubIcon } from "qwik-feather-icons";

export default component$(() => {
  return (
    <div class="navbar fixed z-50 bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">
          <CastIcon size={30} /> Unstream
        </a>
      </div>
      <div class="flex-none">
        <ul class="menu px-1">
          <li>
            <Link href="https://github.com/wont-stream">
              <GithubIcon size={20} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});
