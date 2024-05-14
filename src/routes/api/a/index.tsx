import { type RequestHandler } from '@builder.io/qwik-city';
import DeviceDetector from "node-device-detector";
import ClientHints from "node-device-detector/client-hints";

const detector = new DeviceDetector()
const clientHints = new ClientHints();

export const onPost: RequestHandler = async (res) => {
  const req = res.request

  const body = await req.json()

  const headers = Object.fromEntries(req.headers)

  const hints = clientHints.parse(Object.assign(headers, body?.hints || {}), body?.meta || {})
  const device = detector.detect(headers["user-agent"] || "", hints)

  res.json(200, device)
};