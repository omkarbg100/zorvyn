import React, { useMemo } from "react";
import { useStore } from "../../store";
import { Lightbulb, TrendingUp, AlertCircle } from "lucide-react";

export const Insights = () => {
  const transactions = useStore((state) => state.transactions);

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const income = transactions.filter((t) => t.type === "income");

    const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
    // Highest spending category
    const categoryTotals = {};
    expenses.forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    const highestCategory = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1],
    )[0];

    const savingsRate =
      totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    return [
      {
        id: 1,
        title: "Highest Spending Category",
        desc: highestCategory
          ? `You spent $${highestCategory[1]} on ${highestCategory[0]} recently.`
          : "No expenses recorded.",
        icon: AlertCircle,
        color: "text-amber-500",
        bg: "bg-amber-50",
      },
      {
        id: 2,
        title: "Income vs Expense",
        desc: `Your income is $${totalIncome} and expenses are $${totalExpense}.`,
        icon: TrendingUp,
        color: totalIncome >= totalExpense ? "text-success" : "text-expense",
        bg: totalIncome >= totalExpense ? "bg-green-50" : "bg-red-50",
      },
      {
        id: 3,
        title: "Savings Rate",
        desc: `You are saving ${savingsRate.toFixed(1)}% of your income.`,
        icon: Lightbulb,
        color: "text-blue-500",
        bg: "bg-blue-50",
      },
    ];
  }, [transactions]);

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border transition-colors duration-300">
      <h3 className="text-lg font-bold mb-4 text-text transition-colors duration-300">Quick Insights</h3>
      <div className="space-y-4">
        {insights.map((item) => (
          <div
            key={item.id}
            className="flex items-start p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
          >
            <div className={`p-2 rounded-lg ${item.bg} ${item.color} mr-4`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text">{item.title}</h4>
              <p className="text-sm text-text-muted mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
