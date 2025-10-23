---

# draft: true               # Optional: exclude from builds/feeds until ready
layout: layouts/news.njk

title: "Esmia — Blockchain Trust Layer for the EU Digital Product Passport (2027)" # (≤ 90 chars)
description: "Verifiable DPP records using EVM L1 + IPFS + Glacier to anchor lifecycle data." # (150–180 chars; no quotes inside)
date: 2025-10-22  
# updated: 2025-10-23 # Optional:  (when you materially change content)
author: "NewsEditor" 
category: "Digital Product Passport" # Max 1 ONLY USE EXISTING category/folder
tags: ["EU-DPP","ESPR","blockchain","recommerce","device-passport"]

# Absolute preferred URL for this article (use /news/)
canonical: "devicepassports-trust-layer"

# Social/hero image path (1200x630 recommended); add alt in templates if you don’t store it here
image: /images/news/devicepassports-trust-layer.jpg
image_alt: "Blockchain Trust Layer for the EU Digital Product Passport"

---


### Executive Summary

Esmia is a blockchain-based infrastructure enabling verifiable digital product passports under the upcoming EU DPP and ESPR regulations. By anchoring device data on-chain using EVM-compatible L1, IPFS, and Glacier hybrid storage, Esmia allows manufacturers, refurbishers, and marketplaces to issue tamper-proof lifecycle records from production to resale. 

 
 <br>
  <br>

## Context: The EU Digital Product Passport (DPP)

Starting in 2027, the EU Digital Product Passport will come into effect and step by step effect  electronic products under the Ecodesign for Sustainable Products Regulation (ESPR). Each device must carry a unique, digital, and verifiable record of its origin, components, repairs, and environmental impact.

### The DPP aims to:



- Enable consumers and recyclers to access trustworthy lifecycle data — Provide transparent, verified information about product environmental impact, materials, and end-of-life options to help informed purchasing and disposal decisions.  
  <br>
- Improve repair, reuse, and recycling rates — Create systems and incentives that extend product lifecycles, reduce waste, and increase the proportion of materials recovered and reused in manufacturing.  
  <br>
- Support manufacturers in achieving ESG transparency — Help companies track, measure, and communicate their environmental, social, and governance performance across supply chains and product lifecycles.RetryClaude does not have the ability to run the code it generates yet.  
  <br>
 
## The Core Problem: Data Without Proof

Today, lifecycle data is fragmented across grading tools, marketplaces, and service systems. Each stakeholder holds its own truth, leaving buyers, auditors, and regulators unsure what to trust.


| Challenge | Impact |
|-----------|--------|
| Unverified grading data | Reduces resale confidence |
| Multiple standards | Blocks interoperability |
| No immutable record | Enables greenwashing and fraud |

 

This lack of a verifiable trust layer prevents the circular economy from scaling.

  <br>

## The Esmia Solution

Esmia creates a blockchain-anchored digital product passport, immutable, verifiable, and portable.

 

### Key Components

 

1. Blockchain Anchoring (Sonic L1 / EVM compatible)
   - Permanent hash records of every lifecycle event
   - Decentralized timestamp verification  <br>
    <br>
2. IPFS + Glacier Hybrid Storage
   - Human-readable metadata stored on decentralized nodes
   - Long-term archiving for compliance and audits
   - Artifacts solution ready for inspecting the underlying protocol or inspection photos  <br>
    <br>

3. API & SDK Integration
   - OEMs, service centers, and marketplaces can automatically issue or verify passports via simple endpoints  <br>
    <br>

4. Verification Layer
   - Anyone can confirm authenticity via the Esmia Explorer or verify() API  <br>

> <i style="font-size: 1.5em;">"If it's stamped, it's verified."</i>
  <br>
   <br>

## How It Works

1. Event Data Signing
   - Event data (grading, serial, photo hash, technician ID) is signed locally
   - Signature and hash are written to EVM L1 Blockchain <br>
<br>

2. Blockchain Anchoring
   - Signature and hash recorded on EVM L1 Blockchain
   - Immutable record of every lifecycle event <br>
<br>

3. IPFS + Glacier Hybrid Storage
   - Metadata stored on IPFS/Glacier and linked by CID
   - Full inspection protocol or photos stored with immutable CID structure
   - Not possible to change due to content-addressed storage <br>
 <br>
  
4. Result: Device Record Creation
   - Public "Device Record" is created for verification or transfer
   - Verifiable traceability across the device's entire lifecycle
   - Sensitive or proprietary data remains protected <br>

<br>
 <br>

## Use Cases

Manufacturers – Create digital passports at production for regulatory compliance.

EU Importers – Create digital passports at production for regulatory compliance.

Refurbishers – Prove grading accuracy and repair quality.

Traders – Prove device quality and condition.

Spare Part Distributors – Mapping for spare parts, linked to the devices.

Marketplaces – Build consumer trust via verified listings.

Auditors/Regulators – Access immutable lifecycle data via blockchain proofs.
 
<br>
<br>

## Compliance Mapping
 

| Regulation | Esmia Mapping |
|-----------|-------------------|
| ESPR 2024/2027 | Lifecycle data traceability |
| EU DPP Framework | Unique digital product identifiers |
| ISO 14083 | Transport & emissions reporting |
| GDPR | Pseudonymized, off-chain personal data handling |

 
<br>
<br>

## Getting Started
 


Visit [Esmia.com](https://Esmia.com) to:

- [Read the Technical Whitepaper](https://Esmia.com/whitepaper)
- [Request the API / SDK Documentation](https://Esmia.com/api-docs)
- [Request OEM, Grading, Sparepart or Marketplace Integration](mailto:onboarding@Esmia.com)

<br>
<br>

## FAQ
 

<details>
<summary><strong>Q1: What is a Digital Product Passport (DPP)?</strong></summary>

A DPP is a mandatory EU record containing lifecycle and environmental data for each product, designed to make products traceable and sustainable.

</details>

<details>
<summary><strong>Q2: Why use blockchain for DPP compliance?</strong></summary>

Because blockchain provides immutability and transparency, ensuring lifecycle events cannot be altered after the fact.

</details>

<details>
<summary><strong>Q3: Does Esmia store sensitive data publicly?</strong></summary>

No. Only hashed or pseudonymized data is stored on-chain. Full event data remains private and accessible only via permissioned nodes or APIs.

</details>

<details>
<summary><strong>Q4: Is Esmia open for developers?</strong></summary>

Yes, an SDK and REST API are available for integration with reverse, wms, grading, ERP, or marketplace systems.

</details>