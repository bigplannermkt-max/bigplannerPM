# Bigplanner PM Design System

## 1. Atmosphere / Signature
Quiet operations console for construction PM estimates. The surface should feel precise, calm, and ready for repeated daily use: paper-white work areas, graphite text, and one field-green accent for decisions, documents, and totals. Density is medium-high, with tables and controls treated as working surfaces instead of marketing cards.

Design dials:
- `DESIGN_VARIANCE`: 5
- `MOTION_INTENSITY`: 3
- `VISUAL_DENSITY`: 7

## 2. Color
- Page background: `#F3F5F0`, `--bp-bg`, app canvas.
- Background wash: `#E8EEE7`, `--bp-bg-wash`, subtle page bands.
- Surface: `#FFFFFF`, `--bp-surface`, primary panels.
- Surface raised: `#FBFCFA`, `--bp-surface-raised`, inputs and nested controls.
- Surface muted: `#EEF3EE`, `--bp-surface-muted`, group panels.
- Foreground: `#16201B`, `--bp-fg`, primary text.
- Muted text: `#5F6B64`, `--bp-muted`, helper and secondary text.
- Soft text: `#7A867F`, `--bp-soft`, tertiary labels.
- Border: `#D7DFD8`, `--bp-border`, standard separators.
- Strong border: `#BCC9C0`, `--bp-border-strong`, active separators.
- Primary: `#11684E`, `--bp-primary`, selected and primary action.
- Primary strong: `#0A4938`, `--bp-primary-strong`, totals and dark primary surfaces.
- Primary soft: `#E2F3EA`, `--bp-primary-soft`, selected backgrounds.
- Destructive: `#A6403A`, `--bp-danger`, destructive controls.
- Ring: `#74B99A`, `--bp-ring`, focus outline.
- On primary: `#FFFFFF`, `--bp-on-primary`, text on dark primary.

Dark mode tokens:
- `--bp-bg`: `#0C1410`
- `--bp-bg-wash`: `#111C16`
- `--bp-surface`: `#18221D`
- `--bp-surface-raised`: `#1D2A23`
- `--bp-surface-muted`: `#131D18`
- `--bp-fg`: `#EFF7F1`
- `--bp-muted`: `#ADBAB2`
- `--bp-soft`: `#8F9D95`
- `--bp-border`: `#30423A`
- `--bp-border-strong`: `#496056`
- `--bp-primary`: `#65D09B`
- `--bp-primary-strong`: `#9BE3BD`
- `--bp-primary-soft`: `#173529`
- `--bp-danger`: `#E58B82`
- `--bp-ring`: `#65D09B`
- `--bp-on-primary`: `#0C1410`

## 3. Typography
- Font stack: Pretendard, `Noto Sans KR`, `Segoe UI`, sans-serif. Korean numerals and dense labels need dependable system rendering.
- Display: `--bp-type-display`, 42px / 800 / 1.08 / 0.
- Page title: `--bp-type-title`, 30px / 800 / 1.15 / 0.
- Section title: `--bp-type-section`, 18px / 800 / 1.25 / 0.
- Body: `--bp-type-body`, 15px / 400 / 1.65 / 0.
- Label: `--bp-type-label`, 12px / 700 / 1.35 / 0.
- Number: `--bp-type-number`, 24px / 850 / 1.1 / 0.
- Control: `--bp-type-control`, 14px / 700 / 1.35 / 0.

## 4. Spacing
Base unit is 4px.
- `--bp-space-1`: 4px
- `--bp-space-2`: 8px
- `--bp-space-3`: 12px
- `--bp-space-4`: 16px
- `--bp-space-5`: 20px
- `--bp-space-6`: 24px
- `--bp-space-8`: 32px
- `--bp-space-10`: 40px
- `--bp-space-12`: 48px
- `--bp-space-16`: 64px

## 5. Components
- App shell: max width 1400px, 24px desktop gutters, 12px mobile gutters.
- Radius scale: `--bp-radius-sm` 6px, `--bp-radius` 8px, `--bp-radius-lg` 12px. Cards never exceed 8px unless they are shell containers.
- Topbar: white raised surface, left accent rail, compact action row, no hero-scale marketing layout.
- Sticky summary: dense totals strip with strong total treatment and single-line context chips.
- Section blocks: 1px border, 8px radius, subtle shadow, green top rule for workflow steps.
- Inputs: raised surface, 44px minimum height, strong focus ring, no pure black text.
- Choice cards: border-first default, primary-soft selected state, transform-only hover lift.
- Document preview: neutral drafting surface with real paper page styling.
- Disabled state: muted text, raised muted surface, no transform.

## 6. Motion
- Default transition: `--bp-motion-fast` 140ms ease.
- Emphasis transition: `--bp-motion` 200ms cubic-bezier(0.2, 0.7, 0.2, 1).
- Use transform, opacity, and border/shadow changes only.
- Reduced motion removes transforms and transitions while preserving state changes.

## 7. Depth
- Depth strategy is border-led with two shadows:
- `--bp-shadow-sm`: 0 1px 2px rgba(22, 32, 27, 0.06), 0 8px 20px rgba(22, 32, 27, 0.06)
- `--bp-shadow`: 0 18px 42px rgba(22, 32, 27, 0.10)
- `--bp-shadow-focus`: 0 0 0 3px rgba(116, 185, 154, 0.18)

Do:
- Keep the interface compact and scannable.
- Use the primary green family for decisions, selection, documents, and totals.
- Reserve red for destructive actions only; do not introduce another feature accent.

Don't:
- Do not use purple gradients, glow backgrounds, or beige luxury cues.
- Do not introduce raw colors in component CSS. Add a token here first.
- Do not use oversized landing-page typography inside the tool.
