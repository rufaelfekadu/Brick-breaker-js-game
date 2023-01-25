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
       

        this.bricks[r][c] = {
          // x,
          // y,
          x : c * (super.width + super.offsetleft) + super.offsetleft,
          y : r * (super.height + super.offsettop) + super.offsettop + super.margintop,
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

  // destroyBricks() {
  //     for (let r = 0; r < this.row; r++) {
  //       for (let c = 0; c < this.column; c++) {
  //         if ((this.bricks[r][c].status==false)) {
  //           let x = c * (this.width + this.offsetleft) + this.offsetleft;
  //           let y = r * (this.height + this.offsettop) + this.offsettop + this.margintop;
  //           this.bricks[r][c] = super.destroyBrick(this.bricks[r][c].status);
  //         }
  //       }
  //     }
  // }

  
}
export default Wall;