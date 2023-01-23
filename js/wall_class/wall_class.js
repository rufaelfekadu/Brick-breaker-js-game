import Brick from '../brick_class/brick_class.js'
import Ball from '../ball_class/ball_class.js';
class Wall extends Brick {
  constructor(row, column, width, height) {
    super(width, height)
    this.row = row;
    this.column = column;
    this.bricks = [];
  }

  createbrick() {
    for (let r = 0; r < this.row; r++) {
      this.bricks[r] = [];
      for (let c = 0; c < this.column; c++) {
        const x = c * (super.width + super.offsetleft) + super.offsetleft;
        const y = r * (super.height + super.offsettop) + super.offsettop + super.margintop;

        this.bricks[r][c] = {
          x,
          y,
          status: true
        };
      }
    }
  }

  drawbricks() {
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.column; c++) {
        if (this.bricks[r][c].status) {
          let x = c * (this.width + this.offsetleft) + this.offsetleft;
          let y = r * (this.height + this.offsettop) + this.offsettop + this.margintop;
          this.bricks[r][c] = super.createBrick(x, y,this.bricks[r][c].status);
        }
      }
    }
  }
collisionbrick(x,y){
  for(let r=0; r< this.row;r++)
  {
      for(let c=0;c<this.column;c++){
      var b=this.bricks[r][c];
        if(b.status){
 if(Ball.x - Ball.radius < b.x + super.width &&
  Ball.x + Ball.radius > b.x &&
  Ball.y - Ball.radius <b.y + super.height &&
  Ball.y + Ball.radius > b.y  )
  { 
    Ball.yStep= -Ball.yStep
     b.status=false;
 

}

}
}
}
}
}
export default Wall;