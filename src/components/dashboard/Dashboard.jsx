import { useLoans } from '../../hooks/useLoans';
import { formatCurrency } from '../../utils/calculations';

export function Dashboard() {
  const { loans } = useLoans();

  const totalLoans = loans.length;
  const totalBorrowed = loans.reduce((sum, l) => sum + (l.principal || 0), 0);
  const totalInterest = loans.reduce((sum, l) => sum + (l.totalInterest || 0), 0);
  const totalRepayment = loans.reduce((sum, l) => sum + (l.totalRepayment || 0), 0);
  const avgRate = totalLoans > 0
    ? (loans.reduce((sum, l) => sum + (l.interestRate || 0), 0) / totalLoans).toFixed(2)
    : '0.00';

  return (
    <div className="app-shell">
      <main className="max-w-6xl p-4 mx-auto md:p-8">
      <p className="mb-2 eyebrow">Loan position</p>
      <h1 className="mb-8 text-4xl font-bold text-[#202522]">A clear view of your borrowing.</h1>

      <div className="grid gap-px mb-8 overflow-hidden border border-[#d8d3ca] sm:grid-cols-2 lg:grid-cols-4 bg-[#d8d3ca]">
        <div className="p-5 bg-[#fffdf9]">
          <p className="mb-1 text-sm text-slate-500">Total Loans</p>
          <p className="text-3xl font-bold text-[#2563eb]">{totalLoans}</p>
        </div>
        <div className="p-5 bg-[#fffdf9]">
          <p className="mb-1 text-sm text-slate-500">Total Borrowed</p>
          <p className="text-xl font-bold text-slate-900">{formatCurrency(totalBorrowed)}</p>
        </div>
        <div className="p-5 bg-[#fffdf9]">
          <p className="mb-1 text-sm text-slate-500">Total Interest</p>
          <p className="text-xl font-bold text-slate-900">{formatCurrency(totalInterest)}</p>
        </div>
        <div className="p-5 bg-[#fffdf9]">
          <p className="mb-1 text-sm text-slate-500">Avg Interest Rate</p>
          <p className="text-xl font-bold text-[#2563eb]">{avgRate}%</p>
        </div>
      </div>

      <div className="p-6 mb-8 border-l-4 border-[#2563eb] bg-[#dbeafe]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Total Amount to Repay</h2>
            <p className="text-sm text-slate-500">Across all your saved loans</p>
          </div>
          <p className="text-3xl font-bold text-[#202522]">{formatCurrency(totalRepayment)}</p>
        </div>
      </div>

      <div className="p-6 bg-[#fffdf9] border border-[#d8d3ca]">
        <h2 className="mb-4 text-lg font-bold text-[#202522]">Recent loans</h2>
        {loans.length === 0 ? (
          <div className="py-10 text-center text-slate-500">
            <p className="mb-2 text-xl">No loans saved yet.</p>
            <p>Go to <strong>Calculator</strong> and save your first loan!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white bg-slate-900">
                <tr>
                  <th className="px-3 py-3 text-left">Date</th>
                  <th className="px-3 py-3 text-right">Principal</th>
                  <th className="px-3 py-3 text-right">Rate</th>
                  <th className="px-3 py-3 text-right">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {loans.slice(0, 5).map(loan => (
                  <tr key={loan.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium">{new Date(loan.createdAt).toLocaleDateString('en-UG')}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(loan.principal)}</td>
                    <td className="px-3 py-2 text-right">{loan.interestRate}%</td>
                    <td className="px-3 py-2 font-medium text-right text-[#2563eb]">{formatCurrency(loan.monthlyPayment)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </main>
    </div>
  );
}