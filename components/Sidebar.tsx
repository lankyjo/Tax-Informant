
import React from 'react';
import { TAX_SOURCES, TAX_HIGHLIGHTS } from '../constants';
import { IconBook, IconClose } from './Icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 text-slate-300 border-r border-slate-800 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between mb-10 lg:hidden">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Portal Navigation</span>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <IconClose />
          </button>
        </div>

        <div className="mb-10">
          <h3 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2">
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
                  className="group block text-sm hover:text-white transition-colors"
                >
                  <p className="font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">{src.name}</p>
                  <span className="text-[10px] text-slate-500">Official Document PDF</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h3 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-6">Briefing Notes</h3>
          <div className="space-y-4">
            {TAX_HIGHLIGHTS.map((h, i) => (
              <div key={i} className="bg-slate-800/40 rounded-xl p-4 border border-slate-800 transition-all hover:bg-slate-800">
                <h4 className="text-white font-semibold text-xs mb-1">{h.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{h.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex flex-col gap-2 p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-2xl">
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Database Version</span>
            <span className="text-xs text-emerald-100 font-medium">Federal Reform v2.0.26</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
