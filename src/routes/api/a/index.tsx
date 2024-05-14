import { type RequestHandler } from '@builder.io/qwik-city';
//import DeviceDetector from "node-device-detector";
//import ClientHints from "node-device-detector/client-hints";

//const detector = new DeviceDetector()
//const clientHints = new ClientHints();

export const onGet: RequestHandler = async (res) => {
  //const body = JSON.parse(atob(res.query.get("payload") || ""))

  //const hints = clientHints.parse(Object.assign(res.headers, body?.hints || {}), body?.meta || {})
  //const device = detector.detect(res.headers.get("user-agent") || "", hints)

  res.json(200, res.headers || "")
};