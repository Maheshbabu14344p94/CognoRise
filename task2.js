// Constants
const WIDTH = 600;
const HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 70;
const BALL_RADIUS = 5;
const PADDLE_SPEED = 5;
const BALL_SPEED = 5;

// Game objects
let canvas, ctx;
let paddleAI, paddlePlayer, ball;

// Function to initialize the game
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    // Create paddles
    paddleAI = {
        x: 10,
        y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        color: "blue"
    };

    paddlePlayer = {
        x: WIDTH - PADDLE_WIDTH - 10,
        y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        color: "red"
    };

    // Create ball
    ball = {
        x: WIDTH / 2,
        y: HEIGHT / 2,
        dx: BALL_SPEED,
        dy: BALL_SPEED,
        radius: BALL_RADIUS,
        color: "black"
    };

    // Start the game loop
    setInterval(update, 1000 / 60);
}

// Function to update the game state
function update() {
    movePaddleAI();
    moveBall();
    draw();
}

// Function to move the AI paddle
function movePaddleAI() {
    // Simple AI: Follow the ball
    if (paddleAI.y + paddleAI.height / 2 < ball.y) {
        paddleAI.y += PADDLE_SPEED;
    } else {
        paddleAI.y -= PADDLE_SPEED;
    }

    // Ensure paddle stays within the canvas
    if (paddleAI.y < 0) {
        paddleAI.y = 0;
    } else if (paddleAI.y + paddleAI.height > HEIGHT) {
        paddleAI.y = HEIGHT - paddleAI.height;
    }
}

// Function to move the ball
function moveBall() {
    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Check collision with walls
    if (ball.y + ball.radius >= HEIGHT || ball.y - ball.radius <= 0) {
        ball.dy *= -1;
    }

    // Check collision with paddles
    if (ball.x - ball.radius <= paddleAI.x + paddleAI.width &&
        ball.y >= paddleAI.y &&
        ball.y <= paddleAI.y + paddleAI.height) {
        ball.dx *= -1;
    } else if (ball.x + ball.radius >= paddlePlayer.x &&
        ball.y >= paddlePlayer.y &&
        ball.y <= paddlePlayer.y + paddlePlayer.height) {
        ball.dx *= -1;
    }

    // Check if ball goes out of bounds
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= WIDTH) {
        // Reset ball position
        ball.x = WIDTH / 2;
        ball.y = HEIGHT / 2;
    }
}

// Function to draw game objects
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw paddles
    ctx.fillStyle = paddleAI.color;
    ctx.fillRect(paddleAI.x, paddleAI.y, paddleAI.width, paddleAI.height);

    ctx.fillStyle = paddlePlayer.color;
    ctx.fillRect(paddlePlayer.x, paddlePlayer.y, paddlePlayer.width, paddlePlayer.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Initialize the game when the window loads
window.onload = init;
