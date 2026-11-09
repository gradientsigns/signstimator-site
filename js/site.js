/* =============================================================================
 * TODO: Replace APP_STORE_URL with the real App Store listing URL.
 * Leave this as an empty string until the listing exists. Do not invent a URL.
 *
 * Example (not a real listing):
 *   const APP_STORE_URL = "https://apps.apple.com/app/id0000000000";
 * ============================================================================= */
const APP_STORE_URL = "";

(function () {
  var links = document.querySelectorAll("[data-app-store]");
  var note = document.querySelector("[data-store-note]");

  if (APP_STORE_URL) {
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", APP_STORE_URL);
      links[i].removeAttribute("aria-disabled");
    }
    if (note) {
      note.textContent = "Opens the Signstimator listing on the App Store.";
    }
    return;
  }

  for (var j = 0; j < links.length; j++) {
    links[j].setAttribute("aria-disabled", "true");
    links[j].addEventListener("click", function (event) {
      event.preventDefault();
    });
  }
})();
