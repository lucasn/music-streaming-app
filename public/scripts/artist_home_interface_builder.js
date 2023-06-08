const serverURL = 'http://127.0.0.1:8080'

const statsButton = document.querySelector('#cards > .card-item:nth-child(1)');
const addButton = document.querySelector('#cards > .card-item:nth-child(2)');
const albumsButton = document.querySelector('#cards > .card-item:nth-child(3)');
albumsButton.addEventListener('click', handleAlbumsButtonClick)


function handleAlbumsButtonClick(event){
    const artistName = document.querySelector('#artist > h1').innerHTML;
    fetch(`${serverURL}/artist/${artistName}/albums`)
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

function updatePageContent(htmlContent) {
    document.querySelector('main').innerHTML = htmlContent
}