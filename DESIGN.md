---
name: Bacon Burguer
description: A black plank wall covered in sign-painter posters; the menu is pasted on paper, priced in brush, held up with masking tape.
colors:
  parede: "#0c0b0b"
  papel: "#f6f4ef"
  tinta: "#141111"
  tinta-2: "#3b3433"
  vermelho: "#d4161c"
  vermelho-escuro: "#a10e13"
  vermelho-vivo: "#ff4a3d"
  fita: "rgba(226, 211, 170, .86)"
typography:
  display:
    fontFamily: "Alfa Slab One, serif"
    fontSize: "clamp(3rem, 13.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Alfa Slab One, serif"
    fontSize: "clamp(2.5rem, 8vw, 5rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "normal"
  title:
    fontFamily: "Alfa Slab One, serif"
    fontSize: "clamp(1.75rem, 6.5vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "normal"
  price:
    fontFamily: "Permanent Marker, cursive"
    fontSize: "clamp(4rem, 14vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 0.8
    letterSpacing: "-0.02em"
  brush:
    fontFamily: "Permanent Marker, cursive"
    fontSize: "clamp(1.25rem, 3.2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.03em"
    fontVariation: "'wdth' 82"
rounded:
  papel: "2px 3px 2px 4px"
  botao: "5px 3px 6px 3px"
  selo: "1.8rem"
spacing:
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  largura: "1240px"
  secao: "clamp(4.5rem, 10vw, 8rem)"
  cabeca: "clamp(2.5rem, 6vw, 4.5rem)"
  mural: "3.5rem"
  acoes: "0.8rem"
components:
  botao-vermelho:
    backgroundColor: "{colors.vermelho}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.botao}"
    padding: "0.7em 1.2em"
    height: "48px"
  botao-vermelho-hover:
    backgroundColor: "{colors.vermelho-escuro}"
  botao-tinta:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
    typography: "{typography.label}"
    rounded: "{rounded.botao}"
    padding: "0.7em 1.2em"
    height: "48px"
  botao-tinta-hover:
    backgroundColor: "#2a2423"
  botao-papel:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.botao}"
    padding: "0.7em 1.2em"
    height: "48px"
  botao-papel-hover:
    backgroundColor: "#ffffff"
  botao-grande:
    padding: "0.8em 1.4em"
    height: "56px"
  cartaz:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.papel}"
    padding: "14px"
  cartaz-vermelho:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.papel}"
    rounded: "{rounded.papel}"
    padding: "14px"
  foto-colada:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    padding: "10px 10px 0"
  selo-gramatura:
    backgroundColor: "{colors.vermelho}"
    textColor: "#ffffff"
    rounded: "{rounded.selo}"
    height: "3.6rem"
  placa:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "4px"
    padding: "0.3rem 0.7rem 0.35rem"
---

# Design System: Bacon Burguer

## Overview

**Creative North Star: "A Parede do Letrista"**

The page is the black plank wall of the house itself, and everything that carries information is a piece of paper a sign painter lettered and someone pasted up with masking tape. Headings are slab sign lettering with a painted shade; prices, captions and asides are quick fat-marker brush; the fine print is a plain condensed grotesque. Nothing sits square: every poster is a few degrees off, held by a strip or two of tape, and casts a real paper shadow on the wood.

Density is that of a busy poster wall, not a dashboard: big type, few words per poster, generous wall showing between posters, and food photography doing the warm colour work. The palette is the house's own: black, red and white, with tape beige as the only extra material. The world draws from the venue's black wall and the pig sticker logo; the tray-liner doodle pattern (crowns, hearts, card suits) appears as a printed paper texture on the "E tem mais" poster and as the torn strip above the footer.

The visual rejection the build commits to: a uniform grid of rounded cards on a dark background with a giant hero photo. The menu is a crooked wall of posters instead.

**Key Characteristics:**
- Black plank wall (a 1200x900 procedurally rendered wood tile) behind everything; paper on top.
- Three hands of lettering: slab sign, marker brush, printed grotesque, each with a fixed job.
- Every surface is tilted (between about -2.4deg and 3.2deg), taped, and shadowed like pasted paper.
- Red is ink, not decoration: headings, prices, primary buttons, and one red poster per wall.
- Motion is "being pasted": posters drop in rotated and settle with a long ease-out, tape lands after.

## Colors

Three inks on a black wall: paper white, sign-painter red, and near-black ink, with masking-tape beige as the only other material.

