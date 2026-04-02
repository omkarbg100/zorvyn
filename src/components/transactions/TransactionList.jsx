import React, { useMemo, useState } from "react";
import { useStore } from "../../store";
import { Search, Filter, ArrowUp, ArrowDown, Trash2, Download } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "../../lib/utils";

export const TransactionList = () => {
  const { transactions, role, filters, setFilters, deleteTransaction } =
    useStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const parsedTransactions = useMemo(() => {
    let result = [...transactions];

    // Source filtering
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(lowerSearch) ||
          t.category.toLowerCase().includes(lowerSearch),
      );
    }

    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    // Advanced filtering
    if (filters.minAmount !== "") {
      result = result.filter((t) => t.amount >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount !== "") {
      result = result.filter((t) => t.amount <= parseFloat(filters.maxAmount));
    }
    if (filters.startDate !== "") {
      const start = new Date(filters.startDate).getTime();
      result = result.filter((t) => new Date(t.date).getTime() >= start);
    }
    if (filters.endDate !== "") {
      const end = new Date(filters.endDate).getTime();
      result = result.filter((t) => new Date(t.date).getTime() <= end);
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (filters.sortBy === "date") {
        comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        comparison = b.amount - a.amount;
      }
      return filters.sortOrder === "asc" ? -comparison : comparison;
    });

    return result;
  }, [transactions, filters]);

  const handleExportCSV = () => {
    if (parsedTransactions.length === 0) return;
    const headers = ["ID", "Date", "Amount", "Category", "Type", "Description"];
    const csvContent = [
      headers.join(","),
      ...parsedTransactions.map(t => [
        `"${t.id}"`, 
        `"${format(parseISO(t.date), "MMM dd, yyyy")}"`, 
        t.amount, 
        `"${t.category}"`, 
        `"${t.type}"`, 
        `"${t.description}"`
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions_export.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const toggleSort = (field) => {
    if (filters.sortBy === field) {
      setFilters({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" });
    } else {
      setFilters({ sortBy: field, sortOrder: "desc" });
    }
  };

  const allCategories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return ["all", ...Array.from(cats)];
  }, [transactions]);

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-text">Recent Transactions</h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl border border-border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-700"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
            />
          </div>
          <button
            onClick={handleExportCSV}
            className="p-2 border border-border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            title="Export to CSV"
          >
            <Download className="w-5 h-5 text-primary-500" />
          </button>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2 border border-border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Filter className="w-5 h-5 text-text-muted" />
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="flex flex-col gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Type</label>
              <select
                className="w-full p-2 rounded-lg border border-border bg-white dark:bg-gray-800 outline-none"
                value={filters.type}
                onChange={(e) => setFilters({ type: e.target.value })}
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Category</label>
              <select
                className="w-full p-2 rounded-lg border border-border bg-white dark:bg-gray-800 outline-none"
                value={filters.category}
                onChange={(e) => setFilters({ category: e.target.value })}
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Min Amount</label>
              <input
                type="number"
                className="w-full p-2 rounded-lg border border-border bg-white dark:bg-gray-800 outline-none"
                value={filters.minAmount}
                onChange={(e) => setFilters({ minAmount: e.target.value })}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Max Amount</label>
              <input
                type="number"
                className="w-full p-2 rounded-lg border border-border bg-white dark:bg-gray-800 outline-none"
                value={filters.maxAmount}
                onChange={(e) => setFilters({ maxAmount: e.target.value })}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Start Date</label>
              <input
                type="date"
                className="w-full p-2 rounded-lg border border-border bg-white dark:bg-gray-800 outline-none"
                value={filters.startDate}
                onChange={(e) => setFilters({ startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">End Date</label>
              <input
                type="date"
                className="w-full p-2 rounded-lg border border-border bg-white dark:bg-gray-800 outline-none"
                value={filters.endDate}
                onChange={(e) => setFilters({ endDate: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-xs text-text-muted uppercase tracking-wider">
              <th
                className="pb-3 font-medium cursor-pointer"
                onClick={() => toggleSort("date")}
              >
                <div className="flex items-center gap-1 group">
                  Date
                  {filters.sortBy === "date" &&
                    (filters.sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    ))}
                </div>
              </th>
              <th className="pb-3 font-medium">Description</th>
              <th className="pb-3 font-medium">Category</th>
              <th
                className="pb-3 font-medium cursor-pointer text-right"
                onClick={() => toggleSort("amount")}
              >
                <div className="flex items-center justify-end gap-1 group">
                  Amount
                  {filters.sortBy === "amount" &&
                    (filters.sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    ))}
                </div>
              </th>
              {role === "admin" && (
                <th className="pb-3 font-medium text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {parsedTransactions.length > 0 ? (
              parsedTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-border last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 text-sm text-text whitespace-nowrap">
                    {format(parseISO(t.date), "MMM dd, yyyy")}
                  </td>
                  <td className="py-4 text-sm font-medium text-text">
                    {t.description}
                  </td>
                  <td className="py-4 text-sm">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      {t.category}
                    </span>
                  </td>
                  <td
                    className={cn(
                      "py-4 text-sm font-bold text-right whitespace-nowrap",
                      t.type === "income" ? "text-success" : "text-text",
                    )}
                  >
                    {t.type === "income" ? "+" : "-"}$
                    {t.amount.toLocaleString()}
                  </td>
                  {role === "admin" && (
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="p-1.5 text-text-muted hover:text-expense hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={role === "admin" ? 5 : 4}
                  className="py-8 text-center text-text-muted"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
