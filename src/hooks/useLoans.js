import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const mapLoan = loan => ({
  id: loan.id,
  principal: Number(loan.principal),
  interestRate: Number(loan.interest_rate),
  termMonths: loan.term_months,
  monthlyPayment: Number(loan.monthly_payment),
  totalInterest: Number(loan.total_interest),
  totalRepayment: Number(loan.total_repayment),
  createdAt: loan.created_at
});

export function useLoans() {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    if (!user || !supabase) return undefined;

    let mounted = true;
    supabase
      .from('loans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('Unable to load loans:', error.message);
        if (mounted) setLoans((data || []).map(mapLoan));
      });

    return () => {
      mounted = false;
    };
  }, [user]);

  const saveLoan = async loanData => {
    if (!user || !supabase) return;

    const { data, error } = await supabase
      .from('loans')
      .insert({
        user_id: user.id,
        principal: loanData.principal,
        interest_rate: loanData.interestRate,
        term_months: loanData.termMonths,
        monthly_payment: loanData.monthlyPayment,
        total_interest: loanData.totalInterest,
        total_repayment: loanData.totalRepayment
      })
      .select()
      .single();

    if (error) throw error;
    const newLoan = mapLoan(data);
    setLoans(currentLoans => [newLoan, ...currentLoans]);
    return newLoan;
  };

  const deleteLoan = async id => {
    if (!user || !supabase) return;

    const { error } = await supabase
      .from('loans')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
    setLoans(currentLoans => currentLoans.filter(loan => loan.id !== id));
  };

  return { loans: user ? loans : [], saveLoan, deleteLoan };
}