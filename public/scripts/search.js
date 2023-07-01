const searchBar = document.querySelector('#search input');

const dropdown = document.querySelector('#dropdown');

searchBar.addEventListener('keyup', searchSongs);

function searchSongs(event) {
    const searchString = event.currentTarget.value;

    fetch(`${serverBaseURL}/search?search_string=${searchString}`)
    .then(response => response.json())
    .then(songs => {
        if (songs) {
            Array.from(dropdown.children).forEach(child => {
                child.remove();
            });
            songs.forEach(song => {
                const songTag = document.createElement('a');
                songTag.innerHTML = song.title;
                songTag.onclick = () => retrieveAlbumContent(song.album.id);
                dropdown.appendChild(songTag);
            });

            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    })
}

function retrieveAlbumContent(albumId) {
    fetch(`${serverBaseURL}/album/${albumId}`)
    .then(response => response.text())
    .then(body => {
        updatePageContent(body);
        cleanDropdown();
    })
}

function cleanDropdown() {
    Array.from(dropdown.children).forEach(child => {
        child.remove();
    });

    searchBar.value = '';
}