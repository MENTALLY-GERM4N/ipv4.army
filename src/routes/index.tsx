import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <main class="responsive absolute middle center">
        <article class="small">
          <div class="padding absolute middle center">
            <h3>Unstream.</h3>
            <p>A self taught fullstack developer, with a love of backends.</p>
          </div>
        </article>
      </main>
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
