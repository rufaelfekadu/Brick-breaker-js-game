import * as Canvas from '../index.js'

class Brick{
  
    constructor(width,height)
    {
        this.width=width;
        this.height=height;
        this.row=5;
        this.column=10;
        this.margintop=50;
        this.offsetleft=40;
        this.offsettop=30;
        this.fillColor = "#2e3548";
        this.strokeColor="#fff";
        this.bricks = []
    }

createbrick(){
    this.bricks=[];
    for(let r=0; r< this.row;r++)
    {
        this.bricks[r]=[]; 
      for(let c=0;c<this.column;c++)
      {
        const x = c*(this.width + this.offsetleft)+ this.offsetleft;
        const y = r*(this.height + this.offsettop)+this.offsettop+this.margintop;

        this.bricks[r][c]={
            x,
            y, 
            status:true
        };
      } 
    }
}
drawbricks(){
    for(let r=0; r< this.row;r++)
    {
        for(let c=0;c<this.column;c++)
        {
            if(this.bricks[r][c].status)
            {

                Canvas.ctx.fillStyle=this.fillColor;
                Canvas.ctx.fillRect(this.bricks[r][c].x , this.bricks[r][c].y ,this.width ,    this.height );
                Canvas.ctx.strockStyle = Brick.strokeColor;
                Canvas.ctx.strokeRect(this.bricks[r][c].x , this.bricks[r][c].y ,this.width , this.height);
            }
        }
    }
}
}

export default Brick;