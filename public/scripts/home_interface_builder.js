const serverURL = 'http://127.0.0.1:8080'

const homeButton = document.querySelector('#options > .options-item:nth-child(2)')

homeButton.addEventListener('click', handleHomeButtonClick);

const playlistsCards = document.getElementById('playlists-cards');

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

function handleHomeButtonClick(event) {
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