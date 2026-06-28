---
layout: home-custom
title: "Cybersecurity | Portfolio"
---

<button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
  <i class="fas fa-moon"></i>
</button>

<!-- HERO -->
<div class="hero-grid">
  <div class="hero-left">
    <div class="hero-eyebrow">// cybersecurity portfolio</div>
    <h1 class="hero-name">Mauro Sunda</h1>
    <p class="hero-role">Cybersecurity Student &middot; Deakin University &middot; Melbourne</p>
    <p class="hero-bio">DFIR specialist-in-training. Building forensics tooling, hunting threats through ELK and Wazuh, and documenting every lab along the way.</p>
    <div class="hero-buttons">
      <a href="/projects/" class="btn btn-primary"><i class="fas fa-folder-open"></i> View Projects</a>
      <a href="https://github.com/Asm0d3us5" class="btn btn-secondary"><i class="fab fa-github"></i> GitHub</a>
      <a href="/blog/" class="btn btn-secondary"><i class="fas fa-pen"></i> Blog</a>
    </div>
  </div>
  <div class="hero-right">
    <div class="status-pill"><span class="status-dot dot-green"></span>Open to opportunities</div>
    <div class="status-pill"><span class="status-dot dot-blue"></span>Deakin Cybersecurity</div>
    <div class="status-pill"><span class="status-dot dot-green"></span>TryHackMe active</div>
  </div>
</div>

---

<!-- SKILLS -->
<div class="section-label">// skills</div>

<div class="skills-grid">
  <span class="skill-tag skill-dfir">Autopsy</span>
  <span class="skill-tag skill-dfir">Volatility</span>
  <span class="skill-tag skill-dfir">FTK Imager</span>
  <span class="skill-tag skill-net">Wireshark</span>
  <span class="skill-tag skill-net">Nmap</span>
  <span class="skill-tag skill-net">Burp Suite</span>
  <span class="skill-tag skill-siem">ELK Stack</span>
  <span class="skill-tag skill-siem">Wazuh</span>
  <span class="skill-tag skill-lang">Python</span>
  <span class="skill-tag skill-lang">Bash</span>
</div>

---

<!-- FEATURED PROJECTS -->
<div class="section-label">// featured projects</div>

<div class="portfolio-grid">
{% assign featured = site.projects | sort: 'date' | reverse | slice: 0, 3 %}
{% for project in featured %}
  <div class="portfolio-card">
    <a href="{{ project.url }}">
      {% if project.image %}
        <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
      {% else %}
        <img src="/assets/images/default-project.png" alt="{{ project.title }}">
      {% endif %}
      <div class="portfolio-content">
        <h3>{{ project.title }}</h3>
        {% if project.difficulty %}<span class="difficulty-badge difficulty-{{ project.difficulty | downcase }}">{{ project.difficulty }}</span>{% endif %}
        {% if project.platform %}<span class="platform-badge">{{ project.platform }}</span>{% endif %}
        <p>{{ project.excerpt | strip_html | truncate: 110 }}</p>
        {% if project.tags %}
        <div class="portfolio-tags">
          {% for tag in project.tags limit: 4 %}
            {% assign tl = tag | downcase %}
            {% if tl == "dfir" or tl == "forensics" %}
              <span class="skill-tag skill-dfir">{{ tag }}</span>
            {% elsif tl == "aws" or tl == "network" or tl == "cloud" or tl == "ctf" %}
              <span class="skill-tag skill-net">{{ tag }}</span>
            {% elsif tl == "iac" or tl == "cloudformation" or tl == "elk" or tl == "siem" %}
              <span class="skill-tag skill-siem">{{ tag }}</span>
            {% elsif tl == "python" or tl == "bash" or tl == "wordpress" or tl == "linux" %}
              <span class="skill-tag skill-lang">{{ tag }}</span>
            {% else %}
              <span class="skill-tag skill-net">{{ tag }}</span>
            {% endif %}
          {% endfor %}
        </div>
        {% endif %}
      </div>
    </a>
  </div>
{% endfor %}
</div>

