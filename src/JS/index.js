import {
  dialogAgreeBtn,
  dialogCloseIcon,
  dialogDisagreeBtn,
  hideDialog,
  showDialog,
} from "./modules/dialog.js";
import { Timer } from "./modules/timerClass.js";

// HTML Elements
const HOURS = document.querySelector("#inputsHours");
const MINUTES = document.querySelector("#inputsMinutes");
const SECONDS = document.querySelector("#inputsSeconds");
const START_BUTTON = document.querySelector("#start");
const STOP_BUTTON = document.querySelector("#stop");

let timer, notifPerm;

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

  // Ask for permission to display notifications when user has not
  // agreed or denied
  if (Notification.permission === "default") {
    showDialog();
    dialogAgreeBtn.addEventListener("click", () => {
      notifPerm = Notification.requestPermission();
      hideDialog();
      timer = new Timer(userHours, userMinutes, userSeconds);
      timer.start();
    });
    dialogDisagreeBtn.addEventListener("click", () => {
      hideDialog();
      timer = new Timer(userHours, userMinutes, userSeconds);
      timer.start();
    });
    dialogCloseIcon.addEventListener("click", hideDialog);
  } else {
    // Initalize class and start timer
    timer = new Timer(userHours, userMinutes, userSeconds);
    timer.start();
  }
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

STOP_BUTTON.addEventListener("click", function () {
  timer.stop();
  timer._finish();
});

export { notifPerm };
