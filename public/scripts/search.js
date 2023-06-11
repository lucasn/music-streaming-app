const searchBar = document.querySelector('#search input');

const dropdown = document.querySelector('#dropdown');

searchBar.addEventListener('keyup', searchSongs);

function searchSongs(event) {
    const searchString = event.currentTarget.value;

    fetch(`http://localhost:8080/search?search_string=${searchString}`)
    .then(response => response.json())
    .then(songs => {
        if (songs) {
            Array.from(dropdown.children).forEach(child => {
                child.remove();
            });
            songs.forEach(song => {
                const songTag = document.createElement('a');
                songTag.innerHTML = song.title;
                dropdown.appendChild(songTag);
            });

            dropdown.style.display = 'block';
        } else {
            console.log('aqui');
            dropdown.style.display = 'none';
        }
    })
}