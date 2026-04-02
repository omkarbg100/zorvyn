import { useState, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { OverviewCards } from "./components/dashboard/OverviewCards";
import { BalanceChart } from "./components/dashboard/BalanceChart";
import { ExpensesPieChart } from "./components/dashboard/ExpensesPieChart";
import { Insights } from "./components/dashboard/Insights";
import { TransactionList } from "./components/transactions/TransactionList";
import { TransactionModal } from "./components/transactions/TransactionModal";
import { useStore } from "./store";
import { Plus, Loader2 } from "lucide-react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role, theme, isLoading, fetchTransactions } = useStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (isLoading && false) { // Skip full blocking if we just want a soft loader
    // Using soft loader instead
  }

  return (
    <div className="min-h-screen bg-main text-text font-sans selection:bg-primary-100 selection:text-primary-600 transition-colors duration-300">
      <Header />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Finance Dashboard
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Track and manage your finances
            </p>
          </div>

          {role === "admin" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium shadow-sm shadow-primary-500/20 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Transaction
            </button>
          )}
        </div>

        <OverviewCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <BalanceChart />
          </div>
          <div>
            <Insights />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div>
            <ExpensesPieChart />
          </div>
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
        </div>
      </main>

      {isModalOpen && (
        <TransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default App;
