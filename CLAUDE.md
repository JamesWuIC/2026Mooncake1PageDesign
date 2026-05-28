# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page HTML website for the **高雄洲際酒店 2026 中秋月餅禮盒** marketing campaign. No build system, no framework, no package manager — pure HTML + CSS + JS.

## Development

**Preview the page:**
```bash
open 2026Mooncake1Page.html
# or start a local server to avoid CORS issues with local images:
python3 -m http.server 8080
```

There are no lint, test, or build commands. All changes are reflected by refreshing the browser.

## Architecture

### File layout
```
2026Mooncake1Page.html   ← entire page structure + inline comments
css/style.css            ← all styles, numbered TOC sections 01–23
js/script.js             ← all JS, numbered TOC sections 01–10
images/
  01_hero/               ← hero background images
  03_products/           ← product images (Artboard 1-x.png)
  05_Plate_Roll/         ← zodiac wheel layers (Layer1–5.png)
  06_Animal/             ← 12 zodiac animal illustrations
04_MP4/                  ← background video source files
```

### Page sections (top → bottom)
| Section | CSS class | ID | JS functions |
|---|---|---|---|
| Zodiac wheel game | `.plate-game` | `#game` | `spinOuter()`, `spinInner()` |
| Full-width hero image | `.hero` | `#home` | — |
| Mooncake image slider | `.hero3` | `#gallery` | `h3Slide()`, `h3Goto()` |
| Marquee strip | `.marquee-strip` | — | — |
| Products slider | `.products` | `#products` | `pSlide()`, `pGoto()` |
| Brand features | `.features` | `#features` | — |
| Testimonials | `.testimonials` | `#testimonials` | — |

### Zodiac wheel (hero_1) — 5-layer image stack
`gL1` (static base) → `gL2` (outer zodiac ring, rotates on `spinOuter`) → `gL3` (static decoration) → `gL4` (inner blessing ring, rotates on `spinInner`) → `gL5` (static top layer).

Each ring rotates 30° per slot. `transform-origin` for each layer is tuned to the actual image center in `style.css #17` — **update those percentages if you swap the wheel images**.

### Critical JS counters — must stay in sync with HTML
- `h3Total = 5` — number of `.h3slide` elements in `#h3sliderTrack`
- `pTotal = 6` — number of `.pslide` elements in `#psliderTrack`
- `zodiacData[12]` — order matches Layer2 image, starting from 12 o'clock (午馬) clockwise
- `blessingData[12]` — order matches Layer4 image; index 3 and 9 are intentional blank slots

### CSS design tokens
All colors are defined as CSS variables in `:root` (`style.css #01`). The primary accent is `--gold: #bea860`.

### Scroll reveal
`.reveal` elements animate in via `IntersectionObserver` (adds `.visible`). Staggered timing via `.reveal-delay-1/2/3/4`.

### RWD breakpoints
- `≤900px` — tablet (products slider goes vertical, zodiac game aspect-ratio changes)
- `≤600px` — mobile (zodiac English text hidden, grain texture disabled)
- `≤480px` — small mobile (iPhone SE)
- `(max-height:500px) and (orientation:landscape)` — landscape mode

### RWD edge cases to keep in mind
- **Product slider arrow/dots at 700–900px**: `.pslide-img` has `max-height: 420px` which caps `60vw`. Arrow tops use `min(30vw, 210px)` and dots use `min(calc(60vw + 8px), 428px)` to stay pinned to the actual image edge.
- **Hero image at ≤900px**: uses `object-fit: cover` (not `contain`) to fill the `min-height` area without letterboxing.
- **Touch sliders**: both `h3sliderTrack` and `psliderTrack` have swipe listeners (section 11 in `script.js`). Vertical scroll is detected via `dy > dx` and takes priority. Threshold is 40px.
- **Keyboard sliders**: left/right arrow keys work when focus is inside `.hero3` or `.products` (section 12 in `script.js`).

## Image deployment note

This page is deployed as a single HTML block on a shopping platform (no file hosting). Images must use either:
- **External URL** (`<img src="https://...">` via Imgur / Cloudinary / Google Drive public link)
- **Base64 inline** (convert at base64-image.de, embed in `src`)

Local relative paths (`images/...`) only work during local development.

## Common edit patterns

**Add a product slide:**
1. Copy a `.pslide` block in the HTML and update image/text
2. Increment `pTotal` in `js/script.js`
3. Update the `.pslide-counter` text (e.g., `07 / 07`)

**Add a mooncake image to the hero_3 slider:**
1. Copy a `.h3slide` block in the HTML and update `<img src>`
2. Increment `h3Total` in `js/script.js`

**Update zodiac data (image, name, or blessing):**
- Edit `zodiacData` or `blessingData` arrays in `js/script.js`
- The initial displayed zodiac (`zodiacData[0]`, 午馬) must also match the initial `#animalImg src`, `#zodiacStem`, `#zodiacAnimal`, `#zodiacLargeEn`, and `#gtZodiac` values in the HTML

**Enable the announcement bar:**
Remove the `<!-- -->` comment around `.announce-bar` in the HTML.

**Enable About / Gift sections:**
CSS is already defined (`style.css #10`, `#13`). Add the `<section class="about">` or `<section class="gift">` HTML structure.
