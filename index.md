---
layout: splash
title: Cybersecurity | Portfolio 
header:
  overlay_image: /assets/images/banner.jpg
  overlay_color: "#111"
  overlay_filter: "0.9"
---

<!-- ========================================
     DARK/LIGHT MODE TOGGLE BUTTON
     Fixed position in top-right corner
     ======================================== -->
<button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
  <i class="fas fa-moon"></i>
</button>

<!-- ========================================
     HERO SECTION
     Introduction and quick links
     ======================================== -->
## Hi, I'm Mauro 👋

Cybersecurity student passionate about DFIR, Network Security, and CTFs.  
This site documents my projects, research, and hands-on labs.

<div class="hero-buttons">
  <a href="/projects/" class="btn btn-primary">
    <i class="fas fa-folder-open"></i> View All Projects
  </a>
  <a href="/blog/" class="btn btn-secondary">
    <i class="fas fa-blog"></i> Read Blog
  </a>
  <a href="https://github.com/Asm0d3us5" class="btn btn-secondary">
    <i class="fab fa-github"></i> GitHub
  </a>
</div>

---

<!-- ========================================
     NAVIGATION CARDS
     Four main sections of the site
     ======================================== -->
## Explore

<div class="page-navigation">
  <div class="nav-card">
    <a href="/projects/">
      <div class="nav-icon">
        <i class="fas fa-folder-open"></i>
      </div>
      <h3>Projects</h3>
      <p>Security tools, DFIR cases, and academic work</p>
      <span class="nav-count">{{ site.projects.size }} projects</span>
    </a>
  </div>
  
  <div class="nav-card">
    <a href="/blog/">
      <div class="nav-icon">
        <i class="fas fa-blog"></i>
      </div>
      <h3>Blog & Writeups</h3>
      <p>TryHackMe labs, tutorials, and case studies</p>
      <span class="nav-count">{{ site.posts.size }} posts</span>
    </a>
  </div>
  
  <div class="nav-card">
    <a href="/about/">
      <div class="nav-icon">
        <i class="fas fa-user"></i>
      </div>
      <h3>About Me</h3>
      <p>My background, skills, and certifications</p>
      <span class="nav-count">Learn more</span>
    </a>
  </div>
  
  <div class="nav-card">
    <a href="/resources/">
      <div class="nav-icon">
        <i class="fas fa-book"></i>
      </div>
      <h3>Resources</h3>
      <p>DFIR tools, learning materials, and references</p>
      <span class="nav-count">Explore</span>
    </a>
  </div>
</div>

---

<!-- ========================================
     CURRENT FOCUS SECTION
     What I'm currently working on
     ======================================== -->
## What I'm Working On

<div class="focus-grid">
  <div class="focus-section">
    <h4>🔍 Current Focus</h4>
    <ul>
      <li>Digital Forensics & Incident Response</li>
      <li>Network Security Analysis</li>
      <li>TryHackMe Labs</li>
    </ul>
  </div>
  
  <div class="focus-section">
    <h4>🛠️ Tools & Skills</h4>
    <div class="portfolio-tags">
      <span>Wireshark</span>
      <span>Autopsy</span>
      <span>FTK</span>
      <span>Volatility</span>
      <span>Python</span>
      <span>Linux</span>
    </div>
  </div>
</div>

---

<!-- ========================================
     FEATURED PROJECTS
     Showcase top 3 projects
     ======================================== -->
## Featured Projects

<div class="portfolio-grid">
{% assign featured = site.projects | slice: 0, 3 %}
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
        
        {% if project.difficulty %}
        <span class="difficulty-badge difficulty-{{ project.difficulty | downcase }}">{{ project.difficulty }}</span>
        {% endif %}
        
        {% if project.platform %}
        <span class="platform-badge">{{ project.platform }}</span>
        {% endif %}
        
        <p>{{ project.excerpt | strip_html | truncate: 110 }}</p>

        {% if project.tags %}
        <div class="portfolio-tags">
          {% for tag in project.tags limit: 4 %}
            <span>{{ tag }}</span>
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

<!-- ========================================
     LATEST WRITING
     Recent blog posts and writeups
     ======================================== -->
## Latest Writing

