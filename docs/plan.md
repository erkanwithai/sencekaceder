# Implementation Plan

The plan is deliberately incremental. Each milestone should be reviewed before starting the next; visual and interaction decisions will evolve from playable reviews.

## Discovery prototype — completed, not production

A framework-free, fully playable 10-question prototype now lives in `examples/quiz-prototype`. It was intentionally built before the production foundation so the product owner could react to a concrete quiz and UI rather than abstract technical choices.

The prototype established the broad start → progressive clues → tailored price prompt → higher/lower guesses → reveal → next question → final score sequence. It also exposed expected iteration areas: image selection needs substantial improvement, and several screen treatments need refinement. Prototype code and content are disposable inputs to the milestones below, not a shortcut around production structure, validation, persistence, accessibility, or tests.

## Milestone 0 — Product and architecture definition

**Status:** Complete; documentation continues to absorb product learnings.

**Goal:** Agree on the core loop and smallest architecture.

- Record product scope, non-goals, game rules, and acceptance criteria.
- Record static architecture and deployment decision.
- Avoid application code and speculative dependencies.

**Exit:** The documents in this repository are accepted as the implementation baseline.

## Milestone 1 — Smallest useful production vertical slice

**Goal:** Turn the exploratory learning into a maintainable, testable implementation using one representative question.

- Select one question from the prototype and replace its rough imagery and copy with review-quality local content.
- Create several text/image/highlight information screens.
- Build the mobile-first forward-navigation flow.
- Allow previously shown information to be reviewed in a summary.
- Add formatted whole-TL input.
- Implement 10 attempts, higher/lower feedback, ±5% success, star loss, and actual-price reveal.
- Persist that one question's progress through refresh.
- Refine the visual direction and transitions from prototype feedback without adding a UI library.
- Keep pure game/scoring logic separate from DOM rendering and local persistence; do not carry over the prototype's coupled structure.
- Add focused tests for scoring and attempt boundaries.

**Exit:** A user can enjoyably complete one question on mobile, refresh safely, and understand the rules without explanation.

This is the recommended smallest useful vertical slice.

## Milestone 2 — Complete daily quiz

**Goal:** Expand the production vertical slice to a data-driven 10-question game, using the exploratory quiz only as initial content input.

- Define and validate the dated quiz file format.
- Render variable ordered information screens from data.
- Add navigation between 10 questions.
- Isolate persisted state by quiz date and schema version.
- Add the 10-row, 100-star result screen.
- Cover full-quiz completion and state recovery with tests.

**Exit:** A valid dated file produces a complete 10-question game and accurate final result.

## Milestone 3 — Production-quality static experience

**Goal:** Make the game ready for public use.

- Refine responsive mobile and desktop presentation.
- Polish motion, feedback states, typography, and infographic-style composition.
- Generate semantic static HTML.
- Add title, description, canonical URL, viewport, and social metadata.
- Optimize local assets and loading performance where measurements justify it.
- Test current versions of major mobile and desktop browsers.

**Exit:** The product meets the UX, static-output, and basic SEO acceptance criteria.

## Milestone 4 — Daily GitHub Pages delivery

**Infrastructure status:** The Cloudflare DNS, verified custom domain, enforced HTTPS, GitHub Pages environment, and GitHub Actions deployment path have been validated by publishing and using the exploratory prototype on a mobile phone. The dated build, validation, schedule, recovery input, and failure behavior below remain production work. See [deployment.md](deployment.md).

**Goal:** Reliably publish one repository-backed quiz per day.

- Build one explicitly selected quiz into a clean artifact.
- Fail early for a missing date, malformed content, missing asset, or invalid question count.
- Add GitHub Actions build and GitHub Pages deployment.
- Schedule near 17:59 UTC / 20:59 Turkey time.
- Add manual workflow dispatch for recovery.
- Confirm failed builds do not replace the live site.
- Configure the custom domain separately from application logic.

**Exit:** A valid dated quiz is published automatically, while a failed daily build leaves the prior deployment live.

## Milestone 5 — Validate and iterate

**Goal:** Learn from actual use without prematurely expanding the system.

Potential work, only after core validation:

- Wordle-like share text with system-share and clipboard fallback
- Simple, privacy-conscious traffic and completion analytics
- Content-authoring ergonomics
- UX adjustments based on observed play

Do not add accounts, a backend, an archive, a CMS, or automated content generation without a new product decision.
