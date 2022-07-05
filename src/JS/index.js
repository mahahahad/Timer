// HTML Elements
const HOURS = document.querySelector("#inputsHours");
const MINUTES = document.querySelector("#inputsMinutes");
const SECONDS = document.querySelector("#inputsSeconds");
const START_BUTTON = document.querySelector("#start");
const TIMER = document.querySelector("#timer");
const TIMER_HOURS = document.querySelector("#timerHours");
const TIMER_MINUTES = document.querySelector("#timerMinutes");
const TIMER_SECONDS = document.querySelector("#timerSeconds");

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
    this.#display();

    // Set interval to decrease time every second
    this.interval = setInterval(() => {
      this.#timeDecrease();
    }, 1000);
    TIMER.style.display = "flex";
  }

  stop() {
    // Initialize everything
    // Clear interval and set remaining seconds to 0
    if (this.interval) clearInterval(this.interval);
    this.remainingSeconds = 0;
    document.title = "Timer";
  }

  #finish() {
    // Initialize timer section
    TIMER.style.display = "none";
    TIMER_HOURS.classList.remove("inactive");
    TIMER_MINUTES.classList.remove("inactive");
    TIMER_SECONDS.classList.remove("inactive");

    // Display notification
    alert("Your time has finished.");
  }

  #timeDecrease() {
    // Decrease seconds by 1 every second
    // if they aren't over
    if (this.remainingSeconds === 0) {
      this.stop();
      this.#finish();
    } else {
      this.remainingSeconds -= 1;
      // Update interface after decreasing
      this.#display();
    }
  }

  #display() {
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

function timerStart() {
  let userHours = parseInt(HOURS.value);
  let userMinutes = parseInt(MINUTES.value);
  let userSeconds = parseInt(SECONDS.value);

  // Error on no values
  if (!userHours) userHours = 0;
  if (!userMinutes) userMinutes = 0;
  if (!userSeconds) userSeconds = 0;
  if (userHours === 0 && userMinutes === 0 && userSeconds === 0) {
    alert("Please enter at least one value");
    return;
  }

  // Error on negative numbers
  if (userHours < 0 || userMinutes < 0 || userSeconds < 0) {
    alert("Please enter positive numbers only");
    return;
  }

  // Initalize class and start timer
  new Timer(userHours, userMinutes, userSeconds).start();
}

// Start on user input
START_BUTTON.addEventListener("click", timerStart);
HOURS.addEventListener("keydown", (e) => {
  if (e.key === "Enter") timerStart();
});
MINUTES.addEventListener("keydown", (e) => {
  if (e.key === "Enter") timerStart();
});
SECONDS.addEventListener("keydown", (e) => {
  if (e.key === "Enter") timerStart();
});
