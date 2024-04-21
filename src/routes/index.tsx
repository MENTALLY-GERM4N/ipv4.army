import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { LuCast } from "@qwikest/icons/lucide";

import Header from "~/components/header";

export default component$(() => {
  return (
    <>
      <Header />
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-md">
          <LuCast style={{ fontSize: "5rem", display: "block", "margin": "auto" }} />
            <h1 class="text-5xl font-bold">Unstream</h1>
            <p class="py-6">
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
