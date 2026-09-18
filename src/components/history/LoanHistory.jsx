import { useState } from 'react';
import { useLoans } from '../../hooks/useLoans';
import { formatCurrency } from '../../utils/calculations';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

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
          <Card className="border-slate-200 bg-[#fffdf9] shadow-card">
            <CardContent className="p-10 text-center">
              <p className="mb-2 text-xl text-slate-500">No saved loans yet</p>
              <p className="text-sm text-slate-400">Use the Calculator to compute and save your loans.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {loans.map(loan => (
              <Card key={loan.id} className="border-slate-200 bg-[#fffdf9] shadow-card border-l-4 border-l-[#2563eb]">
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-sm text-slate-500">Created {new Date(loan.createdAt).toLocaleString('en-UG')}</p>
                      <p className="text-lg font-bold text-slate-900">{formatCurrency(loan.principal)} at {loan.interestRate}%</p>
                    </div>
                    {confirmId === loan.id ? (
                      <div className="flex gap-2">
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(loan.id)}>
                          Confirm Delete
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => setConfirmId(null)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => setConfirmId(loan.id)} className="text-red-600 hover:text-red-700">
                        Delete
                      </Button>
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}