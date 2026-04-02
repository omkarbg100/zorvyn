import React, { useState } from "react";
import { useStore } from "../../store";
import { X } from "lucide-react";
import { format } from "date-fns";

export const TransactionModal = ({ onClose }) => {
  const { addTransaction } = useStore();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense",
    date: format(new Date(), "yyyy-MM-dd"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) return;

    addTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-bold text-text">Add Transaction</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">
                Type
              </label>
              <select
                className="w-full p-2.5 rounded-xl border border-border bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">
                Date
              </label>
              <input
                type="date"
                required
                className="w-full p-2.5 rounded-xl border border-border bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">
              Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Grocery Shopping"
              className="w-full p-2.5 rounded-xl border border-border bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">
                Amount
              </label>
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className="w-full p-2.5 rounded-xl border border-border bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">
                Category
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Food"
                className="w-full p-2.5 rounded-xl border border-border bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl font-medium border border-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl font-medium bg-primary-600 text-white hover:bg-primary-500 transition-colors"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
