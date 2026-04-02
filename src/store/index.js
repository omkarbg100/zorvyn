import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialTransactions } from "../data/mockData";
import { mockApi } from "../data/api";

const defaultFilters = {
  search: "",
  type: "all",
  category: "all",
  sortBy: "date",
  sortOrder: "desc",
  minAmount: "",
  maxAmount: "",
  startDate: "",
  endDate: "",
};

export const useStore = create()(
  persist(
    (set, get) => ({
      transactions: [],
      isLoading: true,
      role: "viewer",
      theme: "light",
      user: {
        name: "Alex Designer",
        email: "alex@example.com",
        title: "Senior Financial Analyst"
      },
      filters: defaultFilters,

      setUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),

      toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

      fetchTransactions: async () => {
        set({ isLoading: true });
        try {
          const data = await mockApi.fetchTransactions();
          set({ transactions: data, isLoading: false });
        } catch (err) {
          console.error(err);
          set({ isLoading: false });
        }
      },

      addTransaction: async (transaction) => {
        set({ isLoading: true });
        const newTransaction = await mockApi.addTransaction(transaction);
        set({ transactions: [newTransaction, ...get().transactions], isLoading: false });
      },

      updateTransaction: (id, updated) => {
        set({
          transactions: get().transactions.map((t) =>
            t.id === id ? { ...t, ...updated } : t,
          ),
        });
      },

      deleteTransaction: async (id) => {
        set({ isLoading: true });
        await mockApi.deleteTransaction(id);
        set({
          transactions: get().transactions.filter((t) => t.id !== id),
          isLoading: false
        });
      },

      setRole: (role) => set({ role }),

      setFilters: (newFilters) =>
        set({ filters: { ...get().filters, ...newFilters } }),
      resetData: () =>
        set({ transactions: initialTransactions, filters: defaultFilters }),
    }),
    {
      name: "finance-dashboard-storage-v2",
    },
  ),
);
