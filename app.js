const canvas = document.getElementById('jsCanvas')
var ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('range');
const mode = document.getElementById('jsMode')


const CANVAS_SIZE = 700;
const INITIAL_COLOR = 'black';

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;


const stopPainting  = () => painting = false;
const startPainting = () => painting = true;


const onMouseMove = (event) => {

    x = event.offsetX;
    y = event.offsetY;

        if(!painting) {

            ctx.beginPath();
            ctx.moveTo(x,y);
        } else {

            ctx.lineTo(x,y);
            ctx.stroke();
        }

}

const onMouseDown = (event) => {

    if (!filling) {

        painting = true;
    }
    
}

const handleColorClick = (event) => {

    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

const handleRangeChange = (event) => {

    const rangeValue = event.target.value;
    ctx.lineWidth =  rangeValue;
}


const handleModeChange = () => {

    if (filling === true) {

        filling = false;
        mode.innerText = 'drawing';

    } else {

        filling = true;
        mode.innerText = 'filling';
    }

}

const handleFillingClick = () => {

    if (filling) {

        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

if (canvas) {

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleFillingClick)
}



Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick)); 



if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {

    mode.addEventListener('click', handleModeChange);
}