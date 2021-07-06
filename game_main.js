// SELECT CANVAS ELEMENT
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

// ADD BORDER TO CANVAS
cvs.style.border = "5px solid #8a4e0e";

// MAKE LINE THIK WHEN DRAWING TO CANVAS
ctx.lineWidth = 3;

// GAME VARIABLES AND CONSTANTS
const PADDLE_WIDTH = 170;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 40;
const BALL_RADIUS = 10;
let LIFE = 3; // PLAYER HAS 3 LIVES
let SCORE = 0;
const SCORE_UNIT = 10;
let LEVEL = 1;
const MAX_LEVEL = 3;
let GAME_OVER = false;
let leftArrow = false;
let rightArrow = false;

// CREATE THE PADDLE
const paddle = {
  x: cvs.width / 2 - PADDLE_WIDTH / 2,
  y: cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  dx: 5,
};

// DRAW PADDLE
function drawPaddle() {
  ctx.drawImage(
    PADDLE,
    paddle.x - 20,
    paddle.y - 100,
    paddle.width + 40,
    paddle.height + 150
  );

  // ctx.strokeStyle = "#ffcd05";
  // ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// CONTROL THE PADDLE
document.addEventListener("keydown", function (event) {
  if (event.keyCode == 37) {
    leftArrow = true;
  } else if (event.keyCode == 39) {
    rightArrow = true;
  }
});
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 37) {
    leftArrow = false;
  } else if (event.keyCode == 39) {
    rightArrow = false;
  }
});

// MOVE PADDLE
function movePaddle() {
  if (rightArrow && paddle.x + paddle.width < cvs.width) {
    paddle.x += paddle.dx;
  } else if (leftArrow && paddle.x > 0) {
    paddle.x -= paddle.dx;
  }
}

// CREATE THE BALL
const ball = {
  x: cvs.width / 2,
  y: paddle.y - BALL_RADIUS,
  radius: BALL_RADIUS,
  speed: 4,
  dx: 3 * (Math.random() * 2 - 1),
  dy: -3,
};

// DRAW THE BALL
function drawBall() {
  ctx.beginPath();

  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  // ctx.fillStyle = "#ffcd05";
  ctx.drawImage(
    BALL,
    ball.x - 20,
    ball.y - 20,
    ball.radius * 4,
    ball.radius * 4
  );

  ctx.strokeStyle = "#2e3548";
  ctx.stroke();

  ctx.closePath();
}

// MOVE THE BALL
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

// BALL AND WALL COLLISION DETECTION
function ballWallCollision() {
  if (ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
    WALL_HIT.play();
  }

  if (ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
    WALL_HIT.play();
  }

  if (ball.y + ball.radius > cvs.height) {
    LIFE--; // LOSE LIFE
    life_down.style.display = "block";
    setTimeout(() => {
      life_down.style.display = "none";
    }, 2000);
    LIFE_LOST.play();
    resetBall();
  }
}

// RESET THE BALL
function resetBall() {
  ball.x = cvs.width / 2;
  ball.y = paddle.y - BALL_RADIUS;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
  ball.speed = 4;
}

// BALL AND PADDLE COLLISION
function ballPaddleCollision() {
  if (
    ball.x < paddle.x + paddle.width &&
    ball.x > paddle.x &&
    paddle.y < paddle.y + paddle.height &&
    ball.y + 20 > paddle.y
  ) {
    // PLAY SOUND
    PADDLE_HIT.play();

    // CHECK WHERE THE BALL HIT THE PADDLE
    let collidePoint = ball.x - (paddle.x + paddle.width / 2);

    // NORMALIZE THE VALUES
    collidePoint = collidePoint / (paddle.width / 2);

    // CALCULATE THE ANGLE OF THE BALL
    let angle = (collidePoint * Math.PI) / 3;

    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle);
  }
}

// CREATE THE BRICKS
const brick = {
  row: 2,
  column: 4,
  width: 125,
  height: 40,
  offSetLeft: 20,
  offSetTop: 20,
  marginTop: 40,
  fillColor: "#2e3548",
  strokeColor: "#FFF",
};

let bricks = [];

function createBricks() {
  for (let r = 0; r < brick.row; r++) {
    bricks[r] = [];
    for (let c = 0; c < brick.column; c++) {
      bricks[r][c] = {
        x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
        y:
          r * (brick.offSetTop + brick.height) +
          brick.offSetTop +
          brick.marginTop,
        status: true,
      };
    }
  }
}

createBricks();

