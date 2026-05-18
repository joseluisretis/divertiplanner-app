---
name: Joyful Celebration
colors:
  surface: '#fef7ff'
  surface-dim: '#ded7e4'
  surface-bright: '#fef7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f1fe'
  surface-container: '#f3ebf8'
  surface-container-high: '#ede5f3'
  surface-container-highest: '#e7e0ed'
  on-surface: '#1d1a23'
  on-surface-variant: '#494454'
  inverse-surface: '#322f39'
  inverse-on-surface: '#f5eefb'
  outline: '#7b7486'
  outline-variant: '#cbc3d7'
  surface-tint: '#6d3bd7'
  primary: '#6b38d4'
  on-primary: '#ffffff'
  primary-container: '#8455ef'
  on-primary-container: '#fffbff'
  inverse-primary: '#d0bcff'
  secondary: '#a43073'
  on-secondary: '#ffffff'
  secondary-container: '#fc79bd'
  on-secondary-container: '#76014e'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cea700'
  on-tertiary-container: '#4e3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#ffd8e7'
  secondary-fixed-dim: '#ffafd3'
  on-secondary-fixed: '#3d0026'
  on-secondary-fixed-variant: '#85145a'
  tertiary-fixed: '#ffe083'
  tertiary-fixed-dim: '#eec200'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fef7ff'
  on-background: '#1d1a23'
  surface-variant: '#e7e0ed'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built on the philosophy of "Bouncy Professionalism." It captures the chaotic energy of a children’s party and organizes it into a seamless, high-end experience for parents and event planners. The visual language balances high-energy playfulness with clean, modern utility to ensure the app remains functional under the pressure of event coordination.

The style leverages a mix of **Modern / Corporate** structure with **Tactile** details. We utilize organic, "squishy" interaction states, soft depth, and a high-contrast palette to evoke feelings of excitement, celebration, and reliability. Every interaction should feel like a small celebration—rewarding, fluid, and unmistakably joyful.

## Colors

The palette is anchored by a **Vibrant Purple** that provides a sense of premium magic and authority. This is complemented by **Bright Pink** for high-action touchpoints. **Sunny Yellow** and **Turquoise** act as energetic accents to categorize different event types (e.g., birthdays vs. graduations).

Backgrounds remain primarily clean white or extremely light tints of the primary purple (`#F5F3FF`) to maintain readability and professional polish. Secondary backgrounds use a soft pink tint to separate content blocks without losing the brand's warmth.

## Typography

This design system utilizes **Plus Jakarta Sans** for its friendly, open apertures and modern geometric structure. Its rounded terminals perfectly mirror the "pill" shape language of the components.

Headlines use an ExtraBold weight with tight letter-spacing to create a "chunky" and impactful editorial look. Body text prioritizes legibility with a regular weight and a generous line-height of 1.6x, ensuring that busy parents can scan information quickly. Labels are rendered in SemiBold or Bold to ensure clear hierarchy in data-dense areas like schedules or guest lists.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a standard 12-column system for tablet/desktop and a 4-column system for mobile. We use an 8px base grid to maintain rhythmic consistency. 

Margins are intentionally generous (minimum 24px) to avoid a cluttered feel. Elements should feel "airy" and floating. In lists and cards, vertical rhythm is established through a `stack-md` (16px) gap, while related metadata uses `stack-sm` (8px).

## Elevation & Depth

We avoid traditional "grey" shadows. Instead, the design system utilizes **Ambient Shadows**—soft, diffused shadows that are tinted with the primary or secondary color of the element casting them. This creates a vibrant, glowing effect that feels more like a physical object in a brightly lit room than a flat digital UI.

**Depth Layers:**
- **Level 0 (Floor):** White or light-tinted backgrounds.
- **Level 1 (Cards):** Low-opacity color-tinted shadow (10% opacity, 20px blur) to suggest a gentle lift.
- **Level 2 (Interactive/Hover):** Increased shadow spread and slight scale-up (1.02x) to mimic a "bouncy" tactile response.
- **Level 3 (Modals):** Glassmorphism with a heavy backdrop-blur (20px) and a white semi-transparent overlay to keep focus on the task while maintaining the party's colorful atmosphere in the background.

## Shapes

The shape language is defined by **Extreme Roundness (ROUND_FULL)**. Sharp corners are strictly avoided to ensure the UI feels safe, friendly, and approachable for its child-centric context. 

- **Buttons & Chips:** Always 100% pill-shaped.
- **Cards:** Use `rounded-xl` (1.5rem / 24px) to create a soft, friendly frame for content.
- **Images:** Profiles use circles; event thumbnails use the same `rounded-xl` as cards.

## Components

### Buttons
Primary buttons are pill-shaped with a vibrant purple-to-pink gradient. They utilize a soft, colored drop shadow. On press, they should visually "shrink" slightly to provide haptic-like feedback.

### Cards
Cards are white with a subtle 1px border in a lighter tint of the primary color. They act as the main containers for events and guest information, using high internal padding (24px) to let content breathe.

### Input Fields
Inputs feature high-radius corners and a subtle light-gray background. Upon focus, the border transitions to the primary purple with a soft glow (outer shadow). Placeholders are friendly and conversational.

### Chips & Tags
Used for event categories (e.g., "Outdoor," "Cake Time"). These use high-contrast combinations: light-tint backgrounds with dark-toned text in the same hue (e.g., Turquoise background with deep Teal text).

### Playful Icons
Icons should be thick-stroked with rounded ends. Where possible, use "duotone" styles where the secondary color provides a decorative accent to the primary icon shape.

### Progress Bars
Used for "Party Prep" checklists. These are thick, pill-shaped tracks with a vibrant gradient fill to make completing tasks feel rewarding.