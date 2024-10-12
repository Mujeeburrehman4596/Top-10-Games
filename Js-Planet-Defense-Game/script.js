const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameOver = false;
let planet = { x: canvas.width / 2, y: canvas.height / 2, radius: 80 };
let stars = [];
let asteroids = [];
let bullets = [];
let spaceship = { x: canvas.width / 2, y: canvas.height - 100, width: 40, height: 40, speed: 5 };

// Create stars
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 2 + 0.2
    });
}

function drawPlanet() {
    ctx.save();
    ctx.translate(planet.x, planet.y);
    ctx.fillStyle = '#7df9ff';
    ctx.beginPath();
    ctx.arc(0, 0, planet.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawStars() {
    stars.forEach(star => {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move star to create animation
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

function drawSpaceship() {
    ctx.fillStyle = '#FFEB3B';
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function moveSpaceship() {
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft' && spaceship.x > 0) {
            spaceship.x -= spaceship.speed;
        } else if (e.key === 'ArrowRight' && spaceship.x + spaceship.width < canvas.width) {
            spaceship.x += spaceship.speed;
        }
    });
}

function drawBullets() {
    bullets.forEach(bullet => {
        ctx.fillStyle = 'red';
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
        bullet.y -= 5;

        if (bullet.y < 0) {
            bullets.splice(bullets.indexOf(bullet), 1);
        }
    });
}

function shootBullet() {
    document.addEventListener('keydown', e => {
        if (e.code === 'Space' && !gameOver) {
            bullets.push({ x: spaceship.x + spaceship.width / 2 - 2.5, y: spaceship.y });
        }
    });
}

function drawAsteroids() {
    asteroids.forEach(asteroid => {
        ctx.fillStyle = 'gray';
        ctx.beginPath();
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move the asteroid
        asteroid.y += asteroid.speed;

        if (asteroid.y > canvas.height) {
            asteroid.y = 0;
            asteroid.x = Math.random() * canvas.width;
        }

        // Collision with planet
        const dx = asteroid.x - planet.x;
        const dy = asteroid.y - planet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < asteroid.radius + planet.radius && !gameOver) {
            endGame();
        }
    });
}

function spawnAsteroids() {
    for (let i = 0; i < 10; i++) {
        asteroids.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            radius: Math.random() * 20 + 10,
            speed: Math.random() * 2 + 1
        });
    }
}

function detectCollisions() {
    bullets.forEach(bullet => {
        asteroids.forEach(asteroid => {
            const dx = bullet.x - asteroid.x;
            const dy = bullet.y - asteroid.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < asteroid.radius) {
                asteroids.splice(asteroids.indexOf(asteroid), 1);
                bullets.splice(bullets.indexOf(bullet), 1);
                score++;
                document.getElementById('score').textContent = 'Score: ' + score;
            }
        });
    });
}

function resetGame() {
    score = 0;
    gameOver = false;
    bullets = [];
    asteroids = [];
    spaceship.x = canvas.width / 2;
    spaceship.y = canvas.height - 100;
    document.getElementById('score').textContent = 'Score: ' + score;
    spawnAsteroids();
}

function endGame() {
    gameOver = true;
    setTimeout(() => {
        if (confirm('Game Over! Do you want to play again?')) {
            resetGame();
        }
    }, 100); // Slight delay to avoid immediate prompt
}

function gameLoop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawStars();
        drawPlanet();
        drawSpaceship();
        drawBullets();
        drawAsteroids();
        detectCollisions();
    }

    requestAnimationFrame(gameLoop);
}

moveSpaceship();
shootBullet();
spawnAsteroids();
gameLoop();
