

///

function hidePreloader() {
  var loader = document.getElementById("preloader");
  loader.style.display = "none";
}
window.addEventListener("load", function () {
  hidePreloader();
});

///

function removeFocus() {
  document.activeElement.blur();
}

///

