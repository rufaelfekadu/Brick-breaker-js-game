import * as Canvas from '../index.js'
class Brick
{
    constructor(width,height,x,y,brick_strength)
    {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.fillColor = "#2e3548";
        this.strokeColor="#fff";
        this.brick_strength = brick_strength;
    }

    DrawBrick()
    {
        Canvas.ctx.fillStyle=this.fillColor;
        Canvas.ctx.fillRect(this.x ,this.y ,this.width , this.height );
        Canvas.ctx.strockStyle = this.strokeColor;
        Canvas.ctx.strokeRect(this.x , this.y ,this.width , this.height);
    }
}

export default Brick;