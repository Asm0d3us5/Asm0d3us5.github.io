---
layout: single
title: Projects
permalink: /_projects/
---

## Portfolio Projects

{% for project in site.projects %}
### [{{ project.title }}]({{ project.url }})

{% if project.image %}
<img src="{{ project.image }}" style="border-radius:10px;margin-bottom:0.5rem;">
{% endif %}

{{ project.excerpt | strip_html | truncate: 150 }}

---
{% endfor %}

