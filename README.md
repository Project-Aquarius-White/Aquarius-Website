# Project Aquarius 🌊

> **"You don't truly understand a system until you can rebuild it from scratch."**

**Project Aquarius** is a protocol and platform for achieving intellectual sovereignty through the 1:1 reproduction of State-of-the-Art (SOTA) AI/ML research papers. We reject passive learning in favor of active reconstruction.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack](https://img.shields.io/badge/Stack-Next.js_16_%7C_Tailwind_%7C_MDX-black)](https://nextjs.org)

---

## ⚡ The Mission

The gap between reading a paper and building it is where most learning dies. 
Aquarius provides the **squad-based infrastructure**, **protocols**, and **community** to turn paper-reading into production-grade engineering.

- **14-Day Cycle**: A rigid cadence to force output. 
- **De-Noise**: Separate the signal from academic fluff.
- **Weaponize**: Turn theory into personal intellectual property.

---

## 🛠️ Tech Stack

This website is built as a high-performance, static-export application designed for speed and visual impact.

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Static Export)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v3) + Custom "Cyberpunk" Config
- **Content**: [MDX](https://mdxjs.com/) (Markdown + React Components)
- **Visuals**: 
  - **Procedural Dither**: Custom Canvas API implementation (`AquariusDither.tsx`) for generating the logo waves without images.
  - **Kinetic Parallax**: Scroll-reactive particle systems (`ParallaxDither.tsx`).

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Project-Aquarius-White/Aquarius-Website.git
   cd Aquarius-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Deployment

This project is configured for **Static Export** (`output: 'export'` in `next.config.mjs`).

**Deploy on Netlify:**
1. Import the repository.
2. Build Command: `npm run build`
3. Publish Directory: `out`

---

## ✍️ Writing Content

Content is managed via **MDX** files in the `content/` directory.

### Creating a New Post/Protocol
1. Create a file: `content/my-new-reproduction.md`
2. Add Frontmatter:
   ```yaml
   ---
   title: "Reproduction: Attention Is All You Need"
   date: "2025-12-25"
   description: "Implementing the Transformer from scratch."
   ---
   ```
3. Write standard Markdown. You can also import React components if needed.
4. The post will be accessible at `/docs/my-new-reproduction`.

---

## 📂 Project Structure

```bash
.
├── app/
│   ├── components/      # Visual components (Dither, Glitch, etc.)
│   ├── docs/[slug]/     # Dynamic MDX renderer
│   ├── layout.tsx       # Root layout (CRT scanlines, Fonts)
│   └── page.tsx         # The Landing Page (Hardcoded for impact)
├── content/             # MDX Files (Blog/Docs)
├── lib/                 # Utility functions (MDX parser)
└── public/              # Static assets
```

---

## 🤝 Contributing

We welcome pull requests for:
- New reproduction protocols.
- Improvements to the visual engine.
- Typo fixes and documentation updates.

**"Bring the knowledge down from the tower."**
