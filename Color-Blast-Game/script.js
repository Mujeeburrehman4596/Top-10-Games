const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const startGameBtn = document.getElementById('startGameBtn');

let score = 0;
let isPlaying = false;
let colorInterval;
let targetInterval;
let playerColor;
const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

function startGame() {
  isPlaying = true;
  score = 0;
  scoreDisplay.textContent = score;
  gameOverDisplay.style.display = 'none';
  startGameBtn.style.display = 'none';

  movePlayer();
  changePlayerColor();
  spawnTargets();
}

function movePlayer() {
  gameArea.addEventListener('mousemove', (e) => {
    if (isPlaying) {
      let gameAreaBounds = gameArea.getBoundingClientRect();
      let x = e.clientX - gameAreaBounds.left - player.offsetWidth / 2;
      let y = e.clientY - gameAreaBounds.top - player.offsetHeight / 2;
      player.style.left = `${x}px`;
      player.style.top = `${y}px`;
    }
  });
}

function changePlayerColor() {
  colorInterval = setInterval(() => {
    playerColor = colors[Math.floor(Math.random() * colors.length)];
    player.style.backgroundColor = playerColor;
  }, 1000);
}

function spawnTargets() {
  targetInterval = setInterval(() => {
    if (!isPlaying) return;

    const target = document.createElement('div');
    target.classList.add('target');
    const color = colors[Math.floor(Math.random() * colors.length)];
    target.style.backgroundColor = color;

    // Random position within the game area
    const x = Math.floor(Math.random() * (gameArea.offsetWidth - 30));
    const y = Math.floor(Math.random() * (gameArea.offsetHeight - 30));
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    gameArea.appendChild(target);

    target.addEventListener('click', () => {
      if (isPlaying && color === playerColor) {
        score += 10;
        scoreDisplay.textContent = score;
        gameArea.removeChild(target);
      }
    });

    // Remove the target after a few seconds
    setTimeout(() => {
      if (gameArea.contains(target)) {
        gameArea.removeChild(target);
      }
    }, 3000);
  }, 1500);
}

function gameOver() {
  isPlaying = false;
  clearInterval(colorInterval);
  clearInterval(targetInterval);
  gameOverDisplay.style.display = 'block';
  finalScoreDisplay.textContent = score;
}

function restartGame() {
  while (gameArea.firstChild) {
    gameArea.removeChild(gameArea.firstChild);
  }
  gameArea.appendChild(player);
  player.style.left = '0px';
  player.style.top = '0px';
  startGame();
}

startGameBtn.addEventListener('click', startGame);
