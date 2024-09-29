const click = new Audio("https://ipv4.army/click.mp3");
click.volume = 0.1;
document.addEventListener("click", () => {
	click.play();
});
