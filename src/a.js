const d = document;
const w = window;
const s = w.screen;
let c = d.createElement("canvas");
const e = "webgl";
let p = c.getContext(e) || c.getContext(`experimental-${e}`);
const n = navigator;
const u = n.userAgentData;
const j = JSON;
const a = j.parse;
const t = j.stringify;

let h = {};
if (u) {
  u.getHighEntropyValues([
    "brands",
    "mobile",
    "platform",
    "platformVersion",
    "architecture",
    "bitness",
    "wow64",
    "model",
    "uaFullVersion",
    "fullVersionList",
  ]).then((result) => {
    h = a(t(result));
  });
}

const r = w.devicePixelRatio;

function hasMediaSupport(query) {
  return w.matchMedia(query).matches;
}

function getMediaValue(v) {
  for (let i = 0; i < 3; i++) {
    if (hasMediaSupport("(color-gamut: " + v[i] + ")")) {
      return v[i];
    }
  }
  return "";
}

function getMediaColorGamut() {
  return getMediaValue(["p3", "srgb", "rec2020"]);
}

fetch("/a", {
  method: "POST",
  body: t({
    r: d.referer,
    m: {
      w: s.width * r, // width
      h: s.height * r, // height
      r, // ratio
      a: n.deviceMemory, // ram
      g: p.getParameter(p.RENDERER), // gpu
      c: s.colorDepth, // colorDepth
      m: getMediaColorGamut(), // gamut
      c: n.hardwareConcurrency, // cores
    },
    h,
  }),
});
