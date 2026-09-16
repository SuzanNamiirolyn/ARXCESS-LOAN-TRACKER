export function calculateLoan(principal, annualRate, termMonths) {
  const P = parseFloat(principal);
  const r = (parseFloat(annualRate) / 100) / 12;
  const n = parseInt(termMonths);

  let monthlyPayment, totalRepayment, totalInterest;

  if (r === 0) {
    monthlyPayment = P / n;
    totalRepayment = P;
    totalInterest = 0;
  } else {
    monthlyPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalRepayment = monthlyPayment * n;
    totalInterest = totalRepayment - P;
  }

  return {
    monthlyPayment: round(monthlyPayment),
    totalRepayment: round(totalRepayment),
    totalInterest: round(totalInterest),
    schedule: generateSchedule(P, r, monthlyPayment, n)
  };
}

function generateSchedule(principal, monthlyRate, monthlyPayment, totalMonths) {
  let balance = principal;
  const schedule = [];
  for (let i = 1; i <= totalMonths; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    balance = balance - principalPaid;
    schedule.push({
      month: i,
      payment: round(monthlyPayment),
      interest: round(interest),
      principalPaid: round(principalPaid),
      balance: round(Math.max(0, balance))
    });
  }
  return schedule;
}

function round(num) {
  return Math.round(num * 100) / 100;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0
  }).format(amount);
}