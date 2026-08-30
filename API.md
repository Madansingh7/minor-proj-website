# Production REST API Specification & Database Schema

> **API Version:** v1  
> **Base Path:** `/api/v1`  
> **Backend Framework Target:** Python FastAPI / PostgreSQL / Redis Celery Worker

---

## 1. System Architecture

```text
React (Vite + TS)
      │
      ▼ (HTTP / SSE)
FastAPI Server (/api/v1)
      │
      ├──────► PostgreSQL (Metadata, Statistics, Queries, History)
      │
      └──────► Redis Job Queue ──► Celery / Python Data Reduction Model
```

---

## 2. PostgreSQL Database Schema Definition

```sql
-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Datasets Table
CREATE TABLE datasets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    size_bytes BIGINT NOT NULL,
    char_count INT NOT NULL,
    word_count INT NOT NULL,
    line_count INT NOT NULL,
    sentence_count INT NOT NULL,
    estimated_tokens INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Processing Jobs Table
CREATE TABLE processing_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('queued', 'uploading', 'processing', 'completed', 'failed')),
    current_stage VARCHAR(100) NOT NULL,
    progress_percentage INT DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_jobs_dataset_id ON processing_jobs(dataset_id);
CREATE INDEX idx_jobs_status ON processing_jobs(status);

-- 3. Dataset Statistics Table
CREATE TABLE dataset_statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
    original_records INT NOT NULL,
    exact_duplicates_removed INT NOT NULL,
    semantic_duplicates_removed INT NOT NULL,
    optimized_records INT NOT NULL,
    reduction_percentage NUMERIC(5,2) NOT NULL,
    original_tokens INT NOT NULL,
    optimized_tokens INT NOT NULL,
    token_reduction_percentage NUMERIC(5,2) NOT NULL,
    original_size_bytes BIGINT NOT NULL,
    optimized_size_bytes BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Dual Model Queries & Responses Table
CREATE TABLE model_queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    raw_model_response TEXT NOT NULL,
    optimized_model_response TEXT NOT NULL,
    accuracy NUMERIC(5,2) NOT NULL,
    relevance NUMERIC(5,2) NOT NULL,
    raw_token_usage INT NOT NULL,
    optimized_token_usage INT NOT NULL,
    raw_processing_time_ms INT NOT NULL,
    optimized_processing_time_ms INT NOT NULL,
    similarity_score NUMERIC(4,3) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_model_queries_dataset_id ON model_queries(dataset_id);
```

---

## 3. Asynchronous Job Endpoints

### 1. Upload Dataset
- **Endpoint:** `POST /api/v1/datasets`
- **Content-Type:** `multipart/form-data`
- **Request Body:** Form data with `file` (`.txt` file)
- **Response `202 Accepted`:**
```json
{
  "dataset_id": "8f3b2d10-4e5c-4f11-8a90-7d3e5f2a1b0c",
  "job_id": "job_99a8b7c6-2d1e-4f3a-8b5c-6d7e8f9a0b1c",
  "status": "queued",
  "filename": "llm_research_corpus.txt",
  "size_bytes": 45890
}
```

---

### 2. Poll Job Status / Progress
- **Endpoint:** `GET /api/v1/jobs/{job_id}`
- **Response `200 OK` (Processing):**
```json
{
  "job_id": "job_99a8b7c6-2d1e-4f3a-8b5c-6d7e8f9a0b1c",
  "dataset_id": "8f3b2d10-4e5c-4f11-8a90-7d3e5f2a1b0c",
  "status": "processing",
  "stage": "semantic_similarity",
  "stage_index": 4,
  "total_stages": 8,
  "progress": 62,
  "message": "Calculating Jaccard & transformer vector representations for sentence clustering...",
  "updated_at": "2026-08-30T12:00:05Z"
}
```

- **Response `200 OK` (Completed):**
```json
{
  "job_id": "job_99a8b7c6-2d1e-4f3a-8b5c-6d7e8f9a0b1c",
  "dataset_id": "8f3b2d10-4e5c-4f11-8a90-7d3e5f2a1b0c",
  "status": "completed",
  "stage": "ready",
  "progress": 100,
  "message": "Dataset optimization successfully finalized.",
  "updated_at": "2026-08-30T12:00:10Z"
}
```

---

### 3. Get Dataset Analytics
- **Endpoint:** `GET /api/v1/datasets/{dataset_id}/analytics`
- **Response `200 OK`:**
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
  "optimizedSizeBytes": 23500,
  "originalCharCount": 45000,
  "optimizedCharCount": 23500,
  "originalWordCount": 7500,
  "optimizedWordCount": 3900
}
```

---

### 4. Paginated Raw / Optimized Dataset Preview
- **Endpoint:** `GET /api/v1/datasets/{dataset_id}/preview/raw?page=1&page_size=50`
- **Endpoint:** `GET /api/v1/datasets/{dataset_id}/preview/optimized?page=1&page_size=50`
- **Response `200 OK`:**
```json
{
  "datasetId": "8f3b2d10-4e5c-4f11-8a90-7d3e5f2a1b0c",
  "type": "optimized",
  "page": 1,
  "pageSize": 50,
  "totalPages": 110,
  "totalRecords": 5468,
  "records": [
    "LLM latency is primarily driven by prompt payload size and redundant sentence context.",
    "Eliminating duplicated memory assertions lowers prompt tokens without losing facts."
  ]
}
```

---

### 5. Dual Model Query Evaluation
- **Endpoint:** `POST /api/v1/datasets/{dataset_id}/query`
- **Request Body:**
```json
{
  "prompt": "What are the primary causes of latency in LLM processing?"
}
```
- **Response `200 OK`:**
```json
{
  "prompt": "What are the primary causes of latency in LLM processing?",
  "rawModelResponse": "Based on uncleaned context: Latency in LLM processing is caused by large prompt context size...",
  "optimizedModelResponse": "Based on optimized context: Latency is caused by prompt context size and sentence redundancy...",
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

### 6. Query History
- **Endpoint:** `GET /api/v1/datasets/{dataset_id}/history`
- **Response `200 OK`:** Array of `ModelComparisonResult` objects with timestamps.
