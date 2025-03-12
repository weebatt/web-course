function setRandomGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const color3 = getRandomColor();
    const angle = Math.floor(Math.random() * 360);

    const gradient = `linear-gradient(${angle}deg, ${color1} 0%, ${color2}, ${color3})`;
    const webkitGradient = `-webkit-linear-gradient(${angle}deg, ${color1} 0%, ${color2}, ${color3})`;
    document.querySelector('#header').style.background = gradient;
    document.querySelector('#footer').style.background = gradient;
    const clock = document.querySelector('#clock');
    clock.style.background = webkitGradient;
    clock.style.webkitBackgroundClip = 'text';
    clock.style.color = 'transparent';
    document.querySelector('#next-btn').style.background = gradient;
}

