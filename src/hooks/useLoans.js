import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useLoans() {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    if (user) {
      const key = `arxcess_loans_${user.id}`;
      const saved = localStorage.getItem(key);
      if (saved) setLoans(JSON.parse(saved));
    }
  }, [user]);

  const saveLoan = (loanData) => {
    if (!user) return;
    const newLoan = {
      id: Date.now().toString(),
      ...loanData,
      createdAt: new Date().toISOString()
    };
    const updated = [newLoan, ...loans];
    setLoans(updated);
    localStorage.setItem(`arxcess_loans_${user.id}`, JSON.stringify(updated));
    return newLoan;
  };

  const deleteLoan = (id) => {
    const updated = loans.filter(l => l.id !== id);
    setLoans(updated);
    localStorage.setItem(`arxcess_loans_${user.id}`, JSON.stringify(updated));
  };

  return { loans, saveLoan, deleteLoan };
}