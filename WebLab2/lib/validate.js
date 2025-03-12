let x;
let y;
let radius;

// Сохраняем значения в localStorage при изменении
document.querySelector('.y-input-container input[type="text"]').addEventListener('input', function() {
    localStorage.setItem('savedY', this.value);
});

document.querySelector('.radius-input-container input[type="text"]').addEventListener('input', function() {
    localStorage.setItem('savedRadius', this.value);
});

document.querySelectorAll('.x-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.x-button').forEach(btn => {
            btn.classList.remove('active');
        });

        this.classList.add('active');
        x = this.getAttribute('value');
        localStorage.setItem('savedX', x);
    });
});

document.getElementById('coordinatePlane').onclick = function (event) {
    event.preventDefault();
    x = document.querySelector('.x-button.active');
    y = document.querySelector('.y-input-container input[type="text"]');
    radius = document.querySelector('.radius-input-container input[type="text"]');
    let f = 0;

    if (x === null) {
        document.querySelector(".x-label").style.color = "red";
    } else {
        f += 1;
        document.querySelector(".x-label").style.color = "black";
    }

    if (y && y.value === '') {
        document.querySelector(".y-label").style.color = "red";
    } else {
        f += 1;
        document.querySelector(".y-label").style.color = "black";
    }

    if (radius && radius.value === '') {
        document.querySelector(".radius-label").style.color = "red";
    } else {
        f += 1;
        document.querySelector(".radius-label").style.color = "black";
    }

    if (f === 3) {
        x = Number(x.getAttribute('value'));

        if (isNaN(x)) {
            document.querySelector(".x-label").style.color = "red";
        } else if (isNaN(Number(y.value)) || Number(y.value) < -3 || String(y.value).match("-3\.0*\[1-9\]+") || Number(y.value) > 3 || String(y.value).match("3\.0*\[1-9\]+")) {
            document.querySelector(".y-label").style.color = "red";
        } else if (isNaN(Number(radius.value)) || Number(radius.value) < 2 || String(radius.value).match("2\.0*\[1-9\]+") || Number(radius.value) > 5 || String(radius.value).match("5\.0*\[1-9\]+")) {
            document.querySelector(".radius-label").style.color = "red";
        } else {
            document.querySelector(".x-label").style.color = "black";
            document.querySelector(".y-label").style.color = "black";
            document.querySelector(".radius-label").style.color = "black";

            y = Number(y.value);
            radius = Number(radius.value);

            const params = new URLSearchParams({
                x: x,
                y: y,
                r: radius
            });

            console.log(params.toString());
            let url = `controller?${params.toString()}`;
            fetch(url, {
                method: 'GET',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка сети или сервера');
                    }
                    return response.text();
                })
                .then(response => {
                    console.log(response)
                    saveData(response)
                    window.location.href = 'table.jsp';
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};

function saveData(response){
    localStorage.setItem('response', response);
}

window.onload = function () {
    let savedResponse = localStorage.getItem('response');
    if (savedResponse) {
        if (savedResponse) {
            localStorage.removeItem('response');  // Удаляем после использования
            makeData(savedResponse);
        }
// Восстанавливаем состояние кнопки x
        const savedX = localStorage.getItem('savedX');
        if (savedX) {
            document.querySelectorAll('.x-button').forEach(button => {
                if (button.getAttribute('value') === savedX) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
            x = savedX; // Сохраняем значение x
        }

        // Восстанавливаем значения y и radius
        const savedY = localStorage.getItem('savedY');
        const savedRadius = localStorage.getItem('savedRadius');

        if (savedY) {
            document.querySelector('.y-input-container input[type="text"]').value = savedY;
            y = savedY;  // Обновляем значение y
        }

        if (savedRadius) {
            document.querySelector('.radius-input-container input[type="text"]').value = savedRadius;
            radius = savedRadius;  // Обновляем значение radius
        }
    }
}

function makeData(data) {
    console.log("Data received from server: ", data);

    if (!data) {
        console.error("No data received from server");
        return;
    }

    let array = data.split(',');
    console.log("Array of data: ", array);

    // Проверяем количество элементов и их валидность
    if (array.length !== 4) {
        console.error("Unexpected data format");
        return;
    }

    x = parseFloat(array[0]);
    y = parseFloat(array[1]);
    radius = parseFloat(array[2]);

    console.log(`x: ${x}, y: ${y}, radius: ${radius}`);

    if (isNaN(x) || isNaN(y) || isNaN(radius)) {
        console.error("Invalid data: x, y, or radius is NaN");
        return;
    }

    let prevCircle = document.querySelector('#coordinatePlane circle');
    if (prevCircle) {
        prevCircle.remove();
    }

    // Создаём новый элемент <circle>
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x * 50 + 200);  // Преобразование координаты X
    circle.setAttribute("cy", -y * 50 + 200); // Преобразование координаты Y
    circle.setAttribute("r", 5);  // Размер круга (можно оставить фиксированным для проверки)
    circle.setAttribute("fill", "black");

    if (array[3] === "true") {
        circle.setAttribute("fill", "green")
        document.getElementById("coordinatePlane").appendChild(circle);
        let audioPlayer = document.getElementById('probil');
        audioPlayer.play();
    } else {
        circle.setAttribute("fill", "red")
        document.getElementById("coordinatePlane").appendChild(circle);
        let audioPlayer2 = document.getElementById('neProbil');
        audioPlayer2.play();
    }
}
