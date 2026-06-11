---
layout: project
title: "Investigating Computer Fraud — USB Forensics"
date: 2025-03-26
excerpt: "End-to-end digital forensics investigation of a USB drive in a simulated computer fraud case — forensic imaging, deleted file recovery, hidden data analysis, password cracking, and hash-based integrity validation."
tags: [DFIR, Forensics, Autopsy, FTK, Linux, Python]
difficulty: Intermediate
platform: Deakin SIT282
image: /assets/images/projects/usb-forensics-banner.jpg
toc: true
---

## Overview

This project was completed as part of **SIT282 Computer Forensics and Investigations** at Deakin University. It simulates a real-world computer fraud investigation involving a USB drive — covering the full forensic workflow from evidence acquisition through to data validation and password recovery.

<div class="project-meta-grid">
  <div class="meta-item"><span class="meta-label">Unit</span><span class="meta-val"> Computer Forensics</span></div>
  <div class="meta-item"><span class="meta-label">Institution</span><span class="meta-val">Deakin University</span></div>
  <div class="meta-item"><span class="meta-label">Date</span><span class="meta-val">March 2025</span></div>
</div>

---

## Step 1 — Data Preparation

To simulate a real fraud scenario, two files were created on a USB drive — one Word document (`223756188.docx`) and one Excel spreadsheet (`StudentID`) — alongside a photo (`StudentID.jpg`).

The following modifications were made to introduce forensic artefacts:

- **Extension spoofing** — the Excel file's extension was manually changed to disguise its true file type
- **Password protection** — the Word document was encrypted with a password
- **Photo added** — an image (`photo.jpg`) was placed on the drive

All files were then **deleted** from the USB, simulating an attempt to destroy evidence.

---

## Step 2 — Forensic Data Acquisition

Two independent imaging methods were used to create bit-for-bit copies of the USB drive before any analysis.

### DCFLDD (Linux)

```bash
sudo dcfldd if=/dev/sdb of=/mnt/data/usb_image.dd \
  bs=4M hash=sha256 \
  hashlog=/mnt/data/usb_hash.txt \
  status=on
```

| Flag | Purpose |
|---|---|
| `if=/dev/sdb` | Input source — the USB device |
| `of=usb_image.dd` | Output raw DD image |
| `bs=4M` | Read in 4 MB chunks for efficiency |
| `hash=sha256` | Calculate SHA-256 during copy |
| `hashlog=usb_hash.txt` | Log hash for later verification |
| `status=on` | Display live progress |

### FTK Imager (Windows)

1. Connected USB to forensic workstation
2. Opened FTK Imager → **File → Create Disk Image**
3. Selected **Physical Drive** → chose the USB
4. Set image format to **E01** (Expert Witness Format)
5. Set fragmentation to `0` and compression to `0` — exact copy
6. Saved `USB_IMAGE.E01`

FTK Imager automatically generated **MD5 and SHA1 checksums** during acquisition:

```
MD5:  61a27de3f47767db0eee468462ddac84
SHA1: 55c8f167b0bc348e80e4bd0ad0b34a36f252c2f3
Verify result: Match ✓
```

---

## Step 3 — Data Recovery

With all files deleted from the USB, two forensic recovery methods were used.

### Autopsy

1. Created a new case in Autopsy
2. Added the `USB_IMAGE.E01` as the data source
3. Navigated to **File Views → Deleted Files**
4. Recovered: `223756188.docx`, `PhotoN1.png`, `StudentID.jpg`
5. Exported recovered files to a local folder

### Foremost (Linux)

```bash
foremost -t jpg,png -i USB_IMAGE.E01 -o /home/user/Recover_images/
```

| Flag | Purpose |
|---|---|
| `-t jpg,png` | Target file types to carve |
| `-i USB_IMAGE.E01` | Input forensic image |
| `-o Recover_images/` | Output directory for recovered files |

Foremost recovered files by their file signatures (magic bytes) rather than filesystem metadata — effective even when directory entries are overwritten.

### Verifying Changed File Extensions

The Excel file had its extension manually changed. Two methods identified the true file type:

**Autopsy** — navigated to **Analysis Results → Extension Mismatch Detected (52)**, which flagged `StudentID.jpg` as an Excel spreadsheet (`application/vnd.openxmlformats-officedocument.spreadsheetml`).

