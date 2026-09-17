import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export function SignUp() {
  const [form, setForm] = useState({ email:'', password:'', confirmPassword:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault(); setError('');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const result = await signup(form.email, form.password);
      if (result.needsEmailConfirmation) {
        setError('Account created. Check your email to confirm your account, then sign in.');
      } else {
        navigate('/calculator');
      }
    }
    catch (err) { setError(err.message); }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 app-shell">
      <div className="w-full max-w-md p-8 bg-[#fffdf9] border border-[#d8d3ca]">
        <div className="mb-6 text-center">
          <p className="mb-2 eyebrow">Arxcess</p>
          <h1 className="text-3xl font-bold text-slate-900">Start tracking.</h1>
          <p className="text-slate-500">Create your account to begin.</p>
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
          <div>
            <label className="block mb-1 font-medium text-slate-800">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={form.confirmPassword}
              onChange={e => setForm({...form,confirmPassword:e.target.value})} 
              required
              className="w-full px-3 py-2 transition-colors border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 font-medium"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-slate-600">
          Already have an account? <Link to="/login" className="font-medium text-[#2563eb] transition-colors hover:text-[#1d4ed8]">Sign In</Link>
        </p>
      </div>
    </div>
  );
}