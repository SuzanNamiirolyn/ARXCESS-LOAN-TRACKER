import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

export function SignUp() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      const result = await signup(form.email, form.password);
      if (result.needsEmailConfirmation) {
        setError('Account created. Check your email to confirm your account, then sign in.');
      } else {
        navigate('/calculator');
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 app-shell">
      <Card className="w-full max-w-md border-slate-200 bg-[#fffdf9] shadow-card">
        <CardHeader className="text-center">
          <p className="mb-2 eyebrow">Arxcess</p>
          <CardTitle className="text-3xl font-bold text-slate-900">Start tracking.</CardTitle>
          <p className="text-sm text-slate-500">Create your account to begin.</p>
        </CardHeader>
        <CardContent>
          {error && <p className="p-2 mb-4 text-sm text-red-600 rounded bg-red-50">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-slate-800">Email</label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-slate-800">Password</label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-slate-800">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#2563eb] transition-colors hover:text-[#1d4ed8]">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}