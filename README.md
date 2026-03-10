# GeoQuest

A Progressive Web App (PWA) for Grade 5 Geography exam revision, aligned to the Platinum Social Sciences CAPS curriculum. Built for a Grade 5 AuDHD learner — no time limits, no failure states, warm readable surfaces, swipe navigation.

**Live URL:** https://jde1983.github.io/geoquest/
**Repo:** https://github.com/jde1983/geoquest

---

## What it is

A single-page study app with four themed worlds — one per school term — each containing units with study cards and a quiz. Term 1 is fully built and playable. Terms 2–4 are locked pending content development.

---

## File structure

```
geoquest/
├── index.html        ← Everything: HTML, CSS, JS, all content and quiz data
├── sw.js             ← Service worker (cache-first, offline after first load)
├── manifest.json     ← PWA manifest
├── icon-192.png      ← App icon (home screen, manifest)
├── icon-512.png      ← App icon (PWA install / splash)
├── images/           ← CC-licensed photos and maps (Phase 6)
│   ├── africa-capitals-map.png
│   ├── africa-oceans-map.png
│   ├── africa-on-world-political-map.png
│   ├── africa-physical-vs-political.png
│   ├── african-village.png
│   ├── cape-town.png
│   ├── compass-cardinal.png
│   ├── compass-rose-8pt.png
│   ├── congo-river-lake-victoria.jpg
│   ├── drakensberg.png
│   ├── equator-hemispheres.png
│   ├── landlocked-countries.png
│   ├── limpopo-river.jpg
│   ├── mount-kilimanjaro.png
│   ├── nile-river.png
│   ├── orange-river.png
│   ├── physical-vs-political.png
│   ├── sahara-dunes.png
│   ├── south-africa-border-countries.jpg
│   ├── south-africa-capitals.jpg
│   ├── southern-africa-zoom.png
│   ├── subsistence-farming.jpg
│   ├── victoria-falls.jpg
│   └── world-political-map.png
└── README.md
```

The entire app lives in `index.html`. No build tools, no frameworks, no dependencies beyond Nunito from Google Fonts CDN.

---

## Four Worlds

| World | Term | Theme | Status |
|-------|------|-------|--------|
| 🪄 The Marauder's Atlas | Term 1: Map Skills | Harry Potter — parchment, ink, magic cartography | ✅ Complete |
| 🐾 The Clan Territories | Term 2: Physical Features of SA | Warriors — territory borders, rivers, escarpment | 🔒 Locked |
| 🌌 The Pale Frontier | Term 3: Weather, Climate & Vegetation | Lightfall/Destiny — zones, atmosphere, biomes | 🔒 Locked |
| 💎 Wakanda Underground | Term 4: Minerals & Mining | Marvel/Wakanda — vibranium, underground, gems | 🔒 Locked |

Locked worlds display a greyed-out card with a 🔒 icon. They are non-interactive until content is added.

---

## Term 1 content — The Marauder's Atlas

| Unit | Topic | Cards | Quiz questions |
|------|-------|-------|----------------|
| Unit 1 | World map and compass directions | 8 | 10 |
| Unit 2 | Africa — our continent | 9 | 14 |
| Unit 3 | Physical map of Africa | 10 | 17 |
| Unit 4 | Images of Africa | 7 | 9 |

Each unit contains content cards, a memory hook card, a tap-to-reveal glossary card, and a quiz unlocked at the end of the deck.

### Study cards
- Swipe left/right (touch) + prev/next buttons
- Card count always visible ("Card 3 of 7")
- Keywords highlighted with `<mark>` (gold tint on parchment)
- Memory hook cards — visually distinct dark amber, one per unit
- Glossary card at end of each unit — tap to reveal definitions
- Quiz button appears only after all cards are viewed and the unit is not yet done

### Card photography (Phase 6)

