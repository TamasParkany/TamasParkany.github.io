const morseContainer = document.getElementById("morse__container");
const morseInput = document.getElementById("morse__input");
const short = document.getElementById("morse__short");
const long = document.getElementById("morse__long");

short.addEventListener("click", updateInput);
long.addEventListener("click", updateInput);
morseContainer.addEventListener("dblclick", saveMorseMouse);
morseContainer.addEventListener("touchstart", saveMorseTouch);

function updateInput(e) {
  if (morseInput.value.length < 5) {
    morseInput.value += e.target.dataset["morse"];
  }
}

function saveMorseMouse() {
  if (morseInput.value.length < 5) {
    morseInput.value = "";
    morseInput.setAttribute("placeholder", "Too short");
  }
  if (morseInput.value.length == 5 && !/[ETet]{5}/.test(morseInput.value)) {
    morseInput.value = "";
    morseInput.setAttribute("placeholder", "Bad form");
  }
  if (morseInput.value.length == 5 && /[ETet]{5}/.test(morseInput.value)) {
    localStorage.setItem("eidolon_morse", `${morseInput.value.toUpperCase()}`);
    morseInput.value = "";
    morseInput.setAttribute("placeholder", "Saved ✔️");
  }
}

let tapped = false;

function saveMorseTouch(e) {
  if (!tapped) {
    tapped = setTimeout(function () {
      tapped = null;
      //insert things you want to do when single tapped
    }, 400); //wait 400ms then run single click code
  } else {
    clearTimeout(tapped); //stop single tap callback
    tapped = null;
    if (morseInput.value.length < 5) {
      morseInput.value = "";
      morseInput.setAttribute("placeholder", "Too short");
    }
    if (morseInput.value.length == 5 && !/[ETet]{5}/.test(morseInput.value)) {
      morseInput.value = "";
      morseInput.setAttribute("placeholder", "Bad form");
    }
    if (morseInput.value.length == 5 && /[ETet]{5}/.test(morseInput.value)) {
      localStorage.setItem(
        "eidolon_morse",
        `${morseInput.value.toUpperCase()}`
      );
      morseInput.value = "";
      morseInput.setAttribute("placeholder", "Saved ✔️");
    }
  }
}
