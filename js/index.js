const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');


class Paddle{
    constructor(width, height){
        this.margin_bottom=50;
        this.width = width;
        this.height = height;
        this.x = canvas.width/2 - this.width/2
        this.y = canvas.height - this.height - this.margin_bottom;
        this.dx = 5
    }

    draw(){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const paddle = new Paddle(150,20);
paddle.draw();

class Ball{}
class Brick{}

function tick(){
    ctx.clear(0,0,canvas.width , canvas.height)
    requestAnimationFrame(tick);
}
tick();