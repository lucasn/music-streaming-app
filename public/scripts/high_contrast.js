document.getElementById('high-contrast-button').addEventListener('click', ev => {

    const rootElement = document.querySelector(':root');

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

    if (localStorage.getItem('highContrast') !== 'true') {
        highConstrastColors.forEach(color => rootElement.style.setProperty(color[0], color[1]));
        ev.target.innerHTML = 'Desativar Alto Contraste'
        localStorage.setItem('highContrast', 'true');
    }
    else {
        standardContrastColors.forEach(color => rootElement.style.setProperty(color[0], color[1]));
        ev.target.innerHTML = 'Ativar Alto Contraste'
        localStorage.setItem('highContrast', 'false');
    }

    
})  