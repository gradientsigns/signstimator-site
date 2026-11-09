# Signstimator

Marketing site for Signstimator, an iOS app for sign-shop estimates. Static HTML and CSS, ready for GitHub Pages from the repository root.

## Pages

| File | URL path | Purpose |
| --- | --- | --- |
| `index.html` | `/` | Landing page |
| `privacy.html` | `/privacy.html` | Privacy policy. Keep this filename. The App Store listing uses `https://signstimator.com/privacy.html`. |
| `Support.html` | `/Support.html` | Support and the feedback form. The capital S matches the previous site. |

Links are relative (`privacy.html`, `Support.html`, `css/styles.css`, `assets/logo.webp`) so the same files work at `https://gradientsigns.github.io/signstimator-site/` and, later, at a root custom domain.

## GitHub Pages

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Branch: **main**. Folder: **/ (root)**.
4. Save.

`.nojekyll` is in the root so Pages serves every file as-is.

Do **not** add a `CNAME` file yet. `signstimator.com` is still attached to the previous repository’s Pages site. Add the domain here only after that attachment is removed.

## App Store link

`js/site.js` contains `APP_STORE_URL`. It is an empty string on purpose.

```js
// TODO: Replace APP_STORE_URL with the real App Store listing URL.
const APP_STORE_URL = "";
```

When the listing exists, set that constant to the real `https://apps.apple.com/...` URL. Until then the Download button stays a Coming Soon placeholder and does not point at a guessed address.

## Brand assets

- `assets/logo.webp` and `assets/logo.jpg` — vinyl-roll mark, 640×640
- `favicon.ico`, `favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png`

## Privacy note

The policy keeps the previous legal wording. The photo-library section is updated so it matches the app: the photo library is used only to choose a company logo, and the app does not request the camera or the microphone.
