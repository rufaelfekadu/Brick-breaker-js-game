import * as Canvas from '../index.js';

class Brick
{
    constructor(width,height,x,y,brick_strength , power , hasPower , powerActive)
    {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.fillColor = "#2e3548";
        this.strokeColor="#fff";
        this.brick_strength = brick_strength;
        this.power = power;
        this.powerActive=powerActive;
        this.hasPower = hasPower;
        this.image3 = document.getElementById("img_brick3");
        this.image2 = document.getElementById("img_brick2");
        this.image1 = document.getElementById("img_brick");
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