### Primary
- **Sign-Painter Red** (vermelho): the brand ink. Slab headings on paper, prices, brush asides on paper, primary buttons, the offer burst, the scrolling banner, the gramatura badges, the order bar's top rule. 4.86:1 on paper; it may carry text only on paper or as a fill under paper/white text.
- **Dried Red** (vermelho-escuro): hover state of red buttons only.
- **Neon Brush Red** (vermelho-vivo): the red used directly on the black wall (handwritten section notes, the closing subline) and the focus ring. 5.9:1 on the wall where the brand red would only reach 3.68:1.

### Neutral
- **Plank Black** (parede): the wall colour under the wood texture; also the base of the mobile order bar (at 94% opacity) and the pig's ink on the wall.
- **Poster Paper** (papel): every poster, photo border, light button, the hanging sign, and all text set directly on the wall (aliased in code as `--branco-parede`). Carries a multiplied fine-grain noise and two faint fold creases on posters.
- **Brush Ink** (tinta): text on paper, the 3px border of every button, the painted shade under red lettering, dark buttons.
- **Faded Ink** (tinta-2): secondary text on paper (descriptions, the hero footer line, sign details). 11:1 on paper.
- **Masking Tape** (fita): translucent beige tape strips with faint vertical fibres. Material, not a colour role; never used for text or fills larger than a tape strip.

### Named Rules
**The Two Reds Rule.** Brand red (vermelho) is for paper; on the black wall, red text switches to the vivid red (vermelho-vivo). Brand red never sets text directly on the wall.

**The Three Inks Rule.** Wall black, paper white, sign red, plus tape. No other hue enters the interface; warmth comes from the food photographs.

**The One Red Poster Rule.** A wall carries at most one fully red poster (the Danger Burguer). On it, every ink inverts: name in paper with an ink shade, price and tagline in paper, badge in ink, button in paper.

## Typography

**Display Font:** Alfa Slab One, self-hosted as `Letreiro` (with generic serif)
**Brush Font:** Permanent Marker, self-hosted as `Pincel` (with generic cursive)
**Body Font:** Archivo variable, self-hosted (weight 100-900, width 62-125%), with system-ui

**Character:** A sign painter's three hands: the heavy slab he letters the name in, the marker he scrawls prices and notes with, and the printed condensed grotesque for the small print. The slab is always uppercase and always shaded; the brush is loose and personal; Archivo is set narrow (80-88% width) and heavy for anything that must be read at a glance.

### Hierarchy
- **Display** (400, clamp(3rem, 13.4vw, 6rem), 0.88): the house name on the opening poster, red with an ink shade, one word per line.
- **Headline** (400, clamp(2.5rem, 8vw, 5rem), 0.9): section titles painted straight on the wall in paper white with a red shade; the closing "Bateu a fome?" runs larger (clamp(2.8rem, 11vw, 6rem)).
- **Title** (400, clamp(1.75rem, 6.5vw, 2.25rem), 0.95): burger names and poster titles (hours, address, "Não é só delivery") at up to clamp(1.9rem, 5vw, 2.6rem). Uppercase, balanced wrap.
- **Price** (Permanent Marker, clamp(4rem, 14vw, 4.75rem), 0.8): the integer of a price; the featured poster scales it to clamp(4.75rem, 8vw, 6rem).
- **Brush** (Permanent Marker, 1.15-1.75rem, 1.2-1.25): taglines, the hero note, photo captions, hours, the "hoje" tag, section asides.
- **Body** (Archivo 400-600, 1rem-1.3rem, 1.45-1.5): descriptions capped at 42ch in Faded Ink; the house text runs 500 at clamp(1.1rem, 2.4vw, 1.3rem).
- **Label** (Archivo 750-800, 0.95-1rem, width 80-82%, 0.03-0.06em, uppercase): buttons, nav links, day names in the hours list.

### Named Rules
**The Three Hands Rule.** Slab names things, brush talks, Archivo informs. Never set a paragraph in brush, never set body copy in slab, never use Archivo for a heading.

**The Painted Shade Rule.** Slab lettering always carries a hard, unblurred offset shade of 0.05-0.06em (`text-shadow: .055em .055em 0`): red letters shade in ink, paper or ink letters shade in red. This is the sign painter's drop shade, used on lettering only.

**The Poster Price Rule.** Prices read like a shop sign: a small "R$" top-aligned (1.35rem), a huge brush integer, and raised cents (1.7rem) underlined with a 3px rule in the same colour. Always pair it with an `aria-label` reading the value in words.

