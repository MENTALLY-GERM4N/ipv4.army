(() => {
  if (location.protocol !== "https:") return;
  fetch("https://a.wont.stream/api/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      domain: "wont.stream",
      name: "pageview",
      url: window.location.href,
      referrer: document.referrer,
    }),
  });
})();