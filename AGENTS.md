# AGENTS.md

## Project intent

Build Sence Kaç Eder? as a small, polished, Turkish daily price guessing game. Optimize for the simplest useful implementation. Do not introduce speculative infrastructure.

## Current status

The repository contains product and architecture documentation only. Do not treat planned commands or file layouts as already implemented.

## Language conventions

- Source code, identifiers, filenames, commit messages, and technical documentation: English
- User-facing interface and quiz content: Turkish
- Keep Turkish copy natural; do not expose internal English enum names in the UI.

## Architecture constraints

- Framework-free semantic HTML, CSS, and browser JavaScript
- Static build output hosted on GitHub Pages
- Dated quiz data selected at build time
- No backend, database, authentication, CMS, or client-rendered SPA
- No dependency without a concrete requirement and a documented reason
- No third-party embed or remote quiz asset in the MVP
- Persist game state only in local storage, keyed by quiz date and schema version
- Treat anti-cheat and answer secrecy as non-requirements

Changes that cross these boundaries require updating the architecture documentation and adding or superseding an ADR.

## Expected commands

No executable project commands exist yet. During implementation, provide a small and consistent command surface and keep this section current. Prefer:

```sh
npm run dev          # local development
npm run build        # build a selected dated quiz
npm test             # automated game-logic tests
npm run check        # validation and static checks
```

Do not add a package manager or placeholder scripts until the first implementation milestone needs them.

## Coding conventions

- Use web platform APIs before adding libraries.
- Separate pure game/scoring logic from DOM rendering and local storage.
- Represent money as positive integer Turkish lira; do not use floating-point currency values.
- Validate quiz content during the build and fail with actionable errors.
- Invalid player input must not consume an attempt.
- Keep the ±5% boundary and star calculation covered by tests.
- Keep components/functions focused and naming explicit.
- Favor progressive enhancement and semantic markup.
- Keep visual polish without sacrificing mobile responsiveness or load time.

## Content conventions

- One source file per `YYYY-MM-DD` quiz date
- A production quiz has exactly 10 questions.
- A question has one or more ordered information screens and one target price.
- Initial screen types are `text`, `highlight`, and `image` only.
- Assets are stored locally in the repository.
- Do not add source URLs, editorial workflows, localization systems, or category-specific schemas unless requested.

## Operational constraints

- Scheduled deployment begins near 20:59 Turkey time.
- A missing or invalid daily quiz must fail before deployment.
- A failed workflow must leave the previous GitHub Pages version live.
- Future quiz visibility in the public repository is acceptable.
- Initial expected traffic is hundreds of daily users.

## Definition of done

A change is done when:

1. It satisfies the relevant acceptance criteria in `docs/product.md`.
2. Game rules and edge cases changed by the work have automated tests.
3. The static build and quiz validation succeed.
4. The experience works at mobile and desktop viewport sizes.
5. Refresh behavior preserves valid current-quiz progress.
6. User-facing copy is Turkish and technical code remains English.
7. No unnecessary dependency or infrastructure has been introduced.
8. Relevant README, product, architecture, plan, and ADR documentation is updated.
