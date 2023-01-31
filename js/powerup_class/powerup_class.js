import * as Main from '../index.js'


const GRAVITY_SPEED = 0.05;
const LIFE = 1;
const PADDLE = 0;

class PowerUp {
    constructor(w, h, x, y, type, gravity) {
        this.heart = document.getElementById("heartSolid");
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = GRAVITY_SPEED || gravity;
        this.gravitySpeed = 0;
        this.fall_animation = undefined;
        this.draw_animation = undefined;

        if (type == LIFE || type == PADDLE)
            this.type = type;
        else {
            this.type = undefined;
        }
    }

    draw_LifePowerUp() {
        console.log("draw_LifePowerUp");

        console.log("life-y", this.y);
        Main.ctx.drawImage(
            this.heart,
            this.x,
            this.y,
            this.width,
            this.height
        );
        //this.type = LIFE;
        //this.fall();
    }
    draw_PaddlePowerUp() {
        console.log("paddle-y", this.y);
        Main.ctx.drawImage(
            this.heart,
            this.x,
            this.y,
            this.width,
            this.height
        );
        // this.type = PADDLE;
        // this.fall();
    }

    fall() {
        console.log("fall-y", this.y);
        if (true) {

            this.gravitySpeed += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY + this.gravitySpeed;


            switch (this.type) {
                case LIFE:

                    this.draw_LifePowerUp();
                    break;
                case PADDLE:

                    this.draw_PaddlePowerUp();
                    break;

                default:
                    console.log("ERROR! : draw power up type not set correctly!");
                    break;
            }

            this.fall_animation = requestAnimationFrame(this.fall.bind(this));
        }
        else return;

    }

    hitPaddle() {


        if ((this.y > Main.paddle.y) && (this.y == Main.paddle.y + Main.paddle.height)) {
            switch (this.type) {
                case LIFE:

                    if (Main.life < 3 && Main.life > 0) {
                        Main.life += 1;
                    }
                    break;
                case PADDLE:
                    this.draw_PaddlePowerUp();
                    Main.paddle.width += 20;
                    break;

                default:
                    console.log("ERROR! : draw power up type not set correctly!");
                    break;
            }
        }

    }

};

// function createPowerUp(w, h, x, y, type, gravity) {
//     let power = new PowerUp(w, h, x, y, type, gravity);
//     power.fall();
//     return power;
// }


// function draw_LifePowerUp(powerUp) {

//     console.log("obj", powerUp);
//     // Main.ctx.drawImage(
//     //     powerUp.image1,
//     //     powerUp.x,
//     //     powerUp.y,
//     //     powerUp.width,
//     //     powerUp.height)
//     //     ;
//     //this.type = LIFE;
//     //this.fall();
// }
// function draw_PaddlePowerUp(powerUp) {
//     console.log("obj", powerUp);
//     // Main.ctx.drawImage(
//     //     powerUp.image1,
//     //     powerUp.x,
//     //     powerUp.y,
//     //     powerUp.width,
//     //     powerUp.height
//     // );
//     // this.type = PADDLE;
//     // this.fall();
// }

// function fall() {
//     console.log(this.gravitySpeed);
//     this.gravitySpeed += this.gravity;
//     this.x += this.speedX;
//     this.y += this.speedY + this.gravitySpeed;

//     switch (this.type) {
//         case LIFE:

//             this.draw_LifePowerUp();
//             break;
//         case PADDLE:

//             this.draw_PaddlePowerUp();
//             break;

//         default:
//             console.log("ERROR! : draw power up type not set correctly!");
//             break;
//     }

//     // this.fall_animation = requestAnimationFrame(this.fall);

// }
export default PowerUp;