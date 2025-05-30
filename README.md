# 🧪 QA Engineer Challenge – Test Automation Suite

This repository contains a complete automation package designed to validate the Work Instruction (WI) Assignment flow using Playwright. It includes script files, execution evidence, supporting documents, and a stakeholder-friendly demo.

📁 Folder & File Overview

| Name                             | Type              | Description                                                                 |
|----------------------------------|-------------------|-----------------------------------------------------------------------------|
| `Automation Script/`            | 📁 Folder          | Contains Playwright test suite and config files                            |
| `Screenshots/`                  | 📁 Folder          | Optional captured screenshots                        
| `QA Challenge - Test Workbook.xlsx` | 📊 Excel         | Manual test cases, bug report, and execution summary                       |
| `QA Challenge - Stakeholder Notes.pdf` | 📄 PDF         | Summary document with context, use case goals, and test approach           |
| `Test Automation Demo.mkv`      | 📹 Video           | Recorded test run showcasing automation flow with slow motion              |
| `Test Automation Successful Run.png` | 🖼 Screenshot    | Screenshot of a completed and successful test execution run                |

## 🧪 Playwright Test Suite

Located inside:  
📂 `Automation Script/tests/QA Challenge.spec.ts`

### ✅ Covered Test Cases

| Test ID        | Title                                               |
|----------------|-----------------------------------------------------|
| `WI-01`        | Create and validate rule with all valid inputs      |
| `WI-Validation`| Headline & Title field validations                  |
| `WI-04`        | Role field validation                               |

---
## ▶️ How to Run the Script

```bash
npx playwright test --headed
