import { useState } from 'react';
import { calculateLoan, formatCurrency } from '../../utils/calculations';
import { useLoans } from '../../hooks/useLoans';

export function LoanCalculator() {
  const [form, setForm] = useState({
    principal: '',
    rate: '',
    term: '',
    termUnit: 'months'
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const { saveLoan } = useLoans();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCalculate = e => {
    e?.preventDefault();
    setError('');

    const principal = parseFloat(form.principal);
    const rate = parseFloat(form.rate);
    let term = parseInt(form.term);

    if (!principal || principal <= 0) return setError('Enter a valid principal amount');
    if (isNaN(rate) || rate < 0 || rate > 100) return setError('Rate must be between 0 and 100%');
    if (!term || term <= 0) return setError('Enter a valid loan term');
    if (form.termUnit === 'years') term *= 12;

    const data = calculateLoan(principal, rate, term);
    setResults({
      ...data,
      principal,
      annualRate: rate,
      termMonths: term
    });
  };

  const handleSave = () => {
    if (!results) return;
    saveLoan({
      principal: results.principal,
      interestRate: results.annualRate,
      termMonths: results.termMonths,
      monthlyPayment: results.monthlyPayment,
      totalInterest: results.totalInterest,
      totalRepayment: results.totalRepayment
    });
    alert('✅ Loan saved to your history!');
  };

  return (
    <div className="app-shell">
      <main className="max-w-5xl p-4 mx-auto md:p-8">
      <p className="mb-2 eyebrow">Planning tool</p>
      <h1 className="mb-8 text-4xl font-bold text-[#202522]">Work out the real cost.</h1>

      {/* Input Form */}
      <form onSubmit={handleCalculate} className="p-6 mb-6 bg-[#fffdf9] border border-[#d8d3ca]">
        {error && (
            <p className="p-3 mb-4 text-sm font-medium text-red-700 border-l-4 border-red-500 bg-red-50">
            {error}
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-medium text-slate-800">Principal Amount (UGX)</label>
            <input
              type="number"
              name="principal"
              value={form.principal}
              onChange={handleChange}
              placeholder="e.g. 5000000"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-slate-800">Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              name="rate"
              value={form.rate}
              onChange={handleChange}
              placeholder="e.g. 12"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-slate-800">Loan Term</label>
            <div className="flex gap-3">
              <input
                type="number"
                name="term"
                value={form.term}
                onChange={handleChange}
                placeholder="Duration"
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <select
                name="termUnit"
                value={form.termUnit}
                onChange={handleChange}
                className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            type="submit"
            className="bg-[#2563eb] text-white px-6 py-2.5 rounded hover:bg-[#1d4ed8] transition-colors font-medium"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!results}
            className="bg-[#202522] text-white px-6 py-2.5 rounded hover:bg-[#39433d] transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Loan
          </button>
        </div>
      </form>

      {/* Results Section */}
      {results && (
        <>
          <div className="p-6 mb-6 bg-[#fffdf9] border border-[#d8d3ca]">
            <h2 className="mb-4 text-lg font-bold text-[#202522]">Calculation results</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 text-center border border-blue-200 bg-blue-50">
                <p className="mb-1 text-sm text-slate-600">Monthly Payment</p>
                <p className="text-xl font-bold text-[#2563eb]">{formatCurrency(results.monthlyPayment)}</p>
              </div>
              <div className="p-4 text-center border rounded-lg bg-slate-50 border-slate-200">
                <p className="mb-1 text-sm text-slate-600">Total Interest</p>
                <p className="text-xl font-bold text-slate-900">{formatCurrency(results.totalInterest)}</p>
              </div>
              <div className="p-4 text-center border rounded-lg bg-slate-50 border-slate-200">
                <p className="mb-1 text-sm text-slate-600">Total Repayment</p>
                <p className="text-xl font-bold text-slate-900">{formatCurrency(results.totalRepayment)}</p>
              </div>
            </div>
          </div>

          {/* Amortization Schedule — Desktop Table */}
          <div className="hidden p-6 overflow-x-auto bg-[#fffdf9] border border-[#d8d3ca] md:block">
            <h2 className="mb-4 text-lg font-bold text-[#202522]">Amortization schedule</h2>
            <table className="w-full text-sm">
              <thead className="text-white bg-slate-900">
                <tr>
                  <th className="px-3 py-3 text-left">#</th>
                  <th className="px-3 py-3 text-right">Payment</th>
                  <th className="px-3 py-3 text-right">Interest</th>
                  <th className="px-3 py-3 text-right">Principal</th>
                  <th className="px-3 py-3 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {results.schedule.map(row => (
                  <tr key={row.month} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium">{row.month}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.payment)}</td>
                    <td className="px-3 py-2 text-right text-red-600">{formatCurrency(row.interest)}</td>
                    <td className="px-3 py-2 font-medium text-right text-blue-600">{formatCurrency(row.principalPaid)}</td>
                    <td className="px-3 py-2 font-bold text-right text-slate-900">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Amortization Schedule — Mobile Cards */}
          <div className="p-6 bg-[#fffdf9] border border-[#d8d3ca] md:hidden">
            <h2 className="mb-4 text-lg font-bold text-[#202522]">Amortization schedule</h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {results.schedule.map(row => (
                <div key={row.month} className="p-3 border rounded-lg bg-slate-50 border-slate-200">
                  <p className="mb-2 font-bold text-slate-900">Month {row.month}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-slate-500">Payment</p>
                      <p className="font-medium">{formatCurrency(row.payment)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Interest</p>
                      <p className="font-medium text-red-600">{formatCurrency(row.interest)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Principal</p>
                      <p className="font-medium text-blue-600">{formatCurrency(row.principalPaid)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Balance</p>
                      <p className="font-bold text-slate-900">{formatCurrency(row.balance)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      </main>
    </div>
  );
}