**Linux `file` command:**
```bash
file -i Recover_images/*
```
Output confirmed `StudentID.jpg` was actually a spreadsheet — true file type regardless of extension.

---

## Step 4 — Data Analysis

### Hidden Data — Autopsy

Used **File Analysis → File Types** to scan for anomalies across 1,373 images, 3 videos, 58 audio files, 1 archive, and 3 database files. The keyword search module was used to identify patterns suggesting concealed data.

### Hidden Data — Binwalk (Kali Linux)

```bash
binwalk -e PhotoN1.png
binwalk -e StudentID.jpg
```

`StudentID.jpg` revealed embedded ZIP archive data containing multiple XML files — consistent with an Office Open XML document embedded inside a JPEG. `PhotoN1.png` showed compressed data at offset `0x4B`.

### Password Recovery — John the Ripper

The Word document was password-protected. Recovery process:

**Step 1 — Extract hash:**
```bash
./office2john.py /home/kali/Desktop/USB_files/223756188.docx > hash.txt
```

**Step 2 — Crack with mask attack:**
```bash
john --mask=S223756188?d hash.txt
```

The mask `S223756188?d` constrained the search to the known student ID prefix followed by digits — targeting the likely password structure. John the Ripper successfully cracked the password.

**Recovery techniques compared:**

| Method | How it works | Best for |
|---|---|---|
| Brute force | Tries every character combination | Short/simple passwords |
| Dictionary attack | Wordlist of common passwords | Common or reused passwords |
| Hash cracking + mask | Extracts hash, applies structural constraints | Known password patterns |

---

## Step 5 — Data Validation

Hash validation confirms the forensic image is an exact, unaltered copy of the original drive — critical for chain of custody and court admissibility.

**FTK Imager** generated checksums automatically at acquisition time:

```
[Computed Hashes]
MD5:  61a27de3f47767db0eee468462ddac84 : verified ✓
SHA1: 55c8f167b0bc348e80e4bd0ad0b34a36f252c2f3 : verified ✓
```

**DCFLDD + sha256sum** method:

```bash
# Generate hash of the raw image
sudo sha256sum usb_image.dd

# Compare with hash logged during acquisition
cat usb_hash.txt
```

Both hashes matched — confirming no data was modified between acquisition and analysis.

---

## Key Findings

| Artefact | Finding |
|---|---|
| Deleted files | 3 files recovered — `223756188.docx`, `PhotoN1.png`, `StudentID.jpg` |
| Extension spoofing | `StudentID.jpg` was an Excel spreadsheet (confirmed by `file` command and Autopsy) |
| Hidden data | Embedded ZIP/XML archive found inside `StudentID.jpg` via Binwalk |
| Password-protected doc | Password cracked using `office2john` + John the Ripper mask attack |
| Image integrity | MD5 and SHA1 verified — forensic image matches original |

---

## Lessons Learned

- **Never trust file extensions** — magic bytes and MIME type analysis are the reliable sources of truth
- **Dual-tool acquisition** matters — DCFLDD and FTK Imager cross-validated each other's hashes
- **Mask attacks are highly effective** when a password structure is known (student IDs are predictable patterns)
- **Autopsy's Extension Mismatch module** is underrated — surfaced the spoofed file immediately without manual inspection
- **Binwalk is non-obvious** — its ability to find embedded archives inside images is extremely useful in fraud cases

---

## Tech Stack

<div class="skills-grid" style="margin: 1rem 0;">
  <span class="skill-tag skill-dfir">Autopsy</span>
  <span class="skill-tag skill-dfir">FTK Imager</span>
  <span class="skill-tag skill-dfir">Foremost</span>
  <span class="skill-tag skill-dfir">Binwalk</span>
  <span class="skill-tag skill-net">Wireshark</span>
  <span class="skill-tag skill-lang">DCFLDD</span>
  <span class="skill-tag skill-lang">John the Ripper</span>
  <span class="skill-tag skill-lang">office2john</span>
  <span class="skill-tag skill-siem">SHA256 / MD5</span>
  <span class="skill-tag skill-net">Kali Linux</span>
</div>
