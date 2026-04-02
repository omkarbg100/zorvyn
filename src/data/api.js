import { initialTransactions } from "./mockData";

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  fetchTransactions: async () => {
    await delay(1000); // Fake 1 second network request
    
    // Check if we have standard data in local storage
    const stored = localStorage.getItem("finance-dashboard-storage-v2");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.transactions?.length > 0) {
          return parsed.state.transactions;
        }
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    
    return initialTransactions;
  },

  addTransaction: async (data) => {
    await delay(500); // Fake network delay
    return { ...data, id: crypto.randomUUID() };
  },

  deleteTransaction: async (id) => {
    await delay(500);
    return id;
  }
};
