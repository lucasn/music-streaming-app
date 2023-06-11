const openModalButton = document.querySelector('#add-playlist-button');
const closeModalButton = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');

const createPlaylistForm = document.querySelector('#modal-form');
const createPlaylistButton = document.querySelector('#submit-create-playlist');

createPlaylistForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(createPlaylistForm);

    const userId = document.cookie.split('=')[1];

    fetch(`http://127.0.0.1:8080/user/${userId}/playlists`, {
        method: 'post',
        body: formData
    }).then(response => {
        return response.text();
    }).then(responseBody => {
        console.log(responseBody);

        modal.style.display = 'none';

        const body = document.querySelector('body');
        const leftNav = document.querySelector('#left-nav');
        body.replaceChild(responseBody, leftNav);
    })
});

openModalButton.onclick = () => {
    modal.style.display = 'flex';
}

closeModalButton.onclick = () => {
    modal.style.display = 'none';
}

