---
title: "Module Review: Custom Alert Rules in Wazuh (TryHackMe)"
date: 2026-02-23
layout: single
header:
   image: /assets/images/Soc-Lab/Wazuh-rules/wazuh.png
   overlay_image: /assets/images/Soc-Lab/Wazuh-rules/wazuh.png 
---

## SOC Lab: Custom Alert Rules in Wazuh (TryHackMe)

### Overview
This lab focused on creating and tuning **custom alert rules in Wazuh** to enhance detection capabilities beyond the default rule set. The objective was to understand how logs are processed through decoders and rules, and how custom logic can be applied to generate meaningful security alerts in a SOC environment.

The exercise emphasized practical detection engineering, including alert validation and noise reduction—key skills for SOC Level 1 analysts.

Wazuh rules are written in XML and rely on decoded log fields to trigger alerts based on defined conditions. Each rule includes a unique ID, severity level, matching logic, and a descriptive message.

### Basic Rule Components

```xml
<rule id="100001" level="10">
  <if_sid>550</if_sid>
  <field name="srcuser">root</field>
  <description>
    Suspicious activity detected: root user action
  </description>
  <mitre>T1078</mitre>
</rule>
```

*rule id* – Unique identifier for the rule

*level* – Alert severity (0–15)

*if_sid / if_matched_sid* – Links the rule to a decoder or parent rule

*field / match* – Conditions evaluated against log content

*description* – Human-readable alert message
---

## What I Learned
- How Wazuh processes logs using **decoders and rule chains**
- Writing **custom alert rules** with appropriate rule IDs and severity levels
- Applying frequency and time-based conditions for behavioral detection
- Testing alerts by generating and simulating log events
- Refining rule logic to reduce false positives and alert fatigue

---

## Lab Highlights
- Created custom Wazuh rules to detect specific log patterns
- Successfully triggered alerts using simulated events
- Verified alerts through the Wazuh dashboard
- Improved alert accuracy by adjusting rule hierarchy and conditions

---

## Skills Gained
- SIEM rule creation and tuning  
- Wazuh rule syntax and alert logic  
- Log analysis and event correlation  
- False positive reduction techniques  
- SOC Level 1 detection fundamentals  

---

## Lab Evidence

![Wazuh auditd_rules.xml for linux machines](/assets/images/Soc-Lab/Wazuh-rules/Audit_Rules.png)

*Screenshot showing an auditd_rules for Linux machines aim to detect file creation events via Syscalls.*

---

## ✅ Outcome
This lab strengthened my understanding of **SIEM customization and alert engineering**, highlighting the importance of tailored detection logic for effective threat visibility in SOC operations. The experience closely mirrors real-world SOC workflows, from detection design to alert validation.

---
 

```