<div class="portfolio-grid">
{% for post in site.posts limit:3 %}
  <div class="portfolio-card">
    <a href="{{ post.url }}">
      {% if post.image %}
        <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
      {% else %}
        <img src="/assets/images/default-post.png" alt="{{ post.title }}">
      {% endif %}
      
      <div class="portfolio-content">
        <h3>{{ post.title }}</h3>
        
        {% if post.difficulty %}
        <span class="difficulty-badge difficulty-{{ post.difficulty | downcase }}">{{ post.difficulty }}</span>
        {% endif %}
        
        {% if post.platform %}
        <span class="platform-badge">{{ post.platform }}</span>
        {% endif %}
        
        <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
        
        {% if post.tags %}
        <div class="portfolio-tags">
          {% for tag in post.tags limit: 3 %}
            <span>{{ tag }}</span>
          {% endfor %}
        </div>
        {% endif %}
        
        <p class="post-date">
          <i class="far fa-calendar"></i> {{ post.date | date: "%B %d, %Y" }}
        </p>
      </div>
    </a>
  </div>
{% endfor %}
</div>

<div class="section-cta">
  <a href="/blog/" class="btn btn-secondary">All Posts →</a>
</div>

---

<!-- ========================================
     CONTACT SECTION
     Get in touch links
     ======================================== -->
<div class="contact-section">
  <h2>Get In Touch</h2>
  <p class="contact-description">
    Interested in collaboration or have questions about my work?
  </p>
  <div class="contact-buttons">
    <a href="https://github.com/Asm0d3us5" class="btn btn-secondary">
      <i class="fab fa-github"></i> GitHub
    </a>
    <a href="https://www.linkedin.com/in/mauro-sunda-29aa02263" class="btn btn-secondary">
      <i class="fab fa-linkedin"></i> LinkedIn
    </a>
    <a href="mailto:your.email@example.com" class="btn btn-primary">
      <i class="fas fa-envelope"></i> Contact Me
    </a>
  </div>
</div>

<!-- ========================================
     DARK/LIGHT MODE TOGGLE SCRIPT
     Handles theme switching with localStorage
     ======================================== -->
<script>
(function() {
  'use strict';
  
  // Get DOM elements
  const toggleButton = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Theme configuration
  const THEME_KEY = 'mauro-portfolio-theme';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };
  
  const ICONS = {
    LIGHT: '<i class="fas fa-moon"></i>',
    DARK: '<i class="fas fa-sun"></i>'
  };
  
  /**
   * Get saved theme from localStorage or system preference
   * @returns {string} 'light' or 'dark'
   */
  function getSavedTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    
    // Default to light
    return THEMES.LIGHT;
  }
  
  /**
   * Apply theme to document
   * @param {string} theme - 'light' or 'dark'
   */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    toggleButton.innerHTML = theme === THEMES.DARK ? ICONS.DARK : ICONS.LIGHT;
    toggleButton.setAttribute('aria-label', `Switch to ${theme === THEMES.DARK ? 'light' : 'dark'} mode`);
  }
  
  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    
    // Apply new theme
    applyTheme(newTheme);
    
    // Save to localStorage
    localStorage.setItem(THEME_KEY, newTheme);
    
    // Add animation class
    toggleButton.classList.add('theme-toggle-active');
    setTimeout(() => {
      toggleButton.classList.remove('theme-toggle-active');
    }, 300);
  }
  
  // Initialize theme on page load
  const initialTheme = getSavedTheme();
  applyTheme(initialTheme);
  localStorage.setItem(THEME_KEY, initialTheme);
  
  // Add event listener
  toggleButton.addEventListener('click', toggleTheme);
  
  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const systemTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
      applyTheme(systemTheme);
      localStorage.setItem(THEME_KEY, systemTheme);
    });
  }
})();
</script>

<!-- ========================================
     ADDITIONAL STYLES
     Inline styles for elements not in CSS
     ======================================== -->
<style>
/* Hero Buttons Container */
.hero-buttons {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Focus Grid (What I'm Working On) */
.focus-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.focus-section ul {
  line-height: 1.8;
  margin: 0.5rem 0;
}

.focus-section h4 {
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

/* Section Call-to-Action */
.section-cta {
  text-align: center;
  margin-top: 2rem;
}

/* Post Date */
.post-date {
  font-size: 0.85rem;
  opacity: 0.6;
  margin-top: 0.5rem;
}

/* Contact Section */
.contact-section {
  text-align: center;
  padding: 2rem 0;
}

.contact-description {
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

.contact-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Theme Toggle Active Animation */
.theme-toggle-active {
  animation: spin 0.3s ease-in-out;
}

@keyframes spin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-buttons {
    flex-direction: column;
  }
  
  .hero-buttons .btn {
    width: 100%;
    text-align: center;
  }
  
  .focus-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>