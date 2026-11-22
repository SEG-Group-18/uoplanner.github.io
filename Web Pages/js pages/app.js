import { messages } from "./messages.js?v=4";

// This tells the script which page is open.
const page = document.body.dataset.page;

// These numbers are the example class times in the calendar.
const weekdays = [0, 1, 2, 3, 4];
const scheduleBlocks = [
  { day: 0, start: 60, end: 150 },
  { day: 0, start: 300, end: 390 },
  { day: 1, start: 30, end: 120 },
  { day: 1, start: 360, end: 450 },
  { day: 1, start: 510, end: 600 },
  { day: 2, start: 60, end: 150 },
  { day: 2, start: 240, end: 360 },
  { day: 3, start: 120, end: 210 },
  { day: 3, start: 330, end: 420 },
  { day: 3, start: 480, end: 600 },
  { day: 4, start: 60, end: 150 },
  { day: 4, start: 360, end: 450 },
];
const members = [
  { name: "Samuel Brownlee", image: "samuel-brownlee.png" },
  { name: "Quérèn De Souza", image: "queren-de-souza.png" },
  { name: "James Wong", image: "james-wong.png" },
  { name: "Lamar Elbakkoush", image: "lamar-elbakkoush.png" },
  { name: "Robin Ineza", image: "robin-ineza.png" },
];
const observedReveals = new WeakSet();

// Keep the language and theme the user picked.
function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The preference still applies until the page is closed.
  }
}

