import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div class="avatar">
            <div class="w-24">
              <img src="/pfp.svg" />
            </div>
          </div>
          <p class="py-6">A Self-Taught Full-Stack Developer.</p>
          <a class="btn btn-primary" href="/about">About Me</a>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Unstream",
  meta: [
    {
      name: "description",
      content: "A Self-Taught Full-Stack Developer.",
    },
  ],
};
