import Brick from '../brick_class/brick_class.js';
import { ctx } from '../index.js';
import PowerUp from '../powerup_class/powerup_class.js'

class Wall {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.marginTop=50;
    this.offsetLeft=10;
    this.offsetTop=5;
    this.brickWidth = 89;
    this.brickheight = 30;
    this.bricks = [];
  }
  
  createbrick(level) {
    switch(level){
      case 1 :
        this.row = level_one.length;
        this.column = level_one[0].length;
        break;
      case 2 :
        this.row = level_two.length;
        this.column = level_two[0].length;
        break;
      case 3 :
        this.row = level_three.length;
        this.column = level_three[0].length;
        break;
    }
    for (let r = 0; r < this.row; r++) {
      this.bricks[r] = [];
      for (let c = 0; c < this.column; c++) {
       let x =  c * (this.brickWidth + this.offsetLeft) + this.offsetLeft;
       let y = r * (this.brickheight + this.offsetTop) + this.offsetTop + this.marginTop;
       let type = Math.floor(Math.random() * (1 - 0 + 10)) + 0;
        let hasPower = false;
        
        let power = new PowerUp(20, 20, x+this.brickWidth/2.5, y+this.brickheight/6, type );
        let brick = new Brick(this.brickWidth,this.brickheight ,x,y,0,power, hasPower , false);
        if(level == 1 ){
          brick.brick_strength = level_one[r][c];
        }else if (level === 2){
          brick.brick_strength = level_two[r][c];
        } else{
          brick.brick_strength = level_three[r][c];
        }
        if((type === 1 || type === 0) && brick.brick_strength != 0 ){
          brick.hasPower = true;
        }
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
  drawPowers() {
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.column; c++) {
          let brick = this.bricks[r][c];
          if (this.bricks[r][c].brick_strength === 1  || brick.hasPower ){
            switch ( brick.power.type) {
              case 0:
                brick.power.draw_LifePowerUp();
                break;
              case 1:
                brick.power.draw_PaddlePowerUp();
                break;
            }
          }
          
        }
      }
    }
}

const level_one = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
]

const level_two = [
  [3, 0, 0, 2, 2, 2, 2, 0, 0, 3],
  [1, 3, 0, 0, 2, 2, 0, 0, 3, 1],
  [1, 1, 3, 0, 0, 0, 0, 3, 1, 1],
  [1, 1, 1, 3, 0, 0, 3, 1, 1, 1],
  [1, 1, 1, 3, 0, 0, 3, 1, 1, 1],
  [1, 1, 1, 3, 0, 0, 3, 1, 1, 1],
  [1, 1, 3, 0, 0, 0, 0, 3, 1, 1],
  [1, 3, 0, 0, 2, 2, 0, 0, 3, 1],
  [3, 0, 0, 2, 2, 2, 2, 0, 0, 3]
];

const level_three = [
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 2, 0, 3, 0, 3, 2, 1, 0],
  [0, 1, 2, 3, 0, 3, 0, 2, 1, 0],
  [0, 1, 2, 0, 3, 0, 3, 2, 1, 0],
  [0, 1, 2, 3, 0, 3, 0, 2, 1, 0],
  [0, 1, 2, 0, 3, 0, 3, 2, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 0]
];


export default Wall;