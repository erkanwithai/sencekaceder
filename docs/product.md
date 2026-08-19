# Product Definition

## Problem

Prices across everyday and aspirational categories are difficult to judge and often surprising. Sence Kaç Eder? turns that curiosity into a short daily ritual: players inspect an item's details, estimate its price, and refine their estimate using simple higher/lower feedback.

## Target users

The primary audience is Turkish-speaking casual web users looking for a quick, entertaining daily game. The game should require no prior knowledge, account, or onboarding and should work especially well on mobile.

## Product principles

- **Daily and shared:** everyone receives the same game for a given date.
- **Simple:** the rules should be understandable by playing the first question.
- **Surprising:** content should encourage “Vay be, bunun fiyatı bu muymuş?” reactions.
- **Broad:** questions may cover homes, cars, event tickets, hotels, baby products, cosmetics, and other categories.
- **Polished:** the visual treatment should feel playful, fancy, and app-like rather than like a plain form.
- **Iterative:** validate the core loop before adding supporting features.

## Core workflow

1. The player opens the current daily quiz and sees a concise start screen before beginning.
2. The game keeps the 10-question progression and current total stars visible while playing.
3. The player advances through a question's information screens using a clear button.
4. Information may be text, a prominent fact, or a locally hosted image. The number and order of screens may differ by question.
5. The player can reopen a summary of information already shown.
6. After all information is presented, the game gives the question a distinct “Sence kaç eder?” moment and asks for a positive whole-number price in Turkish lira.
7. If the guess is within ±5% of the target, the question succeeds and the actual price is revealed.
8. Otherwise, the game says only that the player should guess higher or lower. One star is lost, the visible score responds, and the player tries again.
9. The question ends when the player succeeds or uses all 10 attempts. The actual price is then shown.
10. After 10 questions, the player sees a 10-row star result and a score out of 100.
11. Refreshing the page restores in-progress or completed state on the same browser.

## Experience and content direction

- A quiz should feel varied, moving across categories such as housing, events, food, cars, baby products, restaurants, technology, travel, sport, and everyday services.
- Each question should use a small set of concise, price-relevant facts rather than a long specification sheet.
- Questions may use tailored prompts such as “Sence bir top dondurma kaç TL?” instead of repeating one generic sentence everywhere.
- Images should clarify the exact subject, place, product, seat, or atmosphere. A technically valid but weakly matched image is not finished content.
- The price reveal should feel playful and dramatic, while higher/lower feedback must remain immediately understandable.
- Visual design will be refined through playable reviews. Early prototype screens establish a discussion surface, not an approved final system.

## Scoring

- Each question starts with 10 stars.
- A correct first guess earns 10 stars.
- Each valid but unsuccessful guess removes one star.
- Success is inclusive of the target price's ±5% range.
- Success on the tenth attempt earns 1 star.
- Ten unsuccessful attempts earn 0 stars.
- The daily score is the sum of all question stars, with a maximum of 100.
- The result visualization has 10 rows with 10 possible star positions per row, showing earned and lost stars.

## MVP scope

- One Turkish daily quiz identified by date
- Exactly 10 questions in a production quiz
- Flexible, progressively presented text and image information
- Positive whole-TL price entry with readable formatting
- Higher/lower feedback and ±5% success rule
- Ten-attempt star scoring
- Actual-price reveal
- Daily 100-star result
- Browser-local progress persistence
- Mobile-first, app-like presentation that also works on modern desktop browsers
- Static, crawlable HTML with basic SEO metadata
- Date-based content stored in the repository
- Automated GitHub Pages deployment around 21:00 Turkey time

## Deferred but recorded

- Shareable Wordle-like result text
- Web Share API with clipboard fallback
- Privacy-conscious basic traffic and completion analytics

These should be considered only after the core loop is validated.

## Explicit non-goals

- User accounts or cross-device synchronization
- Backend services or a database
- Leaderboards, social profiles, comments, or multiplayer features
- Strong enforcement of one play per person
- Preventing users from inspecting answers in the public repository or static assets
- An archive for playing previous quizzes
- An administration panel
- Automated content sourcing or generation
- Multiple languages or currencies
- Prizes, payments, or real-money mechanics
- Video, maps, carousels, or third-party content embeds
- Precise publication guarantees at exactly 21:00

## Content operations

Initial quiz content and graphics will be supplied manually by the product owner. Each dated quiz is committed to the repository. Content automation is a later concern and must not shape the initial implementation.

The production deploy should fail without replacing the live site when the expected dated quiz is missing. The previous quiz remains available.

## Privacy and security

- No personal data is required.
- Game state is stored only in browser local storage.
- The MVP uses no cookies or third-party analytics.
- There is no meaningful anti-cheat requirement.
- Client-side answers are inherently inspectable and this is accepted.

## Expected scale

Initially, hundreds of daily users. A static GitHub Pages deployment is expected to be sufficient.

## Acceptance criteria

1. A player can complete the entire game on a modern mobile or desktop browser without an account.
2. A production quiz contains 10 questions and each question can have a different number and mix of information screens.
3. Previously shown information can be reviewed without resetting the question.
4. A valid guess receives deterministic success, higher, or lower feedback.
5. Inclusive ±5% guesses succeed; unsuccessful valid guesses each remove one star.
6. No question accepts more than 10 guesses.
7. The actual price is shown when a question ends.
8. The final result correctly displays each question's stars and the total out of 100.
9. Refreshing does not reset progress for the current dated quiz.
10. A new dated build does not reuse the prior quiz's saved progress.
11. The UI is Turkish, mobile-first, visually polished, and usable on desktop.
12. The delivered page is static HTML with useful title, description, canonical, and social metadata; core content does not depend on client-side rendering.
13. A missing daily content file causes deployment to fail while leaving the existing GitHub Pages deployment intact.
