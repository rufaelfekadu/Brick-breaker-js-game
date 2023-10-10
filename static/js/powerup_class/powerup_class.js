import * as Main from '../index.js'


const GRAVITY_SPEED = 1.2;
const LIFE = 0;
const PADDLE = 1;

class PowerUp {
    constructor(x, y, type, gravity) {
        this.width = 20;
        this.height = 16;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = GRAVITY_SPEED | gravity;
        this.fall_animation = undefined;
        this.draw_animation = undefined;
        this.heart = document.getElementById("heartSolid");
        this.expand = document.getElementById("expandArrows");

        if (type == LIFE || type == PADDLE) {
            this.type = type;
            if (this.type == PADDLE) {
                this.width = 30;
                this.height = 15;
            }
        }
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
            this.expand,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    fall() {
        if (this.y < Main.canvas.height) {
            this.y += this.gravity;
        }
    }


};

export default PowerUp;