---
layout: journal
title: home
---
## Welcome

This is my personal cybersecurity journal where I document projects, labs, research, and learning.

## Latest Articles

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}



