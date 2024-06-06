document.querySelectorAll("a").forEach((link) => {
  link.rel = "noopener noreferrer";
  link.referrerPolicy = "no-referrer";
  link.target = "_blank";
});
