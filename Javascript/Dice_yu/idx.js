var rand1 = Math.floor(Math.random() * 6) + 1;
var rand2 = Math.floor(Math.random() * 6) + 1;
console.log(rand1);
console.log(rand2);
var randomdixe = "images/" + "dice" + rand1 + ".png";
var image = document.querySelector(".img1");
image.setAttribute("src", randomdixe);
var randomdixe2 = "images/" + "dice" + rand2 + ".png";
var image2 = document.querySelector(".img2");
image2.setAttribute("src", randomdixe2);
if (rand1 > rand2) {
    document.querySelector("h1").innerHTML = "Play 1 wins !";
}
else if (rand2 == rand1) {
    document.querySelector("h1").innerHTML = "Draw";
}
else if (rand2 > rand1) {
    document.querySelector("h1").innerHTML = "Play 2 wins !";
}