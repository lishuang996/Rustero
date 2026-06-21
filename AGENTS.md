# Rustero — Agent Instructions

## 1. Code Quality: Readability & Extensibility

- **Composition API with `<script setup lang="ts">`**: All Vue components MUST use the `<script setup lang="ts">` syntax. No Options API.
- **TypeScript strictness**: The project has `strict: true`, `noUnusedLocals`, and `noUnusedParameters`. Every function parameter, return type, and reactive ref should be explicitly typed. Avoid `any`.
- **Single Responsibility**: Each component should do one thing well. Extract reusable logic into composables under `src/composables/`. Extract reusable UI pieces into `src/components/`.
- **Clear naming**:
  - Components: `PascalCase` (e.g., `ResearchHome.vue`, `AppHeader.vue`).
  - Files/directories: `kebab-case` or `snake_case` matching existing conventions.
  - Variables/functions: `camelCase`.
  - Types/interfaces: `PascalCase`.
- **No magic numbers**: Extract constants and configuration into typed objects or enums. Reference CSS custom properties (`var(--xxx)`) rather than hardcoded hex values in component styles.
- **Data flow**: 
  - Shared state → Pinia stores (`pinia` is already a dependency).
  - Component-local state → `ref` / `reactive` / `computed`.
  - Props down, events up.
- **File structure**:
  ```
  src/
    assets/         → static assets (images, fonts)
    components/     → shared/reusable components
    composables/    → Vue composables (reusable logic)
    router/         → Vue Router configuration
    stores/         → Pinia stores
    ts_scripts/     → TypeScript utilities, mocks, types, helpers
    views/          → page-level (route-level) components
  ```
- **Avoid deep nesting**: Prefer flat component trees. If a template exceeds ~150 lines, consider extracting sub-components.

## 2. Unit Testing (Required)

- Every new module, composable, store, and utility function MUST include unit tests.
- For Vue components, test critical behavior (rendering, user interactions, computed properties).
- **Test framework**: vitest (consistent with the Vite ecosystem already in use). If not yet installed, add it.
- **Test file placement**: Co-locate test files alongside the source file with the `.test.ts` or `.spec.ts` suffix.
  ```
  src/composables/useCounter.ts
  src/composables/useCounter.test.ts
  ```
- **Coverage expectations**:
  - Utility functions & composables: aim for 100% branch coverage.
  - Vue components: at minimum cover the happy path, empty/null states, and key user interactions.

## 3. Explain Your Work

- After every code change, provide a concise summary covering:
  - **What** was changed and why.
  - **Architecture/design reasoning**: why a particular pattern or approach was chosen.
  - **Trade-offs or alternatives considered** (when relevant).
- Keep the explanation focused and actionable — no fluff.

## 4. UI Style: Ant Design + Rustero Conventions

All UI MUST follow the patterns established in `ResearchHome.vue` and `App.vue`. This is the canonical reference for the project's visual language.

### Theme System

The project uses a **dual-mode dark/light theme** driven by Ant Design Vue's `<a-config-provider :theme>` with CSS custom properties on `.research-layout` / `.light-mode`.

- **DO NOT hardcode hex colors** in component `<style scoped>`. Use the existing CSS variables:
  | Variable | Purpose |
  |---|---|
  | `--title` | Primary heading text |
  | `--muted` | Secondary/description text |
  | `--panel-border` | Card/panel borders |
  | `--project-border` | Project card borders |
  | `--project-bg` | Project card background |
  | `--project-title` | Project card title text |
  | `--paper-title` | Paper/reference title text |
  | `--quick-text` | Quick-action card text |
  | `--quick-icon` | Quick-action icon background |
  | `--task-text` | Task item text |
  | `--task-done` | Completed task text |
  | `--assistant-start`, `--assistant-end` | Gradient endpoints for AI assistant card |
  | `--page-bg` | Page background |

- If you need a new semantic color, define it as a CSS variable on both `.research-layout` (dark) and `.research-layout.light-mode` (light) in `App.vue`. Do not scatter color definitions across components.

### Ant Design Component Conventions

- **Prefix**: All Ant Design Vue components use the `a-` prefix (e.g., `<a-button>`, `<a-card>`, `<a-tag>`).
- **Grid system**: Use `<a-row :gutter="[x, y]">` + `<a-col :xs :sm :lg :xl>`. Reference breakpoints from `ResearchHome.vue`: `xs="24" sm="12" lg="6"`.
- **Cards**:
  - Page sections → `<a-card class="panel-card" title="...">` with `#extra` slot for header actions.
  - Bordered cards for statistics: `:bordered="true"`.
  - Small inner cards: `size="small"`.
  - Interactive cards: `hoverable`.
