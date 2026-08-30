/**
 * Session storage utility for prompt history and application state
 */

const STORAGE_KEYS = {
  HISTORY: 'ai_optimizer_history_v1',
  CURRENT_DATASET: 'ai_optimizer_current_dataset_v1',
};

export function getPromptHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('LocalStorage error:', e);
    return [];
  }
}

export function savePromptHistoryItem(item) {
  try {
    const history = getPromptHistory();
    const newItem = {
      id: 'hist_' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      ...item
    };
    // Prepend new item
    const updated = [newItem, ...history.slice(0, 19)]; // Keep last 20 queries
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('LocalStorage save error:', e);
    return [];
  }
}

export function clearPromptHistory() {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (e) {
    console.warn('LocalStorage clear error:', e);
  }
}
