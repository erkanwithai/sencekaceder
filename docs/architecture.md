# Architecture

## Overview

Sence Kaç Eder? is a framework-free static web application. Quiz source files are committed by date. A small build script selects one quiz, validates it, and produces a deployable directory containing static HTML, CSS, JavaScript, and only that quiz's local assets.

There is no runtime server, API, database, authentication, or server-side user state.

An exploratory 10-question prototype currently exists under `examples/quiz-prototype`. It validates the broad interaction sequence, but it is deliberately outside the production layout. Its coupled rendering/game code, runtime JSON fetch, remote font request, and lack of persistence or tests must not be mistaken for the production architecture.

## System boundaries

### Inside the system

- Dated quiz source data and local assets
- Build-time content selection and validation
- Static page generation
- Browser game flow, scoring, and local persistence
- GitHub Actions deployment to GitHub Pages

### Outside the system

- Manual research and creation of quiz content
- Domain and DNS management
- Automated content generation
- User identity and cross-device state
- Analytics, until explicitly added later

## Components

### Content repository

Stores one source file per date and associated local images. Future quizzes may be visible in the public repository; answer secrecy is not a requirement.

### Build script

Uses only the minimum tooling required to:

1. Select an explicit quiz date.
2. Fail if that quiz is absent or invalid.
3. Generate static, semantic HTML and SEO metadata.
4. Copy the shared CSS, browser JavaScript, and referenced assets.
5. Include only the selected quiz in the deployment output.

No general-purpose CMS or static-site framework is justified for the initial scope.

### Static document

Provides crawlable Turkish page copy and metadata without client-side rendering. JavaScript enhances the document with progressive screens and game behavior.

### Game controller

Runs entirely in the browser and manages:

- Information-screen navigation and summary
- Price input and formatting
- ±5% comparison
- Higher/lower feedback
- Attempt and star tracking
- Actual-price reveal
- Question and daily completion

### Local state store

Persists progress under a versioned key that includes the quiz date. It stores the current question, revealed information position, valid guesses, earned stars, and completion state. It stores no identity or sensitive information.

Corrupt or incompatible state should be discarded safely for that quiz.

### Deployment workflow

A scheduled GitHub Actions workflow starts near 20:59 Turkey time (17:59 UTC), builds the expected dated quiz, and deploys it to GitHub Pages. Manual dispatch should support recovery and previewing a specified date. If selection, validation, build, or deployment fails, the currently published site remains unchanged.

GitHub Actions schedules can be delayed; exact 21:00 publication is not guaranteed or required.

## Data model

Conceptual model; exact serialization will be chosen during implementation.

```text
DailyQuiz
  date: YYYY-MM-DD
  title: Turkish string
  questions: Question[10]

Question
  id: stable string within the quiz
  title: short Turkish string
  prompt: tailored Turkish price question
  information: InformationScreen[]
  targetPrice: positive integer

InformationScreen
  type: text | highlight | image
  label?: Turkish string
  content?: Turkish string
  imagePath?: local path
  imageAlt?: Turkish string
```

Only `text`, `highlight`, and `image` screens are initially supported. Question `title` and `prompt` keep presentation copy out of category-specific logic and proved useful in the exploratory quiz. Additional presentation types or category-specific fields require a demonstrated content need.

The target price is an integer number of Turkish lira. Source references, captured-price dates, external embeds, and localization structures are intentionally excluded from the initial model.

## Scoring algorithm

For a target `T` and guess `G`, success is:

```text
abs(G - T) / T <= 0.05
```

A question begins with 10 stars. Each unsuccessful valid guess decrements stars by one. A successful guess preserves the current stars. After the tenth unsuccessful guess, the score is zero and the question ends.

Invalid input does not consume an attempt.

## Deployment

- **Source control:** public GitHub repository
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages with the custom domain `sencekaceder.com`
- **Artifact:** one current static quiz
- **Capacity target:** hundreds of daily users
- **Rollback behavior:** retain the previous deployment when a new workflow fails

## SEO and performance

The build emits semantic HTML with Turkish title and description, canonical URL, Open Graph metadata, and an appropriate viewport. The experience must not require a client-rendered framework. Assets should be kept small and local, and unnecessary third-party scripts should be avoided.

Replacing content at one URL limits long-tail SEO because previous quiz pages are not retained. This is an accepted trade-off; the initial goal is simply to be SEO-friendly, not to build a content archive.

## Security and privacy

The application accepts no sensitive data and sends no game state to a server. Static answers can be discovered through repository or browser inspection. Local-storage controls are experience aids, not security controls.

Future analytics must be separately evaluated for privacy, disclosure, and operational value before introduction.

## Key trade-offs

- **Vanilla web stack over a framework:** minimizes dependencies and output, but requires deliberate organization as interactions grow.
- **Build-time daily selection over browser date selection:** publishes only one game and improves static output, but relies on scheduled CI.
- **Local storage over accounts:** preserves a smooth refresh experience with no backend, but cannot synchronize devices or prevent replay.
- **One replaceable URL over an archive:** keeps the Wordle-like daily model simple, but limits historical discovery and SEO.
- **Flexible screens over category-specific schemas:** supports varied content without building separate product types, but provides less domain validation.
- **Manual content over automation:** minimizes speculative infrastructure, but requires ongoing editorial effort of 10 questions per day.
