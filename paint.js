/**
 * Paint
 * the more modular version
 */

import {find, findAll, point} from './utils.js';
import store from './store.js';

const canvas = find('canvas');
const aside = find('aside');
const ctx = canvas.getContext('2d');

let lineColor = 'rgb(0, 0, 0)';
let lineWidth = 20;
let isDrawing = false;

function init() {
  canvas.addEventListener('touchstart', drawStart);
  canvas.addEventListener('touchmove', drawMove);
  canvas.addEventListener('touchend', drawStop);
  canvas.addEventListener('touchcancel', drawStop);

  canvas.addEventListener('mousedown', drawStart);
  canvas.addEventListener('mousemove', drawMove);
  canvas.addEventListener('mouseup', drawStop);
  canvas.addEventListener('mouseout', drawStop);

  find('.js-clear').addEventListener('click', store.clear);
  find('.js-save').addEventListener('click', store.save);
  find('.js-load').addEventListener('click', store.load);
  find('.js-download').addEventListener('click', store.download);

  resizeCanvas();
}

function resizeCanvas() {
	canvas.width = window.innerWidth - aside.style.width;
	canvas.height = window.innerHeight;
}

function drawStart(event) {
	isDrawing = true;
	const {x, y} = point(canvas, event);
	ctx.strokeStyle = lineColor;
	ctx.lineWidth = lineWidth;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function drawMove(event) {
	if (!isDrawing) {
		return;
	} // Stop function when mouse is not down
	const {x, y} = point(canvas, event);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function drawStop() {
	isDrawing = false;
}

// Window.addEventListener('resize', resizeCanvas)

// function redraw() {
//   saveBlob()
//   clear()
//   setTimeout(function() {
//     // loadBlob()
//     loadURL()
//   }, 1000)
// }

/**
 * Sidebar tools
 */

const brushDisplay = find('#brushDisplay div');
const brush = find('#brushSelector');
const colors = findAll('#colorSelector div');
const colorpicker = find('#colorpicker');

function setColor(color) {
  console.log({setColor: color});
  lineColor = color;
  brushDisplay.style.backgroundColor = color;
}

function setBrush(size) {
	brushDisplay.style.width = size + 'px';
	brushDisplay.style.height = size + 'px';
	lineWidth = size;
}

brush.addEventListener('input', () => setBrush(brush.value));

colorpicker.addEventListener('change', function () {
  setColor(this.value);
});

colors.forEach(color =>
  color.addEventListener('click', () => {
    setColor(color.style.backgroundColor);
  })
);

export default init;
