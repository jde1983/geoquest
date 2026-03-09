# GeoQuest

Grade 5 Geography study app — built as a PWA hosted on GitHub Pages.

---

## Files

| File | What it does |
|---|---|
| `index.html` | The entire app. All code, styles, and logic live here. |
| `sw.js` | Service worker — handles offline caching. |
| `manifest.json` | PWA metadata — tells Safari it's an installable app. |
| `icon-192.png` | App icon (small) — included in this build. |
| `icon-512.png` | App icon (large) — included in this build. |

---

## Setup: GitHub Pages

1. Create a new GitHub repo named `geoquest` (or whatever name you prefer).
2. Upload all files to the repo root.
3. Go to **Settings → Pages** and set the source to the `main` branch, root folder.
4. GitHub will give you a URL like `https://yourusername.github.io/geoquest/`
5. Open that URL in Safari on her iPad once. After that it works offline.
6. In Safari, tap the Share button → "Add to Home Screen". Done.

---

## If you use a different repo name

There are **three places** to update the repo name — search for `geoquest` in each file:

- `index.html` — line near the top of the `<script>` section: `var BASE = '/geoquest/';`
- `sw.js` — line near the top: `var BASE = '/geoquest/';`
- `manifest.json` — `"start_url"` and `"scope"` fields

Change all three to match your repo name exactly.

---

## App icons

The app needs two PNG icon files: `icon-192.png` (192×192px) and `icon-512.png` (512×512px).  
These are used for the home screen icon on iPad.

A simple option: create a square image with a dark background (#0f0d0b) and the 🗺️ emoji centred. Export at both sizes. Free tools: Canva, Figma, or any image editor.

Without icons the app still works — the home screen icon will just be a screenshot placeholder.

---

## Phase status

| Phase | Status |
|---|---|
| 1 — Term 1 content written | ✅ Done |
| 2 — App shell + navigation + localStorage | ✅ Done |
| 3 — Study cards + keyword highlighting | ✅ Done |
| 4 — Quiz engine | ✅ Done |
| 4b — Quiz randomisation + content gap fixes | ✅ Done |
| 5 — XP + levelling system | ✅ Done |
| 6 — Interactive maps | ⏳ Next |
| 7 — Celebrations + Grand Quest complete | ⏳ Pending |
| 8 — Deploy + test on iPads | ⏳ Pending |
| 9 — Terms 2–4 content + units | ⏳ Pending |
