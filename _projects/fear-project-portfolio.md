---
layout: project
title: "FEAR — Forensic Evasion and Anomaly Recognition"
date: 2026-09-23
excerpt: "Flow-metadata-only network anomaly detection comparing three unsupervised ML models, with SHAP explainability, adversarial robustness testing, and a containerized Streamlit dashboard."
tags: [Network Forensics, Machine Learning, Anomaly Detection, Explainable AI, PyTorch, Docker]
difficulty: Advanced
platform: Network Forensic
image: /assets/images/projects/fear-banner.jpg
toc: true

---

## Overview

This project was completed as part of **SIT326 Advanced Network Analytics and Forensics** at Deakin University. FEAR is a network anomaly detection system that works entirely from flow-level metadata packet size, timing, direction, and duration with no payload inspection. That makes it viable in environments where traffic is encrypted and deep packet inspection can't reach: TLS 1.3, encrypted DNS, VPN tunnels.

The project runs three unsupervised models head-to-head, layers on SHAP explainability and adversarial robustness testing, and ships the result as a Docker-containerized Streamlit dashboard for interactive triage.

<div class="project-meta-grid">
  <div class="meta-item"><span class="meta-label">Unit</span><span class="meta-val">Advanced Network Analytics and Forensics</span></div>
  <div class="meta-item"><span class="meta-label">Institution</span><span class="meta-val">Deakin University</span></div>
  <div class="meta-item"><span class="meta-label">Datasets</span><span class="meta-val">CIC-IDS2017, CIC-IoT2023</span></div>
</div>

---

## Step 1 — Research Design & Hypotheses

Three hypotheses framed the project:

- **H1** — flow-level metadata alone is sufficient for anomaly detection (no payload required)
- **H2** — the three model families perform meaningfully differently from one another, not just in headline accuracy but in failure mode
- **H3** — small, targeted feature perturbations can measurably reduce detection accuracy

Scope was tutor-confirmed: combining two topic areas (anomaly detection + adversarial robustness) is acceptable at this level, two datasets are sufficient for a PASS-level proof of concept, and three unsupervised models is a reasonable comparison set no cuts needed.

**Environment:** Ubuntu VM (VirtualBox), 4 CPU / 12 GB RAM / 50 GB.

---

## Step 2 — Model Training

All three models were trained on identical flow-level features extracted from **CIC-IDS2017**:

| Model | Type | Notes |
|---|---|---|
| Isolation Forest | Tree-based ensemble | scikit-learn implementation |
| One-Class SVM | Kernel-based boundary | Evaluated on a subsample — documented limitation due to scaling constraints |
| Autoencoder | Deep neural network | PyTorch, architecture `78-32-16-8-16-32-78`, StandardScaler-normalized inputs, MSE reconstruction loss |

```
Autoencoder architecture:
Input(78) → 32 → 16 → 8 (bottleneck) → 16 → 32 → Output(78)
Loss: MSE  |  Optimizer: Adam (lr=0.001)  |  Scaler: StandardScaler
```

![Autoencoder reconstruction error distribution — normal vs. anomalous flows](/assets/images/projects/fear/autoencoder_reconstruction_error.png)

The Autoencoder was the strongest performer overall, prioritizing **recall over precision** the correct tradeoff for forensic triage, where catching more true threats is worth tolerating some false alarms. Isolation Forest placed second, One-Class SVM third.

---

## Step 3 — Cross-Dataset Generalization

To test H1 beyond the training distribution, all three models were re-evaluated on **CIC-IoT2023** without retraining, then again after recalibration.

Generalization did **not** hold even after recalibration. Rather than treating this as a failed experiment, it's framed as a genuine finding: it demonstrates that H3-style complexity (small distributional shifts) can degrade detection just as much as deliberate adversarial perturbation, and it's a legitimate limitation to name explicitly in the writeup rather than let aggregate metrics obscure.

![Per-model performance on CIC-IDS2017 vs. CIC-IoT2023](/assets/images/projects/fear/domain_shift_comparison.png)

**Open item before final writeup:** per-attack-type recall (especially rare classes like Heartbleed) hasn't been checked , aggregate metrics can mask poor performance on edge cases like brute-force traffic, which turned out to be a feature-representation blind spot rather than a model-capacity issue.

---

## Step 4 — Explainability (SHAP)

**GradientExplainer** was chosen over DeepExplainer after DeepExplainer failed an additivity check (SHAP values didn't sum back to the model's output delta a correctness requirement, not a style preference).

