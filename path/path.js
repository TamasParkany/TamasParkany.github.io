const heightDisplay = document.getElementById('height__display');
const directionDisplay = document.getElementById('direction__display');
const notificationDisplay = document.getElementById('notification__display');

window.addEventListener('click', click)

const height = [5, 10, 20, 30, 40];
const direction = ['S', 'S', 'R', 'L', 'L'];
const notification = [];

let i = 0;

function click() {
    increment();
    updateDisplay();
}

function increment() {
    i++;
}

function updateDisplay() {
    heightDisplay.innerText = `${height[i]}m`;
    directionDisplay.innerText = direction[i];
    notificationDisplay.innerText = notification[i];
}