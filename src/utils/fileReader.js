/**
 * Utility functions for reading, parsing, and analyzing TXT datasets
 */

export function readTxtFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

export function analyzeDatasetText(text) {
  if (!text || typeof text !== 'string') {
    return {
      charCount: 0,
      wordCount: 0,
      lineCount: 0,
      sentenceCount: 0,
      estimatedTokens: 0,
      formattedSize: '0 KB'
    };
  }

  const charCount = text.length;
  
  // Word count: non-empty whitespace-separated tokens
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = text.trim() === '' ? 0 : words.length;
  
  // Lines count
  const lines = text.split(/\r\n|\r|\n/);
  const lineCount = lines.length;

  // Sentences count: splitting by sentence-ending punctuation . ! ? followed by space/newline
  const sentenceMatches = text.match(/[^.!?]+[.!?]+(\s|$)/g);
  const sentenceCount = sentenceMatches ? sentenceMatches.length : (lineCount > 0 && text.trim() ? lineCount : 0);

  // Estimated GPT/LLM token count (~4 characters per token average in English)
  const estimatedTokens = Math.ceil(charCount / 4);

  // File size calculation
  const bytes = new Blob([text]).size;
  const formattedSize = formatBytes(bytes);

  return {
    charCount,
    wordCount,
    lineCount,
    sentenceCount,
    estimatedTokens,
    formattedSize,
    rawBytes: bytes
  };
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Truncate long text strings cleanly for initial scroll preview
 */
export function getPreviewLines(text, maxLines = 100) {
  if (!text) return { previewText: '', hasMore: false, totalLines: 0 };
  const lines = text.split(/\r\n|\r|\n/);
  const totalLines = lines.length;
  if (totalLines <= maxLines) {
    return { previewText: text, hasMore: false, totalLines };
  }
  const previewText = lines.slice(0, maxLines).join('\n') + `\n\n... [Truncated preview: ${totalLines - maxLines} more lines omitted for browser smoothness]`;
  return { previewText, hasMore: true, totalLines };
}
