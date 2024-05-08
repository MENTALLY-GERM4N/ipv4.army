(() => {
  if (location.protocol !== "https:") return;
  fetch("https://a.wont.stream/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: window.location.pathname,
      referrer: document.referrer,
    }),
  });
})();