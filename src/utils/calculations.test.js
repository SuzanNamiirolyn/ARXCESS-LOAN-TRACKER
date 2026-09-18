import { describe, expect, it } from 'vitest';
import { calculateLoan, formatCurrency } from './calculations';

describe('calculateLoan', () => {
  it('calculates a standard fixed-rate loan correctly', () => {
    const result = calculateLoan(100000, 12, 12);

    expect(result.monthlyPayment).toBeCloseTo(8884.88, 2);
    expect(result.totalInterest).toBeCloseTo(6618.55, 2);
    expect(result.totalRepayment).toBeCloseTo(106618.55, 2);
    expect(result.schedule).toHaveLength(12);
    expect(result.schedule[0].balance).toBeGreaterThan(0);
  });

  it('handles zero-interest loans without divide-by-zero errors', () => {
    const result = calculateLoan(12000, 0, 12);

    expect(result.monthlyPayment).toBe(1000);
    expect(result.totalInterest).toBe(0);
    expect(result.totalRepayment).toBe(12000);
    expect(result.schedule).toHaveLength(12);
  });
});

describe('formatCurrency', () => {
  it('formats Ugandan Shillings correctly', () => {
    const formatted = formatCurrency(2500000);

    expect(formatted).toContain('USh');
    expect(formatted).toContain('2,500,000');
  });
});
