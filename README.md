# BuildFlow AI — Construction Enquiry & Project Intelligence Platform
### Founders Edition • Version 2.0 Demonstration Prototype

> *"Your construction correspondence, intelligently organised. Never miss an enquiry. Never lose a project detail."*

BuildFlow AI is a specialized SaaS platform designed specifically for UK construction contractors, estimators, and project managers. It automates commercial mailbox analysis by detecting tender enquiries, extracting project metadata, highlighting missing documentation, and drafting human-approved replies.

---

## 🏗️ Core Features & Capabilities

- **Intelligent Email Classification**: Automatically categorizes incoming correspondence into *New Enquiry*, *Existing Project Correspondence*, or *Unrelated Communication*.
- **New Enquiry Extraction**: Detects scheme names, client organisations, locations, budget ceilings (£ GBP), and target commencement dates.
- **Existing Project Matching**: Accurately matches incoming technical updates, RFIs, and drawing revisions to active projects (e.g. *Riverside Office Development*, *Oakfield Residential*).
- **Executive Synthesis & Missing Info Detection**: Surfaces what happened, why it matters, and flags absent budget figures or missing structural drawings.
- **Standard Opportunity Pipeline**: 6-stage UK contracting workflow (*New Enquiry*, *Awaiting Information*, *Under Review*, *Qualified*, *Future Opportunity*, *Declined / Closed*).
- **Interactive Record Detail**: Full chronological email history, technical specifications, follow-up checklist with resolution tracking, and critical milestone timelines.
- **AI-Assisted Email Drafting**: Generates context-rich responses with human approval safeguards and one-click clipboard copying.
- **Multi-Company Architecture**: Instant workspace switching between *Northstar Construction Ltd* (Manchester) and *Westbrook Developments Ltd* (Leeds) with isolated datasets.
- **Simulated Microsoft 365 Integration**: Mailbox polling simulation, OAuth authorization dialog, and real-time synchronization feedback.

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom architectural color palette
- **Icons**: Lucide React
- **Build Tool**: Vite 6
- **Hosting**: Netlify (configured via `netlify.toml` with SPA rewrites)

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/abdulrehmann1238-lab/buildflow-ai.git
cd buildflow-ai

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Deploy to Netlify

This project is pre-configured for one-click deployment on Netlify:

1. Connect your GitHub repository to **Netlify**.
2. Netlify will automatically detect `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **SPA Redirect**: `/*  /index.html  200`
3. Click **Deploy Site**.

---

## 📄 License & Notes

This project is an interactive visual and functional demonstration of the BuildFlow AI Founders Edition. All integrations with Microsoft 365 and external services are simulated frontend behaviors using realistic UK construction mock datasets.