## Layout

A centred column capped at 1240px (largura) with a fluid side gutter of clamp(1rem, 4vw, 2.5rem). Sections open with generous wall above them (clamp(4.5rem, 10vw, 8rem)) and keep clamp(2.5rem, 6vw, 4.5rem) between the painted heading and the posters.

Mobile first, single column: posters stack with 3.25rem of wall between them, the hero photo sits under the opening poster, and a fixed order bar (Saipos and Keeta, 1.65fr / 1fr) slides up from the bottom once the hero buttons scroll away; body gets 80px of bottom padding to clear it. At 640px the menu becomes two columns with the featured and "E tem mais" posters spanning both. At 760px the nav and header order button appear and the order bar is removed. At 960px everything moves onto a 12-column grid used crookedly: posters take uneven spans (7/5, 4/4/4, 2-11), get staggered top offsets (0.5rem to 7rem), and the hero photo overlaps the opening poster with the offer burst bridging the two.

The red banner (faixa) breaks the column: it runs 112vw wide, rotated -1.6deg, scrolling its slogans and pig seals in a 38s loop.

### Named Rules
**The Crooked Wall Rule.** Adjacent posters alternate tilt direction (for example -1deg, 1.6deg, -1.8deg, 1.2deg) and never line up their tops on desktop. A straight row of equal cards is off-world.

## Elevation & Depth

Depth is physical: paper sits on wood and casts a short contact shadow plus a long soft fall-off. There is no tonal layering of surfaces and no glow. Shadows are a material property of paper, so every poster and pasted photo carries one at rest; the lifted shadow appears only when a poster is being pasted (arrival) or hovered.

### Shadow Vocabulary
- **Pasted paper** (`box-shadow: 0 1px 1px rgba(0,0,0,.45), 0 14px 28px -10px rgba(0,0,0,.75)`): every poster and taped photo at rest.
- **Lifted paper** (`box-shadow: 0 2px 3px rgba(0,0,0,.4), 0 34px 50px -18px rgba(0,0,0,.85)`): a menu poster on hover (it also straightens to 30% of its tilt and rises 5px) and every poster mid-paste.
- **Hanging sign** (`box-shadow: 0 10px 18px -6px rgba(0,0,0,.8)`): the ABERTO/FECHADO sign hanging from its wire.
- **Banner** (`box-shadow: 0 18px 30px -14px rgba(0,0,0,.8)`): under the scrolling red banner.
- **Sticker lift** (`filter: drop-shadow(0 10px 14px rgba(0,0,0,.6))`): the offer burst and, smaller, the gramatura badges (`0 6px 12px -4px rgba(0,0,0,.6)`).

### Named Rules
**The Pasted Paper Rule.** Anything that holds information on the wall is paper: tilted, shadowed with the pasted-paper shadow, and held by tape (one centred strip, or two strips at the top corners at -9deg and 8deg). Nothing floats without tape or a nail.

## Shapes

Paper is almost square-cornered but never machine-perfect: posters use an uneven 2px 3px 2px 4px radius, buttons an uneven 5px 3px 6px 3px, the hanging sign 4px. Tape strips are clip-path polygons with torn, zigzag ends. The tray-paper strip above the footer has a torn top edge (clip-path) and its own -0.6deg tilt. Round forms are reserved for stickers: the 3.6rem gramatura badge (1.8rem radius, rotated 9deg) and the 36-point offer burst. The pig logo appears as a seal in the header, the banner, the closing and the footer, always filled paper with ink or wall-black outline.

### Named Rules
**The No Perfect Corner Rule.** No uniform 8/12/16px radius anywhere. Corners are near-square and slightly uneven; circles belong only to stickers.

## Components

