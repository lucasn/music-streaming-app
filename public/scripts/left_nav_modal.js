const playlistsCardsContainer = document.querySelector('#playlists-cards');
const closeModalButton = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');


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
    
        const token = document.cookie.split('=')[1];

        fetch(`${serverBaseURL}/user/playlists`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        }).then(response => {
            return response.text();
        }).then(body => {
            modal.style.display = 'none';
            document.querySelector('#playlists-cards').innerHTML = body;
        })
}