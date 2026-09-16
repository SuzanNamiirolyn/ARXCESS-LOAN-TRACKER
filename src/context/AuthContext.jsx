import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('arxcess_loan_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const signup = async (email, password) => {
    const users = JSON.parse(localStorage.getItem('arxcess_loan_users') || '[]');
    if (users.find(u => u.email === email)) throw new Error('Email already registered');
    const newUser = { id: Date.now().toString(), email, createdAt: new Date().toISOString() };
    users.push({ ...newUser, password });
    localStorage.setItem('arxcess_loan_users', JSON.stringify(users));
    localStorage.setItem('arxcess_loan_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem('arxcess_loan_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const { password: _, ...safe } = found;
    localStorage.setItem('arxcess_loan_user', JSON.stringify(safe));
    setUser(safe);
    return safe;
  };

  const logout = () => {
    localStorage.removeItem('arxcess_loan_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);