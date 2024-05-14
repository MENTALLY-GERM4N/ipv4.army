import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const ua = useSignal("")

  ua.value = navigator.userAgent
  return (
    <>
      <h1>Unstream {ua}</h1>
      <h2>A self taught fullstack developer, with a love of backends.</h2>
    </>
  );
});

export const head: DocumentHead = {
  title: "Unstream.",
  meta: [
    {
      name: "description",
      content: "A self taught fullstack developer, with a love of backends.",
    },
  ],
};
