import { emit } from "../lib/event.js";

const ws = new WebSocket( // Yes, this can be hardcoded.
  "wss://app.hyperate.io/socket/websocket?token=wv39nM6iyrNJulvpmMQrimYPIXy2dVrYRjkuHpbRapKT2VSh65ngDGHdCdCtmEN9"
);

ws.onopen = () => {
  ws.send(
    JSON.stringify({
      topic: `hr:0BCA`,
      event: "phx_join",
      payload: {},
      ref: 0,
    })
  );

  setInterval(() => {
    ws.send(
      JSON.stringify({
        topic: "phoenix",
        event: "heartbeat",
        payload: {},
        ref: 0,
      })
    );
  }, 15000);
};

ws.onmessage = ({ data }) => {
  let { event, payload } = JSON.parse(data);
  switch (event) {
    case "hr_update": {
      emit("heartrate", payload.hr == 0 ? "Inactive" : payload.hr);
      break;
    }
  }
};
