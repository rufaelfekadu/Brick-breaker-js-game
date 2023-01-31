import * as Main from '../index.js'


const GRAVITY_SPEED = 0.05;
const LIFE = 1;
const PADDLE = 0;

class PowerUp {
    constructor(w, h, x, y, type, gravity) {
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = GRAVITY_SPEED || gravity;
        this.gravitySpeed = 0;
        this.fall_animation = undefined;
        this.draw_animation = undefined;
        this.heart = document.getElementById("heartSolid");
        
        if (type == LIFE || type == PADDLE)
            this.type = type;
        else {
            this.type = undefined;
        }
    }

    draw_LifePowerUp() {
        Main.ctx.drawImage(
            this.heart,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    draw_PaddlePowerUp() {
        Main.ctx.drawImage(
            this.heart,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    fall() {
        if(this.y < Main.canvas.height){
            this.y += 1;   
        }
    }


};

export default PowerUp;