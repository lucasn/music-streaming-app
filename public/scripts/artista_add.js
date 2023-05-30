document.getElementById('artist_add_select').addEventListener('change', e => {
    const form = document.getElementsByTagName('form')[0];

    const [_, nameInput, secondInput, submit] = form.children;

    if (e.target.value !== '') {
        if (e.target.value === 'music') {
            nameInput.placeholder = 'Nome da Música';
            form.appendChild(nameInput);
            form.appendChild(secondInput);
            form.appendChild(submit);
        }
        else if (e.target.value === 'album') {
            nameInput.placeholder = 'Nome do Álbum';
            form.appendChild(nameInput);
            form.appendChild(secondInput);
            form.appendChild(submit);
        }
    }
});