# ADR 0001: Framework-free static daily game

- **Status:** Accepted
- **Date:** 2026-08-19

## Context

Sence Kaç Eder? is a Turkish daily price guessing game for an initial audience of hundreds of users. It needs a polished mobile experience, static crawlable output, local progress, and one newly deployed quiz each evening. It does not need accounts, a database, an API, a CMS, strong anti-cheat controls, or automated content creation.

Quiz content will initially be prepared manually and committed by date to a public GitHub repository. Future answers being inspectable is acceptable.

## Decision

Build the product as a framework-free static web application using semantic HTML, CSS, and browser JavaScript.

Use a small build script to validate and select one dated quiz and generate a static deployment artifact. Deploy that artifact to GitHub Pages using a scheduled GitHub Actions workflow. Store player progress in versioned browser local storage keyed by quiz date.

Keep source code and technical naming in English. Keep the interface and quiz content in Turkish.

## Consequences

### Positive

- Minimal runtime and dependency footprint
- Fast delivery and page loading
- Crawlable HTML without client-side rendering
- No backend cost or operations
- Simple GitHub Pages deployment
- The architecture matches the expected scale

### Negative

- Scheduled publication depends on GitHub Actions and may be delayed
- Browser state cannot synchronize across devices
- Answers cannot be protected
- Replacing a single page provides limited historical SEO value
- Interactive code must remain organized without framework conventions
- Manual content production remains an operational bottleneck

## Alternatives considered

### React or another client-rendered SPA

Rejected because the product is small, SEO-friendly static output is preferred, and the additional runtime and build complexity provide little current value.

### SSR application with a backend

Rejected because there is no dynamic server-side behavior, identity, or database requirement.

### Ship every quiz and select by browser date

Rejected because the chosen product operation is to publish one game at a time. It would reduce CI dependence but expose all quiz data in the deployed artifact and weaken the requested deployment model.

### Static-site framework

Deferred. A framework may be reconsidered only if repeated templates, archives, or content volume create demonstrated maintenance problems.
