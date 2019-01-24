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
