// Dialog to request permission to show notifications
const dialogWrapperEl = document.querySelector("#dialogWrapper");
const dialogEl = document.querySelector("#dialog");
const dialogDisagreeBtn = document.querySelector("#disagreeBtn");
const dialogAgreeBtn = dialogEl.querySelector("#agreeBtn");
const dialogCloseIcon = dialogEl.querySelector("#dialogCloseIcon");

function showDialog() {
  dialogWrapperEl.classList.remove("hidden");

  // Display the dialog 10ms after wrapper is made visible
  setTimeout(() => {
    dialogWrapperEl.style.opacity = 1;
    dialogEl.style.transform = "initial";
    dialogEl.style.opacity = 1;
  }, 10);
}
function hideDialog() {
  dialogWrapperEl.style.opacity = 0;
  dialogEl.style.transform = "translateY(10px)";
  dialogEl.style.opacity = 0;

  // Wait till animation is over to hide the wrapper
  setTimeout(() => {
    dialogWrapperEl.classList.add("hidden");
  }, 150);
}

dialogAgreeBtn.addEventListener("click", () => {
  hideDialog(true);
});
dialogDisagreeBtn.addEventListener("click", () => {
  hideDialog(false);
});
dialogCloseIcon.addEventListener("click", hideDialog);

export {
  showDialog,
  hideDialog,
  dialogAgreeBtn,
  dialogDisagreeBtn,
  dialogCloseIcon,
};
