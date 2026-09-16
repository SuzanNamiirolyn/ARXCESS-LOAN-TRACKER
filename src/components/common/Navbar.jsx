import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
    <nav className="sticky top-0 z-50 text-white bg-[#172554] border-b border-[#263b73]">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex items-center justify-between py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logo-color.svg" alt="Arxcess logo" className="w-8 h-8" />
            <h1 className="hidden text-lg font-bold text-white sm:inline">Arxcess Loan Calculator</h1>
          </Link>

          <div className="items-center hidden gap-5 text-sm md:flex">
            <Link to="/dashboard" className="transition-colors hover:text-[#93c5fd]">Overview</Link>
            <Link to="/calculator" className="transition-colors hover:text-[#93c5fd]">Calculator</Link>
            <Link to="/history" className="transition-colors hover:text-[#93c5fd]">History</Link>
            <span className="w-px h-5 bg-[#3b528d]" />
            <span className="text-xs text-[#c7d2fe]">{user.email}</span>
            <button onClick={handleLogout} className="px-3 py-1 text-sm font-medium transition-colors border border-[#6478b4] rounded hover:bg-[#263b73]">
              Logout
            </button>
          </div>

          <button className="text-2xl leading-none md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            ☰
          </button>
        </div>

        {mobileOpen && (
          <div className="pb-4 space-y-2 border-t md:hidden border-slate-800">
            <Link to="/dashboard" className="block px-1 py-2 hover:text-[#93c5fd]" onClick={() => setMobileOpen(false)}>Overview</Link>
            <Link to="/calculator" className="block px-1 py-2 hover:text-[#93c5fd]" onClick={() => setMobileOpen(false)}>Calculator</Link>
            <Link to="/history" className="block px-1 py-2 hover:text-[#93c5fd]" onClick={() => setMobileOpen(false)}>History</Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
              <span className="text-sm text-slate-400">{user.email}</span>
              <button onClick={handleLogout} className="px-3 py-2 text-sm font-medium text-left bg-red-600 rounded hover:bg-red-700 w-fit">Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}