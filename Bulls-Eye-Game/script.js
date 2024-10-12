const dartboard = document.getElementById('dartboard');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverDisplay = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const startGameBtn = document.getElementById('startGameBtn');

let score = 0;
let timeLeft = 30;
let gameTimer;

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  gameOverDisplay.style.display = 'none';
  startGameBtn.style.display = 'none';

  gameTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      gameOver();
    }
  }, 1000);
}

function calculateScore(clickX, clickY) {
  // Get the dimensions and position of the dartboard
  const rect = dartboard.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Calculate the distance between the click point and the center of the dartboard
  const distance = Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2));

  // Define score ranges based on distance from the center
  if (distance < 25) return 100; // Bullseye
  if (distance < 50) return 50;
  if (distance < 100) return 25;
  if (distance < 150) return 10;
  return 5; // Outside area, but still scored
}

function gameOver() {
  clearInterval(gameTimer);
  gameOverDisplay.style.display = 'block';
  finalScoreDisplay.textContent = score;
  startGameBtn.style.display = 'inline-block';
}

function restartGame() {
  score = 0;
  while (gameArea.firstChild) {
    gameArea.removeChild(gameArea.firstChild);
  }
  startGame();
}

// Event listener for clicking on the dartboard
dartboard.addEventListener('click', (e) => {
  if (timeLeft > 0) {
    const points = calculateScore(e.clientX, e.clientY);
    score += points;
    scoreDisplay.textContent = score;
  }
});

startGameBtn.addEventListener('click', startGame);
