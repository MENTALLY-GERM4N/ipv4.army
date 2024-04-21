import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Cast from "~/components/chromecast.svg?jsx";

import Header from "~/components/header";

export default component$(() => {
  return (
    <>
      <Header />
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-md">
          <Cast style={{ width: "5rem", fill: "currentColor", display: "block", margin: "auto" }} />
            <h1 class="text-5xl font-bold">Unstream</h1>
            <p class="py-6 text-2xl">
            A self taught fullstack developer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
