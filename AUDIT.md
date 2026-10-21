# Audit: credoscreening.com (captured 2026-10-21)

trustcredo.com 307-redirects to www.credoscreening.com. 29 live pages were captured as text in
`../credo-site-redesign-astro-draft/audit/` (home, products, screening, ID verification, onboarding,
trusted signatures, about, careers + 2 roles, contact, docs, privacy, terms, 8 industry pages,
5 solution pages). Live homepage capture: `screenshots/before-home.png`. Every redesigned page was
also captured from this repo before any change, in `screenshots/before/`.

## What's wrong

### Brand
1. **Two logos that disagree.** A purple shield with a padlock next to a teal "Credo" wordmark, plus a
   three-line tagline in 7px type ("Trusted Background & Verification Screening Services"). Purple
   appears nowhere else on the site. The footer uses a third variant.
2. **Three names, no explanation.** Credo Screening, Trust Credo, TrustCredo and 2002846 Ontario Inc.
   all appear, and the visitor has to work out how they relate.
3. **No Canadian identity.** The company is in Toronto, but nothing says data stays in Canada, and the
   ID verification page talks about "State" IDs and US driver's licences first.

### AI-template tells
4. **Untouched default stack.** Inter for everything, Geist Mono, stock Lucide icons
   (circle-check x18, arrow-right x8, zap, shield) each sitting in a tinted rounded square.
5. **Centered hero formula.** Pill badge ("First month free"), centered two-line H1 with the second line
   in teal, centered subhead, two centered buttons, "No credit card required" under them.
6. **Stat strip repeated on every page.** "1.2M+ / 200+ / <3s / 99.9%" appears on the home page and is
   copy-pasted onto all 8 industry pages and all 5 solution pages.
7. **Seven identical icon cards** ("Why Credo Screening?"), then a second grid of eight on onboarding.
   One card orphaned on its own row.
8. **Pastel rainbow data-source panels** (red, purple, orange, blue, yellow, green) with no meaning
   attached to the colours.
9. **Default pricing template.** "Most Popular" ribbon on a two-card layout, then four more price cards
   with orange "LIMITED TIME" stickers. Arrow glyphs stapled to every CTA.
10. **Industry pages are the same page.** Real estate, crypto, insurance, fintech, etc. differ only in
    the hero sentence and three "challenges"; the rest is identical boilerplate.

### Credibility
11. **Numbers that contradict each other.** ID coverage is "200+ countries" on home, "180+" two sections
    later on the same ID page, and signatures say "190+".
12. **Unsourced performance claims.** "60% typical cost reduction", "40% faster onboarding cycles",
    "99.9% uptime SLA", "100% tamper-evident", "0 biometric data stored".
13. **Anonymous testimonials.** Six quotes attributed only to "Property Management", "Credit Union",
    "Insurtech" etc. They read as invented.
14. **The real proof is missing.** No mention of TRREB/PropTx, SkySlope, CoreLogic One Home or Dominion
    Lending Centres, the volume behind them, SOC 2, Canadian hosting or FINTRAC client identification.
15. **Hype copy.** "Lightning Fast", "Top-Notch Security", "Your users won't hate it", "the world's most
    comprehensive watchlist database", "seamless", em dashes everywhere.
16. **Developer demo uses a real head of state** ("Vladimir Putin") as the example screening subject.

### Structure
17. **Nav goes in circles.** Products, Solutions and Industries menus overlap; "Pricing" is an anchor on
    home and also a page (/products). "Free Screening" is a product in the footer.
18. **Weak hierarchy.** Every section is centered H2 + grey subhead + grid; nothing is allowed to be
    more important than anything else.
19. **Footer copyright says 2024.**

## Scope of this redesign
Visual only, on Tanver's code (branch `redesign`). His headlines, body copy, product names, prices and
page structure are unchanged. The redesign fixes 1, 4, 5, 7, 8, 9, 18 and 19, and partly fixes 3 and 14
with one added security and trust section (Canadian hosting, SOC 2 Type 1, penetration testing,
AES-256, customer-set retention, FINTRAC client identification via PropTx Verify, and the four
customers). Items 2, 6, 10, 11, 12, 13, 15, 16 and 17 are copy or structure decisions left for Tanver.
