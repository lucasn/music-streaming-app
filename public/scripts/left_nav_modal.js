const playlistsCardsContainer = document.querySelector('#playlists-cards');
const closeModalButton = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');

let playlistForm;

function retrievePlaylistform(){
    playlistForm = document.querySelector('#modal-form');
    playlistForm.addEventListener('submit', createPlaylistAndRetrievePlaylistsContent);
}

retrievePlaylistform();

playlistsCardsContainer.addEventListener('click',  (event) => {
    if (!event.target.closest('#add-playlist-button')) return;
    modal.style.display = 'flex';
});

closeModalButton.onclick = () => {
    modal.style.display = 'none';
}

function createPlaylistAndRetrievePlaylistsContent(event) {
        event.preventDefault();
    
        const data = {};
        new FormData(document.querySelector('#modal-form')).forEach((value, key) => data[key] = value);
    
        const userId = document.cookie.split('=')[1];
    
        fetch(`http://127.0.0.1:8080/user/${userId}/playlists`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.text();
        }).then(body => {
            modal.style.display = 'none';
            document.querySelector('#playlists-cards').innerHTML = body;
            retrievePlaylistform();
        })
}

