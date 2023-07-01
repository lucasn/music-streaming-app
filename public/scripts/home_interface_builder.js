function handlePlaylistCardClick(playlistId) {

    fetch(`${serverBaseURL}/playlists/${playlistId}`)
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
    const token = document.cookie.split('=')[1];
    fetch(`${serverBaseURL}/home-content`, {headers: {'Authorization': `Bearer ${token}`}})
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
    fetch(`${serverBaseURL}/playlists/${playlistId}`, {
        method: 'delete'
    }).then(response => {
        handleHomeButtonClick();
        retrievePlaylistsCardsContent();
    })
}

function retrievePlaylistsCardsContent() {
    const token = document.cookie.split('=')[1];

    fetch(`${serverBaseURL}/user/playlists/`, {
        headers: {'Authorization': `Bearer ${token}`}
    })
        .then(response => response.text())
        .then(body => {
            updatePlaylistsCardsContent(body)
        });
}

function updatePlaylistsCardsContent(htmlContent) {
    document.getElementById('playlists-cards').innerHTML = htmlContent;
}

function addSongModal(songId) {
    const token = document.cookie.split('=')[1];

    fetch(`${serverBaseURL}/user/playlists/search`, {
        headers: {'Authorization': `Bearer ${token}`}
    })
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
    fetch(`${serverBaseURL}/playlists/song`, {
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
    fetch(`${serverBaseURL}/playlists/song/remove`, {
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

function retrieveConfigPage() {
    const token = document.cookie.split('=')[1];
    fetch(`${serverBaseURL}/configs`, {
        headers: {'Authorization': `Bearer ${token}`}
    })
    .then(response => response.text())
    .then(body => updatePageContent(body));
}

function deleteUser() {
    const confirmation = confirm('Essa operação não é reversível. Deseja mesmo continuar?');
    if (!confirmation) return;
}

function watchRenamePlaylistInputChanges(event, playlistId, actualPlaylistName) {
    const playlistName = event.target.value;

    if (event instanceof KeyboardEvent) {
        if (event.code === 'Enter') {
            event.target.blur();
            if (!playlistName) {
                event.target.value = actualPlaylistName;
                return;
            }
            renamePlaylist(playlistId, playlistName);
        }
    }
    else {
        if (!playlistName) {
            event.target.value = actualPlaylistName;
            return;
        }
        renamePlaylist(playlistId, playlistName);
    }
}

function renamePlaylist(playlistId, playlistName) {
    fetch(`${serverBaseURL}/playlists/${playlistId}`, {
        method: 'put',
        body: JSON.stringify({playlistName}),
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => retrievePlaylistsCardsContent());
}