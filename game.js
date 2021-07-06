var start = document.querySelector(".btn");
var sword = document.querySelector(".sword");
var rule = document.querySelector(".rule");
var score = document.querySelector(".score");
var card = document.querySelector(".card");

var alla = document.querySelector(".alla");
alla.classList.add("hide");

let light_mode = document.querySelector(".light_mode");
let mode = document.querySelector(".back");
let dark_mode = document.querySelector(".dark_mode");
let mode_btn = document.querySelectorAll(".mode").forEach((mode_btn) => {
  mode_btn.addEventListener("click", () => {
    mode.classList.toggle("dark");
    light_mode.classList.toggle("mode_display");
    dark_mode.classList.toggle("mode_display");

    //   light_mode.style.display = light_mode.style.display="block"?"none":"block";
    //   dark_mode.style.display = dark_mode.style.display="block"?"none":"block";
  });
});
card.classList.add("hide");
score.classList.add("hide");
start.addEventListener("click", () => {
  sword.classList.add("hide");
  rule.classList.add("hide");
  if (score.classList.contains("hide")) {
    score.classList.remove("hide");
  }
  if (card.classList.contains("hide")) {
    card.classList.remove("hide");
  }
  if (alla.classList.contains("hide")) {
    alla.classList.remove("hide");
  }
});


