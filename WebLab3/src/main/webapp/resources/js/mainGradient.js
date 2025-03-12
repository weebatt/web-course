function setRandomGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const color3 = getRandomColor();
    const angle = Math.floor(Math.random() * 360);

    const gradient = `linear-gradient(${angle}deg, ${color1} 0%, ${color2}, ${color3})`;

    const spinnerButtons = document.querySelectorAll('.ui-spinner .ui-spinner-up, .ui-spinner .ui-spinner-down');
    spinnerButtons.forEach(button => {
        button.style.background = gradient;
    });

    const radioButtons = document.querySelectorAll('.ui-radiobutton-box ');
    radioButtons.forEach(button => {
        button.style.backgroundImage = gradient;
    });

    document.querySelector('#next-btn').style.background = gradient;
    document.querySelector('.ui-button-text').style.background = gradient;
}

