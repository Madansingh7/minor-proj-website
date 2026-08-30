/**
 * TypeScript Data Contract for Analytics and Statistics
 */

export interface DatasetStatistics {
  originalRecords: number;
  exactDuplicatesRemoved: number;
  semanticDuplicatesRemoved: number;
  optimizedRecords: number;
  reductionPercentage: number;
  originalTokens: number;
  optimizedTokens: number;
  tokenReductionPercentage: number;
  originalSizeBytes: number;
  optimizedSizeBytes: number;
  originalCharCount: number;
  optimizedCharCount: number;
  originalWordCount: number;
  optimizedWordCount: number;
}

export interface ChartDatasetReduction {
  category: string;
  count: number;
  fill: string;
}

export interface ChartTokenEfficiency {
  category: string;
  tokens: number;
  fill: string;
}

export interface ChartDuplicateComposition {
  name: string;
  value: number;
  color: string;
}

export interface ChartModelComparison {
  metric: string;
  rawModel: number;
  optimizedModel: number;
}
