# FontWandel Brand Colors

Adopted across the whole website (`frontend/`). Four brand colors, plus
supporting tints derived from them.

## The four brand colors

| Color          | Hex       | Role on the site                                              |
|----------------|-----------|---------------------------------------------------------------|
| Golden Yellow  | `#F5B301` | Primary actions: CTA buttons, submit buttons, banner pill. Always paired with Black text. Hover: `#CF9400`. |
| Black          | `#0B0B0C` | Body ink (deepest text), button text on gold.                 |
| Dark Blue      | `#0A1F33` | Brand mark ("Font" in logo, name accents), deep surfaces, outcome pill. Deeper shade `#071627` for gradients/rings. |
| Ocean Blue     | `#0E7CB5` | Interactive hue: links, icons, focus rings, borders on hover, secondary-button hover. Deep text-safe shade `#0C648F`. |

## Supporting tints

- Ocean tints for light section backgrounds and gradients:
  `#EFF7FC` → `#D9EDF8` → `#B3DBF0` → `#79C2E3` → `#3BA3D2` → `#1590C6`.
- Gold tints for highlights: `#FDF3D7`, `#FBE7AE`, bright `#FFC53D`.
- Neutrals are a Black-based ink scale (no pure blue-gray):
  `#F4F6F9`, `#E9EDF3`, `#D8DEE7`, `#B9C2CF`, `#868FA0`,
  `#5B6472`, `#3A4150`, `#232A36`, `#12161D`, `#0B0B0C`, `#060809`.
- Illustration canvas: `#EBF0F6`.

## Usage rules

1. **CTAs are gold.** Every primary button (`Get a Quote`, `Subscribe`,
   `Send message`, `Go home`, hero buttons) is Golden Yellow with Black text.
2. **Text accents are Dark Blue or Ocean Blue.** Never gold text on white
   (fails contrast). Logo "Font" and name accents use Dark Blue.
3. **Ocean Blue signals interactivity** — links, icons, hovers, focus rings,
   live/animated elements.
4. **Black is for ink**, not large surfaces. Page background stays off-white
   (`#FAFBFC`).
5. Illustrations use Ocean fills, Dark Blue anchors, and one gold highlight
   each (e.g. the hero trend dot).

## Implementation notes

- Tailwind v4 theme lives in `frontend/src/index.css` (`@theme` block).
- The old template used `teal-*` class names everywhere, so the Ocean Blue
  ramp intentionally keeps the `teal-*` token names (e.g. `teal-600` is now
  Ocean Blue `#0E7CB5`, `teal-800` is Dark Blue `#0A1F33`). Do **not**
  "fix" these names without updating every component.
- `slate-*` tokens are the Black-based neutral scale above.
- New tokens: `gold-100/200/400/500/600`, `navy-800/900`.
- Hand-drawn SVGs (`public/assets/images/*.svg`, mirrored in
  `src/assets/images/`) use the hex values directly — keep them in sync
  with this file when the palette changes.
- PWA colors (`public/manifest.webmanifest`): theme `#0A1F33`,
  background `#F4F6F9`.
