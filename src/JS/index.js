// HTML Elements
const HOURS = document.querySelector("#hours");
const MINUTES = document.querySelector("#minutes");
const SECONDS = document.querySelector("#seconds");
const START_BUTTON = document.querySelector("#start");
const TIMER_DISPLAY = document.querySelector("#timer");

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
  }

  #finish() {
    alert("Your time has finished.");
  }

  #timeDecrease() {
    // Update Interface Every Second
    // this.remainingSeconds -= 1;

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
    TIMER_DISPLAY.textContent = result;
  }
}

// Initial Function
START_BUTTON.onclick = function () {
  userHours = HOURS.value;
  userMinutes = MINUTES.value;
  userSeconds = SECONDS.value;

  // Input Validation
  if (!userHours) userHours = 0;
  if (!userMinutes) userMinutes = 0;
  if (!userSeconds) userSeconds = 0;

  let timer = new Timer(userHours, userMinutes, userSeconds);
  timer.start();
};
