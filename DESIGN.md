# Credo site design system (redesign branch)

Adapted from the Spot (spot.insure) canvas, recoloured for Credo. Visual only: copy lives in the pages.

## Tokens (`src/app/globals.css`)
- Ground `#ffffff`, ink `#0b1110`, muted `#4a5553`, tertiary `#66716f` (AA on white and on `#f6f7f7`).
- Rules: `--border` 9% ink; `--border-emphasized` 16%. One owner per edge.
- Teal: `--teal #0d9488` for the wordmark, pixel marks and the ASCII field only; `--teal-ink #0f766e`
  for small text emphasis and pass states; `--teal-wash #e7f4f2` for one highlighted cell or tag.
- Actions are ink pills (`Action`), secondary pills are outlined. Teal is never the main button colour.
- Legacy names (`primary`, `accent`, `surface`, `text-*`) are remapped so login, register and the
  dashboard inherit the palette without edits.

## Type
Geist Sans for everything, Geist Mono for indices, IDs, code and small technical labels.
Headings weight 500 with `-0.045em` tracking (`h1`, `h2`), card titles `-0.015em`. Body 15 to 17px at
1.7 line height. No serif accents, no gradient text.

## Layout (`src/components/site/Canvas.tsx`)
- `Container`: max 84rem with 1px side rails. Copy gutters `px-6 md:px-8`. Sections own their top rule.
- `Section`, `SectionHeader`, `Index` (01, 02), `Tag`, `TextLink`, `CheckGlyph`, `ArrowGlyph`.
- Cell grids: `.cells-clip > .cells`; each cell draws right and bottom rules, the clip hides the outer
  ones so no edge doubles.

## Signature elements
- `AsciiField`: a guilloche interference pattern drawn in monospace glyphs (WebGL, 24 fps, paused
  off-screen, still under reduced motion, 2D-canvas fallback). Used behind heroes, closing CTAs and
  the footer, fading out before it reaches text.
- `VerificationRecord`: the staff result screen rebuilt with specimen data (fictional person,
  SPECIMEN-marked licence). The one authored motion: check rows resolve in sequence on load.
- `PixelIcon`: 16-unit stepped silhouettes in teal with static grain. Used sparingly.
- `LandscapeBand`: engraved Canadian Shield lake (`public/art/canadian-shield-band.webp`).
- `TrustSection` / `TrustedByRow`: the only added content (see AUDIT.md).

## Imagery provenance
- `public/art/canadian-shield-band.webp`, `public/art/guilloche-band.webp`: generated with Codex
  (OpenAI image tool) on 2026-10-21 from prompts in the redesign session.
- `public/specimen/*`: crops of the fictional specimen person and SPECIMEN Ontario licence from the
  idv-demo-yrp repo (AI-generated person, not a real likeness).
- `public/brand/credo-wordmark*.svg`: Credo wordmark supplied by Adyan.
