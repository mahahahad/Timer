// HTML Elements
const HOURS = document.querySelector("#inputsHours");
const MINUTES = document.querySelector("#inputsMinutes");
const SECONDS = document.querySelector("#inputsSeconds");
const START_BUTTON = document.querySelector("#start");
const TIMER = document.querySelector("#timer");
const TIMER_HOURS = document.querySelector("#timerHours");
const TIMER_MINUTES = document.querySelector("#timerMinutes");
const TIMER_SECONDS = document.querySelector("#timerSeconds");

// File Variables
let userHours, userMinutes, userSeconds;

class Timer {
  constructor(hours, minutes, seconds) {
    this.hours = parseInt(hours);
    this.minutes = parseInt(minutes);
    this.seconds = parseInt(seconds);
    this.stop();
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.remainingSeconds = 0;
    document.title = "Timer";
  }

  #finish() {
    TIMER.style.display = "none";
    alert("Your time has finished.");
  }

  #timeDecrease() {
    if (this.remainingSeconds === 0) {
      this.stop();
      this.#finish();
    } else {
      this.remainingSeconds -= 1;
      this.#display();
    }
  }

  start() {
    this.remainingSeconds =
      this.hours * 3600 + this.minutes * 60 + this.seconds;
    this.interval = setInterval(() => {
      this.#timeDecrease();
    }, 1000);
    TIMER.style.display = "flex";
  }

  #display() {
    let divisionResult = this.remainingSeconds / 3600;
    let hours = Math.floor(divisionResult).toString().padStart(2, "0");
    let minutes = Math.floor((divisionResult % 1) * 60)
      .toString()
      .padStart(2, "0");
    let seconds = Math.round((((divisionResult % 1) * 60) % 1) * 60)
      .toString()
      .padStart(2, "0");
    let result = `${hours}:${minutes}:${seconds}`;
    document.title = result;
    if (hours === "00") TIMER_HOURS.classList.add("inactive");
    if (minutes === "00") TIMER_MINUTES.classList.add("inactive");
    TIMER_HOURS.textContent = hours;
    TIMER_MINUTES.textContent = minutes;
    TIMER_SECONDS.textContent = seconds;
  }
}

START_BUTTON.onclick = function () {
  userHours = HOURS.value;
  userMinutes = MINUTES.value;
  userSeconds = SECONDS.value;

  if (!userHours) userHours = 0;
  if (!userMinutes) userMinutes = 0;
  if (!userSeconds) userSeconds = 0;

  new Timer(userHours, userMinutes, userSeconds).start();
};
