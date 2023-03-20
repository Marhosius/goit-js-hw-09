import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtnEl = document.querySelector('[data-start]');
const daysInfoEl = document.querySelector('[data-days]');
const hoursInfoEl = document.querySelector('[data-hours]');
const minutesInfoEl = document.querySelector('[data-minutes]');
const secondsInfoEl = document.querySelector('[data-seconds]');
startBtnEl.disabled = true;

let timerId = null;
let timeMs = null;
startBtnEl.addEventListener(`click`, onStartActTimer);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates, dateStr, instance) {
        clearInterval(timerId);

        if (selectedDates[0] - instance.now <= 0) {
            Notiflix.Notify.failure("Please choose a date in the future");
            startBtnEl.disabled = true;
            return
        }

        timeMs = selectedDates[0].getTime();
        startBtnEl.disabled = false;
        return
    },
};
let calendar = flatpickr(`input#datetime-picker`, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};


function addLeadingZero(value) {
    if (value.toString().length < 2) {
        return value.toString().padStart(2, "0");
    }
    return value.toString();
};

function onStartActTimer() {
    let timeNow = Date.now();
    timeMs = timeMs - timeNow;
    startBtnEl.disabled = true;

    timerId = setInterval(() => {
        let timer = convertMs(timeMs -= 1000);
        daysInfoEl.textContent = addLeadingZero(timer.days);
        hoursInfoEl.textContent = addLeadingZero(timer.hours);
        minutesInfoEl.textContent = addLeadingZero(timer.minutes);
        secondsInfoEl.textContent = addLeadingZero(timer.seconds);
        if (timeMs <= 999) {
            clearInterval(timerId);
            Notiflix.Notify.info("СЛАВА");
            Notiflix.Notify.warning("УКРАЇНІ");
        }

    }, 1000);
};




