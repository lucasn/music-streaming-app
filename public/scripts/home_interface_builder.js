const serverURL = 'http://127.0.0.1:8080'

const homeButton = document.querySelector('#options > .options-item:nth-child(2)')

homeButton.addEventListener('click', handleHomeButtonClick);


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