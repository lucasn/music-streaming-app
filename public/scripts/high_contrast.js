if (localStorage.getItem('highContrast') === 'true') {
    setColor('highContrast', document.querySelector('.high-contrast'));
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