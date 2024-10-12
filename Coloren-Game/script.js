const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameOver = false;
let shieldAngle = 0;
const shieldColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8']; // Color segments of the shield
let orbs = [];

// Create a rotating color shield in the center
const shield = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 100,
    rotationSpeed: 0.05
};

// Create orbs that come from outside towards the center
function createOrb() {
    const randomColor = shieldColors[Math.floor(Math.random() * shieldColors.length)];
    const speed = Math.random() * 2 + 1;
    const angle = Math.random() * Math.PI * 2;
    orbs.push({
        x: Math.cos(angle) * canvas.width,
        y: Math.sin(angle) * canvas.height,
        radius: 20,
        color: randomColor,
        speed: speed,
        angle: angle
    });
}

// Move orbs toward the center
function moveOrbs() {
    orbs.forEach(orb => {
        orb.x -= Math.cos(orb.angle) * orb.speed;
        orb.y -= Math.sin(orb.angle) * orb.speed;

        // Detect collision with the shield
        const dx = orb.x - shield.x;
        const dy = orb.y - shield.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < shield.radius) {
            const shieldSegment = Math.floor((Math.atan2(dy, dx) + Math.PI) / (Math.PI / 2));
            const shieldColor = shieldColors[shieldSegment % shieldColors.length];

            if (shieldColor !== orb.color) {
                gameOver = true;
                endGame();
            } else {
                orbs.splice(orbs.indexOf(orb), 1);
                score++;
                document.getElementById('score').textContent = 'Score: ' + score;
            }
        }
    });
}

// Draw the rotating color shield
function drawShield() {
    ctx.save();
    ctx.translate(shield.x, shield.y);
    ctx.rotate(shieldAngle);
    const segmentAngle = (Math.PI * 2) / shieldColors.length;

    shieldColors.forEach((color, i) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, shield.radius, i * segmentAngle, (i + 1) * segmentAngle);
        ctx.fillStyle = color;
        ctx.fill();
    });

    ctx.restore();
}

// Draw orbs
function drawOrbs() {
    orbs.forEach(orb => {
        ctx.fillStyle = orb.color;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// End game
function endGame() {
    setTimeout(() => {
        if (confirm('Game Over! Your score: ' + score + '. Play again?')) {
            resetGame();
        }
    }, 100);
}

// Reset game state
function resetGame() {
    score = 0;
    gameOver = false;
    orbs = [];
    document.getElementById('score').textContent = 'Score: ' + score;
}

// Update the game loop
function update() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shieldAngle += shield.rotationSpeed;
        drawShield();
        drawOrbs();
        moveOrbs();
    }

    requestAnimationFrame(update);
}

// Create new orbs periodically
setInterval(createOrb, 1000);

// Control shield rotation speed with arrow keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        shield.rotationSpeed = -0.05;
    } else if (e.key === 'ArrowRight') {
        shield.rotationSpeed = 0.05;
    }
});

// Initialize game loop
update();
