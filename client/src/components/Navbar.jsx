import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/userSlice';
import { LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path || (path === '/' && location.pathname === '/admin-dashboard');

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-1 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl shadow-xs group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="Modern AI Academy Logo" className="w-10 h-10 object-cover rounded-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white transition-colors">
                  MODERN <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-indigo-600 to-cyan-500">GUIDANCE ACADEMY</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse"></span>
                  All Academic &amp; Competitive Streams
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to={user?.role === 'admin' ? '/admin-dashboard' : '/'}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all relative ${
                isActive(user?.role === 'admin' ? '/admin-dashboard' : '/')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/exams"
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all relative ${
                location.pathname === '/exams'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              Exams
            </Link>

            {user && user.role !== 'admin' && (
              <Link
                to="/live-classes"
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all relative ${
                  location.pathname === '/live-classes'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                Live Classes
              </Link>
            )}

            {user && (
              <Link
                to="/study-material"
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all relative ${
                  location.pathname === '/study-material'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                Study Material
              </Link>
            )}

            <Link
              to="/about"
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all relative ${
                location.pathname === '/about'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all relative ${
                location.pathname === '/contact'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-500/10 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Auth & Theme Toggle Section */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={user.role === 'admin' ? '/admin-dashboard' : '/profile'}
                  className="flex items-center gap-3 px-3.5 py-1.5 rounded-2xl border transition-all shadow-2xs bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100/80 dark:hover:bg-slate-700/80"
                >
                  <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                      {user.role === 'admin' ? 'Admin' : 'Student'}
                    </div>
                    <div className="text-xs font-bold leading-tight truncate max-w-[100px] text-slate-900 dark:text-white">{user.name}</div>
                  </div>
                </Link>
                <button
                  onClick={onLogout}
                  className="p-2.5 rounded-xl transition-all active:scale-95 border cursor-pointer bg-rose-50/80 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-600 dark:hover:bg-rose-600 hover:text-white dark:hover:text-white"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 font-semibold text-sm transition-colors text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;