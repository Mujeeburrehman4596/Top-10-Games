const player = document.getElementById('player');
const ground = document.getElementById('ground');
const scoreDisplay = document.getElementById('score');

let score = 0;
let isJumping = false;

// Function to make the player jump
function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight >= 100) {
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    } else {
                        jumpHeight -= 5;
                        player.style.bottom = `${50 + jumpHeight}px`; // Move player down
                    }
                }, 20);
            } else {
                jumpHeight += 5;
                player.style.bottom = `${50 + jumpHeight}px`; // Move player up
            }
        }, 20);
    }
}

// Function to create obstacles
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.position = 'absolute';
    obstacle.style.bottom = '50px';
    obstacle.style.left = '100%'; // Start from the right edge
    obstacle.style.width = '30px';
    obstacle.style.height = '30px';
    obstacle.style.backgroundColor = '#000'; // Black color for the obstacle
    obstacle.style.borderRadius = '5px';
    document.getElementById('gameContainer').appendChild(obstacle);

    const obstacleInterval = setInterval(() => {
        const obstaclePosition = parseInt(obstacle.style.left);
        if (obstaclePosition < -30) { // Remove the obstacle when out of view
            clearInterval(obstacleInterval);
            obstacle.remove();
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        } else {
            obstacle.style.left = `${obstaclePosition - 5}px`; // Move the obstacle left
        }

        // Collision detection
        if (obstaclePosition < 100 && obstaclePosition > 50 && !isJumping) {
            alert('Game Over! Your score: ' + score);
            resetGame();
        }
    }, 20);
}

// Function to reset the game
function resetGame() {
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => obstacle.remove());
}

// Start the game
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

// Create obstacles at intervals
setInterval(createObstacle, 2000);
