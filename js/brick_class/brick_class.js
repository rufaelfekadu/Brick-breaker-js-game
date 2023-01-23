import * as Canvas from '../index.js'


class Brick{
  
    constructor()
    {
        this.width=75;
        this.height=25;
        this.fillColor = "#2e3548";
        this.strokeColor="#fff";
        this.margintop=50;
        this.offsetleft=40;
        this.offsettop=30;
    }


createBrick(x, y){
                Canvas.ctx.fillStyle=this.fillColor;
                Canvas.ctx.fillRect(x ,y ,this.width , this.height );
                Canvas.ctx.strockStyle = this.strokeColor;
                Canvas.ctx.strokeRect(x , y ,this.width , this.height);
            }
        }

export default Brick;