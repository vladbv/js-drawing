window.addEventListener('load', () =>  {
resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousedown', startPaint);
    window.addEventListener('mouseup', stopPaint);
    window.addEventListener('mousemove', sketch);
});

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const resize = () => {
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

}; 

let crd = {
    x: 0,
    y: 0,
}
let paint = false;

const getPosition = (e) =>  {
crd.x = e.clientX - canvas.offsetLeft;

crd.y = e.clientY - canvas.offsetTop;
}

const startPaint = (e) => {
     paint = true;
getPosition(e);
}

const stopPaint = () => {
    paint = false;
};

let lineWidth = 5;
let colour = "black";
const sketch = (e) => {
  if (paint) {
    ctx.beginPath();

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = colour;

    ctx.moveTo(crd.x, crd.y);
    getPosition(e);
    ctx.lineTo(crd.x, crd.y);

    ctx.stroke();
  }
};

const colours = document.querySelectorAll('.sidebar-colours .colour');

colours.forEach( (singleColour) => {
singleColour.addEventListener('click', () => {
colour = singleColour.getAttribute('colour');
});
});

const tools = document.querySelectorAll('.tools .tool');
tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    console.log(true);
    switch (tool.getAttribute("tool")) {
      case "pencil":
        lineWidth = 5;
        colour = "black";
        break;
      case "clear":
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineWidth = 5;
        colour = "black";
        break;
      case "eraser":
        lineWidth = 20;
        colour = "white";
        break;
      default:
        lineWidth = 5;
        colour = "black";
    }
  });
});
