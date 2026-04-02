import React, { useMemo } from "react";
import { useStore } from "../../store";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#14b8a6",
  "#0ea5e9",
  "#6366f1",
  "#f43f5e",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
];

export const ExpensesPieChart = () => {
  const { transactions, theme } = useStore();

  const data = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const categoryTotals = {};

    expenses.forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border flex-1 min-h-[300px] transition-colors duration-300">
      <h3 className="text-lg font-bold mb-6 text-text transition-colors duration-300">Expenses by Category</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                borderRadius: "8px",
                border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value) => `$${value}`}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", color: "#64748b" }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[250px] flex items-center justify-center text-text-muted">
          No expenses recorded
        </div>
      )}
    </div>
  );
};
