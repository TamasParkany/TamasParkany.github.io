const heightDisplay = document.getElementById("height__display");
const directionDisplay = document.getElementById("direction__display");
const notificationType = document.getElementById("notification__type");
const notificationInfo = document.getElementById("notification__info");
const parts = document.getElementById("parts");

let hasTouchScreen = false;

if ("maxTouchPoints" in navigator) {
  hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
  hasTouchScreen = navigator.msMaxTouchPoints > 0;
} else {
  let mQ = window.matchMedia && matchMedia("(pointer:coarse)");
  if (mQ && mQ.media === "(pointer:coarse)") {
    hasTouchScreen = !!mQ.matches;
  } else if ("orientation" in window) {
    hasTouchScreen = true; // deprecated, but good fallback
  } else {
    // Only as a last resort, fall back to user agent sniffing
    let UA = navigator.userAgent;
    hasTouchScreen =
      /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
      /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
  }
}

if (hasTouchScreen) {
  window.addEventListener("touchstart", click);
} else {
  window.addEventListener("click", click);
}

document.addEventListener("DOMContentLoaded", fetchData);

let i = 0;
let j = 0;
let data = null;
let morse = localStorage.getItem("eidolon_morse");

function fetchData() {
  fetch("./path.json")
    .then((response) => response.json())
    .then((json) => updateData(json));
}

function updateData(json) {
  if (morse) {
    json[295]["direction"] = calculatePath();
    data = json;
  } else {
    data = json;
  }
}

function click() {
  if (i == data.length - 1) {
    if (hasTouchScreen) {
      window.removeEventListener("touchstart", click);
    } else {
      window.removeEventListener("click", click);
    }
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

function calculatePath() {
  let prev = null;
  let path = morse.split("");

  let resolved = path.map((curr) => {
    switch (true) {
      //first
      case prev == null && curr == "E":
        prev = "E";
        return "L";
      case prev == null && curr == "T":
        prev = "T";
        return "R";
      //left
      case prev == "E" && curr == "E":
        prev = "E";
        return "L";
      case prev == "T" && curr == "T":
        prev = "T";
        return "L";
      //right
      case prev != "E" && curr == "E":
        prev = "E";
        return "R";
      case prev != "T" && curr == "T":
        prev = "T";
        return "R";
    }
  });
  return resolved;
}
