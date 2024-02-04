import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const messages = [
  {
    type: true,
    message: "Tell me about yourself!",
  },
  {
    type: false,
    message:
      "I've always had a thing for computers ever since I could remember",
  },
  {
    type: false,
    message: "It's always been software that I have been interested in",
  },
  {
    type: false,
    message: "And now I work with [Front,Back]ends everyday.",
  },
  {
    type: true,
    message: "Thats cool, what do you work with?",
  },
  {
    type: false,
    message: "Backend wise, Node.JS.",
  },
  {
    type: false,
    message: "Frontend wise, I've started using Qwik(City).",
  },
];

export default component$(() => {
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content">
        <div class="max-w-md">
          {messages.map((msg, i) => {
            if (msg.type) {
              return (
                <h1 class="text-center text-2xl font-bold" key={i}>
                  {msg.message}
                </h1>
              );
            } else {
              return (
                <p class="py-6" key={i}>
                  {msg.message}
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "About Unstream",
  meta: [
    {
      name: "description",
      content: "About the Self-Taught Full-Stack Developer.",
    },
  ],
};
