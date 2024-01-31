import { component$ } from "@builder.io/qwik";
import { CastIcon, GithubIcon } from "qwik-feather-icons";

export default component$(() => {
    return (
        <div class="navbar bg-base-100 z-50 fixed">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl" href="/"><CastIcon size={30} /> Unstream</a>
        </div>
        <div class="flex-none">
            <ul class="menu px-1">
                <li><a href="https://github.com/wont-stream"><GithubIcon  size={20}/></a></li>
            </ul>
        </div>
    </div>
    );
});
