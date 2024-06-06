[...document.getElementsByTagName("a")].forEach((a) => {
  a.setAttribute("rel", "noopener noreferrer");
  a.setAttribute("referrerpolicy", "no-referrer");
  a.setAttribute("target", "_blank");
});
