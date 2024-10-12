const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Snake settings
let snake = [{x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}];
let dx = 10; // Direction x (initial move to the right)
let dy = 0;  // Direction y
let foodX;
let foodY;
let score = 0;
let changingDirection = false;
let gameInterval;

// Buttons and UI
const startGameBtn = document.getElementById('startGameBtn');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');

// Main game loop
function main() {
  if (didGameEnd()) {
    gameOver();
    return;
  }

  changingDirection = false;

  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}

// Start the game
startGameBtn.addEventListener('click', function() {
  resetGame();
  startGameBtn.style.display = 'none';
  gameInterval = main();
});

// Reset game settings
function resetGame() {
  snake = [{x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}];
  dx = 10;
  dy = 0;
  score = 0;
  scoreDisplay.textContent = score;
  gameOverDisplay.style.display = 'none';
  changingDirection = false;
  createFood();
}

// Clear canvas for next frame
function clearCanvas() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw snake on canvas
function drawSnake() {
  snake.forEach(snakePart => {
    ctx.fillStyle = '#00FF00';
    ctx.strokeStyle = '#000000';

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  });
}

// Move snake
function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  // Check if snake eats the food
  if (head.x === foodX && head.y === foodY) {
    score += 10;
    scoreDisplay.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}

// Change direction with arrow keys
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changingDirection) return;
  changingDirection = true;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

// Create random food location
function createFood() {
  foodX = Math.floor(Math.random() * 39) * 10;
  foodY = Math.floor(Math.random() * 39) * 10;
}

// Draw food on canvas
function drawFood() {
  ctx.fillStyle = '#FF0000';
  ctx.strokeStyle = '#000000';
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

// Check for game end
function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (hasCollided) return true;
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - 10;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

// Handle Game Over
function gameOver() {
  clearInterval(gameInterval);
  gameOverDisplay.style.display = 'block';
  finalScoreDisplay.textContent = score;
}

// Restart Game
function restartGame() {
  resetGame();
  startGameBtn.style.display = 'block';
}
