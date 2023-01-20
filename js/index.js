const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let leftArrow=false;
let rightArrow=false;

class Paddle{
    constructor(width, height){
        this.margin_bottom=50;
        this.width = width;
        this.height = height;
        this.x = canvas.width/2 - this.width/2
        this.y = canvas.height - this.height - this.margin_bottom;
        this.dx = 20;
    }
    draw(){
        ctx.fillStyle = "#2e3548";
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }
}

const paddle = new Paddle(150,20);


class Ball{}
class Brick{}


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
}

function tick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawGame()
    update();
    requestAnimationFrame(tick);
}
tick();