# Frontend Integration & Developer Handoff Guide

> **Project:** AI Dataset Optimization & Intelligent Data Reduction Frontend  
> **Target Audience:** Python Backend Developer / Data Engineer  
> **Status:** Production-Ready Frontend UI (Service Abstraction Layer Active)

---

## 1. Frontend Architecture

The frontend is built using **React (Vite)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Recharts**.

```text
src/
 ├── types/
 │    └── analytics.ts        # Primary TypeScript data contract interfaces
 ├── services/
 │    └── api.ts              # API service abstraction (holds endpoints & mock fallbacks)
 ├── charts/                 # Recharts data visualizations
 │    ├── DatasetReductionChart.jsx
 │    ├── DuplicateAnalysisChart.jsx
 │    ├── TokenEfficiencyChart.jsx
 │    ├── ModelComparisonChart.jsx
 │    ├── SimilarityDistributionChart.jsx
 │    └── PipelineFunnelChart.jsx
 ├── components/             # Production UI components
 └── App.jsx                 # Root page orchestrating state and layout
```

---

## 2. Environment Variables

Create a `.env` file in the project root to set the backend target URL:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## 3. Data Contract (Expected JSON Structures)

The frontend expects backend JSON responses matching the interfaces defined in [`src/types/analytics.ts`](file:///c:/Users/madan/OneDrive/Documents/Desktop/minor%20proj%20website/src/types/analytics.ts):

### A. `DatasetStatistics` (Returned after dataset reduction)

```json
{
  "originalRecords": 10500,
  "exactDuplicatesRemoved": 4132,
  "semanticDuplicatesRemoved": 824,
  "optimizedRecords": 5468,
  "reductionPercentage": 47.92,
  "originalTokens": 11250,
  "optimizedTokens": 6210,
  "tokenReductionPercentage": 44.80,
  "originalSizeBytes": 45000,
  "optimizedSizeBytes": 23500
}
```

### B. `ModelComparison` (Returned after dual model inference)

```json
{
  "rawModelResponse": "Response text generated from raw context...",
  "optimizedModelResponse": "Response text generated from optimized context...",
  "accuracy": 98.6,
  "relevance": 97.4,
  "rawTokenUsage": 1250,
  "optimizedTokenUsage": 690,
  "rawProcessingTime": 1420,
  "optimizedProcessingTime": 780,
  "similarityScore": 0.947
}
```

---

## 4. Where the API Should Be Connected

To connect your Python backend (e.g., FastAPI / Flask / Django REST), edit **ONLY ONE FILE**:

👉 [`src/services/api.ts`](file:///c:/Users/madan/OneDrive/Documents/Desktop/minor%20proj%20website/src/services/api.ts)

Inside `src/services/api.ts`, uncomment the marked `fetch` blocks in each service function:

1. `uploadDataset(file: File)`: `POST /api/upload`
2. `optimizeDataset(rawText: string)`: `POST /api/optimize`
3. `getAnalytics(jobId?: string)`: `GET /api/analytics`
4. `getModelComparison(prompt: string, rawText?: string, optimizedText?: string)`: `POST /api/compare-models`
5. `getQueryHistory()`: `GET /api/history`

---

## 5. Flow Summary

- **Upload Flow:** `DatasetInput.jsx` → `uploadDataset(file)` in `src/services/api.ts`
- **Optimization Pipeline Flow:** `App.jsx` → `optimizeDataset(rawText)` in `src/services/api.ts` → Drives pipeline animation & feeds `AnalyticsDashboardSection.jsx` & `ResearchResultsMetrics.jsx`
- **Model Comparison Flow:** `ModelComparisonSection.jsx` → `getModelComparison(prompt)` in `src/services/api.ts` → Feeds side-by-side response cards
- **Query History Flow:** `QueryHistorySection.jsx` → `getQueryHistory()` in `src/services/api.ts`

---

## 6. Files to Modify for Backend Handoff

| Action | Target File |
| :--- | :--- |
| Set API Base Endpoint | `.env` (`VITE_API_BASE_URL`) |
| Connect HTTP Endpoints | [`src/services/api.ts`](file:///c:/Users/madan/OneDrive/Documents/Desktop/minor%20proj%20website/src/services/api.ts) |
| Extend/Edit Response Types | [`src/types/analytics.ts`](file:///c:/Users/madan/OneDrive/Documents/Desktop/minor%20proj%20website/src/types/analytics.ts) |