<div class="section-cta">
  <a href="/projects/" class="btn btn-primary">View All Projects →</a>
</div>

---

<!-- LATEST WRITING -->
<div class="section-label">// latest writing</div>

<div class="posts-list">
{% for post in site.posts limit:3 %}
  <a href="{{ post.url }}" class="post-row">
    <div class="post-left">
      {% if post.tags contains 'DFIR' %}
        <span class="post-type post-type-dfir">DFIR</span>
      {% elsif post.tags contains 'SOC' or post.categories contains 'SOC' %}
        <span class="post-type post-type-soc">SOC lab</span>
      {% elsif post.tags contains 'CTF' %}
        <span class="post-type post-type-ctf">CTF</span>
      {% else %}
        <span class="post-type post-type-lab">lab</span>
      {% endif %}
      <span class="post-title">{{ post.title }}</span>
    </div>
    <span class="post-date-label">{{ post.date | date: "%b %Y" }}</span>
  </a>
{% endfor %}
</div>

<div class="section-cta" style="margin-top:1.5rem;">
  <a href="/blog/" class="btn btn-secondary">All Posts →</a>
</div>

---

<!-- CONTACT -->
<div class="contact-section">
  <h2>Get In Touch</h2>
  <p class="contact-description">Interested in collaboration or have questions about my work?</p>
  <div class="contact-buttons">
    <a href="https://github.com/Asm0d3us5" class="btn btn-secondary"><i class="fab fa-github"></i> GitHub</a>
    <a href="https://www.linkedin.com/in/mauro-sunda-29aa02263" class="btn btn-secondary"><i class="fab fa-linkedin"></i> LinkedIn</a>
    <a href="mailto:MauroSunda@protonmail.com" class="btn btn-primary"><i class="fas fa-envelope"></i> Contact Me</a>
  </div>
</div>

<script>
(function () {
  'use strict';

  const btn   = document.getElementById('theme-toggle');
  const html  = document.documentElement;
  const KEY   = 'mauro-theme';

  // Minimal Mistakes dark skin adds its own background via CSS.
  // We override it by injecting a <style> tag that targets the MM classes
  // directly when data-theme="light" is set on <html>.
  function injectLightOverrides() {
    if (document.getElementById('mm-light-overrides')) return;
    const s = document.createElement('style');
    s.id = 'mm-light-overrides';
    s.textContent = `
      [data-theme="light"] body,
      [data-theme="light"] .layout--home,
      [data-theme="light"] .page,
      [data-theme="light"] .masthead,
      [data-theme="light"] .masthead__inner-wrap,
      [data-theme="light"] .greedy-nav,
      [data-theme="light"] .page__footer,
      [data-theme="light"] footer.page__footer {
        background-color: #f5f5f7 !important;
        color: #1d1d1f !important;
      }
      [data-theme="light"] .masthead a,
      [data-theme="light"] .greedy-nav a,
      [data-theme="light"] .greedy-nav .visible-links a {
        color: #1d1d1f !important;
      }
      [data-theme="light"] .page__footer {
        color: #555 !important;
      }
      [data-theme="light"] .neural-hero {
        background-color: #f5f5f7 !important;
      }
    `;
    document.head.appendChild(s);
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    btn.innerHTML = theme === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    btn.setAttribute('aria-label',
      'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    if (theme === 'light') injectLightOverrides();
  }

  function getInitial() {
    const saved = localStorage.getItem(KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  btn.addEventListener('click', function () {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(KEY, next);
    btn.classList.add('theme-toggle-active');
    setTimeout(function () { btn.classList.remove('theme-toggle-active'); }, 300);
  });

  const initial = getInitial();
  applyTheme(initial);
  localStorage.setItem(KEY, initial);

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      const t = e.matches ? 'dark' : 'light';
      applyTheme(t);
      localStorage.setItem(KEY, t);
    });
  }
})();
</script>
