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

/* Optional background music.
   "Background Music (Atmospheric Melodic House)" by GiorgioVitté, Pixabay Content License.
   https://pixabay.com/music/edm-background-music-atmospheric-melodic-house-472109/
   Sound stays off until a tap. A saved "on" is not resumed on the next visit. */
(function () {
  var STORAGE_KEY = "signstimator-music";
  var TRACK_SRC = "assets/background-music.mp3";
  var MAX_VOLUME = 0.2;
  var TARGET_VOLUME = 0.15;
  var FADE_SECONDS = 2.5;

  var audio = document.createElement("audio");
  audio.className = "music-audio";
  audio.preload = "none";
  audio.loop = true;
  audio.volume = 1;
  audio.setAttribute("preload", "none");
  audio.setAttribute("playsinline", "");
  audio.setAttribute("webkit-playsinline", "");
  audio.setAttribute("aria-hidden", "true");
  audio.src = TRACK_SRC;

  var button = document.createElement("button");
  button.type = "button";
  button.className = "music-toggle";
  button.innerHTML =
    '<svg class="icon-off" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M11 5 6.5 9H3v6h3.5L11 19V5z"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M22 9l-6 6M16 9l6 6"/>' +
    "</svg>" +
    '<svg class="icon-on" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M11 5 6.5 9H3v6h3.5L11 19V5z"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M15.5 9.5a3.5 3.5 0 0 1 0 5"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M18 7a7 7 0 0 1 0 10"/>' +
    "</svg>";

  var audioCtx = null;
  var gainNode = null;
  var wantsSound = false;
  var wantFade = false;

  function clampVolume(value) {
    if (value < 0) return 0;
    if (value > MAX_VOLUME) return MAX_VOLUME;
    return value;
  }

  function remember(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (err) {}
  }

  function setPressed(isOn) {
    button.setAttribute("aria-pressed", isOn ? "true" : "false");
    button.setAttribute("aria-label", isOn ? "Pause background music" : "Play background music");
  }

  function silence() {
    if (!gainNode || !audioCtx) return;
    var now = audioCtx.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0, now);
  }

  function startFade() {
    if (!gainNode || !audioCtx) return;
    var level = clampVolume(TARGET_VOLUME);
    var now = audioCtx.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(level, now + FADE_SECONDS);
  }

  function fadeWithElementVolume() {
    var level = clampVolume(TARGET_VOLUME);
    var start = performance.now();
    var ms = FADE_SECONDS * 1000;
    audio.volume = 0;
    function step(now) {
      if (!wantsSound) {
        audio.volume = 0;
        return;
      }
      var t = (now - start) / ms;
      if (t >= 1) {
        audio.volume = level;
        return;
      }
      audio.volume = clampVolume(level * t);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function ensureGraph() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try {
      if (!audioCtx) {
        var ctx = new AC();
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        var source = ctx.createMediaElementSource(audio);
        source.connect(gain);
        gain.connect(ctx.destination);
        audioCtx = ctx;
        gainNode = gain;
      }
      if (audioCtx.state === "suspended") {
        var resumed = audioCtx.resume();
        if (resumed && resumed.catch) resumed.catch(function () {});
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  function pauseMusic() {
    wantsSound = false;
    wantFade = false;
    silence();
    if (!gainNode) audio.volume = 0;
    audio.pause();
    setPressed(false);
    remember("off");
  }

  function playMusic() {
    wantsSound = true;
    wantFade = true;
    setPressed(true);
    var wired = ensureGraph();
    if (wired) silence();
    else fadeWithElementVolume();
    var pending = audio.play();
    if (pending && pending.then) {
      pending.then(function () {
        if (!wantsSound) return;
        remember("on");
      }).catch(function () {
        wantsSound = false;
        wantFade = false;
        silence();
        setPressed(false);
      });
      return;
    }
    remember("on");
  }

  audio.addEventListener("playing", function () {
    if (!wantsSound) {
      audio.pause();
      return;
    }
    if (wantFade && gainNode) {
      wantFade = false;
      startFade();
    }
  });

  audio.addEventListener("error", function () {
    wantsSound = false;
    wantFade = false;
    setPressed(false);
  });

  button.addEventListener("click", function () {
    if (wantsSound) pauseMusic();
    else playMusic();
  });

  /* Never autoplay. The icon matches whether this page is actually playing.
     A stored "off" stays off; a stored "on" is not started until the next tap. */
  setPressed(false);
  document.body.appendChild(audio);
  document.body.appendChild(button);
})();
