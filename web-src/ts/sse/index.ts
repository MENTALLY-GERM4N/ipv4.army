import { emit } from "../lib/event.js";

const evtSource = new EventSource("/sse");

evtSource.onmessage = (event) => {
  const { type, data } = JSON.parse(event.data);

  emit(type, data);
};
