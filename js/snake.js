var gameScore = document.getElementById('scoreCount');
var score = 0;
// var food = { x: 0, y: 0};


window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var snakeSize = 10;
    var w = 800;
    var h = 600;
    var snake;
    var food;
    var myMusic;
    var paused = false;
    
    // var food = {
    //   x: Math.floor((Math.random() * 800) + 1),
    //   y: Math.floor((Math.random() * 600) + 1),
    // }

    // console.log(food);

  var drawModule = (function () {
    var bodySnake = function (x, y) {
      // snake single square color
      ctx.fillStyle = 'white';
      ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
      // snake square border
      ctx.strokeStyle = 'red';
      ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }


    var foodItem = function (x, y) {
      // border of food
      ctx.fillStyle = 'white';
      ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
      // single square of food.
      ctx.fillStyle = 'black';
      ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    }

    // var foodItem = function (x, y) {
    //   var img = new Image();
    //   img.onload = function () {
    //     ctx.drawImage(img, food.x, food.y);
    //   }
    //   img.src = "images/clyde.gif";
    // }  


    var drawSnake = function () {
      // this will make the snake initially 5 sqaures at start
      // snake is an empty array for now which will get pushed into.
      var length = 4;
      snake = [];

      // for loop will push the 5 elements into the array
      //every element has x=0 and y = the value of the index.
      for (var i = length - 1; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
      }
    }

    

    var createFood = function () {

      
      // original working placement
      food = {
        // generates random food on board.
        x: Math.floor((Math.random() * 50) + 1),
        y: Math.floor((Math.random() * 50) + 1),
      }
      console.log(food);
      console.log("snakeX: " + snakeX);
      

      // read position of snakes body. if snake head has same
      // position of food item, then a new one will be added.
      for (var i = 0; i > snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (food.x === snakeX || food.y === snakeY || food.y === snakeY && food.x === snakeX) {
          food.x = Math.floor((Math.random() * 800) + 1);
          food.y = Math.floor((Math.random() * 600) + 1);
        }
      }

      if (snakeX == food.x && snakeY == food.y)
      // if (snakeX < food.x + 50 &&
      //     snakeX + 1 > food.x &&
      //     snakeY < food.y + 50 &&
      //     snakeY + 1 > food.y)
          {
        console.log("fucking nom nom");
      }
    } // end createFood()


    //checks if snake collides with its own body
    var checkCollision = function (x, y, array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y)
          return true;
      }
      return false;
    }



    var draw = function () {
      // the space in which the snake will move 
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      // border
      ctx.strokeStyle = "black";
      ctx.strokeRect(0, 0, w, h);

      // disable button while in play
      btn.setAttribute('disabled', true);

      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      // makes the snake move
      if (direction == 'right') {
        snakeX++;
      } else if (direction == 'left') {
        snakeX--;
      } else if (direction == 'up') {
        snakeY--;
      } else if (direction == 'down') {
        snakeY++;
      }

       


      // checks if the snake has touch the edge 
      // of the canvas, or touched the snakes body.
      // if 'checkCollision' true will stop the game.
      if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
        // stop the game

        // make start button enabled again
        btn.removeAttribute('disabled', true);

        // clean up the canvas.
        ctx.clearRect(0, 0, w, h);
        gameloop = clearInterval(gameloop);
        return;
      }


      // if we eat food
      // if snake eats food it gets longer so it shouldnt 
      // pop out last element of array

      // LINE BELOW WORKS , just testing
      console.log("snakeX: " + snakeX + " snakeY: " + snakeY);
      console.log("foodX: " + food.x + " foodY: " + food.y);
      if (snakeX == food.x && snakeY == food.y) 
      {
        console.log("nom nom nom");

        // update score
        score += 1;
        gameScore.innerHTML = score;
        console.log("score: " + score);
        
        // create a new sqaure instead of moving the tail.
        var tail = {
          x: snakeX,
          y: snakeY
        };

        // create new food
        createFood();
      } 
      else {
        // pop out the last cell.
        var tail = snake.pop();
        tail.x = snakeX;
        tail.y = snakeY;
      }


      // puts tail as the first cell so that the snake doesnt end.
      snake.unshift(tail);

      // for each element of the array create a square using
      // the bodySnake function from before.
      for (var i = 0; i < snake.length; i++) {
        bodySnake(snake[i].x, snake[i].y);
      }

      // create food using the food function
      // foodItem(food.x, food.y);
      foodItem(food.x, food.y);
    }


    var init = function () {
      direction = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(draw, 150); // slows down or quickens the game by FPS // maybe can be used top create hard mode.
    }

    function togglePause() {
      if (!paused) {
        paused = true;
        clearInterval(gameloop);
      } else if (paused) {
        paused = false;
        gameloop = setInterval(draw, 150);
      }
    }

    // create an event listener for when space is pressed

    window.addEventListener('keydown', function (e) {
      var key = e.keyCode;
      if (key === 32) // spacebar
      {
        togglePause();
      }
    });



// WILL RESTART THE GAME UPON PRESSING START. WITHOUT THIS IT WILL NOT RESTART. ONLY REFRESH PAGE WILL WORK
    return {
      init: init
    };

    init();


    // close MAIN module function
  }());



//   =======================================================================================================
//   =======================================================================================================
//   =======================================================================================================
//   =======================================================================================================
//   =======================================================================================================
//   =======================================================================================================
// END OF WINDOW.ONLOAD FUNCTION

// CONTROLS


  (function (window, document, drawModule, undefined) {

    // connects button in html with init function
    var btn = document.getElementById('btn');
    btn.addEventListener("click", function () {
      drawModule.init();
    });

    document.onkeydown = function (event) {

      keyCode = window.event.keyCode;
      keyCode = event.keyCode;

      switch (keyCode) {

        case 37:
          if (direction != 'right') {
              direction = 'left';
              console.log('left');
          }
          break;

        case 39:
          if (direction != 'left') {
              direction = 'right';
              console.log('right');
          }
          break;

        case 38:
          if (direction != 'down') {
              direction = 'up';
              console.log('up');
          }
          break;

        case 40:
          if (direction != 'up') {
              direction = 'down';
              console.log('down');
          }
          break;
      }
    }
  })(window, document, drawModule);

};



//jQuery ===================================== jQuery
//jQuery ===================================== jQuery
//jQuery ===================================== jQuery
//jQuery ===================================== jQuery
//jQuery ===================================== jQuery

// $(".score")