/**
 * TypeScript Data Types for Dataset Metadata and Previews
 */

export interface DatasetFile {
  id: string;
  filename: string;
  sizeBytes: number;
  formattedSize: string;
  charCount: number;
  wordCount: number;
  lineCount: number;
  sentenceCount: number;
  estimatedTokens: number;
  createdAt: string;
}

export interface DatasetPreviewPage {
  datasetId: string;
  type: 'raw' | 'optimized';
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  records: string[];
}
