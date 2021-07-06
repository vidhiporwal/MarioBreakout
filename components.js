/////// LOAD IMAGES ////////

// LOAD BG IMAGE
const BG_IMG = new Image();
BG_IMG.src = "img/bg4.jpg";

const LEVEL_IMG = new Image();
LEVEL_IMG.src = "img/level.png";

const LIFE_IMG = new Image();
LIFE_IMG.src = "img/life.png";

const SCORE_IMG = new Image();
SCORE_IMG.src = "img/score.png";

const BRICK = new Image();
BRICK.src = "img/lamp.png";

const BALL = new Image();
BALL.src = "img/shield.png";

const PADDLE = new Image();
PADDLE.src = "img/sword_ingame.png";

/////// END LOAD IMAGES ////////

// ************************ //

/////// LOAD SOUNDS ////////

const WALL_HIT = new Audio();
WALL_HIT.src = "sounds/clash.wav";

const LIFE_LOST = new Audio();
LIFE_LOST.src = "sounds/you_lose.mp3";

const PADDLE_HIT = new Audio();
PADDLE_HIT.src = "sounds/clash.wav";

const WIN = new Audio();
WIN.src = "sounds/win.mp3";

const BRICK_HIT = new Audio();
BRICK_HIT.src = "sounds/clash.wav";

const LEVEL_UP = new Audio();
LEVEL_UP.src = "sounds/level_up.mp3";

const BACK = new Audio();
BACK.src = "sounds/back.mp3";

const POWER_UP = new Audio();
POWER_UP.src = "sounds/power_up.mp3";

// (function back_audio() {
//   BACK.play();
// })();

document.body.addEventListener("mousemove", function () {
    BACK.play()
})

// setTimeout(() => {
//     BACK.play();
// }, 2000)

/////// END LOAD SOUNDS ////////
