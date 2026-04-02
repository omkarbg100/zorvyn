# 📊 Finance Dashboard

A comprehensive, state-of-the-art Personal Finance Dashboard built with React, Vite, and Tailwind CSS. The dashboard offers an elegant and responsive UI to track and manage personal or business finances seamlessly.

## ✨ Core Features

### 📈 Comprehensive Financial Overview
- **Dynamic Overview Cards**: Real-time calculation of Total Balance, Income, and Expenses, featuring visually engaging percentage trend indicators.
- **Balance Trend Chart**: An interactive line chart demonstrating your financial progress over time, powered by Recharts.
- **Expense Breakdown**: A detailed Pie chart categorizing your spending, allowing you to easily identify where your money is going.
- **Smart Insights**: Automatically calculates your highest spending category, savings rate, and other useful financial metrics to help you stay on budget.

### 💼 Powerful Transaction Management
- **Extensive Transaction List**: An interactive display of recent transactions fully packed with:
  - **Search**: Instantly lookup transactions by keywords for title or description.
  - **Advanced Filtering**: Filter by transaction type (Income/Expense), category, specific date ranges (Start & End), and custom amount bounds.
  - **Sorting**: Order transactions chronologically or dynamically by target amount.
- **Transaction Modal**: A streamlined, easy-to-use form to register new transactions instantly.

### ⚙️ User Personalization & Access Control
- **Dual Modes (Admin / Viewer)**: Restrict operations dynamically based on user roles. Admins have complete control to add or delete transactions, while Viewers can thoughtfully consume data and run extensive analytics via filters.
- **Theme Customization**: Beautiful Light and Dark modes integrated flawlessly into the UI and synchronized with system defaults.
- **Customizable User Profiles**: Modify and update user details (name, email, role) directly through an interactive User Profile Modal.

### 💾 Local State Persistence
- All state logic is natively secured in the browser's `localStorage` via Zustand middleware, ensuring that your dynamic transaction lists and preferences gracefully persist across page reloads.

## 🛠️ Technology Stack

- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Formatting**: [date-fns](https://date-fns.org/)
- **Utilities**: `clsx`, `tailwind-merge` (For robust Tailwind class merging)

## 📂 Project Architecture

```
src/
├── components/          # Modularized Reusable UI components
│   ├── dashboard/       # Charts & Metrics (BalanceChart, ExpensesPieChart, Insights, OverviewCards)
│   ├── layout/          # Page Structure (Header, UserProfileModal)
│   └── transactions/    # Listings & Additions (TransactionList, TransactionModal)
├── data/                # Mock APIs (api.js) and static JSON data configurations (mockData.js)
├── lib/                 # Shared Utility functions (e.g., standardization with cn wrapper)
├── store/               # Unified Zustand configuration handling deep global state (index.js)
├── types/               # TypeScript interfaces & domain validations 
├── App.jsx              # Main Application Container unifying Layout and Global Features
├── index.css            # Specialized styling, base definitions, and CSS theme variables
└── main.jsx             # React DOM rendering Entry
```

## 🚀 Setup Instructions

1. **Install Dependencies**
   Run the following command to download all requisite NPM packages:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   Start the blazing-fast Vite local dev server:
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:5173` to explore the beautiful interface!

## 💡 Notes on Architecture
- The application simulates an asynchronous full-stack workflow mimicking a backend via custom `mockApi` promises in the `data/` directory.
- The state management solution using `Zustand` completely rules over:
  - User State & Identity Management
  - Active UI Theme settings
  - Role-based permissions variable 
  - Comprehensive multi-filter queries applied over raw transaction arrays.

---
Designed with high emphasis on User Experience and Modern Aesthetics. 🎨
