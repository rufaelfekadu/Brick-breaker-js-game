import Brick from '../brick_class/brick_class.js'

class Wall {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.marginTop=50;
    this.offsetLeft=60;
    this.offsetTop=30;
    this.brickWidth = 75;
    this.brickheight = 25;
    this.bricks = [];
  }
  
  createbrick() {
    for (let r = 0; r < this.row; r++) {
      this.bricks[r] = [];
      for (let c = 0; c < this.column; c++) {
       let x =  c * (this.brickWidth + this.offsetLeft) + this.offsetLeft;
       let y = r * (this.brickheight + this.offsetTop) + this.offsetTop + this.marginTop;
        let brick = new Brick(this.brickWidth,this.brickheight ,x,y,true);
        this.bricks[r][c] = brick;
      }
    }
  }

  drawbricks() {
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.column; c++) {
        if (this.bricks[r][c].status) {
          let x =  c * (this.brickWidth + this.offsetLeft) + this.offsetLeft;
          let y = r * (this.brickheight + this.offsetTop) + this.offsetTop + this.marginTop;
          let brick = new Brick(this.brickWidth,this.brickheight ,x,y,true);
          this.bricks[r][c] = brick;
          brick.DrawBrick();
        }
      }
    }
  }
  
}
export default Wall;