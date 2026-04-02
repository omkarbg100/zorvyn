import React, { useMemo } from "react";
import { useStore } from "../../store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO, compareAsc } from "date-fns";

export const BalanceChart = () => {
  const { transactions, theme } = useStore();

  const data = useMemo(() => {
    // Sort transactions chronologically
    const sorted = [...transactions].sort((a, b) =>
      compareAsc(parseISO(a.date), parseISO(b.date)),
    );

    let currentBalance = 0;
    const balanceByDate = {};

    sorted.forEach((t) => {
      if (t.type === "income") {
        currentBalance += t.amount;
      } else {
        currentBalance -= t.amount;
      }
      balanceByDate[t.date] = currentBalance;
    });

    return Object.entries(balanceByDate).map(([date, balance]) => ({
      date: format(parseISO(date), "MMM dd"),
      balance,
    }));
  }, [transactions]);

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border flex-1 min-h-[300px] transition-colors duration-300">
      <h3 className="text-lg font-bold mb-6 text-text transition-colors duration-300">Balance Trend</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={theme === 'dark' ? '#334155' : '#e2e8f0'}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dx={-10}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                borderRadius: "8px",
                border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="#0d9488"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#0d9488" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[250px] flex items-center justify-center text-text-muted">
          No data available
        </div>
      )}
    </div>
  );
};
