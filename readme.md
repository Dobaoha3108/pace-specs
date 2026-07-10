# PACE

PACE is a mobile-first personal finance management app for students. This repo
now includes a Next.js + Tailwind scaffold aligned with the product and design
specs in `docs/` and `technical-specs/`.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Lucide React icons
- Browser local storage for MVP data persistence

## Project Structure

```txt
src/
  app/                  Next.js routes, layout, global styles
  components/
    app/                App shell components such as mobile frame/nav
    ui/                 Reusable design-system primitives
  config/               PACE design tokens
  features/             Feature modules by domain
  lib/                  Shared utilities
  types/                Shared TypeScript types
public/assets/          Static images copied from assets/
```

## Design System Setup

Tailwind is configured with the PACE tokens from `docs/02_DESIGN_SYSTEM.md`:

- Colors: primary blue, primary yellow, Pig Pig palette, semantic states,
  background, surface, text, border
- Typography: SF Pro Display / Inter fallback stack and the H1-H2-title-body
  scale
- Spacing: 8pt grid tokens
- Radius: button/input/card/dialog/bottom-sheet values
- Shadows and motion durations

The default page renders a 390px x 844px mobile demo frame, matching the laptop
demo mode from the design system.

## Getting Started

```bash
pnpm install
pnpm dev
```

The MVP currently has no backend API. Feature data should be modeled for local
browser storage until a backend contract is introduced.
