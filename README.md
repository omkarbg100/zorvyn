# Finance Dashboard UI

A clean and interactive Finance Dashboard built as a frontend-only project.

## Features

- **Dashboard Overview**: Summary cards showing Total Balance, Income, and Expenses with percentage trends.
- **Charts and Insights**: 
  - Time-based line chart displaying your balance trends over time.
  - Interactive pie chart breaking down expenses by category.
  - Automatically calculated insights like highest spending category and savings rate.
- **Transactions Management**: Complete list of recent transactions with robust search and filtering (by category or type). It also includes chronological or amount-based sorting.
- **Role-Based UI**:
  - `Viewer` mode: Can only view data and apply filters.
  - `Admin` mode: Can add new transactions or delete existing ones.
- **State Management & Persistence**: Uses Zustand with a localStorage middleware plugin so data changes safely persist across page reloads.
- **Responsive Layout**: Designed beautifully across Desktop, Tablet, and Mobile screens.

## Tech Stack

- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Others**: `clsx`, `tailwind-merge`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/       # Charts, Insights, Summary Cards
│   ├── layout/          # Header, Sidebar, etc.
│   └── transactions/    # Transaction List, Transaction Modal
├── data/                # Initial mock data and seeds
├── lib/                 # Utility functions (cn wrapper for Tailwind)
├── store/               # Zustand global store with persistence
├── types/               # TypeScript interfaces & types
├── App.tsx              # Application Root component
└── index.css            # Tailwind directives and custom theme variables
```

## Setup Instructions

1. **Install Dependencies**:
   Run the following command to download NPM packages:
   ```bash
   npm install
   ```

2. **Run the Development Server**:
   Start the local dev server with Vite:
   ```bash
   npm run dev
   ```

3. **Open the App**:
   Navigate to `http://localhost:5173` in your browser.

## Data Handling & Notes
* The application runs on mock static JSON data out of the box.
* Operations (add/delete) will update the UI immediately and are persisted within LocalStorage, meaning you can reload the app without losing your changes.
* This is a complete frontend implementation containing no external API/backend service integrations.
