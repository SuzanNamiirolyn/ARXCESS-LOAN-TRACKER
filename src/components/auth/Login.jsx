import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await login(form.email, form.password); navigate('/calculator'); }
    catch (err) { setError(err.message); }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 app-shell">
      <div className="w-full max-w-md p-8 bg-[#fffdf9] border border-[#d8d3ca]">
        <div className="mb-6 text-center">
          <p className="mb-2 eyebrow">Arxcess</p>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back.</h1>
          <p className="text-slate-500">Sign in to continue.</p>
        </div>
        {error && <p className="p-2 mb-4 text-sm text-red-600 rounded bg-red-50">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-slate-800">Email</label>
            <input 
              type="email" 
              name="email" 
              value={form.email}
              onChange={e => setForm({...form,email:e.target.value})} 
              required
              className="w-full px-3 py-2 transition-colors border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-slate-800">Password</label>
            <input 
              type="password" 
              name="password" 
              value={form.password}
              onChange={e => setForm({...form,password:e.target.value})} 
              required
              className="w-full px-3 py-2 transition-colors border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563eb] text-white py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 font-medium"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-slate-600">
          Don't have an account? <Link to="/signup" className="font-medium text-[#2563eb] transition-colors hover:text-[#1d4ed8]">Create Account</Link>
        </p>
      </div>
    </div>
  );
}