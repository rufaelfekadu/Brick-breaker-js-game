import Brick from '../brick_class/brick_class.js'
import { ctx } from '../index.js'
class Wall {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.marginTop=50;
    this.offsetLeft=10;
    this.offsetTop=5;
    this.brickWidth = 80;
    this.brickheight = 25;
    this.bricks = [];
  }
  
  createbrick() {
    for (let r = 0; r < this.row; r++) {
      this.bricks[r] = [];
      for (let c = 0; c < this.column; c++) {
       let x =  c * (this.brickWidth + this.offsetLeft) + this.offsetLeft;
       let y = r * (this.brickheight + this.offsetTop) + this.offsetTop + this.marginTop;
        let brick_strength = Math.floor(Math.random() * 3 ) + 1; 
        let brick = new Brick(this.brickWidth,this.brickheight ,x,y,brick_strength);
        this.bricks[r][c] = brick;
      }
    }
  }

  drawbricks() {
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.column; c++) {
        if (this.bricks[r][c].brick_strength > 0 ) {
          let brick = this.bricks[r][c];
          switch ( brick.brick_strength) {
            case 1:
              ctx.drawImage(
                brick.image3,
                brick.x,
                brick.y,
                brick.width,
                brick.height
              );
              break;
            case 2:
              ctx.drawImage(
                brick.image1,
                brick.x,
                brick.y,
                brick.width,
                brick.height
              );
              break;
            case 3:
              ctx.drawImage(
                brick.image2,
                brick.x,
                brick.y,
                brick.width,
                brick.height
              );
              break;
          }
        }
      }
    }
  }
  
}
export default Wall;