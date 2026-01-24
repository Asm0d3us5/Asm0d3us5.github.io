---
layout: single
title: 
---

## Hi, I'm Mauro 👋

Cybersecurity student passionate about DFIR, Network Security, and CTFs.  
This site documents my projects, research, and hands-on labs.

---

## Featured Projects

{% assign featured = site.projects | slice: 0, 2 %}
{% for project in featured %}
### [{{ project.title }}]({{ project.url }})
{{ project.excerpt | strip_html | truncate: 120 }}
{% endfor %}

[View all projects →](/projects/)

---

## Latest Writing

{% for post in site.posts limit:3 %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}

[Read the blog →](/blog/)




