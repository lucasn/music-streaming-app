const audioTag = document.querySelector('audio');
const playPauseButton = document.querySelector('#play-pause-button');

playPauseButton.addEventListener('click', () => {
    fetch(`http://127.0.0.1:8080/music`)
    .then(response => {
        return response.arrayBuffer();
    })
    .then(bytes => {
        audioTag.src = URL.createObjectURL(new Blob([bytes]));
        audioTag.play();
    });
})