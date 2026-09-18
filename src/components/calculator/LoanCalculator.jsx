import { useState } from 'react';
import { calculateLoan, formatCurrency } from '../../utils/calculations';
import { useLoans } from '../../hooks/useLoans';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

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
    let term = parseInt(form.term, 10);

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

  const handleSave = async () => {
    if (!results) return;
    try {
      await saveLoan({
        principal: results.principal,
        interestRate: results.annualRate,
        termMonths: results.termMonths,
        monthlyPayment: results.monthlyPayment,
        totalInterest: results.totalInterest,
        totalRepayment: results.totalRepayment
      });
      alert('Loan saved to your history!');
    } catch (saveError) {
      setError(`Unable to save loan: ${saveError.message}`);
    }
  };

  return (
    <div className="app-shell">
      <main className="max-w-5xl p-4 mx-auto md:p-8">
        <p className="mb-2 eyebrow">Planning tool</p>
        <h1 className="mb-8 text-4xl font-bold text-[#202522]">Work out the real cost.</h1>

        <Card className="mb-6 border-slate-200 bg-[#fffdf9] shadow-card">
          <CardContent className="p-6">
            <form onSubmit={handleCalculate} className="space-y-6">
              {error && (
                <p className="p-3 mb-4 text-sm font-medium text-red-700 border-l-4 border-red-500 bg-red-50">
                  {error}
                </p>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium text-slate-800">Principal Amount (UGX)</label>
                  <Input
                    type="number"
                    name="principal"
                    value={form.principal}
                    onChange={handleChange}
                    placeholder="e.g. 5000000"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-slate-800">Interest Rate (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    name="rate"
                    value={form.rate}
                    onChange={handleChange}
                    placeholder="e.g. 12"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium text-slate-800">Loan Term</label>
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      name="term"
                      value={form.term}
                      onChange={handleChange}
                      placeholder="Duration"
                      className="flex-1"
                    />
                    <select
                      name="termUnit"
                      value={form.termUnit}
                      onChange={handleChange}
                      className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                    >
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit">Calculate</Button>
                <Button type="button" variant="secondary" onClick={handleSave} disabled={!results}>
                  Save Loan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {results && (
          <>
            <Card className="mb-6 border-slate-200 bg-[#fffdf9] shadow-card">
              <CardHeader>
                <CardTitle>Calculation results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 text-center border border-blue-200 bg-blue-50 rounded-lg">
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
              </CardContent>
            </Card>

            <Card className="mb-6 border-slate-200 bg-[#fffdf9] shadow-card">
              <CardHeader>
                <CardTitle>Amortization schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-0 md:p-6">
                <div className="hidden overflow-x-auto md:block">
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

                <div className="p-4 md:hidden">
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
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}