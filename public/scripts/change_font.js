const body = document.querySelector('body');

let fontSize = parseInt(localStorage.getItem('fontSize'));


if (fontSize) {
    body.setAttribute('style', `font-size: ${fontSize}pt !important` );
} else {
    fontSize = 12;
}


function changeFontSize(change) {
    if (change === '+') fontSize += 2;
    else if (change === '-') fontSize -= 2;

    if (fontSize > 16) fontSize = 16;
    if (fontSize < 8) fontSize = 8;

    localStorage.setItem('fontSize', fontSize);
    body.setAttribute('style', `font-size: ${fontSize}pt !important` );
    console.log(fontSize);
}