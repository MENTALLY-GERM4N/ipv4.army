const getColorGamut = () => {
  const gamuts = ["p3", "srgb", "rec2020"];
  for (let i = 0; i < gamuts.length; i++) {
    if (matchMedia("(color-gamut: " + gamuts[i] + ")").matches) {
      return gamuts[i];
    }
  }
  return "";
};

fetch("https://1.ipv4.army/api/event", {
  method: "POST",
  body: JSON.stringify({
    domain: "ipv4.army",
    name: "pageview",
    url: location.href,
    referrer: document.referrer,
    props: {
      resolution:
        Math.floor(screen.width * devicePixelRatio) +
        "x" +
        Math.floor(screen.height * devicePixelRatio),
      devicePixelRatio: devicePixelRatio,
      colorDepth: screen.colorDepth,
      colorGamut: getColorGamut(),
      cores: navigator.hardwareConcurrency,
      language: navigator.language,
      languages: navigator.languages.join(", "),
      doNotTrack: navigator.doNotTrack == "1" ? true : false,
      globalPrivacyControl: navigator.globalPrivacyControl,
      cookieEnabled: navigator.cookieEnabled,
      maxTouchPoints: navigator.maxTouchPoints,
      webDriver: navigator.webdriver,
    },
  }),
});
