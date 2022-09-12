// Code containing the main timer class

import { notifPerm } from "../index.js";

const TIMER = document.querySelector("#timer");
const TIMER_HOURS = document.querySelector("#timerHours");
const TIMER_MINUTES = document.querySelector("#timerMinutes");
const TIMER_SECONDS = document.querySelector("#timerSeconds");
const LANDING_PAGE = document.querySelector(".landing");
class Timer {
  constructor(hours, minutes, seconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.stop();
  }

  start() {
    // Convert user time to seconds

    // This makes remainingSeconds -1 possible instead of the tedious
    // hours, minutes, seconds logic you'd have to do
    // without it.
    this.remainingSeconds =
      this.hours * 3600 + this.minutes * 60 + this.seconds;

    // Update interface first time immediately on button click
    this._display();

    // Set interval to decrease time every second
    this.interval = setInterval(() => {
      this._timeDecrease();
    }, 1000);
    TIMER.style.display = "flex";
    LANDING_PAGE.style.display = "none";

    // Make stop button keyboard focusable
    // STOP_BUTTON.tabIndex = "0";
  }

  stop() {
    // Initialize everything
    // Clear interval and set remaining seconds to 0
    if (this.interval) clearInterval(this.interval);
    this.remainingSeconds = 0;
    document.title = "Timer";
    // STOP_BUTTON.tabIndex = "-1";
    LANDING_PAGE.style.display = "flex";
    TIMER.style.display = "none";
  }

  _finish() {
    // Initialize timer section
    TIMER.classList.remove("visible");
    TIMER_HOURS.classList.remove("inactive");
    TIMER_MINUTES.classList.remove("inactive");
    TIMER_SECONDS.classList.remove("inactive");

    let finishMessage = "Your time has finished!";
    // Display notification
    if (Notification.permission === "granted") {
      new Notification(finishMessage);
    } else {
      alert(finishMessage);
    }
  }

  _timeDecrease() {
    // Decrease seconds by 1 every second
    // if they aren't over
    if (this.remainingSeconds === 0) {
      this.stop();
      this._finish();
    } else {
      this.remainingSeconds -= 1;
      // Update interface after decreasing
      this._display();
    }
  }

  _display() {
    let divisionResult = this.remainingSeconds / 3600;

    // This helps if user puts more value in minutes or seconds
    this.hours = Math.floor(divisionResult);
    this.minutes = Math.floor((divisionResult % 1) * 60);
    this.seconds = Math.round((((divisionResult % 1) * 60) % 1) * 60);

    // If not being used, dim the element
    if (this.hours === 0) TIMER_HOURS.classList.add("inactive");
    if (this.hours === 0 && this.minutes === 0)
      TIMER_MINUTES.classList.add("inactive");
    if (this.hours === 0 && this.minutes === 0 && this.seconds === 0)
      TIMER_SECONDS.classList.add("inactive");

    // Update document title every second
    let result = `${this.hours.toString().padStart(2, "0")}:${this.minutes
      .toString()
      .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
    document.title = result;

    // Append to DOM with leading zeros
    TIMER_HOURS.textContent = this.hours.toString().padStart(2, "0");
    TIMER_MINUTES.textContent = this.minutes.toString().padStart(2, "0");
    TIMER_SECONDS.textContent = this.seconds.toString().padStart(2, "0");
  }
}

export { Timer };
