document.addEventListener("DOMContentLoaded", function () {
  const attachmentIcon = document.querySelector(".icon1");

  if (attachmentIcon) {
    attachmentIcon.addEventListener("mouseenter", handleIconHover);
    attachmentIcon.addEventListener("mouseleave", handleIconLeave);
  }

  function handleIconHover() {
    const background = document.querySelector(".background");
    if (background) {
      background.style.marginLeft = "calc(100% - 310px)";
    }
  }

  function handleIconLeave() {
    const background = document.querySelector(".background");
    if (background) {
      background.style.marginLeft = "calc(100% - 300px)";
    }
  }
});

const nav = document.querySelector(".nav");
if (nav) {
  nav.style.backgroundColor = "red";
}
