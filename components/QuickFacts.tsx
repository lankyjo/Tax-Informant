
import React, { useState, useEffect } from 'react';
import { QUICK_FACTS } from '../constants';

const QuickFacts: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUICK_FACTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 mb-32">
      <div className="relative overflow-hidden bg-slate-900 dark:bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-6 opacity-10 text-emerald-500">
           <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-emerald-400">Quick 2026 Fact</span>
          </div>
          
          <div className="min-h-[60px] flex items-center">
            <p key={index} className="text-xl md:text-2xl font-bold text-white leading-tight animate-modern-fade">
              {QUICK_FACTS[index]}
            </p>
          </div>
          
          <div className="mt-6 flex gap-1.5">
            {QUICK_FACTS.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-700 rounded-full ${i === index ? 'w-6 bg-emerald-500' : 'w-1.5 bg-slate-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickFacts;