### Buttons
Painted wooden-sign buttons: heavy, condensed, uppercase, with a thick ink border.
- **Shape:** uneven, barely rounded corners (5px 3px 6px 3px), 3px solid ink border, minimum 48px tall.
- **Primary (vermelho):** Sign-Painter Red fill, white text. Used for every Saipos order action.
- **Ink (tinta):** ink fill, paper text. Keeta and secondary actions on light paper.
- **Paper (papel):** paper fill, ink text. Used where the ground is red or the black wall (the red poster, the closing, the order bar).
- **Large (grande):** 56px tall, clamp(1rem, 2.4vw, 1.15rem); hero and closing pairs only.
- **Hover / Focus:** lifts 2px and tilts -1deg over 0.25s with the paste ease; the trailing arrow nudges 2px right; fill darkens (red to Dried Red, ink to #2a2423, paper to white). Active presses 1px down. Focus is a 3px Neon Brush Red outline at 3px offset.
- **Link-list variant:** in the address poster the buttons go full width, left-aligned, sentence case, width 75%, 0.92rem, each with a leading 1.25em line icon.

### Cards / Containers (Cartaz)
- **Corner Style:** 2px 3px 2px 4px.
- **Background:** Poster Paper with a multiplied noise grain, a soft light bloom from the top left, and two faint diagonal crease lines; the red variant drops the creases.
- **Shadow Strategy:** pasted paper at rest, lifted paper on hover (menu posters only). See Elevation & Depth.
- **Border:** none; edges are defined by shadow.
- **Internal Padding:** 14px around the photo on menu posters; clamp(1.25rem, 4vw, 2.5rem) to clamp(2rem, 6vw, 3.5rem) on text posters.
- **Tilt:** set per instance through a `--r` custom property.

### Menu Poster (Oferta)
Photo on top (3:2, centred tape strip), gramatura badge in brush on the photo's top right, then slab name with red shade, red brush tagline, Faded Ink description (42ch), the poster price, and a red "Pedir esse" button. The featured poster places the price and button in a right-hand column on desktop. "E tem mais" spans the wall with a tray-paper doodle texture behind its photo that fades out before the text.

### Taped Photo (Foto colada)
A photograph mounted on a paper border (10px sides, open bottom) with a centred tape strip and a centred brush caption beneath, like a pinned print. The map embed uses the same mount, greyscaled, with a brush "carregando o mapa..." placeholder on Paper Shade (#ebe7de) behind it.

### Navigation
Header on the bare wall: the pig seal and two-line slab wordmark at left; centred Archivo links (750, width 80%, 0.06em, uppercase) whose hover paints a 3px red underline in from the left over 0.35s; then the hanging sign and a red "Pedir" button. Below 760px the links and header button are hidden and the fixed order bar takes over (black at 94%, 3px red top rule, safe-area padding).

### Hanging Sign (Placa)
A small paper sign hung from a two-line wire and a nail, reading ABERTO or FECHADO in slab with a tiny uppercase detail line ("até 23h45", "abre 16h"), computed live in São Paulo time. When open, the border and word turn red. Each status update swings it (a damped 1.8s pendulum from 11deg back to rest).

### Offer Burst (Estrela)
A 36-point red starburst with a 5px paper stroke, rotated -10deg, lettered "Pede aí!" in uppercase brush. It links to ordering. Hover spins it to 4deg and scales 1.06.

### Scrolling Banner (Faixa)
A full-bleed red paper strip with grain and fine horizontal lines, rotated -1.6deg, carrying slab slogans in paper with an ink shade separated by pig seals. Decorative (aria-hidden); stops under reduced motion.

## Do's and Don'ts

### Do:
- **Do** put every information surface on paper, tilt it with `--r` (roughly -2.4deg to 3.2deg), alternate the tilt direction from its neighbour, and tape it.
- **Do** set slab lettering uppercase with a 0.05-0.06em hard painted shade: ink under red, red under paper or ink.
- **Do** write prices as poster prices: small R$, huge brush integer, raised underlined cents, with an aria-label in words.
- **Do** use Sign-Painter Red (#d4161c) for red text on paper and Neon Brush Red (#ff4a3d) for red text on the black wall.
- **Do** animate new posters as "being pasted": start rotated (3x tilt + 4deg), 28px higher and 6% larger, settle over 0.75s on cubic-bezier(.16, 1, .3, 1) with a 90ms stagger, tape landing 380ms later; skip it entirely under reduced motion and for posters already in view.
- **Do** keep a Saipos order button in reach on every viewport: in the hero, on each poster, in the header (desktop) or fixed bar (mobile), and at the close.

### Don't:
- **Don't** lay posters out as a straight grid of identical rounded cards on a dark background.
- **Don't** use any hue beyond black, paper, red and tape beige in the interface.
- **Don't** set Sign-Painter Red text directly on the black wall (3.68:1).
- **Don't** use uniform rounded corners (8/12/16px) or pills, except on stickers (badge, burst).
- **Don't** use glows, glass, or colour gradients as fills; gradients appear only as paper texture (grain, light bloom, crease lines), and depth comes only from paper shadows.
- **Don't** set paragraphs in brush or body text in slab.
- **Don't** put more than one fully red poster on a wall.
