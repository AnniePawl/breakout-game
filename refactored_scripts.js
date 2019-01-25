// Reference canvas element to render graphics
// Create ctx(context)to store 2D rendering context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//Define paddle to hit ball
const paddleHeight = 20;
const paddleWidth = 95;
let paddleX = (canvas.width - paddleWidth)/2;
// Pressed buttons variable
let rightPressed = false;
let leftPressed = false;

// Bricks
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
// Score variable
let score = 0;
// Life variable
let lives = 3;

// Ball Class
class Ball {
    constructor(radius = 20, color = "#0095DD") {
        this.radius = radius;
        this.color = color;
        // Move Ball! Add tiny value to x and y after each clear to make ball look like it's moving
        this.dx = 5;
        this.dy = -5;
        this.x = 0;
        this.y = 0;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Create New Ball
const drawBall= new Ball(15, "#000000")
// Define ball's starting point and size
drawBall.x = canvas.width / 2;
drawBall.y = canvas.height - 30;

// Brick Class
class Brick {
    constructor(x, y, w = 75, h = 20, color = 'red') {
        this.x = x;
        this.y = y;
        this.status = true;
        this.color = color ;
        this.width = w;
        this.height = h;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Create new bricks
const bricks = [];
for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
        // Make bricks disapear after hit
        // bricks[c][r] = { x: 0, y: 0, status: 1 }
        const brickX = (c * (brickWidth+brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight+brickPadding)) + brickOffsetTop;
        bricks[c][r] = new Brick(brickX, brickY)
    }
}

// Draw Bricks
function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                bricks[c][r].render(ctx)
             }
        }
    }
}

// Paddle Class
class Paddle {
    constructor(x, y, color, w, h) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = w;
    this.height = h;
    }
    render(ctx){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = drawColor;
    ctx.fill();
    ctx.closePath();
    }
}
// Create New Paddle
const drawPaddle = new Paddle()

// Score Class
class Score {
    constructor(x = 8, y = 20, color = "#004051", score = 0, font = "16px Arial"){
        this.x = x;
        this.y = y;
        this.color = color;
        this.score = score;
        this.font = font;
    }
    render(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText("Score: " + this.score, this.x, this.y);
    }
}
// Create Score
const drawScore = new Score()
// {x, y, color ...}

//Lives Class
class Lives {
    constructor(x, y, color, lives, font) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.lives = lives;
        this.font = font;
    }
    render(ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#004051";
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }
}
const drawLives = new Lives()

// Listens for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

// Listen for mouse movement
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
const relativeX = e.clientX - canvas.offsetLeft;
if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
    }
}

// Brick Collision Detection
function collisionDetection() {
  for(let c = 0; c < brickColumnCount; c++) {
    for(let r = 0; r < brickRowCount; r++) {
      //b stores brick object in every loop
      const b = bricks[c][r];
      if(b.status == 1) {
        if(drawBall.x > b.x && drawBall.x < b.x + brickWidth && drawBall.y > b.y && drawBall.y < b.y + brickHeight) {
          drawBall.dy = -drawBall.dy;
          b.status = 0;
          drawScore.score++;
          if(drawScore.score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

let drawColor = getRandomColor ();


// Draw Ball, Paddle, Bricks, and Score Display
function draw() {
    // Method clears canvas content(area within rectangle)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall.render(ctx);
    drawPaddle.render(ctx);
    drawBricks(ctx);
    drawScore.render(ctx);
    drawLives.render(ctx);
    collisionDetection();

    // Collision Detection
    // Ball bounces off top, left, right, and paddle
    if(drawBall.x + drawBall.dx > canvas.width- drawBall.radius || drawBall.x + drawBall.dx < drawBall.radius) {
        drawBall.dx = -drawBall.dx;
    }
    if(drawBall.y + drawBall.dy < drawBall.radius) {
        drawBall.dy = -drawBall.dy;
    }
    else if(drawBall.y + drawBall.dy > canvas.height - drawBall.radius) {
        if(drawBall.x > paddleX && drawBall.x < paddleX + paddleWidth) {
            drawBall.dy = -drawBall.dy;
        }
        else {
        lives--;
            if(!lives) {
               alert("GAME OVER");
               document.location.reload();
            }
            else {
               drawBall.x = canvas.width / 2;
               drawBall.y = canvas.height - 30;
               drawBall.dx = 2;
               drawBall.dy = -2;
               paddleX = (canvas.width - paddleWidth)/2;
            }
        }
    }
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    drawBall.x += drawBall.dx;
    drawBall.y += drawBall.dy;

    // Check if cursor keys are pressed & makes sure paddled doesn't go off the page
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    requestAnimationFrame(draw)
}

// Randomly Change Color
function getRandomColor(min, max) {
  const color = 0 + Math.floor(Math.random() * 360);
  return `hsl(${color}, 100%, 50%)`;
}

draw();

setInterval (function(){
    drawColor = getRandomColor(0, 360);
}, 400)
