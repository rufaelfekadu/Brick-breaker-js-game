import Paddle from './paddle_class/paddle_class.js';
import Ball from './ball_class/ball_class.js';
import Brick from './brick_class/brick_class.js';
import Wall from './wall_class/wall_class.js';
import PowerUp from './powerup_class/powerup_class.js';
import * as level_wall from './wall_class/wall_class.js';
import { play_gameOver, play_brickDestroy, play_lifeLost, play_powerUp, play_levelUp, play_ballCollision, play_gameWin } from './audio_control.js';

//HTML elements
export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');

const welcomeScreen = document.getElementById("welcomeScreen");
const start_btn = document.getElementById("startGame");
const pause_btn = document.getElementById("pause");
const restart_btn = document.getElementById("restart");
const scoreBoard = document.getElementById("score");
const life1 = document.getElementById("lifeOne");
const life2 = document.getElementById("lifeTwo");
const life3 = document.getElementById("lifeThree");
const levelImg = document.getElementById("level_img");
const nextButton = document.getElementById("level_ended");
const nextDiv = document.getElementById("next");
const winText = document.getElementById("winText");
const winScore = document.getElementById("winScore");
const brokenHeartIcon = "fa-heart-crack";
const heartIcon = "fa-heart";

let leftArrow = false;
let rightArrow = false;
export let ballMoveAnimation;
export let ballMoveAnimation_paddle;
export let gameAnimation;


//Event Listeners
start_btn.addEventListener("click", startGame);


//Game Objects
let wall_column = 1;
let wall_row = 1;


export const paddle = new Paddle(150, 20);
export const ball = new Ball();
let wall = new Wall(wall_column, wall_row);

//GameLogic Variables
let life;
let isStarted = false;
let gameRestart = false;
let score = 0;
const maxLevel = 3;
let current_level = 1;
let totalNumberOfBrick;
let clearedBricks;
let power;
let newPowerUp = false;

// function resetPowerUp() {
//     newPowerUp.create = true;
//     newPowerUp.x = 0;
//     newPowerUp.y = 0;
//     newPowerUp.obj = undefined;
// }

function stopAnimation() {
    cancelAnimationFrame(gameAnimation);
    cancelAnimationFrame(ballMoveAnimation_paddle);
    cancelAnimationFrame(ballMoveAnimation);
}

function startGame() {

    current_level = 1;
    clearedBricks = 0;
    setLevel();
    console.log("initial # of bricks", totalNumberOfBrick);
    welcomeScreen.style.display = 'none';
    nextDiv.style.display = 'none';
    ballMoveAnimation_paddle = requestAnimationFrame(moveBallOnPaddle);
    life = 3;
    start_btn.innerHTML = "START";
    ball.isMoving = false;
    score = 0;
    scoreBoard.value = score;
    levelImg.value = current_level;
    loadEvents();
    tick();
    gameRestart = false;
}

function pause() {
    stopAnimation();
    pause_btn.classList.add("btn_active");
    pause_btn.removeEventListener('click', pause);
    pause_btn.addEventListener('click', resume);
    pause_btn.innerHTML = "RESUME";
    restart_btn.disabled = !restart_btn.disabled;
    restart_btn.style.cursor = 'not-allowed';
}

function resume() {
    tick();
    restart_btn.disabled = !restart_btn.disabled;
    restart_btn.style.cursor = 'pointer';
    ballMoveAnimation = requestAnimationFrame(moveBall);
    pause_btn.classList.remove("btn_active");
    pause_btn.addEventListener('click', pause);
    pause_btn.removeEventListener('click', resume);
    pause_btn.innerHTML = "PAUSE";
}

