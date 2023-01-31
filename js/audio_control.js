const gameOver_sound = '../audio/mixkit-arcade-retro-game-over-213.wav';
const brickDestroy_sound = '../audio/mixkit-video-game-power-up-3164.wav';
const lifeLost_sound = '../audio/mixkit-game-show-wrong-answer-buzz-950.wav';
const powerUp_sound = '../audio/mixkit-winning-a-coin-video-game-2069.wav';
const levelUp_sound = '../audio/mixkit-winning-swoosh-2017.wav';
const ballCollision_sound = '../audio/mixkit-quick-jump-arcade-game-239.wav';
const gameWin_sound = '../audio/mixkit-final-level-bonus-2061.wav';

const playerObject = document.getElementById('playerElement');
const volumeIcon = document.getElementById('sound');

let muted = "fa-volume-xmark";
const volume = "fa-volume-high";
let mute = false;

volumeIcon.addEventListener('click', muteAudio);

export function play_gameOver() {
    playerObject.src = gameOver_sound;
    playerObject.play();
}
export function play_brickDestroy() {
    playerObject.src = brickDestroy_sound;
    playerObject.play();
}
export function play_lifeLost() {
    playerObject.src = lifeLost_sound;
    playerObject.play();
}
export function play_powerUp() {
    playerObject.src = powerUp_sound;
    playerObject.play();
}
export function play_levelUp() {
    playerObject.src = levelUp_sound;
    playerObject.play();
}
export function play_ballCollision() {
    playerObject.src = ballCollision_sound;
    playerObject.play();
}
export function play_gameWin() {
    playerObject.src = gameWin_sound;
    playerObject.play();
}
function muteAudio() {
    if (!mute) {
        playerObject.muted = true;
        volumeIcon.classList.remove("volume");
        volumeIcon.classList.add("muted");
        muted = true;
    }
    else {
        playerObject.muted = false;
        volumeIcon.classList.add("volume");
        volumeIcon.classList.remove("muted");
        muted = false;

    }


}