---
layout: splash
title: Projects
permalink: /projects/
---

## Portfolio Projects

<div class="portfolio-grid">
{% for project in site.projects %}
  <div class="portfolio-card">
    <a href="{{ project.url }}">
      {% if project.image %}
        <img src="{{ project.image }}" alt="{{ project.title }}">
      {% endif %}
    </a>
    <div class="portfolio-content">
      <h3><a href="{{ project.url }}">{{ project.title }}</a></h3>
      <p>{{ project.excerpt | strip_html | truncate: 140 }}</p>
      {% if project.tags %}
      <div class="portfolio-tags">
        {% for tag in project.tags %}
          <span>{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div>
