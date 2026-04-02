import React, { useMemo, useState, useEffect } from "react";
import { useStore } from "../../store";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { cn } from "../../lib/utils";
import { subDays, isAfter, parseISO } from "date-fns";

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    const duration = 1000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(start + (end - start) * ease);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };
    requestAnimationFrame(animate);
  }, [value]);

  return displayValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const OverviewCards = () => {
  const transactions = useStore((state) => state.transactions);

  const { currentStats, trends } = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);
    const sixtyDaysAgo = subDays(now, 60);

    const current = { income: 0, expense: 0, balance: 0 };
    const previous = { income: 0, expense: 0, balance: 0 };
    let totalBalance = 0;

    transactions.forEach((t) => {
      const d = parseISO(t.date);
      const isCurrent = isAfter(d, thirtyDaysAgo);
      const isPrevious = !isCurrent && isAfter(d, sixtyDaysAgo);

      if (t.type === "income") {
        totalBalance += t.amount;
        if (isCurrent) current.income += t.amount;
        if (isPrevious) previous.income += t.amount;
      } else {
        totalBalance -= t.amount;
        if (isCurrent) current.expense += t.amount;
        if (isPrevious) previous.expense += t.amount;
      }
    });

    current.balance = totalBalance; // The total balance is always absolute history

    const calcTrend = (curr, prev) => {
      if (prev === 0) return curr > 0 ? "+100%" : "0%";
      const diff = ((curr - prev) / Math.abs(prev)) * 100;
      return `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%`;
    };

    return {
      currentStats: current,
      trends: {
        income: calcTrend(current.income, previous.income),
        expense: calcTrend(current.expense, previous.expense),
        balance: calcTrend(
          current.income - current.expense,
          previous.income - previous.expense
        ),
      },
    };
  }, [transactions]);

  const cards = [
    {
      title: "Total Balance",
      amount: currentStats.balance,
      icon: Wallet,
      color: "text-primary-600",
      bgColor: "bg-primary-50",
      trend: trends.balance,
      isPositive: !trends.balance.startsWith("-"),
    },
    {
      title: "Monthly Income",
      amount: currentStats.income,
      icon: ArrowUpRight,
      color: "text-success",
      bgColor: "bg-green-50",
      trend: trends.income,
      isPositive: !trends.income.startsWith("-"),
    },
    {
      title: "Monthly Expenses",
      amount: currentStats.expense,
      icon: ArrowDownRight,
      color: "text-expense",
      bgColor: "bg-red-50",
      trend: trends.expense,
      isPositive: trends.expense.startsWith("-"), // for expenses, a negative trend is physically good, but for display let's do standard arrow match
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-surface rounded-2xl p-6 shadow-sm border border-border transition-colors duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-muted text-sm font-medium">
              {card.title}
            </h3>
            <div
              className={cn(
                "p-2 rounded-xl flex items-center justify-center dark:bg-gray-800",
                card.bgColor,
                card.color,
              )}
            >
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-text mb-1">
                $<AnimatedNumber value={card.amount} />
              </p>
              <span className="text-text-muted font-normal text-xs">
                vs last 30 days
              </span>
            </div>
            {/* Split this badge out so it pins to the right side of the card! */}
            <div
              className={cn(
                "flex items-center px-2 py-1 rounded-full text-sm font-medium",
                card.isPositive ? "bg-green-100 text-success dark:bg-green-900/30" : "bg-red-100 text-expense dark:bg-red-900/30",
              )}
            >
              {card.isPositive ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              {card.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
