import * as Canvas from '../index.js'

class Paddle {
    constructor(width, height) {
        this.margin_bottom = 50;
        this.width = width;
        this.height = height;
        this.x = Canvas.canvas.width / 2 - this.width / 2
        this.y = Canvas.canvas.height - this.height - this.margin_bottom;
        this.dx = 12;
    }
    draw() {
        Canvas.ctx.fillStyle = "#ffffff";
        Canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Paddle;