24 info cards carry contextual photographs below the card text. One card shows two images side by side. Images are lazy-loaded, full card width, capped at 220px height (160px for paired images), with a small italic credit line. 4 abstract or technique cards were intentionally left without images.

All images are sourced from Wikimedia Commons under CC or public domain licences.

### Quiz
- Multiple choice, 4 options per question
- Questions shuffle on every attempt (Fisher-Yates on a copy of the array)
- Wrong answer: shake animation + correct answer highlighted green + banner
- Next question locked for 1.5s after a wrong answer
- Score summary shows every question with the correct answer listed
- XP on completion: +10 per correct, +20 bonus for perfect, +30 extra for first-attempt perfect
- One-and-done per session — completed units show best score, locked until Start Fresh

---

## XP and levelling

| Level | Title | XP required |
|-------|-------|-------------|
| 0 | Lost Traveller 🧭 | 0 |
| 1 | Scout 🗺️ | 50 |
| 2 | Ranger ⛺ | 120 |
| 3 | Pathfinder 🔭 | 220 |
| 4 | Cartographer 📍 | 360 |
| 5 | Master Geographer 🌍 | 540 |

XP, unit completion, best scores, and level are stored in `localStorage` under the key `gq_v1`.

### Level-up visuals
- **Level-up overlay** — if a quiz pushes her to a new level, tapping "Back to World" shows a full-screen overlay with the new level icon and title. Auto-dismisses after 2.5s then navigates onward.
- **Level pill pulse** — gold ring pulse on the level pill every time she returns home after completing a unit.
- **Grand Quest bar** — resets to 0 on each home render then animates to the real value, making progress visible as a sweep.

---

## Grand Quest complete — Mischief Managed

When all four Term 1 units are done, tapping "Back to World" after the final quiz triggers a full-screen parchment celebration:

- A dark curtain folds away (CSS scaleY animation) to reveal parchment
- 🗺️ seal, "Mischief Managed!" heading, Dumbledore-flavoured praise (with a Snape joke)
- Total XP earned
- "Seal the Map 🔴" button to dismiss
- If a level-up also occurred, the level-up overlay plays after dismissal

---

## Grand Quest progress

A progress bar at the top of every screen tracks completion across all units in all worlds. Term 1 has 4 units (25% each). Once all four worlds are built it will track across 16 units total.

---

## PWA / offline

Works fully offline after first load. Service worker uses cache-first strategy. To force a cache bust after deployment, increment `CACHE_NAME` in `sw.js`.

On iOS (Safari): tap Share → Add to Home Screen.

---

## Design rules (AuDHD — non-negotiable)

- No time limits anywhere
- No "you failed" screens — wrong answers show the correct answer with encouragement
- Card count always visible
- Progress always visible
- Transitions 150–200ms max
- One idea per card, four sentences maximum
- Dark shell (`#0f0d0b`), warm card surfaces (`#faf3e0` parchment for World 1)
- Swipe navigation on all card decks

---

## Tech notes

- Vanilla JS — `var` throughout, `innerHTML`, no modules
- No build step — edit `index.html` directly
- BASE path is `/geoquest/` — update in both `index.html` and `sw.js` if the repo name changes
- Nunito loaded from Google Fonts CDN — requires internet on first load only

---

## Phase roadmap

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Term 1 content written | ✅ Done |
| 2 | App shell, navigation, localStorage | ✅ Done |
| 3 | Study cards, keyword highlighting, glossary | ✅ Done |
| 4 | Quiz engine | ✅ Done |
| 4b | Quiz fixes: shuffle + content gaps + wording audit | ✅ Done |
| 5 | XP + levelling visuals (overlay, bar animation, pill pulse) | ✅ Done |
| 6 | Visual enhancements (Creative Commons photography) | ✅ Done |
| 7 | Celebrations + Grand Quest complete screen | ✅ Done |
| 8 | Deploy + test on iPad | ⏳ Ongoing |
| 9 | Terms 2–4 content + units | ⏳ Pending |
