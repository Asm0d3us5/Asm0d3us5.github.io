---
title: "Module Review: Advanced ELK Queries (TryHackMe)"
date: 2026-03-08
layout: single
header:
   image: /assets/images/Soc-Lab/Advanced-ELK-Queries/Advanced ELK Queries(main).png
---

## SOC Lab: Advanced ELK Queries (TryHackMe)

### Overview
The **Advanced ELK Queries** room on TryHackMe focuses on developing practical log analysis skills using the Elastic Stack, a widely used platform for security monitoring and log management. The stack includes Elasticsearch for indexing and storing log data, Logstash for processing logs, and Kibana for visualisation and querying.

In modern Security Operations Centers (SOC), these tools are commonly used as part of a SIEM environment to monitor system activity, investigate incidents, and perform threat hunting. The lab introduces advanced searching techniques that allow analysts to efficiently navigate large volumes of log data and extract meaningful security insights.

Through practical exercises, the room demonstrates how investigators can analyse logs, filter suspicious activity, and correlate events using advanced queries within Kibana.

# Advanced Queries

The lab explores several advanced query techniques that improve the ability to investigate large datasets within Kibana.

### Wildcard Queries
Wildcard searches allow analysts to locate values when only part of the string is known.
(*)
```xml
Example:
process.name: powershell*
```
This query returns any process starting with "powershell", which helps identify suspicious command execution.

---
### Range Queries
Range queries allow filtering based on numerical values or timestamps, which is useful when analysing events within a specific timeframe.

```xml
Example:
@timestamp:[2026-02-20 TO 2026-02-21]
```
This query retrieves events that occurred within a defined time window.

---
### Fuzzy Searches
Fuzzy searching helps detect variations in strings caused by typos or deliberate obfuscation techniques used by attackers.

```xml
Example:
process.name: powershel~
```
This query returns results similar to "powershell", allowing analysts to detect modified command names.

---
### Regular Expression Queries
Regular expressions (regex) allow pattern-based searches within log data.

```xml
Example:
process.command_line:/.*(cmd|powershell).*/
```
This identifies command-line entries containing either cmd or powershell, which may indicate command execution activity.

```xml
Example:
file.name:/.*\.(exe|dll|bat)/
```
This query identifies potentially malicious executable or script files.

---
### Boolean Queries
Boolean operators such as AND, OR, and NOT allow analysts to combine multiple conditions and refine search results.

```xml
Example:
process.name:powershell AND user.name:administrator
```
This query identifies instances where PowerShell was executed by the administrator account.

```xml
Example:
process.name:powershell AND NOT process.command_line:*WindowsUpdate*
```
This helps remove legitimate system processes from the results.

---

# What I Learned
This lab improved my understanding of how advanced queries can significantly enhance the investigation process when analysing security logs. I learned how to use different query techniques to filter large datasets and identify potentially malicious activity more efficiently.

The exercises also highlighted the importance of understanding log structures and how attackers may attempt to evade detection by modifying commands or file names. Using fuzzy searches, regex patterns, and Boolean logic allows analysts to detect these variations and uncover suspicious behaviour that may otherwise remain hidden.

Additionally, the lab reinforced how powerful the Elastic Stack can be for security monitoring and threat hunting within a SOC environment.

---

# Lab Highlights
- Learned how to combine multiple query techniques to perform more efficient investigations.
- Used logical operators, time filters, and pattern matching to narrow down large datasets.
- Practiced analysing security logs to identify suspicious activity and potential indicators of compromise.
- Simulated real-world SOC investigation scenarios requiring fast and accurate log analysis.
- Improved the ability to construct efficient queries in Kibana for incident response and threat hunting.
- Gained practical experience working with log data in the Elastic Stack.

---

# Skills Gained
- Developed practical experience using the Elastic Stack for analysing and investigating security logs.
- Learned how to construct advanced queries in Kibana to efficiently search and filter log data stored in Elasticsearch.
- Applied wildcard, range, fuzzy, and regular expression queries to identify patterns and suspicious activities within large log datasets.
- Improved understanding of Boolean logic operators (AND, OR, NOT) to refine search results and reduce noise in investigations.
- Strengthened log analysis and threat-hunting capabilities by identifying suspicious commands, processes, and potential indicators of compromise.
- Gained experience in log correlation, connecting events across different logs to understand attack behaviour.
- Improved the ability to detect anomalous system activity that may indicate security incidents or malicious behaviour.
- Developed practical skills in SOC-style investigations, using structured queries to support incident response and security monitoring.
- Increased understanding of how SIEM platforms support real-time threat detection and forensic analysis in modern cybersecurity operations. 

---

## Lab Evidence
![Advanced-ELK-queries.xml](\assets\images\Soc-Lab\Advanced-ELK-Queries\Fuzzy Searches.png)

*Screenshot showing fuzzy Search from the TryHackMe lab.*

---

![Advanced-ELK-queries.xml](\assets\images\Soc-Lab\Advanced-ELK-Queries\Nested Queries.png)

*Screenshot showing Nested Queries from a TryHackMe lab .*

---

![Advanced-ELK-queries.xml](\assets\images\Soc-Lab\Advanced-ELK-Queries\Regular Expression.png)

*Screenshot showing the use of a Regex to search for a "Ransomware" from a TryHackMe Lab.*

---


## ✅ Outcome
The lab enhanced my ability to analyse large volumes of security logs using advanced **ELK queries**, improving efficiency in detecting suspicious activity and indicators of compromise. It provided practical experience in applying logical conditions, time filters, and pattern matching to support threat hunting and incident response in a SOC environment.

---
 

```
