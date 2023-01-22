import * as Canvas from '../index.js'

class Brick{
  
    constructor(width,height)
    {
        this.width=width;
        this.height=height;
        this.row=5;
        this.column=10;
        this.margintop=40;
        this.offsetleft=20;
        this.offsettop=20;
       this.fillColor = "#2e3548";

        this.strokeColor="#fff";
    }

createbrick(){
    this.bricks=[];
    for(let r=0; r< this.row;r++)
    {
      this.bricks[r]=[]; 
      for(let c=0;c<this.column;c++)
      {
        this.bricks[c][r]={
            x: c*(this.width + this.offsetleft)+ this.offsetleft,
            y: r*(this.height + this.offsettop)+this.offsettop+this.margintop, 
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
                Canvas.ctx.fillRect(this.bricks[r][c].x , this.bricks[r][c].y ,this.width , this.height );
                Canvas.ctx.strockStyle = this.strokeColor;
                Canvas.ctx.strockRect(this.bricks[r][c].x , this.bricks[r][c].y ,this.width , this.height);
            }

        }
    }
}


}

export default Brick;