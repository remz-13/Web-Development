const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake;
let direction;
let food;
let isPaused = false;
let gameInterval;

function startGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    draw();
}

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
        ctx.strokeRect(segment.x * 20, segment.y * 20, 18, 18);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 18, 18);

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };


    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || collision(head)) {
        alert("Game Over! Press OK to restart.");
        startGame();
        return;
    }

    snake.unshift(head);


    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    } else {
        snake.pop();
    }


    if (!isPaused) { 
        setTimeout(draw, 100);
    }
}


function collision(head) {
    return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}


function pauseGame() {
    isPaused = true; 
}

function resumeGame() {
    isPaused = false; 
    draw();
}


startGame();

document.getElementById('pauseButton').addEventListener('click', function() {
    if (isPaused) {
        resumeGame();
        this.textContent = 'Pause'; 
    } else {
        pauseGame();
        this.textContent = 'Resume';
    }
});
