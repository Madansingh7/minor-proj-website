/**
 * TypeScript Data Types for Asynchronous Processing Jobs & Stages
 */

export type JobStatus = 'queued' | 'uploading' | 'processing' | 'completed' | 'failed';

export type ProcessingStageId = 
  | 'upload'
  | 'analysis'
  | 'exact_duplicates'
  | 'semantic_similarity'
  | 'redundancy_removal'
  | 'optimized_creation'
  | 'analytics'
  | 'ready';

export interface ProcessingStageInfo {
  id: ProcessingStageId;
  stepNumber: number;
  name: string;
  description: string;
  status: 'idle' | 'processing' | 'completed' | 'failed';
  progress: number;
  recordsProcessed?: number;
  timeTakenMs?: number;
}

export interface JobProgressResponse {
  jobId: string;
  datasetId: string;
  status: JobStatus;
  stage: ProcessingStageId;
  stageIndex: number;
  totalStages: number;
  progress: number; // 0 - 100
  message: string;
  error?: string;
  updatedAt: string;
}
