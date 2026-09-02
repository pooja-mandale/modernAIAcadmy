import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle Theme"
      className={`relative inline-flex items-center justify-center p-2.5 rounded-2xl transition-all duration-300 backdrop-blur-md cursor-pointer group select-none ${
        isDark
          ? 'bg-slate-800/80 text-amber-300 border border-slate-700 hover:bg-slate-800 hover:border-amber-400/40 shadow-lg shadow-slate-950/40'
          : 'bg-indigo-50/80 text-indigo-600 border border-indigo-100 hover:bg-indigo-100/90 hover:border-indigo-300 shadow-md shadow-indigo-500/10'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon for Light Mode (shown when dark to switch to light, or vice-versa) */}
        <Sun
          size={20}
          className={`absolute transition-all duration-500 transform ${
            isDark
              ? 'opacity-100 rotate-0 scale-100 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
        {/* Moon Icon for Dark Mode */}
        <Moon
          size={20}
          className={`absolute transition-all duration-500 transform ${
            isDark
              ? 'opacity-0 rotate-90 scale-50'
              : 'opacity-100 rotate-0 scale-100 text-indigo-600 drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]'
          }`}
        />
      </div>

      {/* Tooltip on hover */}
      <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-50">
        {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
