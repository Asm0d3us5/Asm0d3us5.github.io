---
layout: splash
title: Mauro Sunda | Cybersecurity Portfolio
layout: splash
author_profile: false
header:
  overlay_color: "#000"
  overlay_filter: "0.6"
  overlay_image: /assets/images/banner.jpg
excerpt: Cybersecurity student focused on Digital Forensics, Incident Response, Network Security, and hands-on security labs.
feature_row:
  - image_path: /assets/images/project1.jpg
    alt: Digital Forensics
    title: Digital Forensics
    excerpt: USB analysis, hash verification, file recovery, password cracking.
    url: /projects/
    btn_label: View Projects
    btn_class: btn--primary
  - image_path: /assets/images/project2.jpg
    alt: CTF
    title: CTF & Labs
    excerpt: TryHackMe, custom labs, tooling experiments.
    url: /blog/
    btn_label: Read Writeups
    btn_class: btn--primary
  - image_path: /assets/images/project3.jpg
    alt: Machine Learning
    title: Security & ML
    excerpt: Fraud detection, anomaly detection, model evaluation.
    url: /projects/
    btn_label: Explore Work
    btn_class: btn--primary
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




