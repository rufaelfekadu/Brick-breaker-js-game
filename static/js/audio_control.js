const gameOver_sound = '../audio/mixkit-arcade-retro-game-over-213.wav';
const brickDestroy_sound = '../audio/mixkit-video-game-power-up-3164.wav';
const lifeLost_sound = '../audio/mixkit-game-show-wrong-answer-buzz-950.wav';
const powerUp_sound = '../audio/mixkit-winning-a-coin-video-game-2069.wav';
const levelUp_sound = '../audio/mixkit-winning-swoosh-2017.wav';
const ballCollision_sound = '../audio/mixkit-quick-jump-arcade-game-239.wav';
const gameWin_sound = '../audio/mixkit-final-level-bonus-2061.wav';

const playerObject = document.getElementById('playerElement');
const playerObject2 = document.getElementById('playerElement2');
const playerObject3 = document.getElementById('playerElement3');
export const volumeIcon = document.getElementById('sound');

export const muted = "fa-volume-xmark";
export const volume = "fa-volume-high";
let mute = false;

volumeIcon.addEventListener('click', muteAudio);

export function play_gameOver() {
    playerObject.src = gameOver_sound;
    playerObject.play();
}
export function play_brickDestroy() {
    playerObject3.src = brickDestroy_sound;
    playerObject3.play();
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
    playerObject2.src = ballCollision_sound;
    playerObject2.play();
}
export function play_gameWin() {
    playerObject.src = gameWin_sound;
    playerObject.play();
}
export function resetAudio() {
    playerObject.src = "";
    playerObject2.src = "";
    playerObject3.src = "";
    volumeIcon.classList.remove(muted);
    volumeIcon.classList.add(volume);
    mute = false;
}
function muteAudio() {
    if (!mute) {
        playerObject.muted = true;
        playerObject2.muted = true;
        playerObject3.muted = true;
        volumeIcon.classList.remove(volume);
        volumeIcon.classList.add(muted);
        mute = true;
    }
    else {
        playerObject.muted = false;
        playerObject2.muted = false;
        playerObject3.muted = false;
        volumeIcon.classList.remove(muted);
        volumeIcon.classList.add(volume);
        mute = false;


    }


}