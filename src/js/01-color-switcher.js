
const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');

let fancyInterval = null;

const startBtnListener = startBtnEl.addEventListener("click", onClickStartFancy);
const stopBtnListener = stopBtnEl.addEventListener("click", onClickStopFancy);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onClickStartFancy() {
    startBtnEl.disabled = true;
    bodyEl.style.backgroundColor = `${getRandomHexColor()}`;

    fancyInterval = setInterval(() => {
        bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);

};

function onClickStopFancy() {
    startBtnEl.disabled = false;
    clearInterval(fancyInterval);
};



