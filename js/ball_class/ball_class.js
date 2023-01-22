import * as Main from '../index.js'
const BALL_RADIUS = 10;
const BALL_SPEED = 6;
class Ball {
    constructor(radius, speed) {
        this.radius = BALL_RADIUS || radius;
        this.x = Main.canvas.width / 2;
        this.y = Main.paddle.y - this.radius;
        this.speed = BALL_SPEED || speed;
        this.xStep = this.speed;
        this.yStep = -this.speed;
        this.isMoving = false;
    };
    draw() {

        Main.ctx.beginPath();

        Main.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        Main.ctx.fillStyle = "#ffff00";
        Main.ctx.fill();

        Main.ctx.strokeStyle = "#F6F602"
        Main.ctx.stroke();

        Main.ctx.closePath();

    };

    reset() {

        this.x = Main.paddle.x + this.radius;
        this.y = Main.paddle.y - this.radius;
        this.isMoving = false;
        this.xStep = Math.floor(this.speed * (Math.random() * 2 - 1));
        this.yStep = -this.speed;
        cancelAnimationFrame(Main.ballMoveAnimation);
    };
}

export default Ball;