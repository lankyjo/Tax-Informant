
import React from 'react';
import { IconScale, IconSun, IconMoon, IconMenu } from './Icons';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode, onMenuClick }) => {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <IconMenu />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 dark:bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <IconScale />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-serif font-bold text-slate-900 dark:text-white tracking-tight">Naija Tax Portal</h1>
            <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest">Federal Reform 2026</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all border border-slate-200 dark:border-slate-700"
          title="Toggle Theme"
        >
          {isDarkMode ? <IconSun /> : <IconMoon />}
        </button>
        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
        <button 
          onClick={() => alert("The Support Archive contains historical tax data prior to 2025. This module is currently restricted to government personnel.")}
          className="hidden md:flex bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 dark:hover:bg-emerald-500 dark:hover:text-white transition-all shadow-lg"
        >
          Support Archive
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
