const heightDisplay = document.getElementById("height__display");
const directionDisplay = document.getElementById("direction__display");
const notificationType = document.getElementById("notification__type");
const notificationInfo = document.getElementById("notification__info");
const parts = document.getElementById("parts");

window.addEventListener("click", click);

let i = 0;
let j = 0;
let data = null;

fetch("./ammo.json")
  .then((response) => response.json())
  .then((result) => (data = result));

function click() {
  if (i == data.length - 1) {
    window.removeEventListener("click", click);
    heightDisplay.innerText = "";
    directionDisplay.innerText = "END";
    notificationType.innerHTML = `<button onclick="window.location='../index.html'" style="width:100px;height:50px;">Return</button>`;
    notificationInfo.innerText = "There are no more Ammo Boxes";
    return;
  }

  if (j < data[i]["direction"].length - 1) {
    j++;
    updatePoints();
  } else if (j == data[i]["direction"].length - 1) {
    i++;
    j = 0;
    deletePoints();
    if (data[i]["direction"].length > 1) {
      createPoints();
    }
  }

  heightDisplay.innerText = data[i]["height"];
  directionDisplay.innerText = data[i]["direction"][j];
  notificationType.innerText = data[i]["type"];
  notificationInfo.innerText = data[i]["info"];
}

function updatePoints() {
  let points = document.querySelectorAll(".part");
  points[j].style.backgroundColor = "#33A1DE";
}

function deletePoints() {
  let points = document.querySelectorAll(".part");
  points.forEach((point) => point.remove());
}

function createPoints() {
  for (let z = 0; z < data[i]["direction"].length; z++) {
    let part = document.createElement("div");
    part.classList.add(`part`);
    part.setAttribute(
      "style",
      "background-color:#D6331D;width:20px;height:20px;border-radius:50%;"
    );
    parts.appendChild(part);
  }

  let points = document.querySelectorAll(".part");
  points[0].style.backgroundColor = "#33A1DE";
}
