let x;
let y;
let r = 1;

document.getElementById('coordinatePlane').onclick = function (event) {
    event.preventDefault();
    let xInput = document.getElementById('form:xSpinner_input');
    let yInput = document.getElementById('form:yInput');
    let rInput = document.querySelector('input[name="form:rNumberSelector"]:checked');

    // console.log(xInput + " " + yInput + " " + rInput)
    // console.log(xInput.value + " " + yInput.value + " " + rInput.value)


    let valid = true;

    if (yInput && yInput.value === '') {
        document.querySelector(".ui-inputtext").style.borderColor = "red";
        valid = false;
    } else {
        if (isNaN(yInput.value) || yInput.value < -3 || String(yInput.value).match("-3\.0*\[1-9\]+") || yInput.value > 5 || String(yInput.value).match("5\.0*\[1-9\]+")) {
            document.querySelector(".ui-inputtext").style.borderColor = "red";
        } else {
            document.querySelector(".ui-inputtext").style.borderColor = "#D1D4D8";
        }
    }

    if (valid) {
        x = xInput.value;
        y = yInput.value;
        r = rInput.value;

        // Вызываем отправку данных через remoteCommand
        console.log("Sending data:", x, y, r);
        sendCoordinates([{name: 'x', value: x}, {name: 'y', value: y}, {name: 'r', value: r}]);
        console.log("Calling sendCoordinates");

    }
};

function makeData(xhr, status, args) {
    let result = args.result;

    let prevCircle = document.querySelector('#coordinatePlane circle');
    if (prevCircle) {
        prevCircle.remove();
    }

    // Создаём новый элемент <circle>
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x * 50 / r + 200);  // Преобразование координаты X
    circle.setAttribute("cy", -y * 50 / r+ 200); // Преобразование координаты Y
    circle.setAttribute("r", 5);  // Размер круга (можно оставить фиксированным для проверки)
    circle.setAttribute("fill", "black");

    if (result === true) {
        circle.setAttribute("fill", "green")
        document.getElementById("coordinatePlane").appendChild(circle);
        // let audioPlayer = document.getElementById('probil');
        // audioPlayer.play();
    } else {
        circle.setAttribute("fill", "red")
        document.getElementById("coordinatePlane").appendChild(circle);
        // let audioPlayer2 = document.getElementById('neProbil');
        // audioPlayer2.play();
    }
}
