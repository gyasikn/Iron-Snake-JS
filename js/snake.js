var gameScore = document.getElementById('scoreCount');
var score = 0;
// var food = { x: 0, y: 0};


window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var snakeSize = 20;
    var w = 800;
    var h = 600;
    var snake;
    var food;
    var specialFood;
    var paused = false;


    // SOUNDS //
    var foodSound = new Audio("sounds/WW_Get_Rupee.wav");
    var specialFoodSound = new Audio("sounds/WW_Fanfare_Rupee.wav");
    var pauseSound = new Audio("sounds/WW_PauseMenu_Open.wav");
    var dieSound = new Audio("sounds/LTTP_ItemFanfare_Stereo.wav");
    var naviHey = new Audio("sounds/OOT_Navi_Hey1.wav");
    var naviLook = new Audio("sounds/OOT_Navi_Look1.wav");
    var pressStart = new Audio("sounds/OOT_PressStart.wav");
    // SOUNDS //
    


    // var food = {
    //   x: Math.floor((Math.random() * 800) + 1),
    //   y: Math.floor((Math.random() * 600) + 1),
    // }

    // console.log(food);

  var drawModule = (function () {
    var bodySnake = function (x, y) {
      // snake body color
      ctx.fillStyle = 'rgb(139, 255, 139)';
      ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
      // snake border color
      // ctx.strokeStyle = 'rgb(207, 155, 255)';
      ctx.strokeStyle = 'violet';
      ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }


    var foodItem = function (x, y) {
      // border of food
      ctx.fillStyle = 'yellow';
      ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
      // single square of food.
      ctx.fillStyle = 'red';
      ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    }

    var specialItem = function (x, y) {
      // border of food
      ctx.fillStyle = 'yellow';
      ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
      // single square of food.
      ctx.fillStyle = 'purple';
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

      food = {
        // GENERATES RANDOM FOOD ON BOARD (REGULAR)
        // x: Math.floor((Math.random() * 30) + 1),  // the plus 1 is so that it's inclusive of the number 30
        // y: Math.floor((Math.random() * 30) + 1), // take off because it could generate off board.
        x: Math.floor((Math.random() * 40)),
        y: Math.floor((Math.random() * 30)), 
      }
      // console.log(food);
      // console.log("snakeX: " + snakeX);
      
      // specialFood = {
      //   // GENERATES SPECIAL ITEM ON BOARD
      //   x: Math.floor((Math.random() * 40)),
      //   y: Math.floor((Math.random() * 30)),
      // }
      // console.log(specialFood);

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

      if (snakeX == food.x && snakeY == food.y) {
        console.log("fucking nom nom");
      }


      // THIS IS FOR THE NEW SPECIAL FOOD. COMMENT OUT IF DOESNT WORK.
      for (var i = 0; i > snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (specialFood.x === snakeX || specialFood.y === snakeY || specialFood.y === snakeY && specialFood.x === snakeX) {
          specialFood.x = Math.floor((Math.random() * 800) + 1);
          specialFood.y = Math.floor((Math.random() * 600) + 1);
        }
      }

        // if (snakeX == specialFood.x && snakeY == specialFood.y) {
        //   console.log("NOM NOM PIZZA");
        // }
    } // END createFood()


    // var handle = setInterval(createSpecialFood, 3000);
    var handle =  setInterval(function(){
      createSpecialFood();
    }, 3000);
    
    // clearInterval(handle);
    // if (score % 5 === 0) {
    //   handle = setInterval(createSpecialFood, 3000);
    //   // clearInterval(handle);
    // }
    

    var createSpecialFood = function () {

      

      specialFood = {
        // GENERATES SPECIAL ITEM ON BOARD
        x: Math.floor((Math.random() * 40)),
        y: Math.floor((Math.random() * 30))
      }
      // console.log("spec food", specialFood);

      for (var i = 0; i > snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (specialFood.x === snakeX || specialFood.y === snakeY || specialFood.y === snakeY && specialFood.x === snakeX) {
          specialFood.x = Math.floor((Math.random() * 800) + 1);
          specialFood.y = Math.floor((Math.random() * 600) + 1);
        }
      }

      if (snakeX == specialFood.x && snakeY == specialFood.y) {
        console.log("NOM NOM PIZZA");
      }


      // SPECIAL FOOD
      if (snakeX == specialFood.x && snakeY == specialFood.y) {
        console.log("SPECIAL NOM NOM NOM NOM NOM NOM NOM");
        // removes special Food from page
        specialFood.x = NaN;
        // updates score by 10 bc sp3cials f00dz
        score += 10;
        gameScore.innerHTML = score;
        console.log("score: " + score);
        // if (score % 5 === 0) {
          createSpecialFood();

        // }
        foodSound.play();
        // makes tail bigger
        var tail = {
          x: snakeX,
          y: snakeY
        };
      }
    } // END createSpecialFood()

    // does not work here either....
    //  if (score === 15) {
    //   handle = setInterval(createSpecialFood, 3000);
    //   clearInterval(handle);
    // }

    // CHECKS IF SNAKE COLLIDES WITH ITS OWN BODY //
    var checkCollision = function (x, y, array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y)
          return true;
        }
      return false;
    }
    // CHECKS IF SNAKE COLLIDES WITH ITS OWN BODY //




    var draw = function () {
      // the space in which the snake will move 
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      // border
      // ctx.strokeStyle = "white";
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
        score = 0;
        gameScore.innerHTML = score;
        dieSound.play();
        // make new modal
        modalDie.style.display = "block"; //uncomment this later
        
        // refreshes pages (so score is reset)
        // window.location.href = "index.html";
        return;
      }


      // TESTS FOR X AND Y AXIS OF BOTH SNAKE AND FOOD //
      // console.log("snakeX: " + snakeX + " snakeY: " + snakeY);
      // console.log("foodX: " + food.x + " foodY: " + food.y);
      // TESTS FOR X AND Y AXIS OF BOTH SNAKE AND FOOD //


      // IF WE EAT FOOD=======================================================================================
      
      // THIS CODE BELOW DOES NOT WORK HERE - STOP FUCKING
      // if (score % 5 === 0) {
      //   handle = setInterval(createSpecialFood, 3000);
      //   // clearInterval(handle);
      // }
      
      // SPECIAL FOOD
      if (snakeX == specialFood.x && snakeY == specialFood.y) {
        console.log("SPECIAL NOM NOM NOM NOM NOM NOM NOM");
        // removes special Food from page
        specialFood.x = NaN;
        // updates score by 10 bc sp3cials f00dz
        score += 10;
        gameScore.innerHTML = score;
        console.log("score: " + score);
        // if (score % 5 === 0) {

          createSpecialFood();
        // }
        specialFoodSound.play();
        // makes tail bigger
        var tail = {
          x: snakeX,
          y: snakeY
        };
      }
      


      // NORMAL FOOD 
      else if (snakeX == food.x && snakeY == food.y) {
        console.log("nom nom nom nom nom nom");

        // removes food from page
        food.x = NaN;
        // update score
        score++;
        gameScore.innerHTML = score;
        console.log("score: " + score);

        
        // create a new sqaure instead of moving the tail.
        tail = {
          x: snakeX,
          y: snakeY
        };

        // create new food
        createFood();
        foodSound.play();

      } else {
        // pop out the last cell.
        var tail = snake.pop();
        tail.x = snakeX;
        tail.y = snakeY;
      };


      // puts tail as the first cell so that the snake doesnt end.
      snake.unshift(tail);

      // for each element of the array create a square using
      // the bodySnake function from before.
      for (var i = 0; i < snake.length; i++) {
        bodySnake(snake[i].x, snake[i].y);
      }

      // create food using the food function
      // foodItem(food.x, food.y);
      specialItem(specialFood.x, specialFood.y);
      foodItem(food.x, food.y);
    }


    var init = function () {
      direction = 'down';
      drawSnake();
      createFood();
      createSpecialFood();
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
        pauseSound.play();
      }
    });




// WILL RESTART THE GAME UPON PRESSING START. WITHOUT THIS IT WILL NOT RESTART. ONLY REFRESH PAGE WILL WORK
    return {
      init: init
    };
    init();

    
  }());  // end draw module function




// CONTROLS //
  (function (window, document, drawModule, undefined) {

    // connects button in html with init function
    var btn = document.getElementById('btn');
    btn.addEventListener("click", function () {
      drawModule.init();
      pressStart.play();
      naviLook.play();
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
// END CONTROLS //

};
//   =======================================================================================================
//   =======================================================================================================
//   =======================================================================================================
// END OF MAIN WINDOW.ONLOAD FUNCTION




//window frame for losing the game. GAME OVER SCREEN
// var loseGame = () => {
//   if (whatever === 0) {
//     stop();
//     ctx. ...
//     ctx. ....
//   }
// }

// var stop = () => {
//   clearInterval(intervalId);
// }




// make a constructor for the ghost and define the width maybe will fix issue