
// Store Reference to <canvas> element in canvas variable
var canvas = document.getElementById("canvas-practice");
// Store 2D rendering in ctx variable
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
// Add small value to x and y to make ball move
var dx = 2;
var dy = -2;
var radius = 20;
// Define H and W, and starting pt of paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
// Key Press info (default false)
var rightPressed = false;
var leftPressed = false;
// Brick Variables!
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// Score Variable
var score = 0;
// Lives Variable
var lives = 3;

// 2D Array to hold bricks
// status property indicating to draw brick or not
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
bricks[c] = [];
for(var r=0; r<brickRowCount; r++) {
bricks[c][r] = { x: 0, y: 0, status: 1 };
}
}

// Keyboard Event Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// Mouse event Listener
document.addEventListener("mousemove", mouseMoveHandler, false);

// Handle Keyup and Keydown events w/ keys pressed
function keyDownHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
rightPressed = true;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
leftPressed = true;
}
}

// Handle Mouse Movements
function mouseMoveHandler(e) {
var relativeX = e.clientX - canvas.offsetLeft;
if(relativeX > 0 && relativeX < canvas.width) {
paddleX = relativeX - paddleWidth/2;
}
}

function keyUpHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
rightPressed = false;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
leftPressed = false;
}
}

// Brick Collision Detection Function
function collisionDetection() {
for(var c=0; c<brickColumnCount; c++) {
for(var r=0; r<brickRowCount; r++) {
    var b = bricks[c][r];
    if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if(score == brickRowCount*brickColumnCount) {
                alert("YOU WIN, CONGRATULATIONS!");
                document.location.reload();
             // Needed for Chrome to end game
            }
        }
    }
}
}
}

// Draw Score Function
function drawScore() {
ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Score: "+score, 8, 20);
}

// Draw Lives Function
function drawLives() {
ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// Draw Ball function
function drawBall() {
ctx.beginPath();
// Use Math.PI*2 to create a circle
ctx.arc(x, y, radius, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

// Draw Paddle Function
function drawPaddle() {
ctx.beginPath();
ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

// Draw Bricks Function
// Reference status to see brick should be drawn
function drawBricks() {
for(var c=0; c<brickColumnCount; c++) {
for(var r=0; r<brickRowCount; r++) {
    if(bricks[c][r].status == 1) {
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
}
}

// Drawing Function
function draw(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawBall();
drawPaddle();
drawBricks();
collisionDetection();
drawScore();
drawLives();
// Right and Left Collision Detection
if (x + dx > canvas.width-radius || x + dx < radius){
dx = -dx;
}
// Top Collision Detection (no bottom, game over)
if(y + dy < radius) {
dy = -dy;
}
else if(y + dy > canvas.height-radius) {
if(x > paddleX && x < paddleX + paddleWidth) {
    dy = -dy;
}
else {
    if(!lives) {
        alert("GAME OVER");
        document.location.reload();
    }
    else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width-paddleWidth)/2;
        }
    }
}

if(rightPressed && paddleX < canvas.width-paddleWidth) {
paddleX += 7;
}
else if(leftPressed && paddleX > 0) {
paddleX -= 7;
}
// Update x and y ater each frame
x += dx;
y += dy;

requestAnimationFrame(draw);
}

// Set Interval to redraw every 10 seconds
// setInterval is infinate in nature
// setInterval(draw, 10);
draw();

// Draw a simple rectangle
// Use beingPath() and endPath() methods to specify location of top left corner
// ctx.beginPath();
// Refers to x, y, width, height
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = 'black';
// ctx.fill();
// ctx.closePath();
