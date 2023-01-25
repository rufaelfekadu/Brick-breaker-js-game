import * as Canvas from '../index.js'


class Brick
{
    constructor(width,height,x,y,status)
    {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.fillColor = "#2e3548";
        this.strokeColor="#fff";
        this.status = status;
    }

    DrawBrick()
    {
        Canvas.ctx.fillStyle=this.fillColor;
        Canvas.ctx.fillRect(this.x ,this.y ,this.width , this.height );
        Canvas.ctx.strockStyle = this.strokeColor;
        Canvas.ctx.strokeRect(this.x , this.y ,this.width , this.height);
    }

    destroyBrick()
    {
        Canvas.ctx.fillStyle=this.fillColor="#FFFFFF7F";
        Canvas.ctx.fillRect(this.x ,this.y ,this.width , this.height );
        Canvas.ctx.strockStyle = this.strokeColor="#FFFFFF7F";
        Canvas.ctx.strokeRect(this.x , this.y ,this.width , this.height);
    }
}

export default Brick;