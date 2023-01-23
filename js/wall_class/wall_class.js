

class Wall {
 constructor(row,column){

    this.row=row;
    this.column=column;
    this.bricks = [];
 }   

 createbrick(brick){
    for(let r=0; r<this.row;r++)
    {
        this.bricks[r]=[]; 
      for(let c=0;c<this.column;c++)
      {
        const x = c*(brick.width + brick.offsetleft)+ brick.offsetleft;
        const y = r*(brick.height + brick.offsettop)+brick.offsettop+brick.margintop;

        this.bricks[r][c]={
            x,
            y, 
            status:true
        };
      } 
    }
}

drawbricks(brick){
    for(let r=0; r< this.row;r++)
    {
        for(let c=0;c<this.column;c++)
        {
            if(this.bricks[r][c].status)
            {
          
              const x = c*(brick.width + brick.offsetleft)+ brick.offsetleft;
              const y = r*(brick.height + brick.offsettop)+brick.offsettop+brick.margintop;
             this.bricks[r][c] = brick.createBrick(x ,y);
            }
        }
    }
  }
}
export default Wall;