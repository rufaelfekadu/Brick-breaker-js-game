import Paddle from './paddle_class/paddle_class.js';
import Ball from './ball_class/ball_class.js';
import Brick from './brick_class/brick_class.js';
import Wall from './wall_class/wall_class.js';


export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');

export let leftArrow = false;
export let rightArrow = false;
export let ballMoveAnimation;
export let ballMoveAnimation_paddle;


export const paddle = new Paddle(150, 20);
export const ball = new Ball();
const brick= new Brick(75,25);
const wall = new Wall(6,8);

//GameLogic Variables
let life;
let isStarted = false;

function startGame() {
    isStarted = true;
    ballMoveAnimation_paddle = requestAnimationFrame(moveBallOnPaddle);
    life = 3;
    loadEvents();
    tick();

}
function loadEvents() {


    canvas.addEventListener("mousemove", function (event) {
        if (event.offsetX <= paddle.width / 2) {
            paddle.x = 0
        } else if (event.offsetX >= canvas.width - paddle.width / 2) {
            paddle.x = canvas.width - paddle.width;
        } else {
            paddle.x = event.offsetX - paddle.width / 2
        }
    });


    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            leftArrow = true;
        } else if (event.key == "ArrowRight") {
            rightArrow = true;
        }
        if (event.key === " " && !ball.isMoving) {
            moveBall();
            ball.isMoving = true;
        }
    });
    document.addEventListener("keyup", function (event) {
        if (event.key === "ArrowLeft") {
            leftArrow = false;
        } else if (event.key == "ArrowRight") {
            rightArrow = false;
        }
    });

    canvas.addEventListener("click", function (event) {
        if (!ball.isMoving) {
            moveBall();
            ball.isMoving = true;
        }

    });

}


function movePaddle() {
    if (rightArrow && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.dx;
    } else if (leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}

function moveBallOnPaddle() {

    ball.x = paddle.x + ball.radius + (paddle.width / 2);
    ball.y = paddle.y - ball.radius;
    ballMoveAnimation_paddle = requestAnimationFrame(moveBallOnPaddle);

}

function moveBall() {

    ball.x += ball.xStep;
    ball.y += ball.yStep;
    cancelAnimationFrame(ballMoveAnimation_paddle);
    ballMoveAnimation = requestAnimationFrame(moveBall);

}

function ballWallCollision() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.xStep = -ball.xStep;
    }

    if (ball.y - ball.radius < 0) {
        ball.yStep = - ball.yStep;
    }
    if (ball.y + ball.radius > canvas.height) {
        life--;
        ball.reset();
        moveBallOnPaddle();

    }
}

function ballPaddlleCollision(){
    if((ball.y + ball.radius)>paddle.y &&(ball.y + ball.radius)< paddle.y + paddle.height && (ball.x + ball.radius) > paddle.x && (ball.x + ball.radius) <paddle.x+paddle.width ){
        let collidePoint_atPaddle = (ball.x + ball.radius) - (paddle.x + paddle.width/2);
        collidePoint_atPaddle = collidePoint_atPaddle / (paddle.width/2);
        let angle = collidePoint_atPaddle * (Math.PI /2);
        ball.xStep= ball.speed * Math.sin(angle);
        ball.yStep= - ball.speed * Math.cos(angle);
    }
}

function checkLifes() {

    if (life === 0)
        return false;
    else
        return true;
}

function update() {
    movePaddle();
    ballWallCollision();
    ballPaddlleCollision();
}
function drawGame() {
    paddle.draw();
    wall.createbrick( brick);
    wall.drawbricks( brick);
    ball.draw();

}

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGame();
    update();
    requestAnimationFrame(tick);
}

startGame();

