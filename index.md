---
layout: splash
title: Cybersecurity | Portfolio 
header:
  overlay_image: /assets/images/banner.jpg
  overlay_color: "#111"
  overlay_filter: "0.9"
---

<!-- Dark/Light Mode Toggle -->
<button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
  <i class="fas fa-moon"></i>
</button>

## Hi, I'm Mauro 👋

Cybersecurity student passionate about DFIR, Network Security, and CTFs.  
This site documents my projects, research, and hands-on labs.

<div style="margin-top: 1.5rem;">
  <a href="/projects/" class="btn btn-primary">View All Projects</a>
  <a href="/blog/" class="btn btn-secondary">Read Blog</a>
  <a href="https://github.com/Asm0d3us5" class="btn btn-secondary">
    <i class="fab fa-github"></i> GitHub
  </a>
</div>

---

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

## What I'm Working On

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  <div>
    <h4>🔍 Current Focus</h4>
    <ul style="line-height: 1.8;">
      <li>Digital Forensics & Incident Response</li>
      <li>Network Security Analysis</li>
      <li>TryHackMe Labs</li>
    </ul>
  </div>
  
  <div>
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

<div style="text-align: center; margin-top: 2rem;">
  <a href="/projects/" class="btn btn-primary">View All Projects →</a>
</div>

---

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
        
        <p style="font-size: 0.85rem; opacity: 0.6; margin-top: 0.5rem;">
          <i class="far fa-calendar"></i> {{ post.date | date: "%B %d, %Y" }}
        </p>
      </div>
    </a>
  </div>
{% endfor %}
</div>

<div style="text-align: center; margin-top: 2rem;">
  <a href="/blog/" class="btn btn-secondary">All Posts →</a>
</div>

---

<div style="text-align: center; padding: 2rem 0;">
  <h2>Get In Touch</h2>
  <p style="opacity: 0.8; margin-bottom: 1.5rem;">
    Interested in collaboration or have questions about my work?
  </p>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
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

<!-- Dark/Light Mode Toggle Script -->
<script>
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update toggle button icon
  const toggleButton = document.getElementById('theme-toggle');
  if (currentTheme === 'dark') {
    toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Theme toggle functionality
  toggleButton.addEventListener('click', function() {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      this.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      this.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
</script>