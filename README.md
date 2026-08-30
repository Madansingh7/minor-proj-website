# AI Dataset Optimization and Intelligent Data Reduction

> **Tagline:** Reduce the data. Preserve the intelligence.

A production-quality AI SaaS Frontend built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Recharts**.

---

## 🌟 Architecture Overview (Frontend Only)

This application is built **strictly as a frontend UI** designed for seamless handoff to a Python dataset reduction backend.

- **Data Contract:** Defined in `src/types/analytics.ts`
- **API Service Layer:** Abstracted in `src/services/api.ts`
- **Handoff Documentation:** Detailed instructions in `FRONTEND_INTEGRATION.md`

---

## 🎨 Visual Design Language ("Button-Only" Neo-Brutalism)

1. **Interactive Buttons:** Uses Neo-Brutalist button styling (3px border, bold offset shadow, tactile press feedback).
2. **Informational Content:** All other UI elements (Cards, Metrics, Charts, Sections) use clean, modern SaaS design tokens with refined typography and whitespace.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
minor proj website/
├── FRONTEND_INTEGRATION.md      # Python backend handoff guide
├── README.md
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.js
└── src/
    ├── charts/                  # Recharts data visualizations
    ├── components/              # Production UI components
    ├── data/                    # Pre-configured sample datasets
    ├── services/
    │   └── api.ts              # Service layer with Python API placeholders
    ├── types/
    │   └── analytics.ts        # TypeScript data contract interfaces
    ├── utils/                   # Report generator, text analyzer, storage
    ├── App.jsx                  # Root page orchestrating state and layout
    ├── index.css                # Global design system & Neo-Brutalist button styles
    └── main.jsx
```
