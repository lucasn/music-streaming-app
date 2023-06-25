// setting up high contrast from local storage
if (localStorage.getItem('highContrast') === 'true') {
    setColor('highContrast', document.querySelector('.high-contrast'));
}

// setting up font size from local storage
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

function changeHighContrastColors(event) {
    if (localStorage.getItem('highContrast') !== 'true') {
        setColor('highContrast', event.target)
    }
    else {
        setColor('standard', event.target);
    }
}

function setColor(color, targetButton) {
    const highConstrastColors = [
        ['--almost-black', '#100102'],
        ['--dark-purple', '#D14415'],
        ['--medium-purple', '#4B1E19'],
        ['--light-purple', '#4B1E19'],
        ['--primary-text-color', '#ffffff'],
        ['--secondary-text-color', '#ffffff']
    ];
    
    const standardContrastColors = [
        ['--almost-black', '#0d0917'],
        ['--dark-purple', '#332a50'],
        ['--medium-purple', '#443C68'],
        ['--light-purple', '#635985'],
        ['--primary-text-color', '#ffffff'],
        ['--secondary-text-color', '#C9C2C2']
    ];

    const rootElement = document.querySelector(':root');

    if (color === 'standard') {
        standardContrastColors.forEach(color => rootElement.style.setProperty(color[0], color[1]));
        targetButton.innerHTML = 'Ativar Alto Contraste'
        localStorage.setItem('highContrast', 'false');
    } else if (color === 'highContrast'){
        highConstrastColors.forEach(color => rootElement.style.setProperty(color[0], color[1]));
        targetButton.innerHTML = 'Desativar Alto Contraste'
        localStorage.setItem('highContrast', 'true');
    }
}