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

`js/site.js` sets `APP_STORE_URL` to the Signstimator 1.0 listing, `https://apps.apple.com/app/id6818383304`. Every `[data-app-store]` link uses that constant and opens in a new tab.

The download image is Apple’s official “Download on the App Store” badge (`assets/app-store-badge.svg`), unmodified. It is the white badge because the page background is dark. On screen it is 48px tall, with at least one-quarter of that height kept clear around it.

## Brand assets

- `assets/logo.webp` and `assets/logo.jpg` — vinyl-roll mark, 640×640
- `assets/app-store-badge.svg` — official App Store badge
- `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`

## Privacy note

The policy keeps the previous legal wording. The photo-library section is updated so it matches the app: the photo library is used only to choose a company logo, and the app does not request the camera or the microphone.
