import Paddle from './paddle_class/paddle_class.js';
import Ball from './ball_class/ball_class.js';
import Brick from './brick_class/brick_class.js';
import Wall from './wall_class/wall_class.js';

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
const levelImg =document.getElementById("level_img");
const nextButton=document.getElementById("level_ended");
const nextDiv=document.getElementById("next");
const brokenHeartIcon = "fa-heart-crack";
const heartIcon = "fa-heart";
let leftArrow = false;
let rightArrow = false;
export let ballMoveAnimation;
export let ballMoveAnimation_paddle;
export let gameAnimation;


//Event Listeners
start_btn.addEventListener("click", startGame);
let wall_column = 1;
let wall_row = 1;
export const paddle = new Paddle(150, 20);
export const ball = new Ball();
let wall = new Wall(wall_column ,wall_row );
let totalNumberOfBrick =wall_column *wall_row;
//GameLogic Variables
let life;
let isStarted = false;
let gameRestart = false;
let score = 0;
const maxLevel=3;
let level=1;

function stopAnimation() {

    cancelAnimationFrame(gameAnimation);
    cancelAnimationFrame(ballMoveAnimation_paddle);
    cancelAnimationFrame(ballMoveAnimation);
}

function startGame() {
    wall.createbrick();
    welcomeScreen.style.display = 'none';
    nextDiv.style.display='none';
    ballMoveAnimation_paddle = requestAnimationFrame(moveBallOnPaddle);
    life = 3;
    start_btn.innerHTML = "START";
    ball.isMoving = false;
    score = 0;
    level=1;
    scoreBoard.value = score;
    levelImg.value=level;
    loadEvents();
    tick();
    gameRestart = false;
    // isLevelDone=false;
    // console.log(isLevelDone);


}
// function restart() {

// }
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
    cancelAnimationFrame(gameAnimation);
    welcomeScreen.style.display = 'flex';
    cancelAnimationFrame(ballMoveAnimation_paddle);
    cancelAnimationFrame(ballMoveAnimation);
    start_btn.innerHTML = "PLAY AGAIN";

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

function ballPaddlleCollision() {
    if ((ball.y + ball.radius) > paddle.y &&
        (ball.y + ball.radius) < paddle.y + paddle.height &&
        (ball.x + ball.radius) > paddle.x &&
        (ball.x - ball.radius) < paddle.x + paddle.width) {
        let collidePoint = ball.x - (paddle.x + paddle.width / 2);
        collidePoint = collidePoint / (paddle.width / 2);
        let angle = collidePoint * (Math.PI / 3);
        ball.xStep = ball.speed * Math.sin(angle);
        ball.yStep = - ball.speed * Math.cos(angle);
    }
}

var counter=0;

function ballBrickCollision() {
    for (let r = 0; r < wall.row; r++) {
        for (let c = 0; c < wall.column; c++) {
            var b = wall.bricks[r][c];
            // console.log(wall.bricks[r][c]);
            // console.log(r);
            // console.log(c);
            if (b.brick_strength > 0) {
                if (
                    Math.floor(ball.x - ball.radius) < (b.x + b.width) &&
                    Math.floor(ball.x + ball.radius) > b.x &&
                    Math.floor(ball.y - ball.radius) < (b.y + b.height) &&
                    Math.floor(ball.y + ball.radius) > b.y) {
                    ball.yStep = -ball.yStep;
                    if (b.brick_strength === 2 || b.brick_strength === 3) {
                        b.brick_strength--;
                        score ++;
                    } else if(b.brick_strength === 1 ){
                        b.brick_strength--;
                        totalNumberOfBrick--;
                        score ++;
                    }
                    scoreBoard.value = score;
            }
                }


            } 
        }
    }



function nLevel(){
        level++;
        if(level==2){
            wall_column = 2;
            wall_row = 2;
            totalNumberOfBrick=wall_column* wall_row;
            wall = new Wall(wall_row,wall_column);
            wall.createbrick();
            ball.speed+=0.5;
            drawGame();
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


// let isLevelDone = true;

// function levelUp(){
//     for (let r = 0; r < wall.row; r++) {
//         for (let c = 0; c < wall.column; c++) {
//             var b = wall.bricks[r][c];
//             //  counter++;
//             // isLevelDone=isLevelDone && b.brick_strength==0;

//             if(b.length==0){
//                 nextDiv.style.display='block';
//                 nextButton.addEventListener('click',function(){
//                     level=level+1;
//                     console.log(level);
//                     // if(level==2){
//                         wall.drawbricks();
//                         ball.speed+=0.5;
//                         ball.reset();
//                         score=0;
//                     // }
//                 })
//             }
//         }
   

//         }
//     }

    // console.log(isLevelDone);
   
        // if(level>=maxLevel){
    //     gameOver();
    // } 
//       }
// }

function update() {
    movePaddle();
    ballWallCollision(); 
    ballPaddlleCollision();
    ballBrickCollision();
}

   


function drawGame() {
    if(totalNumberOfBrick===0){
        nLevel();
    }
    paddle.draw();
    wall.drawbricks();
    ball.draw();
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
    // if(isLevelDone){
    //     levelUp();
    // }

}

//startGame();

