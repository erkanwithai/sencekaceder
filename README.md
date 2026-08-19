# Sence Kaç Eder?

A Turkish, mobile-first daily price guessing game inspired by Wordle. Every evening, players receive the same 10-question quiz and try to find each price using higher/lower feedback.

## Status

Product definition and architecture only. The application has not been implemented yet.

## Product summary

- One new quiz each day around 21:00 Turkey time
- 10 questions covering broad categories such as homes, cars, tickets, hotels, and consumer products
- Progressive presentation of the facts that define each item
- Up to 10 price guesses per question
- Success when a guess is within ±5% of the target price
- A maximum of 10 stars per question and 100 stars per quiz
- No accounts, backend, leaderboard, or anti-cheat system

The interface and content are Turkish. Source code and technical documentation are English.

## Planned platform

A framework-free static site deployed to GitHub Pages by GitHub Actions. Future quizzes live in the public repository, while only one quiz is included in each deployment.

See [product requirements](docs/product.md), [architecture](docs/architecture.md), and the [implementation plan](docs/plan.md).
