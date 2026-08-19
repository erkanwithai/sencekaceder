# Sence Kaç Eder?

A Turkish, mobile-first daily price guessing game inspired by Wordle. Every evening, players receive the same 10-question quiz and try to find each price using higher/lower feedback.

## Status

Product and architecture definition are complete. An exploratory, fully playable 10-question UI prototype lives in [`examples/quiz-prototype`](examples/quiz-prototype) and is temporarily deployed to [sencekaceder.com](https://sencekaceder.com) for product review. Its content, images, and visual details are intentionally rough and will be refined iteratively; neither the prototype nor its deployment workflow is the production implementation.

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

## Exploratory prototype

To review the current interaction concept:

```sh
cd examples/quiz-prototype
python3 -m http.server 8080
```

Then open <http://localhost:8080>. No project-wide development command surface has been established yet.

Pushes to `main` that change the prototype temporarily deploy it to GitHub Pages. This review workflow will be replaced by the dated production build and scheduled deployment described in the implementation plan.
