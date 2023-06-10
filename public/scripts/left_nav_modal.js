const openModalButton = document.querySelector('#add-playlist-button');
const closeModalButton = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');

const createPlaylistForm = document.querySelector('#modal-form');
const createPlaylistButton = document.querySelector('#submit-create-playlist');

createPlaylistForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(createPlaylistForm);
});

openModalButton.onclick = () => {
    modal.style.display = 'flex';
}

closeModalButton.onclick = () => {
    modal.style.display = 'none';
}

