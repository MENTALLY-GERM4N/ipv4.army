document.querySelectorAll("i").forEach(async (icon) => {
  let svg = await fetch(
    `https://cdn.jsdelivr.net/npm/@material-symbols/svg-400/rounded/${icon.innerText}-fill.svg`
  );

  icon.innerHTML = await svg.text();
});
