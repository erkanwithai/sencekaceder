# Implementation Plan

The plan is deliberately incremental. Each milestone should be reviewed before starting the next; visual and interaction decisions will evolve from the working prototype.

## Milestone 0 — Product and architecture definition

**Goal:** Agree on the core loop and smallest architecture.

- Record product scope, non-goals, game rules, and acceptance criteria.
- Record static architecture and deployment decision.
- Avoid application code and speculative dependencies.

**Exit:** The documents in this repository are accepted as the implementation baseline.

## Milestone 1 — Smallest useful vertical slice

**Goal:** Validate the game feel with one representative question.

- Create one local sample question with several text/image/highlight information screens.
- Build the mobile-first forward-navigation flow.
- Allow previously shown information to be reviewed in a summary.
- Add formatted whole-TL input.
- Implement 10 attempts, higher/lower feedback, ±5% success, star loss, and actual-price reveal.
- Persist that one question's progress through refresh.
- Establish the initial fancy visual direction and transitions without adding a UI library.
- Add focused tests for scoring and attempt boundaries.

**Exit:** A user can enjoyably complete one question on mobile, refresh safely, and understand the rules without explanation.

This is the recommended smallest useful vertical slice.

## Milestone 2 — Complete daily quiz

**Goal:** Expand the proven loop to a data-driven 10-question game.

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
