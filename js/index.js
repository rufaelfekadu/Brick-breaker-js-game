import Paddle from './paddle_class/paddle_class.js';
import Ball from './ball_class/ball_class.js';
import Brick from './brick_class/brick_class.js';

export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');
export let leftArrow=false;
export let rightArrow=false;

const paddle = new Paddle(150,20);

const brick = new Brick(100,50);

canvas.addEventListener("mousemove", function(event){
        if(event.clientX <= paddle.width/2){
            paddle.x = 0
        }else if(event.clientX >= canvas.width - paddle.width/2){
            paddle.x = canvas.width-paddle.width;
        }else{
            paddle.x = event.clientX -paddle.width/2
        } 
});
document.addEventListener("keydown", function(event){
    if(event.key === "ArrowLeft"){
        leftArrow = true;
    }else if(event.key== "ArrowRight"){
        rightArrow = true;
    }
});
document.addEventListener("keyup", function(event){
    if(event.key === "ArrowLeft"){
        leftArrow = false;
    }else if(event.key== "ArrowRight"){
        rightArrow = false;
    }
});

function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < canvas.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

function update(){
    movePaddle();
}
function drawGame(){
    paddle.draw();
    brick.createbrick();
    brick.drawbricks();
}

function tick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawGame();
    update();
    requestAnimationFrame(tick);
}
tick();
