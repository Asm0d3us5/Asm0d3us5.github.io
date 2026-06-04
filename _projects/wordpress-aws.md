---
layout: project
title: "Highly Available WordPress on AWS"
date: 2025-05-01
excerpt: "Designed and deployed a production-style WordPress architecture on AWS using VPC, EC2 Auto Scaling, RDS MySQL, S3 media offload, ALB, and CloudFormation IaC — tested for high availability and automated recovery."
tags: [AWS, Cloud, DFIR, CloudFormation, IaC, WordPress, RDS, S3, Auto Scaling]
difficulty: Intermediate
platform: Deakin SIT233
image: /assets/images/projects/wordpress-aws-banner.jpg
toc: true
---

## Overview

This project was completed as part of **SIT233 Cloud Computing** at Deakin University. It involved designing, deploying, and testing a highly available WordPress architecture on Amazon Web Services — moving away from a single public EC2 instance toward a multi-layer cloud environment where networking, compute, database, storage, and scaling services work together.

<div class="project-meta-grid">
  <div class="meta-item"><span class="meta-label">Unit</span><span class="meta-val">SIT233 Cloud Computing</span></div>
  <div class="meta-item"><span class="meta-label">Institution</span><span class="meta-val">Deakin University</span></div>
  <div class="meta-item"><span class="meta-label">Trimester</span><span class="meta-val">T1 2025</span></div>
  <div class="meta-item"><span class="meta-label">Outcome</span><span class="meta-val">High Distinction</span></div>
</div>

---

## Architecture

The solution runs inside a custom VPC (`192.168.0.0/16`) with four subnets spread across two Availability Zones:

| Subnet | CIDR | Role |
|---|---|---|
| Public Subnet 1 | 192.168.0.0/24 | NAT Gateway |
| Public Subnet 2 | 192.168.1.0/24 | Application Load Balancer |
| Private Subnet 1 | 192.168.2.0/24 | WordPress EC2 (ASG) |
| Private Subnet 2 | 192.168.3.0/24 | Amazon RDS MySQL |

**Traffic flow:** Internet → ALB (public) → WordPress EC2 in private subnet → RDS MySQL (private). Media uploads bypass EC2 entirely via the S3 offload plugin.

**Security groups follow least-privilege layering:**
- `ALB-SG` — HTTP/80 from `0.0.0.0/0`
- `Web-Server-SG` — HTTP/80 from `ALB-SG` only
- `RDS-SG` — MySQL/3306 from `Web-Server-SG` only

---

## Implementation

### 1. Network Foundation
Custom VPC with Internet Gateway, NAT Gateway in the public subnet, and separate public/private route tables. Private instances reach the internet through the NAT Gateway for package downloads and AWS service calls — without any inbound public exposure.

### 2. Database Layer — Amazon RDS MySQL
RDS deployed inside a private subnet group with public accessibility disabled. A `wordpress` database was created manually via the MySQL client after finding the RDS instance identifier was being mistakenly used as the database name.

### 3. Compute Layer — EC2 + Custom AMI
WordPress installed on Amazon Linux 2023 (AL2 unavailable in Learner Lab) using `dnf` rather than the `amazon-linux-extras` path. After configuring Apache, PHP, and the WP database connection, a custom AMI (`wordpress-configured-ami`) was baked from the working instance. This AMI feeds the Launch Template, so all Auto Scaling instances launch pre-configured.

### 4. Storage — Amazon S3 Media Offload
Private S3 bucket with Block Public Access and Object Ownership enforced. The WP Offload Media plugin stores all uploads under `wp-content/uploads/` in S3 — decoupling media from EC2 instance storage so Auto Scaling replacements don't lose files. AWS Learner Lab temporary credentials required CLI validation before the plugin auth worked.

### 5. Load Balancing + Auto Scaling
Internet-facing ALB across both public subnets, forwarding HTTP/80 to a target group. Auto Scaling Group config:

| Parameter | Value |
|---|---|
| Desired capacity | 1 |
| Minimum | 1 |
| Maximum | 3 |
| Scaling policy | Target tracking — CPU at 70% |

### 6. Infrastructure as Code — CloudFormation
Two YAML templates:
- **Network stack** — VPC, subnets, IGW, NAT Gateway, route tables. Exports VPC ID, subnet IDs, NAT Gateway ID for cross-stack reference.
- **Application stack** — Security groups, S3 bucket, RDS + read replica, ALB, target group, Launch Template, ASG, and scaling policy. Imports network stack outputs as parameters.

---

## Testing & Validation

| Test | Result |
|---|---|
| RDS connectivity | WordPress connected after creating `wordpress` DB manually |
| S3 media offload | Uploads appeared in S3 under `wp-content/uploads/` |
| ALB routing | Site accessible via ALB DNS name; target healthy |
| Auto Scaling recovery | Terminated instance replaced automatically; site remained up |
| Scaling policy | Target tracking policy active; scale-in enabled |
| CloudFormation | Network stack deployed cleanly; app stack reached `CREATE_COMPLETE` |

---

## Challenges & Lessons Learned

- **Amazon Linux 2 unavailable** in Learner Lab — switched to AL2023, rewrote install steps using `dnf` instead of `amazon-linux-extras`
- **RDS naming confusion** — instance identifier ≠ database name; resolved by creating the `wordpress` DB manually via MySQL client
- **Learner Lab temporary credentials** — caused S3 plugin auth failures; validated S3 access via AWS CLI before debugging the plugin config
- **CloudFormation portability** — hardcoded MySQL engine versions and IAM instance profile names broke in a fresh lab environment; templates should use parameters

---

## Possible Improvements

- **HTTPS** via AWS Certificate Manager + Route 53 custom domain
- **CloudFront** in front of ALB and S3 for global CDN performance
- **AWS Secrets Manager** for database credentials instead of manual entry
- **S3 VPC Gateway Endpoint** to reduce NAT Gateway costs for S3 traffic
- **AWS WAF** + CloudWatch alarms + centralised logging for production hardening

---

## Tech Stack

<div class="skills-grid" style="margin: 1rem 0;">
  <span class="skill-tag skill-net">Amazon VPC</span>
  <span class="skill-tag skill-net">Application Load Balancer</span>
  <span class="skill-tag skill-net">NAT Gateway</span>
  <span class="skill-tag skill-dfir">Amazon EC2</span>
  <span class="skill-tag skill-dfir">Auto Scaling Group</span>
  <span class="skill-tag skill-dfir">Custom AMI</span>
  <span class="skill-tag skill-siem">Amazon RDS MySQL</span>
  <span class="skill-tag skill-siem">Amazon S3</span>
  <span class="skill-tag skill-lang">CloudFormation (YAML)</span>
  <span class="skill-tag skill-lang">Amazon Linux 2023</span>
  <span class="skill-tag skill-lang">Apache / PHP</span>
</div>

---

## Presentation & Demo

- [Presentation Video](https://deakin.au.panopto.com/Panopto/Pages/Viewer.aspx?id=92f0f8b2-eb12-4f32-b31f-b451007b8f56)
- [WordPress on AWS Demo](https://deakin.au.panopto.com/Panopto/Pages/Viewer.aspx?id=e58753c4-afcf-44e0-885f-b451007355d4)
- [CloudFormation Demo](https://deakin.au.panopto.com/Panopto/Pages/Viewer.aspx?id=16dde6fe-1638-4dea-aaa0-b4510075ee0e)
