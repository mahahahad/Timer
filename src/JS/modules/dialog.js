// Dialog to request permission to show notifications
const dialogWrapperEl = document.querySelector("#dialogWrapper");
const dialogEl = document.querySelector("#dialog");
const dialogDisagreeBtn = document.querySelector("#disagreeBtn");
const dialogAgreeBtn = dialogEl.querySelector("#agreeBtn");
const dialogCloseIcon = dialogEl.querySelector("#dialogCloseIcon");

function showDialog() {
  dialogWrapperEl.classList.toggle("hidden");

  // Display the dialog 10ms after wrapper is made visible
  setTimeout(() => {
    dialogWrapperEl.style.opacity = 1;
    dialogEl.style.transform = "initial";
    dialogEl.style.opacity = 1;
  }, 10);
}
function hideDialog(response = null) {
  if (response == true) {
    showSnackbar("You agreed to the T&Cs.");
  } else {
    showSnackbar("You didn't agree to the T&Cs. ;(");
  }

  dialogWrapperEl.style.opacity = 0;
  dialogEl.style.transform = "translateY(10px)";
  dialogEl.style.opacity = 0;

  // Wait till animation is over to hide the wrapper
  setTimeout(() => {
    dialogWrapperEl.classList.toggle("hidden");
  }, 150);
}

openDialogBtn.addEventListener("click", showDialog);
dialogAgreeBtn.addEventListener("click", () => {
  hideDialog(true);
});
dialogDisagreeBtn.addEventListener("click", () => {
  hideDialog(false);
});
dialogCloseIcon.addEventListener("click", hideDialog);