- **Buttons**:
  - Primary action: `type="primary"`.
  - Subtle/inline action: `type="link"` or `type="text" size="small"`.
  - Button groups: wrap in `<a-space>`.
- **Typography**: Page/section titles use `<a-typography-title :level="3">`. Descriptions use `<a-typography-paragraph type="secondary">`.
- **Tags**: `<a-tag :color="...">` for status badges — use Ant Design's preset color tokens or hex strings.
- **Lists**: `<a-list :data-source>` with `#renderItem` slot and `<a-list-item-meta>` for items with avatars.
- **Avatars**: `<a-avatar>` for user avatars, `<a-avatar-group :max-count>` for groups. Square `shape="square"` for document icons.
- **Statistics**: `<a-statistic :title :value :suffix>` for numeric KPIs.
- **Checkboxes**: `<a-checkbox v-model:checked>` for task/todo items.

### Typography Scale (from ResearchHome.vue)

| Usage | Size | Weight | Line Height |
|---|---|---|---|
| Card/panel headings | 14px | 500 | 22px |
| Body text | 14px | 400 | 22px |
| Secondary/muted text | 12px | 400 | 20px |
| Kind/label text | 12px | 400 | 20px |

### Spacing & Layout

- Card gutters: `[11, 11]` for inner grids, `[16]` or `[14, 14]` for page-level grids.
- Section gaps: `16px` between stacked cards in a column.
- Page content padding: `24px 28px 36px` (desktop), `18px 14px 28px` (mobile via `@media (max-width: 760px)`).

### Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `760px` | Page title stacks vertically; header actions hidden |
| `520px` | Side column switches to full-width stacking |

Match these breakpoints and behaviors when building new layouts.

### Deep Styling

Use `:deep()` selector to override Ant Design component internals when necessary:
```css
.panel-card :deep(.ant-card-head-title) {
  color: var(--title);
}
```

### Dark/Light Mode

Every component MUST look correct in both modes. Test by toggling `.light-mode` on the root layout element. Style rules that differ between modes should reference CSS variables (which are swapped by the `.light-mode` block) rather than using conditional classes or inline styles.

## 5. Project-Specific Notes

### Tauri Desktop App

This is a **Tauri v2** desktop application. Backend logic lives in `src-tauri/` (Rust). The frontend communicates with the Rust backend via `@tauri-apps/api`. Be mindful:
- No browser-only APIs without guards (e.g., `window.alert` is fine, but `window.open` may behave differently).
- File system access should go through Tauri APIs, not the web File API.

### Routing

Vue Router is configured in `src/router/`. Add new page routes there. Use lazy-loaded route components.

### State Management

Use Pinia stores for global state (e.g., user preferences, project data cache). Keep stores in `src/stores/`.

### Mock Data

Currently mock data lives in `src/ts_scripts/mocks.ts` with types in `src/ts_scripts/types.ts`. When replacing mocks with real data (Tauri IPC or API calls), update types first, then replace mock references.

### Linting

Run `npm run lint` before committing. Fix issues with `npm run lint:fix`. The project uses `eslint` with `eslint-plugin-vue` and `typescript-eslint`.

### Build

- `npm run dev` — development server (port 1420).
- `npm run build` — type-check + production build.
- `npm run tauri dev` — Tauri desktop dev mode.

## 6. UI Style Reference — Extracted from ResearchHome.vue

The following patterns are the **single source of truth** for this project's UI. Any new page or component should follow these patterns unless there is a deliberate, documented reason to deviate.

### Page Structure

```
<section class="page-title">       ← page header with title + actions
  <a-typography>                   ← title + description
  <a-space>                        ← action buttons
<a-row class="stat-row">           ← KPI statistic cards
  <a-col> <a-card class="stat-card">...
<a-row>                             ← main content area
  <a-col class="main-column">       ← primary content (2/3 width on large screens)
    <a-card class="panel-card">     ← content sections
  <a-col class="side-column">       ← sidebar content (1/3 width)
    <a-card class="panel-card">
    <a-card class="panel-card">
```

### Card Patterns

- **Stat card**: Full-height bordered card with a colored left accent bar (`<i>` positioned absolutely at `top:0; left:0; width:3px`) + `<a-statistic>` + note text.
- **Panel card**: `<a-card class="panel-card" title="...">` with `#extra` slot. Used for all major content sections.
- **Project card**: Nested inside a panel card. Has a top row (kind label + status tag), title (`<h3>`), description (`<p>`), and footer (avatars + action link).
- **Quick-action card**: `hoverable` small card with icon (`<b>`) + label + description stacked vertically.
- **Task item**: `<a-checkbox>` with label containing title (`<b>`) and time (`<small>`). Completed state: line-through + muted color.
