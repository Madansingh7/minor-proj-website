/**
 * TypeScript Data Types for Dual AI Model Inference and Query History
 */

export interface ModelComparisonResult {
  prompt: string;
  rawModelResponse: string;
  optimizedModelResponse: string;
  accuracy: number;            // Percentage e.g. 98.6%
  relevance: number;           // Percentage e.g. 97.4%
  rawTokenUsage: number;       // Prompt context tokens
  optimizedTokenUsage: number; // Optimized context tokens
  rawProcessingTime: number;   // Latency in ms
  optimizedProcessingTime: number; // Latency in ms
  similarityScore: number;     // Cosine / BERT score e.g. 0.947
}

export interface QueryHistoryItem {
  id: string;
  datasetId?: string;
  prompt: string;
  timestamp: string;
  similarity: number;
  status: 'success' | 'failed' | 'processing';
  rawModelResponse: string;
  optimizedModelResponse: string;
  comparison: ModelComparisonResult;
  rawTextSnippet?: string;
  optimizedTextSnippet?: string;
}
