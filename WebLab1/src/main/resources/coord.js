
const svg = document.getElementById('coordinatePlane');
let width = svg.getAttribute('width');
let height = svg.getAttribute('height');
let originX = width / 2;
let originY = height / 2;
let tickSpacing = 50;
const tickSize = 5;
const unitSegment= tickSpacing;


function drawCoordinatePlane() {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', originX);
    xAxis.setAttribute('y1', 0);
    xAxis.setAttribute('x2', originX);
    xAxis.setAttribute('y2', height);
    xAxis.setAttribute('stroke', 'black');
    svg.appendChild(xAxis);

    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', 0);
    yAxis.setAttribute('y1', originY);
    yAxis.setAttribute('x2', width);
    yAxis.setAttribute('y2', originY);
    yAxis.setAttribute('stroke', 'black');
    svg.appendChild(yAxis);

    const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xLabel.setAttribute('x', width - 15);
    xLabel.setAttribute('y', originY - 7);
    xLabel.setAttribute('font-size', '14');
    xLabel.textContent = 'x';
    svg.appendChild(xLabel);

    const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yLabel.setAttribute('x', originX + 7);
    yLabel.setAttribute('y', 15);
    yLabel.setAttribute('font-size', '14');
    yLabel.textContent = 'y';
    svg.appendChild(yLabel);

    for (let i = 50; i < width; i += tickSpacing) {
        const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick.setAttribute('x1', i);
        tick.setAttribute('y1', -tickSize + originY);
        tick.setAttribute('x2', i);
        tick.setAttribute('y2', tickSize + originY);
        tick.setAttribute('stroke', 'black');
        svg.appendChild(tick);

        const tickLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tickLabel.setAttribute('x', i - 1);
        tickLabel.setAttribute('y', originY - 10);
        tickLabel.setAttribute('font-size', '12');
        tickLabel.setAttribute('text-anchor', 'middle');

        let pointer = ((i - originX) / tickSpacing);
        if ((i - originX) === 0) {
            tickLabel.textContent = ``;
        } else if (Math.abs(pointer) !== 1 && (pointer % 2) * pointer === 0 && Math.abs(pointer / 2) !== 1) {
            tickLabel.textContent = `${pointer / 2}R`;
        } else if (pointer === -1 && (pointer / 2) % 2 * pointer === 0 || (pointer / 2) === -1) {
            tickLabel.textContent = `-R`;
        } else if (pointer === 1 && (pointer) % 2 * pointer === 0 || (pointer / 2) === 1){
            tickLabel.textContent = `R`;
        } else{
            if (Math.abs(pointer) !== 1){
                tickLabel.textContent = `${pointer}R/2`;
            } else if (pointer === -1) {
                tickLabel.textContent = `-R/2`;
            } else {
                tickLabel.textContent = `R/2`;
            }
        }
        svg.appendChild(tickLabel);
    }

    for (let i = height - 50; i > 0; i -= tickSpacing) {
        const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick.setAttribute('x1', -tickSize + originX);
        tick.setAttribute('y1', i);
        tick.setAttribute('x2', tickSize + originX);
        tick.setAttribute('y2', i);
        tick.setAttribute('stroke', 'black');
        svg.appendChild(tick);

        const tickLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tickLabel.setAttribute('x', 30 + originX);
        tickLabel.setAttribute('y', i + 3);
        tickLabel.setAttribute('font-size', '12');
        tickLabel.setAttribute('text-anchor', 'end');
        let pointer = ((i - originX) / tickSpacing);
        if ((i - originX) === 0) {
            tickLabel.textContent = ``;
        } else if (Math.abs(pointer) !== 1 && (pointer % 2) * pointer === 0 && Math.abs(pointer / 2) !== 1) {
            tickLabel.textContent = `${pointer / 2}R`;
        } else if (pointer === -1 && (pointer / 2) % 2 * pointer === 0 || (pointer / 2) === -1) {
            tickLabel.textContent = `R`;
        } else if (pointer === 1 && (pointer) % 2 * pointer === 0 || (pointer / 2) === 1){
            tickLabel.textContent = `-R`;
        } else{
            if (Math.abs(pointer) !== 1){
                tickLabel.textContent = `${pointer}R/2`;
            } else if (pointer === -1) {
                tickLabel.textContent = `R/2`;
            } else {
                tickLabel.textContent = `-R/2`;
            }
        }
        svg.appendChild(tickLabel);
    }
}

function drawTriangleX(x1, y1, x2, y2, x3, y3) {
    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    triangle.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    triangle.setAttribute('fill', 'black');
    svg.appendChild(triangle)
}

function drawTriangleY(x1, y1, x2, y2, x3, y3) {
    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    triangle.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    triangle.setAttribute('fill', 'black');
    svg.appendChild(triangle)
}

function drawTriangle(x1, y1, x2, y2, x3, y3) {
    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    triangle.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    triangle.setAttribute('fill', 'yellow');
    triangle.setAttribute("fill-opacity", 0.5)
    svg.appendChild(triangle)
}

function drawRectangle(x, y, width, height) {
    const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectangle.setAttribute('x', x);
    rectangle.setAttribute('y', y);
    rectangle.setAttribute('width', width);
    rectangle.setAttribute('height', height);
    rectangle.setAttribute('fill', 'red');
    rectangle.setAttribute("fill-opacity", 0.5)
    svg.appendChild(rectangle);
}

function drawEllipse(values) {
    const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    ellipse.setAttribute('d', values);
    ellipse.setAttribute('fill', 'blue');
    ellipse.setAttribute("fill-opacity", 0.5)
    svg.appendChild(ellipse);
}

drawCoordinatePlane();
drawTriangleX(width, originY, width - 5, originY - 5, width - 5, originY + 5);
drawTriangleY(originX, 0, originX - 5, 5, originX + 5, 5);

drawTriangle(originX, originY, originX - unitSegment, originY, originX, originY - 2*unitSegment);
drawRectangle(originX, originY, unitSegment, 2*unitSegment);
drawEllipse(`M ${originX-unitSegment} ${originY} A ${unitSegment} ${unitSegment} 0 0 0 ${originX} ${originY + unitSegment} L ${originX} ${originY} Z`);