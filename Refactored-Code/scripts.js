// REFACTORED JS (OOP)
// BALL CLASS
class Ball {
    constructor(radius = 20, color = "#0095DD") {
        this.radius = radius;
        this.color = color;
        // Move Ball! Add tiny value to x and y after each clear to make ball look like it's moving
        this.dx = 5;
        this.dy = -5;
        // this.x = 0;
        // this.y = 0;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}





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

// PADDLE CLASS
class Paddle {
    constructor(x, y, color, w, h) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = w;
        this.height = h;
    }
    render(ctx, canvas){
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    }
}


// SCORE CLASS
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

class Game2 {
    constructor(x, y) {
        console.log(x, y)

        let t = x + y
        console.log(t, typeof t)
        t = 9999999
        console.log(t, typeof t)

        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ball = new Ball();
        // Where to put ball x ball y
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height -30;
        const paddleWidth = 95;
        const paddleX = (this.canvas.width - paddleWidth) / 2;
        this.paddle = new Paddle(paddleX);
        // this.canvas.height - 20, "#0095DD", 95, 20;
        this.lives = new Lives();
        this.score = new Score();
        this.bricks = bricks;
        this.rightPressed = false;
        this.leftPressed = false;

        // this.draw();
    }

    draw() {
        console.log(this);
        // // Method clears canvas content(area within rectangle)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.render(this.ctx);
        this.paddle.render(this.ctx, this.canvas);

        requestAnimationFrame(() => this.draw())
        // requestAnimationFrame( this.draw.bind(this) )
    }
}

// GAME CLASS
class Game {
    constructor( ){
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ball = new Ball();
        // Where to put ball x ball y
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height -30;
        const paddleWidth = 95;
        const paddleX = (this.canvas.width - paddleWidth) / 2;
        this.paddle = new Paddle(paddleX);
        // this.canvas.height - 20, "#0095DD", 95, 20;
        this.lives = new Lives();
        this.score = new Score();
        this.bricks = bricks;
        this.rightPressed = false;
        this.leftPressed = false;

        this.draw();
    }

    draw() {
        console.log("??????");
        // // Method clears canvas content(area within rectangle)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.render(this.ctx);
        this.paddle.render(this.ctx, this.canvas);
        // drawBricks(ctx);
        // drawScore.render(ctx)
        // drawLives.render(ctx);
        //
        //
        // collisionDetection();
        //
        // // Collision Detection
        // // Ball bounces off top, left, right, and paddle
        // if(drawBall.x + drawBall.dx > canvas.width- drawBall.radius || drawBall.x + drawBall.dx < drawBall.radius) {
        //     drawBall.dx = -drawBall.dx;
        // }
        // if(drawBall.y + drawBall.dy < drawBall.radius) {
        //     drawBall.dy = -drawBall.dy;
        // }
        // else if(drawBall.y + drawBall.dy > canvas.height - drawBall.radius) {
        //     if(drawBall.x > paddleX && drawBall.x < paddleX + paddleWidth) {
        //         drawBall.dy = -drawBall.dy;
        //     }
        //     else {
        //     lives--;
        //         if(!lives) {
        //            alert("GAME OVER");
        //            document.location.reload();
        //         }
        //         else {
        //            drawBall.x = canvas.width / 2;
        //            drawBall.y = canvas.height - 30;
        //            drawBall.dx = 2;
        //            drawBall.dy = -2;
        //            paddleX = (canvas.width - paddleWidth)/2;
        //         }
        //     }
        // }
        // if(rightPressed && paddleX < canvas.width - paddleWidth) {
        //     paddleX += 7;
        // }
        // else if(leftPressed && paddleX > 0) {
        //     paddleX -= 7;
        // }
        // drawBall.x += drawBall.dx;
        // drawBall.y += drawBall.dy;
        //
        // // Check if cursor keys are pressed & makes sure paddled doesn't go off the page
        // if(rightPressed && paddleX < canvas.width - paddleWidth) {
        //     paddleX += 7;
        // }
        // else if(leftPressed && paddleX > 0) {
        //     paddleX -= 7;
        // }

        requestAnimationFrame(function() {
            console.log(this)
            this.draw()
        })
    }
}

const myGame = new Game2('Some Value', 5) // {ctx: "", canvas: "", ...}
console.log(myGame)

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
const relativeX = e.clientX - this.canvas.offsetLeft;
if(relativeX > 0 && relativeX < this.canvas.width) {
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


// Randomly Change Color
function getRandomColor(min, max) {
  const color = 0 + Math.floor(Math.random() * 360);
  return `hsl(${color}, 100%, 50%)`;
}

// draw();

setInterval (function(){
    drawColor = getRandomColor(0, 360);
}, 400)
