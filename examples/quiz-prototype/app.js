const app = document.querySelector("#app");
const totalScoreElement = document.querySelector("#total-score");
const summaryDialog = document.querySelector("#summary-dialog");
const summaryContent = document.querySelector("#summary-content");

const state = {
  quiz: null,
  view: "start",
  questionIndex: 0,
  screenIndex: 0,
  attempts: 0,
  results: [],
  feedback: "",
  feedbackKind: ""
};

const formatPrice = (price) => new Intl.NumberFormat("tr-TR").format(price);
const currentQuestion = () => state.quiz.questions[state.questionIndex];
const currentStars = () => Math.max(0, 10 - state.attempts);
function totalScore() {
  if (!state.quiz) return 100;
  const completedScore = state.results.reduce((sum, stars) => sum + stars, 0);
  if (state.questionIndex >= state.quiz.questions.length) return completedScore;
  const futureScore = (state.quiz.questions.length - state.questionIndex - 1) * 10;
  const currentScore = state.results.length > state.questionIndex ? 0 : currentStars();
  return completedScore + currentScore + futureScore;
}

function updateTotalScore() {
  totalScoreElement.textContent = String(totalScore());
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function progressMarkup() {
  return `
    <div class="game-top">
      <div class="game-meta">
        <span>SORU ${state.questionIndex + 1} / ${state.quiz.questions.length}</span>
        <span class="question-stars">★ ${currentStars()} yıldız</span>
      </div>
      <div class="progress-track" aria-label="Quiz ilerlemesi">
        ${state.quiz.questions.map((_, index) => `<span class="progress-segment ${index < state.questionIndex ? "done" : index === state.questionIndex ? "current" : ""}"></span>`).join("")}
      </div>
    </div>`;
}

function renderStart() {
  app.innerHTML = `
    <section class="start-view card">
      <div class="hero-art">
        <div class="hero-emoji">🤔</div>
        <span class="sticker">BUGÜNÜN 10 FİYATI</span>
      </div>
      <div class="start-copy">
        <h1>Fiyatları gerçekten <em>biliyor musun?</em></h1>
        <p>İpuçlarını incele, fiyatı tahmin et. Her yanlış tahmin bir yıldıza mal olur.</p>
        <button class="primary-button" data-action="start">Hadi başlayalım <span aria-hidden="true">→</span></button>
      </div>
    </section>`;
}

function infoIcon(screen) {
  const value = `${screen.label || ""} ${screen.content || ""}`.toLocaleLowerCase("tr");
  if (value.includes("konut") || value.includes("daire")) return "🏠";
  if (value.includes("konser")) return "🎤";
  if (value.includes("yeme") || value.includes("dondurma")) return "🍦";
  if (value.includes("otomobil")) return "🚙";
  if (value.includes("bebek")) return "👶";
  if (value.includes("restoran")) return "🍽️";
  if (value.includes("teknoloji")) return "📱";
  if (value.includes("tatil")) return "🏖️";
  if (value.includes("spor")) return "⚽";
  if (value.includes("hizmet")) return "🧹";
  return "✦";
}

function renderInformation() {
  const question = currentQuestion();
  const screen = question.information[state.screenIndex];
  const isImage = screen.type === "image";
  const isHighlight = screen.type === "highlight";
  const body = isImage
    ? `<img class="info-image" src="${escapeHtml(screen.imagePath)}" alt="${escapeHtml(screen.imageAlt)}">
       ${screen.label ? `<p class="info-label">${escapeHtml(screen.label)}</p>` : ""}
       ${screen.content ? `<p class="info-content">${escapeHtml(screen.content)}</p>` : ""}`
    : `${isHighlight ? `<div class="highlight-icon">${infoIcon(screen)}</div>` : ""}
       ${screen.label ? `<p class="info-label">${escapeHtml(screen.label)}</p>` : ""}
       <p class="info-content">${escapeHtml(screen.content)}</p>`;

  app.innerHTML = `${progressMarkup()}
    <section class="question-card card">
      <header class="question-heading">
        <div><span class="eyebrow">İPUÇLARINI TOPLA</span><h1>${escapeHtml(question.title)}</h1></div>
        ${state.screenIndex > 0 ? '<button class="ghost-button" data-action="summary">Bildiklerim</button>' : ""}
      </header>
      <div class="screen-area">
        <div class="info-screen ${isHighlight ? "highlight" : ""}">${body}</div>
        <footer class="screen-footer">
          <div class="step-dots">${question.information.map((_, index) => `<span class="step-dot ${index === state.screenIndex ? "active" : ""}"></span>`).join("")}</div>
          <button class="primary-button" data-action="next-info">${state.screenIndex === question.information.length - 1 ? "Tahmin zamanı" : "Devam et"} →</button>
        </footer>
      </div>
    </section>`;
}

function starsMarkup(stars) {
  return Array.from({ length: 10 }, (_, index) => `<span class="${index >= stars ? "lost" : ""}">★</span>`).join("");
}

function renderGuess() {
  updateTotalScore();
  const question = currentQuestion();
  app.innerHTML = `${progressMarkup()}
    <section class="question-card card">
      <header class="question-heading">
        <div><span class="eyebrow">TÜM İPUÇLARI AÇILDI</span><h1>${escapeHtml(question.title)}</h1></div>
        <button class="ghost-button" data-action="summary">Bildiklerim</button>
      </header>
      <form class="screen-area guess-screen" id="guess-form">
        <div class="guess-burst">💸</div>
        <h2>${escapeHtml(question.prompt)}</h2>
        <p class="guess-hint ${state.feedbackKind}">${state.feedback || "Pozitif bir tam sayı gir."}</p>
        <div class="price-wrap">
          <input id="price-input" name="price" inputmode="numeric" autocomplete="off" placeholder="0" aria-label="Fiyat tahmini">
          <span>TL</span>
        </div>
        <div class="attempt-stars" aria-label="Kalan yıldızlar">${starsMarkup(currentStars())}</div>
        <button class="primary-button" type="submit">Tahmin et</button>
      </form>
    </section>`;
  document.querySelector("#price-input").focus();
}

function renderReveal(success) {
  updateTotalScore();
  const question = currentQuestion();
  const stars = state.results.at(-1);
  app.innerHTML = `${progressMarkup()}
    <section class="reveal-view card">
      <div class="reveal-icon ${success ? "" : "failed"}">${success ? "✓" : "!"}</div>
      <span class="eyebrow">${success ? "BULDUN!" : "BU KEZ OLMADI"}</span>
      <h1>${success ? "Tam isabet!" : "Cevabı görelim"}</h1>
      <p>${success ? `${state.attempts + 1}. tahminde doğru aralığı yakaladın.` : "On tahmin hakkını kullandın."}</p>
      <div class="actual-price"><small>Gerçek fiyat</small><strong>${formatPrice(question.targetPrice)} TL</strong></div>
      <div class="earned-stars">${starsMarkup(stars)}<br>${stars} yıldız kazandın</div>
      <button class="primary-button" data-action="next-question">${state.questionIndex === state.quiz.questions.length - 1 ? "Sonucu gör" : "Sıradaki soru"} →</button>
    </section>`;
}

function renderResults() {
  const score = state.results.reduce((sum, value) => sum + value, 0);
  app.innerHTML = `
    <section class="result-view card">
      <span class="eyebrow">BUGÜNÜN SONUCU</span>
      <h1>Fiyat radarı tamamlandı!</h1>
      <div class="result-score"><strong>${score}</strong><span>/ 100</span></div>
      <p>${score >= 80 ? "Piyasayı senden sormak lazım. 🔥" : score >= 50 ? "Hiç fena değil, fiyat radarın çalışıyor!" : "Bugünün fiyatları ters köşe yaptı!"}</p>
      <div class="result-grid">
        ${state.results.map((stars, index) => `<div class="result-row"><small>${index + 1}</small><div>${starsMarkup(stars)}</div></div>`).join("")}
      </div>
      <button class="secondary-button" data-action="restart">Baştan oyna</button>
    </section>`;
}

function render() {
  updateTotalScore();
  if (state.view === "start") renderStart();
  if (state.view === "info") renderInformation();
  if (state.view === "guess") renderGuess();
  if (state.view === "results") renderResults();
}

function showSummary() {
  const question = currentQuestion();
  const visibleCount = state.view === "guess" ? question.information.length : state.screenIndex + 1;
  summaryContent.innerHTML = question.information.slice(0, visibleCount).map((screen) => `
    <div class="summary-item">
      <span>${infoIcon(screen)}</span>
      <div><small>${escapeHtml(screen.label || "Görsel")}</small><strong>${escapeHtml(screen.content || screen.imageAlt)}</strong></div>
    </div>`).join("");
  summaryDialog.showModal();
}

function submitGuess(form) {
  const rawValue = new FormData(form).get("price").replaceAll(/[^0-9]/g, "");
  const guess = Number(rawValue);
  if (!Number.isSafeInteger(guess) || guess <= 0) {
    state.feedback = "Geçerli bir fiyat girmelisin.";
    state.feedbackKind = "low";
    renderGuess();
    return;
  }

  const target = currentQuestion().targetPrice;
  if (Math.abs(guess - target) / target <= 0.05) {
    state.results.push(currentStars());
    renderReveal(true);
    return;
  }

  state.attempts += 1;
  if (state.attempts >= 10) {
    state.results.push(0);
    renderReveal(false);
    return;
  }

  state.feedback = guess < target ? "Daha yüksek bir fiyat dene ↑" : "Daha düşük bir fiyat dene ↓";
  state.feedbackKind = guess < target ? "high" : "low";
  renderGuess();
}

app.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "start") { state.view = "info"; render(); }
  if (action === "next-info") {
    if (state.screenIndex < currentQuestion().information.length - 1) state.screenIndex += 1;
    else state.view = "guess";
    render();
  }
  if (action === "summary") showSummary();
  if (action === "next-question") {
    state.questionIndex += 1;
    state.screenIndex = 0;
    state.attempts = 0;
    state.feedback = "";
    state.feedbackKind = "";
    state.view = state.questionIndex >= state.quiz.questions.length ? "results" : "info";
    render();
  }
  if (action === "restart" || action === "home") {
    state.view = "start";
    state.questionIndex = 0;
    state.screenIndex = 0;
    state.attempts = 0;
    state.results = [];
    state.feedback = "";
    render();
  }
});

app.addEventListener("submit", (event) => {
  if (event.target.id !== "guess-form") return;
  event.preventDefault();
  submitGuess(event.target);
});

document.addEventListener("click", (event) => {
  if (event.target.closest('[data-action="close-summary"]')) summaryDialog.close();
});
summaryDialog.addEventListener("click", (event) => {
  if (event.target === summaryDialog) summaryDialog.close();
});

fetch("content/2026-08-19.json")
  .then((response) => {
    if (!response.ok) throw new Error("Quiz verisi yüklenemedi.");
    return response.json();
  })
  .then((quiz) => { state.quiz = quiz; render(); })
  .catch(() => {
    app.innerHTML = `<section class="error-view card"><h1>Quiz açılamadı</h1><p>Bu örneği küçük bir yerel sunucuyla çalıştır:</p><code>python3 -m http.server 8080</code></section>`;
  });
