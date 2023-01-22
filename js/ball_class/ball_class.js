import * as Main from '../index.js'
const BALL_RADIUS = 10;
const BALL_SPEED = 5;
class Ball {
    constructor(radius, speed) {
        this.radius = BALL_RADIUS || radius;
        this.x = Main.canvas.width / 2;
        this.y = Main.paddle.y - this.radius;
        this.speed = BALL_SPEED || speed;
        this.xStep = 3;
        this.yStep = -3;
    };
    draw() {
        // console.log("drawing ball");
        Main.ctx.beginPath();

        Main.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        Main.ctx.fillStyle = "#ffcd05";
        Main.ctx.fill();

        Main.ctx.strokeStyle = "#EFC003"
        Main.ctx.stroke();

        Main.ctx.closePath();

    };

    reset() {

        this.x = Main.paddle.x + this.radius;
        this.y = Main.paddle.y - this.radius;
        this.xStep = Math.floor(3 * (Math.random() * 2 - 1));
        this.yStep = -3;
        cancelAnimationFrame(Main.ballMoveAnimation);
    };
}

export default Ball;