let locale = readPreference("uop-lang");
if (locale !== "en" && locale !== "fr") {
  locale = navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

let theme = readPreference("uop-theme");
if (theme !== "light" && theme !== "dark") {
  theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function currentMessages() {
  return messages[locale];
}

// Put the right language and page title on the page.
function applyMessages() {
  const text = currentMessages();

  document.documentElement.lang = locale;
  document.documentElement.dataset.theme = theme;
  document.title = text.pageTitles[page];

  document.querySelectorAll("[data-message]").forEach((element) => {
    element.textContent = text[element.dataset.message];
  });

  document.querySelectorAll("nav").forEach((nav) => {
    nav.setAttribute("aria-label", locale === "fr" ? "Navigation principale" : "Main navigation");
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const active = link.pathname.replace(/\/$/, "") === window.location.pathname.replace(/\/$/, "");
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
    link.classList.toggle("active", active);
  });

  const languageButton = document.querySelector(".language-button");
  languageButton.textContent = locale === "en" ? "FR" : "EN";
  languageButton.setAttribute(
    "aria-label",
    locale === "en" ? "Switch language to French" : "Passer la langue en anglais",
  );

  const themeButton = document.querySelector(".theme-button");
  themeButton.querySelector("span").textContent = theme === "light" ? "☾" : "☼";
  themeButton.setAttribute(
    "aria-label",
    theme === "light" ? "Switch to dark mode" : "Switch to light mode",
  );
}

// Draw a sample week in the calendar.
function renderCalendar() {
  const calendar = document.querySelector("#calendar");
  if (!calendar) return;

  const text = currentMessages();
  const columns = weekdays.map((day) => `
    <div class="day-column" role="group" aria-label="${text.weekdays[day]}">
      ${scheduleBlocks
        .filter((block) => block.day === day)
        .map((block) => `
          <div class="schedule-block" aria-hidden="true"
            style="top:${block.start * 0.9}px;height:${(block.end - block.start) * 0.9}px">
          </div>
        `)
        .join("")}
    </div>
  `).join("");

  const times = Array.from({ length: 15 }, (_, index) => {
    const hour = index + 8;
    const labelHour = hour % 12 || 12;
    const label = locale === "fr"
      ? `${labelHour} h`
      : `${labelHour}:00 ${hour >= 12 ? "PM" : "AM"}`;

    return `<span class="time-label" style="top:${index * 54 - 8}px">${label}</span>`;
  }).join("");

  calendar.innerHTML = `
    <section class="calendar-section" id="schedule" aria-labelledby="schedule-title">
      <div class="scroll-reveal scroll-reveal-left">
        <div class="section-heading">
          <p class="eyebrow">${text.scheduleKicker}</p>
          <h2 id="schedule-title">${text.scheduleTitle}</h2>
          <p>${text.scheduleDescription}</p>
        </div>
      </div>
      <div class="scroll-reveal scroll-reveal-scale calendar-reveal" data-reveal-delay="120">
        <div class="calendar-card">
          <div class="calendar-title-row">
            <div class="calendar-title">
              <span class="calendar-icon" aria-hidden="true">▦</span>
              <span>${text.scheduleTitle}</span>
            </div>
            <span class="calendar-badge">${text.scheduleBadge}</span>
          </div>
          <div class="calendar-scroll">
            <div class="calendar-grid">
              <div class="calendar-heading calendar-time-heading">${text.timeLabel}</div>
              ${text.weekdays.map((day) => `<div class="calendar-heading">${day}</div>`).join("")}
              <div class="time-rail" aria-hidden="true">${times}</div>
              ${columns}
            </div>
          </div>
          <div class="calendar-notes">
            <p><span class="note-dot" aria-hidden="true"></span>${text.scheduleBlocksNote}</p>
            <p>${text.scheduleNote}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Add the product features and open their details in a dialog.
function renderProductFeatures() {
  const oldList = document.querySelector("#productFeatures");
  if (!oldList) return;

  const text = currentMessages();
  const list = oldList.cloneNode(false);
  oldList.replaceWith(list);
  list.innerHTML = text.productFeatures.map((feature, index) => `
    <li style="--feature-delay:${index * 100}ms">
      <button class="feature-open-button" type="button" data-feature="${index}" aria-haspopup="dialog">
        <span class="feature-check" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        <span class="feature-copy">
          <strong>${feature.title}</strong>
          <span class="feature-detail">${feature.detail}</span>
          <span class="feature-action">${text.productFeatureAction}<span aria-hidden="true">→</span></span>
        </span>
      </button>
    </li>
  `).join("");

  const dialog = document.querySelector("#featureDialog");
  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-feature]");
    if (!button) return;

    const feature = text.productFeatures[Number(button.dataset.feature)];
    dialog.innerHTML = `
      <div class="feature-dialog-content">
        <div class="feature-dialog-heading">
          <span class="feature-dialog-count">${Number(button.dataset.feature) + 1} / ${text.productFeatures.length}</span>
          <button class="feature-dialog-close" type="button" aria-label="${text.productDialogClose}">×</button>
        </div>
        <span class="feature-dialog-icon" aria-hidden="true">${String(Number(button.dataset.feature) + 1).padStart(2, "0")}</span>
        <h2 id="featureDialogTitle">${feature.title}</h2>
        <p>${feature.detail}</p>
        <button class="feature-dialog-done" type="button">${text.productDialogClose}</button>
      </div>
    `;
    dialog.showModal();
  });
}

// Show the pricing plans and common questions.
function renderPricing() {
  const cards = document.querySelector("#pricingCards");
  if (!cards) return;

  const text = currentMessages();
  const makeFeatures = (features) => features.map((feature) => `<li>${feature}</li>`).join("");

  cards.innerHTML = `
    <article class="plan-card">
      <p class="plan-label">${text.freeName}</p>
      <h2>${text.freeName}</h2>
      <p class="plan-price">$0 <span>${text.perMonth}</span></p>
      <p class="plan-description">${text.freeDescription}</p>
      <ul class="plan-features">${makeFeatures(text.freeFeatures)}</ul>
      <a class="plan-button" href="index.html#schedule">${text.freeAction}</a>
    </article>
    <article class="plan-card plan-card-premium">
      <p class="plan-label">${text.planned}</p>
      <h2>${text.premiumName}</h2>
      <p class="plan-price">$10 <span>${text.perMonth}</span></p>
      <p class="plan-description">${text.premiumDescription}</p>
      <ul class="plan-features">${makeFeatures(text.premiumFeatures)}</ul>
      <a class="plan-button" href="#faq" aria-disabled="true">${text.premiumAction}</a>
    </article>
  `;

  cards.querySelector('[aria-disabled="true"]').addEventListener("click", (event) => {
    event.preventDefault();
  });

  document.querySelector("#faqQuestions").innerHTML = text.faqQuestions.map(({ question, answer }) => `
    <article class="faq-item">
      <h3>${question}</h3>
      <p>${answer}</p>
    </article>
  `).join("");
}

// Build the team cards and let each card flip when clicked.
function renderTeam() {
  const oldGrid = document.querySelector("#teamGrid");
  if (!oldGrid) return;

  const text = currentMessages();
  const grid = oldGrid.cloneNode(false);
  oldGrid.replaceWith(grid);
  grid.innerHTML = members.map((member, index) => {
    const challenge = text.teamChallenges[index];
    return `
      <button class="team-card" type="button" data-expanded="false" aria-expanded="false">
        <span class="team-card-inner">
          <span class="team-card-face team-card-front">
            <span class="team-member-heading">
              <img class="team-avatar" src="../../public/media/${member.image}" alt="" width="112" height="112">
              <span class="team-member-identity">
                <span class="team-card-name">${member.name}</span>
                <span class="team-member-role">${text.teamRoles?.[member.name] || text.teamRole}</span>
              </span>
            </span>
            <span class="team-member-program">${text.teamProgram}</span>
            <span class="team-member-quote">${challenge.text}</span>
            <span class="team-card-hint">${text.teamExpandAction}<span aria-hidden="true">↗</span></span>
          </span>
          <span class="team-card-face team-card-back" aria-hidden="true">
            <span class="team-card-index">0${index + 1}</span>
            <span class="team-card-name">${member.name}</span>
            <span class="team-detail-label">${text.teamProgramLabel}</span>
            <span class="team-detail-value">${text.teamProgram}</span>
            <span class="team-detail-label">${text.teamContributionLabel}</span>
            <span class="team-member-description">${text.teamContributions[member.name]}</span>
            <span class="team-card-hint">${text.teamCollapseAction}<span aria-hidden="true">↙</span></span>
          </span>
        </span>
      </button>
    `;
  }).join("");

  fitTeamCards();

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".team-card");
    if (!card) return;

    const expanded = card.dataset.expanded !== "true";
    card.dataset.expanded = String(expanded);
    card.setAttribute("aria-expanded", String(expanded));
    card.querySelector(".team-card-front").setAttribute("aria-hidden", String(expanded));
    card.querySelector(".team-card-back").setAttribute("aria-hidden", String(!expanded));
  });

}

// Make the cards taller when narrow screens wrap the text onto more lines.
function fitTeamCards() {
  document.querySelectorAll(".team-card").forEach((card) => {
    card.style.height = "";
    const front = card.querySelector(".team-card-front");
    card.style.height = `${Math.max(card.offsetHeight, front.scrollHeight + 4)}px`;
  });
}

window.addEventListener("resize", fitTeamCards);

// This helper shows a few prepared answers to questions.
function renderAssistant() {
  const root = document.querySelector("#assistant");
  const text = currentMessages();

  root.innerHTML = `
    <div class="assistant-widget">
      <section class="assistant-panel" id="planner-assistant-panel" role="dialog" aria-modal="false"
        aria-labelledby="planner-assistant-title" hidden>
        <div class="assistant-heading">
          <span class="assistant-avatar" aria-hidden="true">✦</span>
          <div>
            <h2 id="planner-assistant-title">${text.assistantTitle}</h2>
            <p>${text.assistantIntro}</p>
          </div>
          <button class="assistant-close" type="button" aria-label="${text.assistantClose}">×</button>
        </div>
        <p class="assistant-disclosure">${text.assistantDisclosure}</p>
        <div class="assistant-questions" aria-label="${text.assistantPrompt}">
          ${text.assistantQuestions.map(({ question }, index) => `
            <button type="button" data-question="${index}" aria-pressed="false">${question}</button>
          `).join("")}
        </div>
        <div class="assistant-answer" aria-live="polite">${text.assistantPrompt}</div>
      </section>
      <button class="assistant-launcher" type="button" aria-expanded="false"
        aria-haspopup="dialog" aria-controls="planner-assistant-panel">
        <span class="assistant-launcher-icon" aria-hidden="true">✦</span>
        <span>${text.assistantTitle}</span>
      </button>
    </div>
  `;

  const panel = root.querySelector(".assistant-panel");
  const launcher = root.querySelector(".assistant-launcher");
  const answer = root.querySelector(".assistant-answer");

  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    launcher.querySelector("span:last-child").textContent = open
      ? text.assistantClose
      : text.assistantTitle;
  }

  launcher.addEventListener("click", () => setOpen(panel.hidden));
  root.querySelector(".assistant-close").addEventListener("click", () => setOpen(false));
  root.querySelector(".assistant-questions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-question]");
    if (!button) return;

    root.querySelectorAll("[data-question]").forEach((item) => {
      item.classList.toggle("selected", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    answer.textContent = text.assistantQuestions[Number(button.dataset.question)].answer;
  });
}

// Fade sections in as they come into view.
function showOnScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    return;
  }

  const items = document.querySelectorAll(".scroll-reveal");
  if (!items.length) return;

  document.documentElement.classList.add("scroll-effects-ready");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach((item) => {
    if (observedReveals.has(item)) return;
    item.style.setProperty("--reveal-delay", `${item.dataset.revealDelay || 0}ms`);
    observedReveals.add(item);
    observer.observe(item);
  });
}

// Close the feature details when the user clicks outside or presses a close button.
const featureDialog = document.querySelector("#featureDialog");
if (featureDialog) {
  featureDialog.addEventListener("click", (event) => {
    if (event.target === featureDialog || event.target.closest(".feature-dialog-close, .feature-dialog-done")) {
      featureDialog.close();
    }
  });
}

// Refresh the page text and content after a language change.
function updatePage() {
  applyMessages();
  renderCalendar();
  renderProductFeatures();
  renderPricing();
  renderTeam();
  renderAssistant();
}

document.querySelector(".language-button").addEventListener("click", () => {
  locale = locale === "en" ? "fr" : "en";
  savePreference("uop-lang", locale);
  updatePage();
  showOnScroll();
});

document.querySelector(".theme-button").addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  savePreference("uop-theme", theme);
  applyMessages();
});

updatePage();
showOnScroll();