// draw the bricks
function drawBricks() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      let b = bricks[r][c];
      // if the brick isn't broken
      if (b.status) {
        ctx.fillStyle = brick.fillColor;
        ctx.drawImage(
          BRICK,
          b.x,
          b.y - 50,
          brick.width - 30,
          brick.height + 50
        );

        // ctx.strokeStyle = brick.strokeColor;
        // ctx.strokeRect(b.x, b.y, brick.width, brick.height);
      }
    }
  }
}

// ball brick collision
function ballBrickCollision() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      let b = bricks[r][c];
      // if the brick isn't broken
      if (b.status) {
        if (
          ball.x + ball.radius > b.x &&
          ball.x - ball.radius < b.x + brick.width &&
          ball.y + ball.radius > b.y &&
          ball.y - ball.radius < b.y + brick.height
        ) {
          if (Math.floor(Math.random() * 10 > 5)) {
            console.log("power up!");
            POWER_UP.play();
            if (Math.floor(Math.random() * 10 > 5)) {
              power_up_1();
            } else {
              power_up_2();
            }
          }
          BRICK_HIT.play();
          ball.dy = -ball.dy;
          b.status = false; // the brick is broken
          SCORE += SCORE_UNIT;
        }
      }
    }
  }
}

let width_b = document.querySelector(".width_b");
let speed_b = document.querySelector(".speed_b");

let level_up = document.querySelector(".level_up");
let life_down = document.querySelector(".life_down");

function power_up_1() {
  console.log("Power 1");
  ball.speed += 3;
  speed_b.style.display = "block";
  setTimeout(() => {
    speed_b.style.display = "none";
  }, 2000);
  setTimeout(() => {
    ball.speed = ball.speed > 4 ? ball.speed - 3 : ball.speed;
    console.log("power 1 down");
  }, 10000);
}

function power_up_2() {
  console.log("Power 2");
  paddle.width += 30;
  width_b.style.display = "block";
  setTimeout(() => {
    width_b.style.display = "none";
  }, 2000);
  setTimeout(() => {
    paddle.width = paddle.width > 30 ? paddle.width - 30 : paddle.width;
    console.log("power 2 down");
  }, 10000);
}

// DRAW FUNCTION
function draw() {
  drawPaddle();

  drawBall();

  drawBricks();

  document.querySelector(".score_up").innerText = SCORE;
  document.querySelector(".life").innerText = LIFE;
  document.querySelector(".level").innerText = LEVEL;
}

// game over
function gameOver() {
  if (LIFE <= 0) {
    showYouLose();
    GAME_OVER = true;
  }
}

// level up
function levelUp() {
  let isLevelDone = true;

  // check if all the bricks are broken
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      isLevelDone = isLevelDone && !bricks[r][c].status;
    }
  }

  if (isLevelDone) {
    if (LEVEL >= MAX_LEVEL) {
      showYouWin();
      GAME_OVER = true;
      return;
    }
    level_up.style.display = "block";
    setTimeout(() => {
      level_up.style.display = "none";
    }, 2000);
    WIN.play();

    brick.row += 2;
    createBricks();
    ball.speed += 0.5;
    resetBall();
    LEVEL++;
    LEVEL_UP.play();
  }
}

// UPDATE GAME FUNCTION
function update() {
  movePaddle();

  moveBall();

  ballWallCollision();

  ballPaddleCollision();

  ballBrickCollision();

  gameOver();

  levelUp();
}

function loop() {
  // CLEAR THE CANVAS

  ctx.clearRect(0, 0, 600, 700);
  draw();

  update();

  if (!GAME_OVER) {
    requestAnimationFrame(loop);
  }
}

// Game Start
document.querySelector(".btn").addEventListener("click", () => {
  loop();
  cvs.style.display = "block";
  document.querySelector(".btn").style.display = "none";
  document.querySelector(".pause").style.display = "block";
});

document.querySelector(".pause").addEventListener("click", () => {
  alert("Game Paused!!! Press OK to continue...");
});

// SHOW GAME OVER MESSAGE
/* SELECT ELEMENTS */
const gameover = document.getElementById("gameover");
const youwon = document.getElementById("youwon");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");

// CLICK ON PLAY AGAIN BUTTON
restart.addEventListener("click", function () {
  location.reload(); // reload the page
});

// SHOW YOU WIN
function showYouWin() {
  gameover.style.display = "block";
  youwon.style.display = "block";
}

// SHOW YOU LOSE
function showYouLose() {
  gameover.style.display = "block";
  youlose.style.display = "block";
}

let mute = document.querySelector(".mute");

document.querySelector(".mute").addEventListener("click", () => {
  mute.classList.toggle("mute_on");
  if (BACK.muted == false) {
    BACK.muted = true;
  } else {
    BACK.muted = false;
  }
});
