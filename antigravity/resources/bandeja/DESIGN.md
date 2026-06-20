---
name: Medire+
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#414753'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#717785'
  outline-variant: '#c1c6d5'
  surface-tint: '#005eb4'
  primary: '#005eb4'
  on-primary: '#ffffff'
  primary-container: '#3891ff'
  on-primary-container: '#002a56'
  inverse-primary: '#a8c8ff'
  secondary: '#b90538'
  on-secondary: '#ffffff'
  secondary-container: '#dc2c4f'
  on-secondary-container: '#fffbff'
  tertiary: '#795900'
  on-tertiary: '#ffffff'
  tertiary-container: '#b98a00'
  on-tertiary-container: '#382800'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a8c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#00468a'
  secondary-fixed: '#ffdadb'
  secondary-fixed-dim: '#ffb2b7'
  on-secondary-fixed: '#40000d'
  on-secondary-fixed-variant: '#92002a'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 20px
  gutter: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
---

## Brand & Style

The brand personality is energetic, reliable, and high-spirited, reflecting the dynamic nature of event production. The design system balances a **Corporate Modern** foundation with **High-Contrast** accents to ensure the UI feels both professional and celebratory.

The target audience includes corporate clients and private event organizers who require efficiency and creativity. The visual language uses generous whitespace and bold typography to create a sense of organized excitement. The aesthetic is "App-first," optimized for PWA installation with large touch targets and fluid transitions that mimic native mobile experiences.

## Colors

The palette is anchored by a **Bright Blue** primary, symbolizing trust and digital-native efficiency. 

- **Primary (#3891FF):** Used for main actions, brand identity, and active states.
- **Secondary (#F43F5E):** A vibrant red-pink for high-energy accents, notifications, and secondary brand marks.
- **Tertiary (#FBBF24):** A golden yellow used sparingly for "special" moments, ratings, or premium features.
- **Neutral (#0F172A):** A deep navy-black for high-contrast typography and iconography.
- **Surface:** The background remains a clean, pure white (#FFFFFF) with very light cool-grey containers (#F8FAFC) to maintain a modern, airy feel.

## Typography

This design system utilizes **Plus Jakarta Sans** for headlines and body text to convey a friendly, geometric, and modern feel. Its soft curves provide the "fun" element requested while maintaining excellent legibility.

**Manrope** is used for labels and technical data to provide a structured, professional counterpoint. Headlines use tight letter-spacing and heavy weights to command attention, while body text is spaced for optimal readability in a mobile-first environment.

## Layout & Spacing

The system follows a **Fluid Grid** model optimized for touch devices. 

- **Mobile (PWA):** A single-column layout with 20px side margins. Elements are stacked vertically with a preference for bottom-sheet navigation and top-level headers.
- **Tablet/Desktop:** A 12-column grid. On larger screens, the content width is capped at 1200px to prevent excessive line lengths.
- **Vertical Rhythm:** Spacing is strictly based on an 8px scale. Component internal padding should favor `16px` (2 units) for a comfortable touch experience.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and **Ambient Shadows**. Surfaces sit on a flat background, but interactive cards use subtle, highly-diffused shadows with a slight blue tint (`rgba(56, 145, 255, 0.08)`) to suggest lift without looking heavy.

Floating Action Buttons (FABs) and navigation bars use a higher elevation to remain accessible over scrolling content. Secondary content containers use light grey borders (1px solid #E2E8F0) rather than shadows to keep the interface clean and "app-like."

## Shapes

The design system utilizes **Rounded** shapes to reinforce a friendly and approachable brand image. 

- **Base Radius (8px):** Standard for buttons, input fields, and small cards.
- **Large Radius (16px):** Used for main content containers and imagery.
- **Pill (Full Radius):** Reserved for tags, chips, and the main "Return" button icons to differentiate them from primary action buttons.

## Components

### Buttons
Primary buttons are high-contrast Blue with white text, using a minimum height of 52px for mobile accessibility. Secondary buttons use the Blue as a border color (ghost style).

### Input Fields
Inputs feature a light neutral background (#F1F5F9) and 0px border by default, transitioning to a 2px Blue border on focus. Labels are placed above the field in Manrope Bold.

### Cards
Event cards should use the 16px radius. Images within cards should have a slight overlay to ensure text legibility if headlines are placed on top.

### Chips & Status
Status indicators (e.g., "Confirmed," "Pending") use the primary/secondary/tertiary colors with 15% opacity backgrounds and 100% opacity text for a soft, readable look.

### Navigation
For PWA optimization, use a fixed bottom navigation bar for primary destinations, and a "back" button in the top left corner as a floating circle with a subtle shadow.