const playlistsCards = document.getElementById('playlists-cards');

Array.from(playlistsCards.children).forEach(element => {
    element.addEventListener('click', handlePlaylistCardClick);
});

function handlePlaylistCardClick(event) {
    const playlistTitle = event.currentTarget.querySelector('p').innerHTML;
    fetch(`http://127.0.0.1:8080/playlists/${playlistTitle}`)
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