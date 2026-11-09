/* The live Signstimator 1.0 listing. Download links read this constant. */
const APP_STORE_URL = "https://apps.apple.com/app/id6818383304";

(function () {
  var links = document.querySelectorAll("[data-app-store]");
  var note = document.querySelector("[data-store-note]");

  if (!APP_STORE_URL) {
    for (var j = 0; j < links.length; j++) {
      links[j].setAttribute("aria-disabled", "true");
      links[j].addEventListener("click", function (event) {
        event.preventDefault();
      });
    }
    return;
  }

  for (var i = 0; i < links.length; i++) {
    links[i].setAttribute("href", APP_STORE_URL);
    links[i].setAttribute("target", "_blank");
    links[i].setAttribute("rel", "noopener noreferrer");
    links[i].removeAttribute("aria-disabled");
  }
  if (note) {
    note.textContent = "Opens the Signstimator listing on the App Store.";
  }
})();