![SHAP summary plot — feature impact on anomaly score](/assets/images/projects/fear/shap_summary.png)

![SHAP feature importance ranking](/assets/images/projects/fear/shap_bar_importance.png)

![SHAP waterfall — explanation for a single flagged flow](/assets/images/projects/fear/shap_waterfall_single_flow.png)

SHAP output was also used as an attack surface in Step 5 below, not just an interpretability layer.

---

## Step 5 — Adversarial Robustness Testing

Four attack strategies were run against the trained models to test H3:

| Attack | Approach | Result |
|---|---|---|
| White-box gradient attack | Perturbs input features along the model's own gradient | **~35% evasion** the only attack that meaningfully worked |
| SHAP-targeted attack | Perturbs the features SHAP ranks as most influential | Failed |
| Random noise | Unstructured perturbation | Failed |
| Full feature replacement | Wholesale substitution of feature values | Failed |

The gap between the white-box gradient attack and everything else is the headline result: explainability output (SHAP rankings) didn't translate into an effective attack vector on its own, which is a useful, non-obvious finding for anyone assuming "explainable = exploitable."

![Evasion rate comparison across attack types](/assets/images/projects/fear/robustness_evasion_comparison.png)

---

## Step 6 — Dashboard & Deployment

Results were packaged into an interactive **Streamlit** dashboard, containerized with **Docker** for reproducible deployment:

- Model comparison view (Isolation Forest vs. One-Class SVM vs. Autoencoder)
- Flagged Flows table, filterable by outcome (All / Correctly detected anomalies / Missed anomalies / Benign flows)
- Per-flow SHAP explanations for flagged anomalies ("Explain a Flow" panel)
- Adversarial test results panel

![FEAR dashboard — flagged flows, filterable by detection outcome](/assets/images/projects/fear/dashboard-flagged-flows.png)

![FEAR dashboard — per-flow SHAP waterfall explanation](/assets/images/projects/fear/dashboard-explain-flow.png)

---

## Outcomes:
  - "Compared three unsupervised models (Isolation Forest, One-Class SVM, Autoencoder) on identical flow-level features"
  - "Achieved detection using flow metadata alone — no payload decryption required"
  - "Quantified adversarial robustness: ~35% evasion under white-box gradient attack, 0% under SHAP-targeted / random-noise / full-replacement attacks"
  - "Shipped an explainable, containerized Streamlit dashboard for interactive triage"

---

## Key Findings

| Area | Finding |
|---|---|
| Metadata sufficiency (H1) | Flow-level metadata alone detects the majority of attack traffic, with no payload access needed |
| Model comparison (H2) | The three models diverge in failure mode, not just accuracy, Autoencoder leads on recall |
| Blind spot | Brute-force detection gap is a feature-representation problem, not a model-capacity limitation |
| Generalization | Cross-dataset performance on CIC-IoT2023 did not fully recover even after recalibration |
| Adversarial robustness (H3) | Only white-box gradient attacks succeeded (~35% evasion); SHAP-targeted, noise, and replacement attacks all failed |
| Explainability | GradientExplainer required over DeepExplainer due to a failed additivity check |

---

## Lessons Learned

- **Recall-first framing matters in forensic contexts** optimizing for accuracy alone would have buried the Autoencoder's actual value
- **A blind spot isn't always a model problem** the brute-force gap was a feature-representation issue, and treating it as such changes how you'd fix it
- **Explainability tools need correctness checks of their own** DeepExplainer's failed additivity check was a reminder that interpretability output can be silently wrong
- **Generalization failure is still a result** reporting it as a limitation, with a clear mechanism, is stronger than hiding it behind aggregate metrics
- **Not all attack surfaces are equal** having SHAP explanations available didn't make the model meaningfully easier to evade

---

## Tech Stack

<div class="skills-grid" style="margin: 1rem 0;">
  <span class="skill-tag skill-dfir">PyTorch</span>
  <span class="skill-tag skill-dfir">scikit-learn</span>
  <span class="skill-tag skill-dfir">SHAP</span>
  <span class="skill-tag skill-net">Streamlit</span>
  <span class="skill-tag skill-lang">Docker</span>
  <span class="skill-tag skill-siem">CIC-IDS2017</span>
  <span class="skill-tag skill-siem">CIC-IoT2023</span>
  <span class="skill-tag skill-net">Ubuntu / VirtualBox</span>
</div>

---

[View on GitHub](https://github.com/Asm0d3us5/FEAR)
