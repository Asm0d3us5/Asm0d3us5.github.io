---
title: "SOC Phishing Analysis Lab"
date: 2026-06-13
excerpt: "Self-contained SOC environment for end-to-end phishing email analysis using free and open-source tools — eml_analyzer, VirusTotal, URLScan, AbuseIPDB, sandboxing, and a custom Python IOC report generator."
header:
  teaser: /assets/images/projects/soc-phishing-lab-banner.jpg
tags: [DFIR,SOC,Phishing,Docker,Python,Threat Intel,MITRE ATT&CK,Email Forensics]
difficulty: Intermediate
category: Personal Lab
toc: true
---

## Overview

A self-contained Security Operations Centre (SOC) lab built on Ubuntu in VirtualBox, designed to analyse real phishing emails end-to-end using exclusively free and open-source tools. The lab covers every phase of a real analyst workflow — from receiving a suspicious email through to delivering a structured IOC report ready for escalation.

A dedicated Outlook honeypot inbox was used to collect live phishing and spam samples, which were then triaged, investigated, and documented using the full tool stack below.

Unit Personal Project

PlatformUbuntu 24.04 · VirtualBox · Docker

Date2026

---

## Objectives

- Build a production-style phishing analysis workflow using only free tools
- Develop hands-on proficiency with email header forensics, URL investigation, and payload sandboxing
- Automate IOC report generation with a custom Python CLI tool
- Analyse real phishing samples collected from a live honeypot inbox
- Map findings to MITRE ATT&CK TTPs

---

## Lab Architecture

The full lab runs inside a VirtualBox VM with Docker providing the eml_analyzer web interface. Network isolation ensures no malicious content can reach the host machine.

```
Host Machine (Windows/macOS)
└── VirtualBox VM (Ubuntu 24.04)
    ├── Docker
    │   ├── eml_analyzer      → localhost:8000
    │   ├── Redis              → internal only
    │   └── SpamAssassin       → internal only
    ├── ioc_report_generator.py
    └── Outlook honeypot inbox (browser)
```

---

## Analysis Workflow

| Phase | Action | Primary Tool |
|-------|--------|-------------|
| 01 — Triage | Receive email, save as .eml, open in eml_analyzer | eml_analyzer |
| 02 — Headers | Validate SPF/DKIM/DMARC, trace relay hops | MxToolbox |
| 03 — URLs / IPs | Safe URL detonation, IP reputation scoring | URLScan.io · AbuseIPDB |
| 04 — Payload | File hash lookup, sandbox detonation, MITRE mapping | Any.Run · Hybrid Analysis |
| 05 — Report | Generate structured IOC report, document actions taken | Python CLI tool |

---

## Tool Stack

**eml_analyzer (ninoseki) — Self-hosted via Docker**
The primary .eml parsing engine. Runs at `localhost:8000` inside the VM — parses email files and automatically extracts headers, URLs, IPs, domains, attachment hashes, OLE macro indicators, and SpamAssassin spam scores. Chosen over cloud-based alternatives because nothing leaves the machine.

```bash
git clone https://github.com/ninoseki/eml_analyzer.git
cd eml_analyzer
docker compose up -d
# Available at http://localhost:8000
```

**MxToolbox** — SPF, DKIM, DMARC validation and blacklist checks. First stop for every header analysis.

**Google Admin Toolbox** — Visualises email routing hops and delivery timestamps to identify spoofed relay chains.

**VirusTotal** — 70+ AV engines for URL, domain, IP, and file hash reputation across all investigations.

**URLScan.io** — Safe URL detonation without exposing the analyst. Captures full page screenshots, redirect chains, and DOM snapshots.

**Any.Run** — Interactive sandbox for live file detonation with real-time process tree and network connection visibility.

**Hybrid Analysis** — CrowdStrike Falcon-powered deep analysis with automatic MITRE ATT&CK TTP mapping.

**AbuseIPDB** — Community-driven IP reputation database. Cross-referenced against every sender and C2 IP found in samples.

**Shodan** — Infrastructure pivoting to identify attacker hosting, open services, and SSL cert reuse across campaigns.

**CyberChef** — In-browser decoding for Base64 email bodies, obfuscated URLs, and IOC defanging.

---

## IOC Report Generator

A custom Python CLI tool that walks through every investigation field interactively and outputs a structured `.txt` report.

**Key features:**
- Auto-increments Case IDs (`PHI-2026-0001`, `PHI-2026-0002`...) by scanning existing reports in the working directory
- Auto-defangs all URLs and domains on input (`https://evil.com` → `hxxps://evil[.]com`)
- Accepts multiple values for URLs, IPs, domains, and filenames — each listed on its own indented line
- Interactive severity picker (LOW / MEDIUM / HIGH / CRITICAL)
- MITRE ATT&CK TTP field with default suggestion
- Actions-taken checklist with y/n prompts
- Zero external dependencies — standard library only

```bash
python3 ioc_report_generator.py
```

**Sample output structure:**

