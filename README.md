# Arxcess Loan Tracker

A responsive loan calculator and tracking app built with React, Vite, Tailwind CSS, and Supabase. It helps users calculate repayment figures, save loan records, track borrowing history, and monitor totals across saved loans.

## Features

- User authentication with Supabase
- Protected routes for authenticated users only
- Loan calculation with monthly payment, total interest, and total repayment values
- Amortization schedule for each loan
- Dashboard summary of saved loans
- Loan history with delete capability
- UGX-based currency formatting
- ShadCN-style component foundation and consistent UI tokens
- Production-ready build, lint, and test setup

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router
- Supabase
- Vitest
- Docker
- GitHub Actions CI

## Project Structure

```bash
TRACKER/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── calculator/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── history/
│   │   └── ui/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── supabase/
│   └── schema.sql
├── .env.example
├── .gitignore
├── components.json
├── Dockerfile
├── docker-compose.yml
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── README.md
└── package-lock.json
```

## Prerequisites

- Node.js 18 or newer
- npm
- Supabase project

## Installation

```bash
cd "TRACKER"
npm install
```

## Environment Setup

Create a `.env` file from `.env.example` and add your Supabase values:

```bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

Then run the SQL schema in Supabase:

```bash
supabase/schema.sql
```

## Running the App

```bash
npm run dev
```

The app is typically available at:

```bash
http://localhost:5173
```

## Production Build

```bash
npm run build
```

## Lint and Test

```bash
npm run lint
npm test
```

## Docker

Build locally:

```bash
docker build -t arxcess-loan-tracker .
```

Run with Docker Compose:

```bash
docker-compose up --build
```

## Deployment

This app is ready for Vercel deployment.

### Deploy to Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Set these environment variables in the Vercel project settings:

```bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

4. Deploy the project.

The app includes a `vercel.json` rewrite config so client-side routes work correctly.

## CI/CD

A GitHub Actions workflow is configured in `.github/workflows/ci.yml` to run lint, tests, and a production build on push and pull request.

## License

This project is for educational and portfolio use.

## Notes

This project follows a modern frontend standard with reusable UI primitives, responsive design, and automated quality checks to better match production-level expectations.