function gameOver() {
    stopAnimation();
    welcomeScreen.style.display = 'flex';
    play_gameOver();
    start_btn.innerHTML = "PLAY AGAIN";
    setLevel();

}
function gameWin() {
    stopAnimation();
    welcomeScreen.style.display = 'flex';
    play_gameWin();
    start_btn.disabled = true;
    start_btn.style.cursor = 'default';
    start_btn.innerHTML = "PLAY AGAIN";
    start_btn.style.fontSize = "1.7rem";
    winText.style.display = 'inline-block';
    winScore.innerHTML = "Score: " + score;
    winScore.style.display = 'inline-block';
    setLevel();

}
function loadEvents() {

    pause_btn.addEventListener('click', pause);


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


    restart_btn.addEventListener('click', () => {
        stopAnimation();
        gameRestart = true;
        startGame();
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
        play_ballCollision();
        ball.xStep = -ball.xStep;
    }

    if (ball.y - ball.radius < 0) {
        play_ballCollision();
        ball.yStep = - ball.yStep;
    }
    if (ball.y + ball.radius > canvas.height) {
        life--;
        play_lifeLost();
        ball.reset();
        moveBallOnPaddle();
    }

}

function ballPaddlleCollision() {
    if ((ball.y + ball.radius) > paddle.y &&
        (ball.y + ball.radius) < paddle.y + paddle.height &&
        (ball.x + ball.radius) > paddle.x &&
        (ball.x - ball.radius) < paddle.x + paddle.width) {
        play_ballCollision();
        let collidePoint = ball.x - (paddle.x + paddle.width / 2);
        collidePoint = collidePoint / (paddle.width / 2);
        let angle = collidePoint * (Math.PI / 3);
        ball.xStep = ball.speed * Math.sin(angle);
        ball.yStep = - ball.speed * Math.cos(angle);
    }
}



function ballBrickCollision() {
    for (let r = 0; r < wall.row; r++) {
        for (let c = 0; c < wall.column; c++) {
            var b = wall.bricks[r][c];
            if (b.brick_strength > 0) {
                if (
                    Math.floor(ball.x - ball.radius) < (b.x + b.width) &&
                    Math.floor(ball.x + ball.radius) > b.x &&
                    Math.floor(ball.y - ball.radius) < (b.y + b.height) &&
                    Math.floor(ball.y + ball.radius) > b.y) {
                    ball.yStep = -ball.yStep;
                    if (b.brick_strength === 2 || b.brick_strength === 3) {
                        play_ballCollision();
                        b.brick_strength--;
                        score++;
                    } else if (b.brick_strength === 1) {
                        play_brickDestroy();
                        b.brick_strength--;
                        totalNumberOfBrick--;
                        clearedBricks++;
                        reward(b.x, b.y);
                        // newPowerUp = true;

                        if (totalNumberOfBrick === 0) {
                            current_level++;
                            if (current_level > 3) {
                                gameWin();
                            }
                            else {
                                cancelAnimationFrame(ballMoveAnimation);
                                setLevel();
                            }
                        }
                        score++;
                    }
                    scoreBoard.value = score;
                }
            }
        }
    }
}
function setLevel() {
    levelImg.value = current_level;
    clearedBricks = 0;
    switch (current_level) {
        case 1:
            totalNumberOfBrick = 45;
            wall.createbrick(1);
            paddle.dx = 12;
            break;
        case 2:
            play_levelUp();
            totalNumberOfBrick = 60;
            wall.createbrick(2);
            ball.speed += 1;
            ball.reset();
            ballMoveAnimation_paddle = requestAnimationFrame(moveBallOnPaddle);
            paddle.dx = 12;
            break;
        case 3:
            play_levelUp();
            totalNumberOfBrick = 56;
            wall.createbrick(3);
            ball.speed += 2;
            ball.reset();
            ballMoveAnimation_paddle = requestAnimationFrame(moveBallOnPaddle);
            paddle.dx = 14;
            break;



    }
}

function checkLifes() {
    switch (life) {
        case 2:
            life1.classList.add(heartIcon);
            life2.classList.add(heartIcon);
            life3.classList.remove(heartIcon);
            life3.classList.add(brokenHeartIcon);
            life1.style.color = '#ff6c17';
            life2.style.color = '#ff6c17';
            life3.style.color = '#B44505';
            break;
        case 1:
            life1.classList.add(heartIcon);
            life2.classList.remove(heartIcon);
            life3.classList.remove(heartIcon);
            life2.classList.add(brokenHeartIcon);
            life3.classList.add(brokenHeartIcon);
            life1.style.color = '#ff6c17';
            life2.style.color = '#B44505';
            life3.style.color = '#B44505';
            break;
        case 0:
            life1.classList.remove(heartIcon);
            life2.classList.remove(heartIcon);
            life3.classList.remove(heartIcon);
            life1.classList.add(brokenHeartIcon);
            life2.classList.add(brokenHeartIcon);
            life3.classList.add(brokenHeartIcon);
            life1.style.color = '#B44505';
            life2.style.color = '#B44505';
            life3.style.color = '#B44505';
            break;
        default:
            life1.classList.add(heartIcon);
            life2.classList.add(heartIcon);
            life3.classList.add(heartIcon);
            life1.style.color = '#ff6c17';
            life2.style.color = '#ff6c17';
            life3.style.color = '#ff6c17';
            break;
    }

    if (life === 0)
        return false;
    else
        return true;
}

function reward(x, y) {
    //clearedBricks % 4 == 0)
    if (clearedBricks % 4 == 0) {
        console.log("wow! you get a reward! at ", clearedBricks);
        const type = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        power = new PowerUp(20, 20, x, y, type);
        power.fall();


    }
}

function update() {
    movePaddle();
    ballWallCollision();
    ballPaddlleCollision();
    ballBrickCollision();


}

function drawGame() {
    paddle.draw();
    wall.drawbricks();
    ball.draw();
    if (newPowerUp) {
        reward(30, 30);
        newPowerUp = false;
    }
}

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGame();
    update();
    gameAnimation = requestAnimationFrame(tick);
    if (!checkLifes()) {
        gameOver();
        return;
    }
    if (gameRestart) {
        score = 0;
        return;
    }

}