```
========================================
PHISHING EMAIL ANALYSIS REPORT
========================================
CASE_ID       : PHI-2026-0001
ANALYST       : Mauro Sunda
DATE          : 2026-02-16 10:24 UTC
SEVERITY      : MEDIUM

-- EMAIL METADATA --
Subject       : Aviso final: Límite de capacidad excedido 💾
From (address): NO-REPLY@SWEFVLB
Reply-To      : reply_to@SwEfvlB

-- AUTHENTICATION --
SPF           : NONE
DKIM          : NONE
DMARC         : NONE
Originating IP: 20.215.67.24

-- INDICATORS OF COMPROMISE --
URLs          :
                (none identified in headers)
Domains       :
                eleganteviaggio[.]it
                SwEfvlB[.]com
IPs           :
                20.215.67.24

-- ANALYSIS SUMMARY --
Attack Type   : Credential Harvest
Technique     : Urgency
MITRE ATT&CK  : T1566.002 - Spearphishing Link

-- ACTIONS TAKEN --
[X] Block sender domain at email gateway
[X] Submit IOCs to threat intel platform
[ ] Escalate to IR team (malware confirmed)
```

---

## Live Sample Analysis — PHI-2026-0001

A real phishing email collected from the Outlook honeypot inbox, fully investigated using the lab workflow.

**Email overview:**

| Field | Value |
|-------|-------|
| Subject | "Aviso final: Límite de capacidad excedido 💾 nH6xa" |
| Language | Spanish — regional targeting |
| Lure | Storage limit exceeded — urgency trigger |
| Received | 2026-02-16 10:24 UTC |

**Authentication findings:**

| Check | Result | Significance |
|-------|--------|-------------|
| SPF | NONE | Sending domain has no SPF record |
| DKIM | NONE | Email not cryptographically signed |
| DMARC | NONE | No policy on sender domain |
| MS SCL Score | 9/9 | Microsoft flagged as maximum-confidence spam |

**Infrastructure analysis:**

| IOC | Value | Notes |
|-----|-------|-------|
| Originating IP | `20.215.67.24` | Microsoft Azure — cloud abuse to bypass IP blacklists |
| Sending domain | `9bxp.eleganteviaggio.it` | Compromised legitimate Italian travel site used as relay |
| Reply-To | `reply_to@SwEfvlB` | Fake domain — complete mismatch with sender |
| Return-Path | `<>` (empty) | Deliberately suppressed to hinder tracking |

**Key findings:**

All three email authentication mechanisms failed — no SPF record, no DKIM signature, no DMARC policy. The attacker routed the email through a compromised Italian travel website (`eleganteviaggio.it`) hosted on Microsoft Azure infrastructure, a common tactic to abuse the trusted reputation of cloud IP ranges and bypass basic blacklists.

The Reply-To address (`reply_to@SwEfvlB`) uses a completely fabricated domain with no relationship to the sender, indicating the attacker wanted replies routed to a separate collection point. The Spanish-language subject line suggests a targeted regional campaign using a storage-limit urgency lure to prompt credential submission.

**MITRE ATT&CK mapping:**

| Technique | ID | Description |
|-----------|-----|-------------|
| Phishing | T1566.002 | Spearphishing Link — credential harvest via urgency lure |
| Compromise Infrastructure | T1584 | Compromised legitimate domain used as relay |
| Obfuscate Infrastructure | T1665 | Cloud IP abuse to evade reputation checks |

---

## Setup Challenges & Solutions

| Challenge | Root Cause | Solution |
|-----------|-----------|---------|
| VirtualBox clipboard not working | Guest Additions not installed | Installed via ISO after adding `build-essential`, `dkms`, `linux-headers` |
| `docker-compose` permission denied | User not in docker group | `sudo usermod -aG docker $USER` + `newgrp docker` |
| `group 'docker' does not exist` | Partial Docker install | Full reinstall via official Docker CE apt repository |
| Port 6379 / 8000 / 783 conflicts | Leftover docker-proxy from previous failed run | `sudo systemctl restart docker` to clear all proxy processes |
| inotify watch limit | Default Linux kernel limit too low | `echo fs.inotify.max_user_watches=524288 \| sudo tee -a /etc/sysctl.conf` |

Documenting these issues is deliberate — troubleshooting is core SOC work, and the ability to methodically diagnose and resolve infrastructure problems is as important as the analysis itself.

---

## Lessons Learned

- **All three auth checks failing simultaneously is a strong signal** — SPF NONE + DKIM NONE + DMARC NONE in combination with a mismatched Reply-To is near-conclusive for phishing
- **Cloud IP addresses are not clean by default** — Azure and AWS IPs appear in spam regularly because attackers spin up cheap VMs specifically to send phishing at scale
- **Compromised legitimate domains are harder to block** — blocking `eleganteviaggio.it` would have false-positive risk; blocking the specific subdomain or IP is more precise
- **eml_analyzer is a strong PhishTool replacement** — fully offline, no account needed, OLE macro detection is a genuine advantage for attachment-heavy campaigns
- **Self-hosting analysis tools adds a layer of operational security** — nothing about the investigation is leaked to third-party platforms during triage

---

## Tech Stack

eml_analyzer Docker MxToolbox URLScan.io VirusTotal AbuseIPDB Any.Run Hybrid Analysis Shodan CyberChef Python Ubuntu VirtualBox MITRE ATT&CK
