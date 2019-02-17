# Canvas Basics
1. Grab reference to `<canvas>` element in JS
2. Store reference in canvas variable
3. Create _ctx_ varaible to store 2D rendering context
4. All instructions written between `ctx.beginPath();` and `ctx.closePath();` methods
5. Define rectangle using `rect(20,40,50,50):`. The 1st two values specify coordinates of top left corner. Last two specify height and width
6. `ctx.fillStyle` property stores color that will be used by `ctx.fill();` method to paint rect

# Defining Drawing Loop
1. Must *define drawing function* to continuously update canvas drawing each frame
2. Function can run over and over with JS timing functions like, `setInterval()` or `requestAnimationFrame()`

# Ball Basics
1. Use `ctx.arc` and `Math.PI*2` to draw a circle
2. Define ball's starting pt. Something like,</br>
```var x = canvas.width/2; </br>
   var y = canvas.height-30;
 ```
 3. Add a small value to x and y after each frame to make ball look like it's smoothly moving
 4. Update variables in draw function using dx and dy </br> ``` var dx = 2;
           var dy = -2;```
       ```x += dx;
          y += dy;
       ```
5. *Clear canvas* before each new frame </br>
`ctx.clearRect(0, 0, canvas.width, canvas.height);`
6. To bounce ball of the walls: </br>
```
if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
}
```
Make sure to calculate collision point from ball's _circumference_ (not radius) to that it doesn't look like it's disappearing into the walls...

# Paddle Basics
1. _Two variables_ for storing information on whether the left or right control button is pressed. `var rightPressed = false;`
2. _Two event listeners_ for keydown and keyup events. We want to run some code to handle the paddle movement when the buttons are pressed. </br>
`document.addEventListener("keydown", keyDownHandler, false);`
3. _Two functions_ handling the keydown and keyup events  the code that will be run when the buttons are pressed. </br>
```
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
```
4. Add paddle moving logic to `draw()` function. Make sure to give paddle boundaries so it doesn't float off the screen.
```
if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
}
else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
}
```
# Game Over Logic
1. If you miss ball w/ paddle and it touches the bottom edge of the screen, _game over_
2. Update Collision detection to allow ball to bounce off all walls _except the bottom_
3. Change setInterval to `var interval = setInterval(draw,10);`

# Drawing Brick Field
1. Define variables w/ brick height, width, rows, columns, padding, top and left offset
2. Use **nested loop** that works through a _2D array_ that will contain brick columns (c), which contain brick rows (r), which contain bricks x and y position.
```
var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0 };
        }
    }
```
3. Draw Bricks w/ `function drawBricks()`. Loop through rows and columns and adjust position so they're not drawn ontop of each other.
```
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r].x = 0;
            bricks[c][r].y = 0;
            ctx.beginPath();
            ctx.rect(0, 0, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}
```
4. Lastly, `drawBricks();`

# Brick Collision Detection
1. Create collision detection function that loops through all bricks and compares brick position with ball coordinates as each frame is drawn
2. If center of ball is inside coordinate of brick, ball direction should change. The following statements must be true: </br>
    - The x position of the ball is greater than the x position of the brick.
    - The x position of the ball is less than the x position of the brick plus its width.
    - The y position of the ball is greater than the y position of the brick.
    - The y position of the ball is less than the y position of the brick plus its height.
3. **Activate** by calling in main `draw()` function

# Making Bricks Disappear
1. Need extra parameter to indicate if brick should be drawn or not. Add **status property** to each brick object
2. Update `drawBricks();` function. Check status property before drawing brick. If status is 1, draw it, if not then don't

# Tracking Score
1. Create score variable `var score = 0;`
2. Create `function drawScore();`
3. Add `score++;` to collision detection function to increment score value after each collision

# Winning Message Display
1. Display a winning message if all available points have been collected. Add this to `collisionDetection()` function

# Mouse Movement
1. Just add mouse event listener (like key listener)

# Lives!
1. Create life variable `var lives = 3;`
2. Create `function drawLives();` (just like drawing score)
3. Update gameOver to decrease num of lives by 1 until 0

# Animation Frame
1. Important b/c helps browser render game better than fixed frame rate
2. Replace set interval with `draw()`
3. Remove all `clearInterval(interval)`
