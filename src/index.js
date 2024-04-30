import "@material/web/iconbutton/filled-tonal-icon-button";
import "@material/web/icon/icon";

const app = document.getElementById("app")

const links = [
    {
        href: "https://i.wont.stream/github",
        icon: "code"
    },
    {
        href: "https://i.wont.stream/twitch",
        icon: "cast"
    },
    {
        href: "https://i.wont.stream/discord",
        icon: "chat"
    },
    {
        href: "/reviews",
        icon: "reviews"
    }
    
]

let dom = ""

dom += "<div class=\"links\">"
links.forEach(link => {
    dom += `<md-filled-tonal-icon-button type="a" href="${link.href}"/>
    <md-icon>${link.icon}</md-icon>
  </md-filled-tonal-icon-button>`
})
dom += "<div \\>"

app.innerHTML += dom