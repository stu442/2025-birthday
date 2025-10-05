# Repository Guidelines

## Project Structure & Module Organization
- App entry lives in `src/main.tsx`, mounting the single-page React app via Vite.
- Page-level composition sits in `src/home.tsx`, where shared UI such as `components/header.tsx` and `components/hero-header.tsx` is imported.
- Reusable UI primitives (e.g., `ui/number-ticker.tsx`) and feature components reside under `src/components`; static images are in `src/assets`.
- Tailwind configuration (`tailwind.config.js`) and design tokens power styling; global styles are defined in `src/index.css`.
- Static files served as-is belong in `public/`. Keep generated assets out of `src/`.

## Build, Test, and Development Commands
- `npm install` — install dependencies; run this after pulling new changes.
- `npm run dev` — start the local Vite dev server with HMR on `http://localhost:5173`.
- `npm run build` — type-check (`tsc -b`) and create a production bundle in `dist/`.
- `npm run preview` — serve the production build locally to verify deployment output.
- `npm run lint` — run ESLint across the repo; resolve warnings before pushing.

## Coding Style & Naming Conventions
- Use TypeScript and React function components with concise props typing; avoid default exports except for components meant to be consumed app-wide.
- Follow the existing two-space indentation and trailing comma style; rely on the ESLint config for ordering and spacing.
- Name components and files in PascalCase (`HeroHeader.tsx`), hooks/utilities in camelCase, and constants in SCREAMING_SNAKE_CASE when shared.
- Compose styles with Tailwind utility classes; prefer extracting repeated patterns into helpers or component props.

## Testing Guidelines
- Automated tests are not yet configured; when introducing them, colocate with source files (e.g., `HeroHeader.test.tsx`) and ensure `npm run build` remains green.
- For manual QA, verify navigation elements, ticker animations, and Tailwind styles in both dev (`npm run dev`) and preview builds.

## Commit & Pull Request Guidelines
- Adopt the observed `<type>: <summary>` commit prefix (e.g., `feat: 헤더 레이아웃 정리`); keep tense imperative and scope narrow.
- Before opening a PR, run `npm run lint` and `npm run build`, attach relevant screenshots (e.g., new header layouts), and link issue trackers if applicable.
- Provide a concise PR description covering motivation, solution, and verification steps; mention any follow-up tasks or known gaps.


## 요구사항

- 한국어로 대답한다.
- 작업을 끝내면 어떤 일을 했는지 요약한다.