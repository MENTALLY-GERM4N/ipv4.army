import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const messages = [
    {
        type: "start",
        message: "Tell me about yourself!"
    },
    {
        type: "end",
        message: "I've always had a thing for computers ever since I could remember"
    },
    {
        type: "end",
        message: "It's always been software that I have been interested in"
    },
    {
        type: "end",
        message: "And now I work with [Front,Back]ends everyday."
    },
    {
        type: "start",
        message: "Thats cool, what do you work with?"
    },
    {
        type: "end",
        message: "Backend wise, Node.JS."
    },
    {
        type: "end",
        message: "Frontend wise, I've started using Qwik(City)."
    },
]

export default component$(() => {
  return (
    <div class="hero min-h-screen bg-base-200">
  <div class="hero-content">
    <div class="max-w-md">
    {messages.map((msg, i) => {
            return (
                
                <div class={"chat chat-" + msg.type} key={i}>
            <div class="chat-bubble">{msg.message}</div>
          </div>
          
            )
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
