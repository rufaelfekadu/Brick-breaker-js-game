import * as Canvas from '../index.js'

class Paddle{
    constructor(width, height){
            this.margin_bottom=50;
            this.width = width;
            this.height = height;
            this.x =  Canvas.canvas.width/2 - this.width/2
            this.y =  Canvas.canvas.height - this.height - this.margin_bottom;
            this.dx = 20;
        }
        draw(){
            Canvas.ctx.fillStyle = "#2e3548";
            Canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
}

export default Paddle;