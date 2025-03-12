let x;
let y;
let radius = 0;

document.querySelectorAll('.x-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.x-button').forEach(btn => {
            btn.classList.remove('active');
        });

        this.classList.add('active');
        x = this.getAttribute('value');
    });
});

document.getElementById('submit-button').onclick = function (){
    event.preventDefault();
    x = document.querySelector('.x-button.active');
    y = document.querySelector('.y-input-container input[type="text"]');
    radius = document.querySelector('input[class="radius-radio"]:checked');
    let f = 0;
    if (x === null) {
        document.querySelector(".x-label").style.color = "red";
    } else {
        f += 1;
        document.querySelector(".x-label").style.color = "black";
    }

    if (y && y.value === ''){
        document.querySelector(".y-label").style.color = "red";
    } else {
        f += 1;
        document.querySelector(".y-label").style.color = "black";
    }

    if (radius === null) {
        document.querySelector(".radius-label").style.color = "red";
    } else {
        f += 1;
        document.querySelector(".radius-label").style.color = "black";
    }
    if (f === 3) {
        x = Number(x.getAttribute('value'));
        radius = Number(radius.value);

        if (isNaN(x)){
            document.querySelector(".x-label").style.color = "red";
        } else if (isNaN(Number(y.value)) || Number(y.value) < -5 || String(y.value).match("-5\.0*\[1-9\]+") || Number(y.value) > 3 || String(y.value).match("3\.0*\[1-9\]+")) {
            document.querySelector(".y-label").style.color = "red";
        } else {
            document.querySelector(".x-label").style.color = "black";
            document.querySelector(".y-label").style.color = "black";
            document.querySelector(".radius-label").style.color = "black";

            y = Number(y.value);

            const coords = `x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&r=${encodeURIComponent(radius)}`;
            console.log(coords)

            let url = '/fcgi-bin/WebLab1.jar';
            if (url === '/fcgi-bin/WebLab1.jar') {

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        x: x,
                        y: y,
                        r: radius,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Ошибка сети или сервера');
                        }
                        return response.text();
                    })
                    .then(result => {
                        console.log(result);
                        makeData(result)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                alert("Был изменен url!")
            }
        }
    }
};
let n = 1;
function makeData(data) {
    let array = data.split(',');
    console.log(array[0], array[1], array[2], array[3]);
    let newRow = document.createElement("tr");
    let tdN = document.createElement("th");
    let tdX = document.createElement("th");
    let tdY = document.createElement("th");
    let tdR = document.createElement("th");
    let tdH = document.createElement("th");
    let tdT = document.createElement("th");

    let prevCircle = document.querySelector('#coordinatePlane circle');
    if (prevCircle) {
        prevCircle.remove();
    }

    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x * 50 + 200);
    circle.setAttribute("cy", -y * 50 + 200);
    circle.setAttribute("r", 5*radius);
    circle.setAttribute("fill", "black");

    tdX.innerHTML = array[0];
    tdY.innerHTML = array[1];
    tdR.innerHTML = array[2];
    tdN.innerHTML = n;
    n++;

    alert(array[0])
    alert(array[1])
    alert(array[2])
    alert(array[3])

    if (array[3] === "true") {
        document.getElementById("coordinatePlane").appendChild(circle);
        tdH.innerHTML = "Да";
        let audioPlayer = document.getElementById('probil');
        audioPlayer.play()

    } else {
        document.getElementById("coordinatePlane").appendChild(circle);
        tdH.innerHTML = "Нет";
        let audioPlayer2 = document.getElementById('neProbil');
        audioPlayer2.play()
    }


    let currentDate = new Date();
    tdT.innerHTML = currentDate;

    newRow.appendChild(tdN);
    newRow.appendChild(tdX);
    newRow.appendChild(tdY);
    newRow.appendChild(tdR);
    newRow.appendChild(tdH);
    newRow.appendChild(tdT);
    document.getElementById("output-table").appendChild(newRow);
}