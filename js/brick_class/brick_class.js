import * as Canvas from '../index.js'


class Brick{
  
    constructor(width,height)
    {
        this.width=width;
        this.height=height;
        this.fillColor = "#2e3548";
        this.strokeColor="#fff";
        this.margintop=50;
        this.offsetleft=60;
        this.offsettop=30;
    }


createBrick(x, y , status){

                Canvas.ctx.fillStyle=this.fillColor;
                Canvas.ctx.fillRect(x ,y ,this.width , this.height );
                Canvas.ctx.strockStyle = this.strokeColor;
                Canvas.ctx.strokeRect(x , y ,this.width , this.height);
                return {x:x , y: y ,width:this.width , height:this.height, status:status};
            }


        // destroyBrick(x, y , status){

        //         Canvas.ctx.fillStyle=this.fillColor="#000";
        //         Canvas.ctx.fillRect(x ,y ,this.width , this.height );
        //         Canvas.ctx.strockStyle = this.strokeColor="#000";
        //         Canvas.ctx.strokeRect(x , y ,this.width , this.height);
        //         return {x:x , y: y ,width:this.width , height:this.height, status:status};
        //     }
        }

export default Brick;