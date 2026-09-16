import { useState } from 'react';
import { useLoans } from '../../hooks/useLoans';
import { formatCurrency } from '../../utils/calculations';

export function LoanHistory() {
  const { loans, deleteLoan } = useLoans();
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = (id) => {
    deleteLoan(id);
    setConfirmId(null);
  };

  return (
    <div className="app-shell">
      <main className="max-w-6xl p-4 mx-auto md:p-8">
      <p className="mb-2 eyebrow">Your records</p>
      <h1 className="mb-8 text-4xl font-bold text-[#202522]">Loans you have tracked.</h1>

      {loans.length === 0 ? (
        <div className="p-10 text-center bg-[#fffdf9] border border-[#d8d3ca]">
          <p className="mb-2 text-xl text-slate-500">No saved loans yet</p>
          <p className="text-sm text-slate-400">Use the Calculator to compute and save your loans.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {loans.map(loan => (
            <div key={loan.id} className="p-5 bg-[#fffdf9] border border-[#d8d3ca] border-l-4 border-l-[#2563eb]">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-sm text-slate-500">Created {new Date(loan.createdAt).toLocaleString('en-UG')}</p>
                  <p className="text-lg font-bold text-slate-900">{formatCurrency(loan.principal)} at {loan.interestRate}%</p>
                </div>
                {confirmId === loan.id ? (
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(loan.id)} className="bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-red-700">Confirm Delete</button>
                    <button onClick={() => setConfirmId(null)} className="bg-slate-200 text-slate-800 px-3 py-1.5 rounded text-sm font-medium hover:bg-slate-300">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmId(loan.id)} className="bg-slate-100 text-red-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-slate-200 transition-colors">Delete</button>
                )}
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-4">
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-slate-500">Monthly Payment</p>
                  <p className="font-bold text-[#2563eb]">{formatCurrency(loan.monthlyPayment)}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-slate-500">Term</p>
                  <p className="font-bold text-slate-900">{loan.termMonths} months</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-slate-500">Total Interest</p>
                  <p className="font-bold text-slate-900">{formatCurrency(loan.totalInterest)}</p>
                </div>
                <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
                  <p className="text-slate-500">Total Repayment</p>
                  <p className="font-bold text-blue-700">{formatCurrency(loan.totalRepayment)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </main>
    </div>
  );
}