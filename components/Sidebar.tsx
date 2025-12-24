
import React from 'react';
import { TAX_SOURCES, TAX_HIGHLIGHTS } from '../constants';
import { IconBook, IconClose, IconChevronLeft, IconCalculator, IconScale } from './Icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  currentView: 'chat' | 'calculator';
  onNavigate: (view: 'chat' | 'calculator') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isCollapsed, onToggleCollapse, currentView, onNavigate }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`
        fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out border-r
        bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col
        lg:relative lg:translate-x-0 
        ${isOpen ? 'translate-x-0 w-80' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-0 lg:opacity-0 lg:pointer-events-none' : 'lg:w-80 opacity-100'}
      `}>
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Knowledge Base</span>
            <div className="flex gap-2">
              <button onClick={onToggleCollapse} className="hidden lg:block p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <IconChevronLeft />
              </button>
              <button onClick={onClose} className="lg:hidden p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <IconClose />
              </button>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">Tax Tools</h3>
            <div className="space-y-2">
              <button
                onClick={() => { onNavigate('chat'); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === 'chat' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <IconScale />
                <span className="text-sm font-bold">Consultation</span>
              </button>
              <button
                onClick={() => { onNavigate('calculator'); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === 'calculator' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <IconCalculator />
                <span className="text-sm font-bold">Tax Estimator</span>
              </button>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <IconBook />
              Legal Library
            </h3>
            <ul className="space-y-4">
              {TAX_SOURCES.map((src, i) => (
                <li key={i}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group block text-sm hover:text-emerald-600 transition-colors"
                  >
                    <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{src.name}</p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-600 font-medium">Official Document PDF</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">Briefing Notes</h3>
            <div className="space-y-4">
              {TAX_HIGHLIGHTS.map((h, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm">
                  <h4 className="text-slate-900 dark:text-white font-black text-xs mb-1">{h.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{h.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col gap-2 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl">
            <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">System Status</span>
            <span className="text-xs text-emerald-800 dark:text-emerald-100 font-bold">Nigeria-2026-v2.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
