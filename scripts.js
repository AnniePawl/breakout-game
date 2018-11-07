// Reference canvas element to render graphics
// Create ctx(context)to store 2D rendering context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Define ball's starting point and size
let x = canvas.width / 2;
let y = canvas.height - 30;
const ballRadius = 20;
// Move Ball! Add tiny value to x and y after each clear to make ball look like it's moving
let dx = 2;
let dy = -2;

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
    constructor(radius, color = "#0095DD") {
        this.radius = radius;
        this.color = color;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = drawColor;
        ctx.fill();
        ctx.closePath();
    }
}
// Create New Ball
const drawBall= new Ball(ballRadius, "red")

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
    constructor(x, y, color, score, font){
        this.x = x;
        this.y = y;
        this.color = color;
        this.score = score;
        this.font = font;
    }
    render(ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#004051";
        ctx.fillText("Score: " + score, 8, 20);
    }
}
// Create Score
const drawScore = new Score()


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
        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

let drawColor = getRandomColor ();


// Draw Lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#004051";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}


// Draw Ball, Paddle, Bricks, and Score Display
function draw() {
    // Method clears canvas content(area within rectangle)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall.render(ctx);
    drawPaddle.render(ctx);
    drawBricks(ctx);
    drawScore.render(ctx);
    drawLives();
    collisionDetection();

    // Collision Detection
    // Ball bounces off top, left, right, and paddle
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
        lives--;
            if(!lives) {
               alert("GAME OVER");
               document.location.reload();
            }
            else {
               x = canvas.width / 2;
               y = canvas.height - 30;
               dx = 2;
               dy = -2;
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
    x += dx;
    y += dy;

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
