import "./root.js";
import "@material/web/textfield/outlined-text-field";

const app = document.getElementById("app");

let dom = "";

fetch("https://manti.vendicated.dev/api/reviewdb/users/1125315673829154837/reviews")
.then(res => res.json())
.then(res => {
    res.reviews.forEach((review, i) => {
        if (review.id == 0) return;

        review.timestamp = review.timestamp * 1000;

        console.log(review)

        dom += `<md-outlined-text-field label="${review.sender.username}" value="${review.comment}"></md-outlined-text-field>`
    })

    app.innerHTML += dom;
})