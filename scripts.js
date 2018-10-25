// Reference canvas element to render graphics
// Then create ctx to store 2d rendering context
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    // Define ball's starting point
    var x = canvas.width/2;
    var y = canvas.height-30;
    var ballRadius = 12;
    // Small value added to x and y after each from to make ball look like it's moving
    var dx = 2;
    var dy = -2;
    //Defining paddle to hit ball
    var paddleHeight = 20;
    var paddleWidth = 95;
    var paddleX = (canvas.width-paddleWidth)/2;
    // Pressed buttons variable
    var rightPressed = false;
    var leftPressed = false;
    // Bricks
    var brickRowCount = 3;
    var brickColumnCount = 5;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    // Score variable
    var score = 0;
    // Life variable
    var lives = 3;


    // Create new bricks
    var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
            for(var r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 }
        }
    }

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

    // Liten for mouse movement
    document.addEventListener("mousemove", mouseMoveHandler, false);
    function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
        }
    }

    // Brick Collision Detection
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
                alert("YOU WIN, CONGRATS!");
                document.location.reload();
              }
            }
          }
        }
      }
    }

    // Draw Score
    // Create and Update Score Display
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score, 8, 20);
    }
    // Draw Lives
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }

    // Draw Ball
    function drawBall() {
    // Define Ball between beginPath and closePath
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
        ctx.closePath();
    }

    // Draw Paddle
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#f2a41d";
        ctx.fill();
        ctx.closePath();
    }

    // Draw Bricks
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
                     ctx.fillStyle = "#f76ce6";
                     ctx.fill();
                     ctx.closePath();
                 }
            }
        }
    }

    // Draw Ball, Paddle, and Bricks, and Score Display
    function draw() {
        // Method clears canvas content(area within rectangle)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawBricks();
        drawScore();
        drawLives();
        collisionDetection();

        // Collision Detection
        // Ball bounces off top, left, right, and paddle
        if(x + dx > canvas.width-ballRadius || x + dx <         ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
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
        x += dx;
        y += dy;

        // Check if cursor keys are pressed & makes sure paddled doesn't go off the page
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
    }

    // Randomly change ball color
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    // Func executed ever 15 miliseconds
    setInterval(draw, 10);
