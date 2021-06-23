const heightDisplay = document.getElementById("height__display");
const directionDisplay = document.getElementById("direction__display");
const notificationType = document.getElementById("notification__type");
const notificationInfo = document.getElementById("notification__info");
const parts = document.getElementById("parts");

window.addEventListener("click", click);

let i = 0;
let j = 0;
let data = null;

fetch("./path.json")
  .then((response) => response.json())
  .then((result) => (data = result));

function click() {
  if (i == data.length - 1) {
    window.removeEventListener("click", click);
    heightDisplay.innerText = "";
    directionDisplay.innerText = "END";
    notificationType.innerHTML = `<button onclick="window.location='../index.html'" style="width:100px;height:50px;">Return</button>`;
    notificationInfo.innerText = "Congratulations Eidolon!";
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

  switch (data[i]["type"]) {
    case "Info":
      notificationType.innerHTML =
        '<img src="../images/info.gif" style="width: 64px" />';
      break;
    case "Warning":
      notificationType.innerHTML =
        '<img src="../images/warning.gif" style="width: 64px" />';
      break;
    case "Danger":
      notificationType.innerHTML =
        '<img src="../images/danger.gif" style="width: 64px" />';
      break;
    default:
      notificationType.innerText = "";
      break;
  }

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
