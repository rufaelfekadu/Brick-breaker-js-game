
// const gameWin_sound = document.getElementById('gamewinsound').getAttribute('data-url');
// const ballCollision_sound = document.getElementById('ballcollisionsound').getAttribute('data-url');
// const levelUp_sound = document.getElementById('levelupsound').getAttribute('data-url');
// const powerUp_sound = document.getElementById('powerupsound').getAttribute('data-url');
// const lifeLost_sound = document.getElementById('lifelostsound').getAttribute('data-url');
// const brickDestroy_sound = document.getElementById('brickdestroysound').getAttribute('data-url');
// const gameOver_sound = document.getElementById('gameoversound').getAttribute('data-url');

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
    console.log(playerObject3);
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