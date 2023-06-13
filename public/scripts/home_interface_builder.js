const serverURL = 'http://127.0.0.1:8080'

function handlePlaylistCardClick(playlistId) {

    fetch(`${serverURL}/playlists/${playlistId}`)
        .then(response => {
            return response.text();
        })
        .then(body => {
            updatePageContent(body);
        })
        .catch(error => {
            console.log(`An error has occurred: ${error}`);
        });
}

function handleHomeButtonClick() {
    fetch(`${serverURL}/home-content`)
        .then(response => {
            return response.text()
        })
        .then(body => {
            updatePageContent(body);
        })
        .catch(error => {
            console.log(`An error has occurred: ${error}`);
        });
}

function updatePageContent(htmlContent) {
    document.querySelector('main').innerHTML = htmlContent;
}

function removePlaylist(playlistId) {
    fetch(`http://localhost:8080/playlists/${playlistId}`, {
        method: 'delete'
    }).then(response => {
        handleHomeButtonClick();
        retrievePlaylistsCardsContent();
    })
}

function retrievePlaylistsCardsContent() {
    const userId = document.cookie.split('=')[1];

    fetch(`http://localhost:8080/user/${userId}/playlists/`)
        .then(response => response.text())
        .then(body => {
            updatePlaylistsCardsContent(body)
        });
}

function updatePlaylistsCardsContent(htmlContent) {
    document.getElementById('playlists-cards').innerHTML = htmlContent;
}

function addSongModal(songId) {
    const userId = document.cookie.split('=')[1];

    fetch(`http://localhost:8080/user/${userId}/playlists/search`)
        .then(response => response.json())
        .then(body => {
            const filteredPlaylists = body.filter(playlist => {
                const filteredSongs = playlist.songs.filter(song => parseInt(song.id) === parseInt(songId));
                return filteredSongs.length == 0;
            });
            insertPlaylistsInModal(filteredPlaylists, songId);
        });
}

function insertPlaylistsInModal(playlists, songId) {
    const modalContent = document.querySelector('#add-song-modal-content');

    Array.from(modalContent.children).forEach(child => {
        if (child.id !== 'add-song-modal-close') child.remove();
    })

    playlists.forEach(playlist => {
        const playlistElement = document.createElement('span');
        playlistElement.className = 'add-song-modal-item';
        playlistElement.onclick = () => addSongInPlaylist(playlist.id, songId);
        playlistElement.innerHTML = playlist.title;
        modalContent.appendChild(playlistElement);
    })

    document.querySelector('#add-song-modal').style.display = 'flex';
}

function addSongInPlaylist(playlistId, songId) {
    fetch('http://localhost:8080/playlists/song', {
        method: 'post',
        body: JSON.stringify({
            playlistId: playlistId,
            songId: songId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    closeAddSongModal();
}

function closeAddSongModal() {
    document.querySelector('#add-song-modal').style.display = 'none';
}

function removeSongFromPlaylist(playlistId, songId) {
    fetch(`http://localhost:8080/playlists/song/remove`, {
        method: 'post',
        body: JSON.stringify({
            playlistId: playlistId,
            songId: songId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => handlePlaylistCardClick(playlistId));
}