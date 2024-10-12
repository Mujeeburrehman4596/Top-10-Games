let score = 0;
let gameInProgress = false;
let currentBlock;
let previousBlock;
let blockInterval;
let blockHeight = 30; // Height of each block
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const startGameBtn = document.getElementById('startGameBtn');

function startGame() {
    gameInProgress = true;
    score = 0;
    scoreDisplay.textContent = score;
    gameOverDisplay.style.display = 'none';
    startGameBtn.style.display = 'none';
    gameArea.innerHTML = ''; // Clear previous blocks
    spawnBlock();
}

function spawnBlock() {
    const block = document.createElement('div');
    block.classList.add('block', 'block-item');
    block.style.backgroundColor = getRandomColor();
    block.style.height = blockHeight + 'px';
    block.style.bottom = '100%'; // Start off-screen

    // Add block to game area
    gameArea.appendChild(block);
    currentBlock = block;

    // Animate the block falling
    let position = gameArea.clientHeight;
    blockInterval = setInterval(() => {
        position -= 5; // Block falls down
        block.style.bottom = position + 'px';

        // Check if the block is at the bottom
        if (position <= 0) {
            clearInterval(blockInterval);
            endGame();
        }
    }, 100);
}

function stopBlock() {
    clearInterval(blockInterval);

    if (!previousBlock || blockAligned()) {
        score++;
        scoreDisplay.textContent = score;

        // Save the current block as the previous one
        previousBlock = currentBlock;  
        stackBlock(currentBlock);
        spawnBlock(); // Spawn a new block
    } else {
        endGame(); // End the game if not aligned
    }
}

function blockAligned() {
    const prevRect = previousBlock.getBoundingClientRect();
    const currRect = currentBlock.getBoundingClientRect();

    return Math.abs(prevRect.bottom - currRect.bottom) < 5; // Allow a small margin of error
}

function stackBlock(block) {
    const newBlockHeight = parseInt(block.style.height);
    block.style.bottom = (parseInt(block.style.bottom) + blockHeight) + 'px'; // Move block up
    block.style.position = 'absolute';
}

function endGame() {
    gameInProgress = false;
    clearInterval(blockInterval);
    finalScoreDisplay.textContent = score;
    gameOverDisplay.style.display = 'block';
    startGameBtn.style.display = 'inline-block';
}

function restartGame() {
    gameInProgress = false;
    gameArea.innerHTML = '';  // Clear all blocks
    startGame();
}

// Utility function to generate random colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Event listener to stop the block
gameArea.addEventListener('click', () => {
    if (gameInProgress) {
        stopBlock();
    }
});

startGameBtn.addEventListener('click', startGame);
