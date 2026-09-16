# 📄 README.md — Arxcess Loan Tracker
**Copy this into a file named `README.md` in your project root.**

---

# 🏦 Arxcess Loan Tracker

> **A professional, responsive loan calculation and management application** — built to simplify loan EMI calculations, track repayments, and monitor borrowing history with precision.

---

## ✨ Features

- 🔐 **Secure Authentication** — User registration, login, and protected routes
- 💰 **Loan Calculator** — Compute monthly payments, total interest, and full amortization schedule
- 📊 **Dashboard** — Real-time overview: total loans, borrowed amount, interest, and average rates
- 📋 **Loan History** — Save, view, and delete loan calculations with full details
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile devices
- 🎨 **Professional Branding** — Arxcess blue/black/gray design system
- 💾 **Local Persistence** — Data stays saved across browser sessions
- 🇺🇬 **UGX Currency Formatting** — Native Ugandan Shilling display

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | Frontend framework |
| **Vite** | Fast build tool & dev server |
| **Tailwind CSS** | Utility-first styling & responsive design |
| **React Router** | Navigation & protected routes |
| **Supabase** | Authentication and cloud loan persistence |

---

## 📂 Project Structure

```
arxcess-loan-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/              # Login & Sign Up pages
│   │   ├── common/            # Navbar, ProtectedRoute
│   │   ├── calculator/        # Loan Calculator engine
│   │   ├── dashboard/         # Statistics & overview
│   │   └── history/           # Saved loans management
│   ├── context/               # Auth state management
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Calculation utilities
│   ├── App.jsx                # Main app & routes
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── tailwind.config.js         # Arxcess brand colors
└── vite.config.js
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation
```bash
# Clone or navigate to project
cd arxcess-loan-tracker

# Install dependencies
npm install
```

### Supabase Setup
1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql).
3. Copy [`.env.example`](.env.example) to `.env`.
4. Add your Supabase project URL and publishable key to `.env`.
5. In Supabase Authentication settings, choose whether new accounts require email confirmation.

Only the publishable key belongs in the frontend. Never expose a Supabase service-role key.

### Development
```bash
# Start local dev server
npm run dev
```
> App runs at **http://localhost:5173**

### Build for Production
```bash
# Optimized build output → dist/ folder
npm run build

# Preview production build
npm run preview
```

---

## 📖 Usage Guide

### 1. Create Account
- Navigate to **Sign Up**
- Enter email and password (min. 6 characters)
- Credentials stored securely in your browser

### 2. Calculate a Loan
- Go to **Calculator**
- Enter:
  - **Principal Amount** — Total loan amount in UGX
  - **Interest Rate (%)** — Annual percentage rate
  - **Loan Term** — Duration in months or years
- Click **Calculate** → view:
  - Monthly payment
  - Total interest payable
  - Total repayment amount
  - Full amortization schedule (month-by-month breakdown)

### 3. Save & Track Loans
- Click **Save Loan** to store calculation
- View **Dashboard** for summary statistics across all loans
- Open **Loan History** to review, compare, or delete saved entries

---

## 🎨 Brand Design System

| Element | Color Code | Usage |
|---|---|---|
| Primary Blue | `#2563eb` | Buttons, accents, links |
| Deep Black | `#0f172a` | Headers, navbar, table headers |
| Slate Gray | `#1e293b` | Secondary accents |
| Light Gray | `#f8fafc` | Page backgrounds |

---

## 🔒 Data & Privacy

- Authentication is handled by **Supabase Auth**.
- Loan records are stored in the Supabase `loans` table and protected by Row Level Security.
- Each user can only read, create, and delete their own loans.
- Existing `localStorage` records are not automatically migrated to Supabase.

---

## 🌐 Deployment

### Deploy to Vercel
```bash
# Push code to GitHub
git init
git add .
git commit -m "Initial release"
git push -u origin main

# Import repository at vercel.com
# → Auto-detects Vite → Deploy
```

### Deploy to Netlify
```bash
npm run build
# Drag & drop the /dist folder to app.netlify.com
```

---

## 🧪 Testing Checklist

- [ ] User registration & login flow
- [ ] Input validation & error messages
- [ ] Loan calculation accuracy (EMI formula)
- [ ] Amortization schedule correctness
- [ ] Save/delete loan functionality
- [ ] Dashboard statistics update
- [ ] Responsive layout on mobile
- [ ] Data persistence after refresh
- [ ] Logout & route protection

---

## 📌 Roadmap

- [ ] Cloud database integration
- [ ] Password reset & email verification
- [ ] Export schedule to PDF/Excel
- [ ] Multiple loan comparison
- [ ] Repayment progress tracking
- [ ] Dark mode support

---

## 🤝 Contributing

This project is maintained by **Arxcess**. For inquiries or improvements, contact the development team.

---

## © License

Copyright © 2026 Arxcess. All rights reserved.

---

### ✅ How to Use
1. Create a new file named **`README.md`** in your project root folder
2. Copy **all the text above** into it
3. Save the file
4. When you push your code to GitHub, this will automatically appear as your project's professional landing page!
