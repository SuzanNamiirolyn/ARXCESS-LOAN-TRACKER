import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { Button } from '../ui/button';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-slate-950 text-white shadow-sm">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex items-center justify-between py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logo-color.svg" alt="Arxcess logo" className="w-8 h-8" />
            <h1 className="hidden text-lg font-bold text-white sm:inline">Arxcess Loan Calculator</h1>
          </Link>

          <div className="items-center hidden gap-5 text-sm md:flex">
            <Link to="/dashboard" className="transition-colors hover:text-sky-300">Overview</Link>
            <Link to="/calculator" className="transition-colors hover:text-sky-300">Calculator</Link>
            <Link to="/history" className="transition-colors hover:text-sky-300">History</Link>
            <span className="w-px h-5 bg-slate-700" />
            <span className="text-xs text-slate-300">{user.email}</span>
            <Button variant="secondary" size="sm" onClick={handleLogout} className="bg-white/10 text-white hover:bg-white/20">
              Logout
            </Button>
          </div>

          <button className="text-2xl leading-none md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            ☰
          </button>
        </div>

        {mobileOpen && (
          <div className="pb-4 space-y-2 border-t md:hidden border-slate-800">
            <Link to="/dashboard" className="block px-1 py-2 hover:text-sky-300" onClick={() => setMobileOpen(false)}>Overview</Link>
            <Link to="/calculator" className="block px-1 py-2 hover:text-sky-300" onClick={() => setMobileOpen(false)}>Calculator</Link>
            <Link to="/history" className="block px-1 py-2 hover:text-sky-300" onClick={() => setMobileOpen(false)}>History</Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
              <span className="text-sm text-slate-400">{user.email}</span>
              <Button variant="destructive" size="sm" onClick={handleLogout} className="w-fit">
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}