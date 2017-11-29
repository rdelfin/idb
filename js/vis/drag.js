// @flow
const throttle = require('throttle-debounce/throttle');
let dx = 0;
let dy = 0;
let lastX;
let lastY;

const vis = document.getElementById('vis');
const cont = document.getElementById('vis-container');
cont.addEventListener('dragstart', e => {
  lastX = e.clientX;
  lastY = e.clientY;
  const div = document.createElement('div');
  e.dataTransfer.setDragImage(div, 0, 0);
});
cont.addEventListener('drag', e => {
  dx -= e.clientX - lastX;
  dy -= e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  throttledReposition();
});
cont.addEventListener('dragover', e => {
  e.preventDefault();
});

function reposition() {
  vis.setAttribute('viewBox', `${dx} ${dy} ${window.innerWidth} ${window.innerHeight}`);
}

const throttledReposition = throttle(20, reposition);

window.addEventListener('resize', throttledReposition);
