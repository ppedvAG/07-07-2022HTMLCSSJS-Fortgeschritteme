// Video & Leiste
const video = document.querySelector("video");
const controls = document.querySelector(".controls");

// Einzelnen Buttons

const play = document.querySelector(".play");
const stopBtn = document.querySelector(".stop");
const rewind = document.querySelector(".rwd");
const fastForward = document.querySelector(".fwd");

// Für den Zeitbalken:

const timerSect = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer section");

// Wird per JS entfernt, damit User, die kein JS erlauben/untersützen trotzdem das Video abspielen können
video.removeAttribute("controls");
controls.style.visibility = "visible";

function playVideo() {
    if (video.paused) {
        video.play();
        // mit der property dataset können wir auf die data-* Attribute des HTML-Elementes zugreifen
        play.dataset.icon = "u";
    } else {
        // mit der property dataset können wir auf die data-* Attribute des HTML-Elementes zugreifen
        video.pause();
        play.dataset.icon = "P";
    }
}

play.addEventListener("click", playVideo);

// Stopp wenn Video endet oder Stopp gedrückt wird

function stopVideo() {
    // media wird pausiert
    video.pause();
    // Vergangen Zeit im video/audio wird auf 0 gesetzt, sind also wieder am start
    video.currentTime  = 0;
    play.dataset.icon = "P";
}

stopBtn.addEventListener("click", stopVideo);
// Sobald das Video/audio endet wird das Event ausgelöst
video.addEventListener("ended", stopVideo);


function videoFwrd() {
    // sprint um 10 sekunden vorwärts
    video.currentTime += 10;
}

function videoRwd() {
    // Springt um 10 sekunden zurück
    video.currentTime -= 10;
}

fastForward.addEventListener("click", videoFwrd);
rewind.addEventListener("click", videoRwd);
// Event das immer ausgelöst wird, wenn sich die currentTime ändert

function setTime() {
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime - minutes * 60);

    // padStart("Maximale Länge des Strings", "Füllzeichen") Füllt am Anfang auf
    // padEnd("Maximale Länge des Strings", "Füllzeichen") Füllt am End auf
    const minutesString = minutes.toString().padStart("2", "0");
    const secondsString = seconds.toString().padStart("2", "0");

    timer.innerText = `${minutesString}:${secondsString}`;

    const bar = timerSect.clientWidth * (video.currentTime/video.duration);
    timerBar.style.width = `${bar}px`;

}


video.addEventListener("timeupdate", setTime);