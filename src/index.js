document.querySelectorAll("i").forEach(async (icon) => {
  let svg = await fetch(
    `./node_modules/@material-symbols/svg-400/rounded/${icon.innerText}-fill.svg`
  );

  icon.innerHTML = await svg.text();
});
