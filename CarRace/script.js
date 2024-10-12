const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let carWidth = 50;
let carHeight = 90;
let carX = canvas.width / 2 - carWidth / 2;
let carY = canvas.height - carHeight - 20;

const roadWidth = canvas.width;
const roadHeight = canvas.height;

let speed = 5;
let laneMarkings = [];
let gameRunning = true;

// Function to draw the car
function drawCar() {
    ctx.fillStyle = 'red';
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

// Function to draw the road
function drawRoad() {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, roadWidth, roadHeight);

    // Add lane markings
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 5;
    for (let i = 0; i < laneMarkings.length; i++) {
        let mark = laneMarkings[i];
        ctx.beginPath();
        ctx.moveTo(mark.x, mark.y);
        ctx.lineTo(mark.x, mark.y + 30);
        ctx.stroke();
    }
}

// Function to move lane markings
function moveLaneMarkings() {
    for (let i = 0; i < laneMarkings.length; i++) {
        laneMarkings[i].y += speed;
    }

    // Add new lane marking if necessary
    if (laneMarkings[laneMarkings.length - 1].y >= 50) {
        laneMarkings.push({ x: canvas.width / 2, y: 0 });
    }

    // Remove lane markings that are off the screen
    if (laneMarkings[0].y > canvas.height) {
        laneMarkings.shift();
    }
}

// Function to update the game
function updateGame() {
    if (!gameRunning) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the road and car
    drawRoad();
    drawCar();

    // Move the lane markings
    moveLaneMarkings();

    // Check for collision (placeholder for future functionality)
    // detectCollision();

    // Request the next animation frame
    requestAnimationFrame(updateGame);
}

// Initializing lane markings
for (let i = 0; i < 10; i++) {
    laneMarkings.push({ x: canvas.width / 2, y: i * 100 });
}

// Event listener to control the car movement
window.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && carX > 0) {
        carX -= 10;
    } else if (event.key === 'ArrowRight' && carX + carWidth < canvas.width) {
        carX += 10;
    }
});

// Start the game
updateGame();
