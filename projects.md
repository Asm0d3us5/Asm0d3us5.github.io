---
layout: splash
title: Projects
permalink: /projects/
---

## Portfolio Projects

{% for project in site.projects %}
### [{{ project.title }}]({{ project.url }})

{% if project.image %}
<img src="{{ project.image }}" style="border-radius:10px;margin-bottom:0.5rem;">
{% endif %}

{% if project.tags %}
<div class="tags">
  {% for tag in project.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
</div>
{% endif %}

{{ project.excerpt | strip_html | truncate: 150 }}

---
{% endfor %}

