// document.getElementById('artist_add_select').addEventListener('change', e => {
//     const form = document.getElementsByTagName('form')[0];

import { response } from "express";

//     const [_, nameInput, secondInput, submit] = form.children;

//     if (e.target.value !== '') {
//         if (e.target.value === 'music') {
//             nameInput.placeholder = 'Nome da Música';
//             form.appendChild(nameInput);
//             form.appendChild(secondInput);
//             form.appendChild(submit);
//         }
//         else if (e.target.value === 'album') {
//             nameInput.placeholder = 'Nome do Álbum';
//             form.appendChild(nameInput);
//             form.appendChild(secondInput);
//             form.appendChild(submit);
//         }
//     }
// });

const serverURL = 'http://127.0.0.1:8080';
const createAlbumForm = document.querySelector('#album-form');
console.log(createAlbumForm);

createAlbumForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(createAlbumForm);
    const artistId = 4;
    console.log(formData);
    fetch(`${serverURL}/artist/${artistId}/album`,{
        method: 'post',
        body: formData
    }).then(response => {
        console.log(response.text());
    });
})