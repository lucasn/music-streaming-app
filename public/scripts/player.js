const audioTag = document.querySelector('audio');
const playPauseButton = document.querySelector('#play-pause-button');

const duration = document.querySelector('#duration');
const currentTime = document.querySelector('#current-time');
const seekSlider = document.querySelector('#seek-slider');

playPauseButton.onclick = playPauseChangeState;
audioTag.onloadedmetadata = buildProgressbar;
audioTag.ontimeupdate = updateCurrentTimeOnSlider;
seekSlider.oninput = updateCurrentTimeInAudio;

function playPauseChangeState() {
    const [play, pause] = Array.from(playPauseButton.children);

    if (play.style.display === 'none') {
        pause.style.display = 'none';
        play.style.display = 'block';
        audioTag.pause();
    }
    else {
        play.style.display = 'none';
        pause.style.display = 'block';
        audioTag.play();
    }
}

function retrieveSong(shouldPlay) {
    fetch(`http://127.0.0.1:8080/music`)
    .then(response => {
        return response.arrayBuffer();
    })
    .then(bytes => {
        audioTag.src = URL.createObjectURL(new Blob([bytes]));
    });
}

function buildProgressbar() {
    duration.innerHTML = convertSecondsToMinutes(audioTag.duration);
}

function updateCurrentTimeOnSlider() {
    currentTime.innerHTML = convertSecondsToMinutes(audioTag.currentTime);
    seekSlider.value = (audioTag.currentTime * 100) / audioTag.duration;
}

function updateCurrentTimeInAudio() {
    const currentTimeSliderPosition = parseInt(seekSlider.value);
    audioTag.currentTime = (currentTimeSliderPosition * audioTag.duration) / 100;
}

function convertSecondsToMinutes(seconds) {
    const minutes = parseInt(seconds / 60);
    const secondsOfMinute = parseInt(seconds) % 60;

    return `${(minutes < 10) ? `0${minutes}` : minutes}:${(secondsOfMinute < 10) ? `0${secondsOfMinute}` : secondsOfMinute}`;
}

retrieveSong();