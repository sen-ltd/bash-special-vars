/**
 * main.js — DOM interactions, search, filter, theme, language toggle.
 */

import { VARS, CATEGORIES, searchVars, filterByCategory } from './vars.js';
import { getStrings, toggleLang } from './i18n.js';

// ── State ──────────────────────────────────────────────────────
let currentLang  = 'ja';
let currentTheme = 'dark';
let activeCategory = 'all';
let searchQuery    = '';

// ── Initialise ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

function init() {
  // Restore preferences
  const savedTheme = localStorage.getItem('bash-vars-theme');
  const savedLang  = localStorage.getItem('bash-vars-lang');
  if (savedTheme) setTheme(savedTheme, false);
  if (savedLang)  setLang(savedLang,   false);

  bindEvents();
  render();
}

// ── Event binding ───────────────────────────────────────────────
function bindEvents() {
  document.getElementById('theme-toggle').addEventListener('click', () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  document.getElementById('lang-toggle').addEventListener('click', () => {
    setLang(toggleLang(currentLang));
  });

  document.getElementById('search-input').addEventListener('input', e => {
    searchQuery = e.target.value;
    render();
  });

  document.getElementById('filter-chips').addEventListener('click', e => {
    const chip = e.target.closest('[data-category]');
    if (!chip) return;
    activeCategory = chip.dataset.category;
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    render();
  });

  // Modal close
  const overlay = document.getElementById('var-modal');
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ── Render ──────────────────────────────────────────────────────
function render() {
  const s = getStrings(currentLang);
  updateStaticUI(s);
  renderCards(s);
}

function updateStaticUI(s) {
  document.getElementById('page-title').textContent   = s.title;
  document.getElementById('page-subtitle').textContent = s.subtitle;
  document.getElementById('search-input').placeholder  = s.searchPlaceholder;
  document.getElementById('lang-toggle').textContent   = s.langToggle;
  document.documentElement.lang = currentLang;

  // Update filter chips text
  const chipMap = {
    all:        s.filterAll,
    positional: s.filterPositional,
    special:    s.filterSpecial,
    expansion:  s.filterExpansion,
    env:        s.filterEnv,
    array:      s.filterArray,
    process:    s.filterProcess,
  };
  document.querySelectorAll('.filter-chip').forEach(chip => {
    const key = chip.dataset.category;
    if (chipMap[key]) chip.textContent = chipMap[key];
  });
}

function renderCards(s) {
  const grid = document.getElementById('var-grid');

  // Apply search + category filter
  let results = searchQuery ? searchVars(searchQuery, currentLang) : VARS.slice();
  if (activeCategory !== 'all') {
    results = results.filter(v => v.category === activeCategory);
  }

  // Count badge
  document.getElementById('var-count').textContent = `${results.length} ${s.varCount}`;

  if (results.length === 0) {
    grid.innerHTML = `<p class="no-results">${s.noResults}</p>`;
    return;
  }

  grid.innerHTML = results.map(v => buildCard(v, s)).join('');

  // Attach click handlers
  grid.querySelectorAll('.var-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id, s));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.id, s);
      }
    });
  });
}

function buildCard(v, s) {
  const catObj = CATEGORIES.find(c => c.id === v.category);
  const catName = catObj ? catObj.name[currentLang] : v.category;
  return `
    <article class="var-card" data-id="${v.id}" tabindex="0" role="listitem" aria-label="${escHtml(v.syntax)}">
      <div class="card-header">
        <code class="syntax-badge">${escHtml(v.syntax)}</code>
        <span class="cat-tag cat-${v.category}">${escHtml(catName)}</span>
      </div>
      <p class="card-desc">${escHtml(v.description[currentLang])}</p>
      <pre class="card-example"><code>${escHtml(v.example)}</code></pre>
    </article>
  `.trim();
}

// ── Modal ───────────────────────────────────────────────────────
function openModal(id, s) {
  const v = VARS.find(v => v.id === id);
  if (!v) return;

  const catObj  = CATEGORIES.find(c => c.id === v.category);
  const catName = catObj ? catObj.name[currentLang] : v.category;

  document.getElementById('modal-title-text').textContent = v.syntax;

  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <dl class="detail-list">
      <dt>${escHtml(s.labelCategory)}</dt>
      <dd><span class="cat-tag cat-${v.category}">${escHtml(catName)}</span></dd>

      <dt>${escHtml(s.labelDescription)}</dt>
      <dd>${escHtml(v.description[currentLang])}</dd>

      <dt>${escHtml(s.labelExample)}</dt>
      <dd>
        <div class="code-block-wrap">
          <pre class="code-block"><code>${escHtml(v.example)}</code></pre>
          <button class="copy-btn" data-copy="${escAttr(v.example)}" aria-label="${escAttr(s.copyBtn)}">${escHtml(s.copyBtn)}</button>
        </div>
      </dd>

      ${v.exampleOutput ? `
      <dt>${escHtml(s.labelOutput)}</dt>
      <dd><pre class="code-block output-block"><code>${escHtml(v.exampleOutput)}</code></pre></dd>
      ` : ''}

      ${v.notes ? `
      <dt>${escHtml(s.labelNotes)}</dt>
      <dd class="notes-text">${escHtml(v.notes[currentLang])}</dd>
      ` : ''}
    </dl>
  `.trim();

  // Copy button
  body.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        btn.textContent = s.copied;
        setTimeout(() => { btn.textContent = s.copyBtn; }, 1500);
      });
    });
  });

  const overlay = document.getElementById('var-modal');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  document.getElementById('modal-close-btn').focus();
}

function closeModal() {
  const overlay = document.getElementById('var-modal');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('open');
}

// ── Theme & lang helpers ─────────────────────────────────────────
function setTheme(theme, save = true) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  if (save) localStorage.setItem('bash-vars-theme', theme);
  const btn = document.getElementById('theme-toggle');
  btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

function setLang(lang, save = true) {
  currentLang = lang;
  if (save) localStorage.setItem('bash-vars-lang', lang);
  render();
}

// ── Util ────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
